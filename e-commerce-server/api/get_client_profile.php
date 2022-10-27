<?php
include("connection.php");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
//PHP to get a client's profile info

if (isset($_POST['client_id'])) {

    $client_id=$_POST['client_id'];
    
    $sql_query = "
    SELECT users.name client_name, users.username client_username, users.email
    FROM users
    WHERE users.id=$client_id";

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

}
