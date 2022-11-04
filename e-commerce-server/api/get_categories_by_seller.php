<?php
include_once "connection.php";
include_once "common.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');

$common = new Common();

$response = array();

if (isset($_POST['id'])) {

    $seller_id = $_POST['id'];

    $sql = 'SELECT categories.id category_id, users.id, category, categories.created_at from users 
    inner join categories on categories.seller_id = users.id
    where categories.seller_id = ? order by categories.created_at desc';

    $stmt = $connection->prepare($sql);
    $stmt->bind_param('i', $seller_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $response = array();
    if ($result) {
        if ($result->num_rows > 0) {
            //data found
            $data = [];
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }

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