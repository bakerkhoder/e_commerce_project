<?php
include_once "connection.php";
include_once "common.php";
$common = new Common();

$response = array();

if (isset($_GET['id'])) {

    $client_id = $_GET['id'];

    $sql = 'select products.*, wishlist_items.quantity
     from products inner join wishlist_items on products.id = wishlist_items.product_id 
     inner join wishlists on wishlist_items.wishlist_id = wishlists.id
      where wishlists.client_id=? and wishlists.purchased_at is null;';
/// add is_deleted to wishlist(for me)
    $stmt = $connection->prepare($sql);
    $stmt->bind_param('i', $client_id);
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

?>