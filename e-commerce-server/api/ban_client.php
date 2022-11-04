<?php
include("connection.php");
include("common.php");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
//PHP to ban a specific client
$common = new Common();
$response = [];

if (isset($_POST["id"], $_POST['ban'])) {

    $id = $_POST['id'];
    $is_banned =  $_POST['ban'];
    $sql = 'SELECT users.id from users 
            inner join user_types on user_types.id = users.type_id
            where users.id = ? and is_deleted = 0 and user_types.type = "client"';
    $stmt = $connection->prepare($sql);
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    if ($result->num_rows > 0) {
        $sql = "UPDATE users SET `is_banned`= $is_banned WHERE `id` = ? ";
        $stmt = $connection->prepare($sql);
        $stmt->bind_param('i', $id);

        if ($stmt->execute()) {
            $response = $common->getRepsonse(1, null, 'Done Successfully');
        } else {
            $response = $common->getRepsonse(0, null, 'Could not change!');
        }
        $stmt->close();
    } else {
        $response = $common->getRepsonse(0, null, 'Not Found');
    }
} else {
    $response = $common->getRepsonse(0, null, 'Not enough data submitted');
}

echo json_encode($response);