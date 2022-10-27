<?php
include('connection.php');
include_once "common.php";

$common = new common();
$response = [];
if (
    isset($_GET["client_id"], $_GET["product_id"])
) {
    $client_id = $_GET["client_id"];
    $product_id = $_GET["product_id"];
    if ($common->checkUserWithType($client_id, 'client')) {
        if ($common->checkProduct($product_id)) {
            if ($common->checkProductInFav($product_id, $client_id) == 0) {
                $sql = 'INSERT INTO favorite_products(client_id, product_id, created_at) VALUES(?,?,NOW())';
                $stmt = $connection->prepare($sql);
                $stmt->bind_param('ii', $client_id, $product_id);
                $result = $stmt->execute() or die($connection->error);
                if ($result) {
                    $response = $common->getRepsonse(1, null, 'Product added Successfully');
                } else {
                    $response = $common->getRepsonse(0, null, 'Could not change!');
                }
                $stmt->close();
            } else {
                $response = $common->getRepsonse(1, null, 'Product added Successfully');
            }
        } else {
            $response = $common->getRepsonse(0, null, 'Product not found');
        }
    } else {
        $response = $common->getRepsonse(0, null, 'User not found');
    }
} else {
    $response = $common->getRepsonse(0, null, 'Not enough data submitted');
}

echo json_encode($response);