<?php
include('connection.php');
include_once "common.php";
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: X-Requested-With');
header('Content-Type: application/json');
$common = new Common();
if (
    isset($_POST["name"], $_POST["username"], $_POST["email"], $_POST["password"], $_POST["type"])
) {
    $type = $_POST["type"];
    $name = $_POST["name"];
    $username = $_POST["username"];
    $email = $_POST["email"];
    $password = $_POST["password"];
    $profile_picture = isset($_POST['profile_picture']) ? $_POST['profile_picture'] : '';
    $created_at = date('Y-m-d H:i:s');
    $false_flag = 0;

    $hashed_password = hash('sha256', $_POST['password']) . 'team1';

    //check if username or email exist

    if ($common->emailAndUsernameExist($username, $email)) {
        $response = $common->getRepsonse(0, null, 'Username/Email already existed!');
    } else {
        $seller_images_path = $common->getSellerPath();
        $client_images_path = $common->getClientPath();

        $image_name = '';
        $base64String = '';
        if ($profile_picture != '') {
            $coded_image = $common->convertToBase64($profile_picture);
            $image_name = $coded_image['file_name'];
            $base64String = $coded_image['base64string'];
        }

        /*get type id of user */
        $type_id = $common->getUserTypeID($type);


        $sql = 'INSERT INTO users(type_id,name,username,email,password,profile_picture,is_banned,is_deleted,created_at) 
               VALUES (?,?,?,?,?,?,?,?,?)';

        $stmt = $connection->prepare($sql);
        $stmt->bind_param('issssssss', $type_id, $name, $username, $email, $hashed_password, $image_name, $false_flag, $false_flag, $created_at);
        $result = $stmt->execute() or die($connection->error);

        if ($result) {
            if ($type == 'seller' && !empty($image_name)) {
                file_put_contents($seller_images_path . $image_name, $base64String); //add image to the folder
            } else if ($type == 'client' && !empty($image_name)) {
                file_put_contents($client_images_path . $image_name, $base64String); //add image to the folder
            }
            $response = $response = $common->getRepsonse(1, null, 'Account Created Successfully');
        } else {
            $response = $response = $common->getRepsonse(0, null, 'Could not add the user, Try again!');
        }
    }
} else {
    $response = $response = $common->getRepsonse(0, null, 'Not enough data submitted');
}

echo json_encode($response);

$connection->close();