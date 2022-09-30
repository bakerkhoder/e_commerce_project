<?php
include_once "connection.php";
include_once "common.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');

$common = new Common();

$response = array();

if (isset($_GET['id'])) {

    $id = $_GET['id'];

    $sql = 'SELECT products.*, categories.category, categories.id as cat_id from products 
    inner join categories on categories.id = products.categorie_id
    inner join users on users.id = categories.seller_id
    where products.id = ? and products.is_deleted = 0';

    $stmt = $connection->prepare($sql);
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $response = array();
    if ($result) {
        if ($result->num_rows > 0) {
            //data found
            $data = [];
            $row = $result->fetch_assoc();
            $data[] = $row;

            $response = $common->getRepsonse(1, $data, 'Data returned successfully');
        } else {
            //no data
            $response = $common->getRepsonse(1, null, 'No data found');
        }
    } else {
        //error 
        $response = $common->getRepsonse(0, null, 'Something went wrong, try again');
    }
    $stmt->close();
} else {
    $response = $common->getRepsonse(0, null, 'Not enough data submitted');
}

echo json_encode($response);

$connection->close();