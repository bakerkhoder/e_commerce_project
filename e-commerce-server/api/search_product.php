<?php
include("connection.php");
include("common.php");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
//PHP to get a product that the title contains an inputted word
$common = new Common();
$response = [];
if (isset($_POST['search_text'])) {
    $search_text = '%' . $_POST['search_text'] . '%';
    $sql = "SELECT * FROM products WHERE products.title LIKE ?";
    $stmt = $connection->prepare($sql);
    $stmt->bind_param('s', $search_text);
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
            $response = $common->getRepsonse(0, null, 'No data found');
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