<?php
include("connection.php");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
//PHP that edits a specific clients info

if (isset($_POST['client_id'])) {

    $client_id = $_POST["client_id"];
    $edited_username = $_POST["edited_username"];
    $edited_name = $_POST["edited_name"];
    $edited_email = $_POST["edited_email"];

    $sql_query = 
        "UPDATE users
        SET name='$edited_name' , username='$edited_username', email='$edited_email'
        WHERE users.id=$client_id";


    $query = $connection->prepare($sql_query);
    $query->execute();


    $response = [];
    $response['success'] = true;
    
    echo json_encode($response);

}
?>


