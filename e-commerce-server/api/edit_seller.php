<?php
include('connection.php');
include_once "common.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: X-Requested-With');
header('Content-Type: application/json');
$common = new Common();
if (
  isset($_POST["id"], $_POST["name"], $_POST["username"], $_POST["email"]/*, $_POST["password"]*/)
) {
  $id = $_POST["id"];
  $name = $_POST["name"];
  $username = $_POST["username"];
  $email = $_POST["email"];
  // $password = $_POST["password"];
  // $hashed_password = hash('sha256', $password) . 'team1';
  $profile_picture = isset($_POST['profile_picture']) ? $_POST['profile_picture'] : '';
  $created_at = date('Y-m-d H:i:s');
  $false_flag = 0;

  if ($common->checkUser($id)) {
    if ($common->emailAndUsernameExistWithID($username, $email, $id)) {
      $response = $common->getRepsonse(0, null, 'Username/Email already existed!');
    } else {
      $sql = 'UPDATE users set name = "' . $name . '",username = "' . $username .
        '",email ="' . $email . '"';
      $seller_images_path = $common->getSellerPath();
      $client_images_path = $common->getClientPath();

      $image_name = '';
      $base64String = '';
      if ($profile_picture != '') {
        $coded_image =  $common->convertToBase64($profile_picture);
        $image_name = $coded_image['file_name'];
        $base64String = $coded_image['base64string'];
      }

      if ($image_name !== '') {
        $sql .= ' ,profile_picture= "' . $image_name . '"';
      }

      $sql .= ' where id = ' . $id;
      // $sql = 'UPDATE users set name = ?,username = ?,email =?,profile_picture=? where id = ?';

      $stmt = $connection->prepare($sql);
      // $stmt->bind_param('ssssi', $name, $username, $email, $image_name, $id);
      $result = $stmt->execute() or die($connection->error);

      if ($result) {
        $type = $common->getUserType($id);
        if ($type == 'seller' && !empty($image_name)) {
          file_put_contents($seller_images_path . $image_name, $base64String); //add image to the folder
        } else if ($type == 'client' && !empty($image_name)) {
          file_put_contents($client_images_path . $image_name, $base64String); //add image to the folder
        }
        $response = $common->getRepsonse(1, null, 'User Info Updated Successfully');
      } else {
        $response = $common->getRepsonse(0, null, 'Could not update the info, Try again!');
      }
    }
  } else {
    $response = $common->getRepsonse(0, null, 'User not found!');
  }
} else {
  $response = $common->getRepsonse(0, null, 'Not enough data submitted');
}

echo json_encode($response);

$connection->close();