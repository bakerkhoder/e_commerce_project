<?php
include("connection.php");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
//PHP to get all clients info

$user_type = 'client';
$sql_query = "
SELECT users.id client_id, users.username client_username, users.name client_name, users.email client_email, users.profile_picture client_pp,users.is_banned, users.created_at client_join_date
FROM users, user_types
WHERE user_types.id = users.type_id AND user_types.type='$user_type'
 and users.is_deleted = 0 order by users.created_at desc";

$query = $connection->prepare($sql_query);
$query->execute();
$array = $query->get_result();

$response = [];

if ($array->num_rows > 0) {
    while ($a = $array->fetch_assoc()) {
        $response['data'][] = $a;
    }
    $response['status'] = 1;
    $response['message'] = 'successful';
} else {
    $response['data'] = null;
    $response['status'] = 1;
    $response['message'] = 'No Data Found';
}
$query->close();
$connection->close();
$json = json_encode($response);
echo $json;