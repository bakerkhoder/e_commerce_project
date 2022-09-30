<?php
include_once "connection.php";
include_once "common.php";
$common = new Common();

$response = array();

if (isset($_GET['id'])) {

    $client_id = $_GET['id'];

    $sql = 'select products.*, cart_items.quantity from products 
    inner join cart_items on products.id = cart_items.product_id
    inner join carts on cart_items.cart_id = carts.id
    where carts.client_id = ? and carts.is_deleted = 0 and carts.purchased_at is null';

    $stmt = $connection->prepare($sql);
    $stmt->bind_param('i', $client_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $response = array();
    if ($result) {
        echo "e";
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

?>