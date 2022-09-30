<?php
include('connection.php');
include_once "common.php";

$common = new Common();
$response = [];
if (
    isset($_GET["client_id"], $_GET["product_id"])
) {
    $client_id = $_GET["client_id"];
    $product_id = $_GET["product_id"];

    //check client existed
    if ($common->checkUserWithType($client_id, 'client')) {
        //check product
        if ($common->checkProduct($product_id)) {
          
           
                //create new cart
                $sql = "INSERT into wishlists (client_id, created_at) VALUES ($client_id, NOW())";
                $stmt = $connection->query($sql);
                if ($stmt) {
                    //inserted
                    $wishlist_id = $connection->insert_id;
                    $response = $common->getRepsonse(1, $wishlist_id, 'wishlist Added');
                } else {
                    //error
                    $response = $common->getRepsonse(0, null, 'Could not add wishlist');
                }
            
         

            if ($wishlist_id) {
                //if is in cart update it
            
               
                    //if not in cart add it
                    $sql = "INSERT into wishlist_items (wishlist_id,product_id,quantity, created_at) VALUES ($wishlist_id,$product_id,1, NOW())";
                   echo $wishlist_id;
                    $stmt = $connection->query($sql);
                    if ($stmt) {
                        //inserted items

                        $response = $common->getRepsonse(1, $connection->insert_id, 'Item Added to wishlist');
                    } else {
                        //error
                        $response = $common->getRepsonse(0, null, 'Could not add item to wishlist');
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