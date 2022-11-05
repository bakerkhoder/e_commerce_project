<?php
include_once "connection.php";
include_once "common.php";
$common = new Common();

$response = array();

if (isset($_POST['id'])) {

    $seller_id = $_POST['id'];

    $sql = 'SELECT discounts.id discount_id, users.id, code,percentage,expired_at, discounts.created_at from users 
    inner join discounts on discounts.seller_id = users.id
    where discounts.seller_id = ? order by discounts.created_at desc';

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