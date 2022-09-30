<?php
include("connection.php");
include("common.php");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
//PHP to get all products info
$common = new Common();

if (!isset($_POST['id'])) {
    $response = $common->getRepsonse(0, null, "no id is given");
} else {
    $id = $_POST['id'];
    $query = $connection->prepare('SELECT p.id, p.title, p.price, p.description, p.image
                                    FROM products AS p
                                    WHERE p.id NOT IN(SELECT ci.product_id
                                                        FROM users AS u, carts AS ca, cart_items AS ci
                                                        WHERE u.id=? AND u.id=ca.client_id AND ca.purchased_at IS NULL AND ca.id=ci.cart_id)
                                    AND p.id NOT IN(SELECT wi.product_id
                                                        FROM users AS u, wishlists AS w, wishlist_items AS wi
                                                        WHERE u.id=? AND u.id=w.client_id AND w.purchased_at IS NULL AND w.id=wi.wishlist_id)
                                    AND p.id NOT IN(SELECT fp.product_id
                                                        FROM users AS u, favorite_products AS fp
                                                        WHERE u.id=? AND u.id=fp.client_id)
                                    AND p.is_deleted = 0');
    $query->bind_param('iii', $id, $id, $id);
    $query->execute();
    $array = $query->get_result();

    $response = [];
    echo "shaw";

    if ($array->num_rows > 0) {
        while ($a = $array->fetch_assoc()) {
            $response['data'][] = $a;
        }
        $response['status'] = 1;
        $response['message'] = 'successful';
    } else {
        $response['data'] = null;
        $response['status'] = 1;
        $response['message'] = 'No Data Found';
    }
    $query->close();
    $connection->close();
    $json = json_encode($response);
    echo $json;
}