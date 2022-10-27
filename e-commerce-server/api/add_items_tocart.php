<?php

include('connection.php');
include_once "common.php";
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
$common = new Common();
$response = [];
if (
    isset($_POST["client_id"], $_POST["product_id"])
) {
    $client_id = $_POST["client_id"];
    $product_id = $_POST["product_id"];

    //check client existed
    if ($common->checkUserWithType($client_id, 'client')) {
        //check product
        if ($common->checkProduct($product_id)) {
            $cart_id = 0;
            if ($common->checkOpennedCart($client_id)) {
                //append items to the oppened cart
                $cart_id = $common->checkOpennedCart($client_id);
                // $response = $common->getRepsonse(1, $cart_id, 'Found Cart');
            } else {
                //create new cart
                $sql = "INSERT into carts (client_id, created_at) VALUES ($client_id, NOW())";
                $stmt = $connection->query($sql);
                if ($stmt) {
                    //inserted
                    $cart_id = $connection->insert_id;
                    $response = $common->getRepsonse(1, $cart_id, 'Cart Added');
                } else {
                    //error
                    $response = $common->getRepsonse(0, null, 'Could not add cart');
                }
            }
         

            if ($cart_id) {
                //if is in cart update it
                $data = $common->checkProductInCart($cart_id, $product_id);
                // print_r($data);
                if (!empty($data)) {
                    $cart_item_id = $data['id'];
                    $orig_qty = $data['quantity'];
                    $quantity = $orig_qty + 1;
                    $sql = "UPDATE cart_items set 
                            quantity =$quantity
                            where id = " . $cart_item_id;

                    $stmt = $connection->query($sql);
                    if ($stmt) {
                        //inserted items
                        $response = $common->getRepsonse(1, $cart_item_id, 'Item quantity updated in cart');
                    } else {
                        //error
                        $response = $common->getRepsonse(0, null, 'Could not update quantity in cart');
                    }
                } else {
                    //if not in cart add it
                    $sql = "INSERT into cart_items (cart_id,product_id,quantity, created_at) VALUES ($cart_id,$product_id,1, NOW())";

                    $stmt = $connection->query($sql);
                    if ($stmt) {
                        //inserted items

                        $response = $common->getRepsonse(1, $connection->insert_id, 'Item Added to cart');
                    } else {
                        //error
                        $response = $common->getRepsonse(0, null, 'Could not add item to cart');
                    }
                }
            }
        } else {
            //product not found
            $response = $common->getRepsonse(0, null, 'Product not found');
        }
    } else {
        //user not found
        $response = $common->getRepsonse(0, null, 'User not found');
    }
} else {
    $response  = $common->getRepsonse(0, null, 'Not enough data submitted');
}
echo json_encode($response);
//else {
//     $response  = $common->getRepsonse('Not enough data submitted');
// }