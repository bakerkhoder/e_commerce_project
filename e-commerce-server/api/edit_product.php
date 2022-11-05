<?php
include('connection.php');
include_once "common.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: X-Requested-With');
header('Content-Type: application/json');
$common = new Common();
if (
    isset($_POST["id"])
) {
    $id = $_POST["id"];
    $title = isset($_POST["title"]) ? $_POST["title"] : '';
    $price = isset($_POST["price"]) ? $_POST["price"] : '';;
    $quantity = isset($_POST["quantity"]) ? $_POST["quantity"] : '';;
    $description = isset($_POST["description"]) ? $_POST["description"] : '';
    $image = isset($_POST["image"]) ? $_POST["image"] : '';

    if (empty($title) && empty($price) && empty($quantity) && empty($description) && empty($image)) {
        $response = $common->getRepsonse(1, null, 'No Data to be changed');
    } else {
        $sql = 'SELECT id from products where id = ?';
        $stmt = $connection->prepare($sql);
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();
        if ($result->num_rows > 0) {
            $sql = 'UPDATE products set';
            $sql_flag = false;
            if (!empty($title)) {
                $sql .= ' title = "' . $title . '"';
                $dql_flag = true;
            }

            $sql .= ($dql_flag ? ',' : '');
            $dql_flag = false;

            if (!empty($price)) {
                $sql .=  ' price = ' . $price;
                $dql_flag = true;
            }

            $sql .= ($dql_flag ? ',' : '');
            $dql_flag = false;

            if (!empty($quantity)) {
                $sql .= ' quantity = ' . $quantity;
                $dql_flag = true;
            }

            $sql .= ($dql_flag ? ',' : '');
            $dql_flag = false;

            if (!empty($description)) {
                $sql .= ' description = "' . $description . '"';
                $dql_flag = true;
            }

            if (!empty($image)) {
                $sql .= ($dql_flag ? ',' : '');
                $dql_flag = false;

                $products_images_path = $common->getProductsPath();

                $coded_image =  $common->convertToBase64($image);
                $image_name = $coded_image['file_name'];
                $base64String = $coded_image['base64string'];
                $sql .= ' image = "' . $image_name . '"';
            }
            // set name = ?,username = ?,email =? ,password=?,profile_picture=? where id = ?';

            $sql .= ' where id = ' . $id;
            // die($sql);
            $stmt = $connection->prepare($sql);
            $result = $stmt->execute() or die($connection->error);

            if ($result) {
                if (!empty($image_name)) {
                    file_put_contents($products_images_path . $image_name, $base64String); //add image to the folder
                }
                $response = $common->getRepsonse(1, null, 'Product Updated Successfully');
            } else {
                $response = $common->getRepsonse(0, null, 'Could not update, Try again!');
            }
        } else {
            $response = $common->getRepsonse(0, null, 'Product not found!');
        }
    }
} else {
    $response = $common->getRepsonse(0, null, 'Not enough data submitted');
}

echo json_encode($response);

$connection->close();