<?php
include('connection.php');
include_once "common.php";

$common = new Common();
$response = [];
if (
    isset($_POST["id"])
) {
    $client_id = $_POST["id"];
    $discount_code = isset($_GET["code"]) ? $_GET["code"] : '';
    $discount_id = '';
    $discount_perce = 0;
    //check client existed
    if ($common->checkUserWithType($client_id, 'client')) {
        if ($common->checkOpennedCart($client_id)) {
            //append items to the oppened cart
            $cart_id = $common->checkOpennedCart($client_id);

            //get discount id
            if ($discount_code) {
                $discountData = $common->getDiscount($discount_code);
                if (!empty($discountData)) {
                    $discount_id = $discountData['id'];
                    $discount_perce = $discountData['percentage'];
                }
            }

            $sql = "select sum(products.price * cart_items.quantity) total from cart_items 
            inner join products on products.id = cart_items.product_id
            where cart_items.cart_id = $cart_id";
            $result = $connection->query($sql);
            $total = $result->fetch_assoc()['total'];
            $total = $total - $total * $discount_perce / 100.0;
            echo $total;

            if ($discount_id) {
                $sql = "UPDATE carts set total = $total, discount_id = $discount_id, purchased_at = NOW() 
                where id = $cart_id";
            } else {
                $sql = "UPDATE carts set total = $total, purchased_at = NOW() 
                    where id = $cart_id";
            }
            $result = $connection->query($sql);
            if ($result) {
                $response = $common->getRepsonse(1, $total, 'Checked out!');
            } else {
                $response = $common->getRepsonse(0, null, 'Something went wrong');
            }
        } else {
            $response = $common->getRepsonse(0, null, 'Cart is empty');
        }
    } else {
        //user not found
        $response = $common->getRepsonse(0, null, 'User not found');
    }
} else {
    $response  = $common->getRepsonse(0, null, 'Not enough data submitted');
}
echo json_encode($response);