<?php
include('connection.php');
include_once "common.php";
$common = new Common();
$response = [];
if (isset($_POST['id'])) {
    $id = $_POST['id'];
    $sql = 'SELECT id from products where id = ? and is_deleted = 0';
    $stmt = $connection->prepare($sql);
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    if ($result->num_rows > 0) {
        $sql = "UPDATE products SET `is_deleted`=1 WHERE `id` = ? ";
        $stmt = $connection->prepare($sql);
        $stmt->bind_param('i', $id);

        if ($stmt->execute()) {
            $response = $common->getRepsonse(1, null, 'Product Deleted Successfully');
        } else {
            $response = $common->getRepsonse(0, null, 'Could not delete product!');
        }
        $stmt->close();
    } else {
        $response = $common->getRepsonse(0, null, 'Not Found');
    }
} else {
    $response = $common->getRepsonse(0, null, 'Not enough data submitted');
}

echo json_encode($response);