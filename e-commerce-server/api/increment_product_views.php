<?php 
    include('connection.php');
    include('common.php');
    $common = new Common();

    if(!isset($_POST['product_id'])){
        $response = $common->getRepsonse(0, null, 'no product id is sent');
        echo json_encode($response);
    }else{
        $product_id = $_POST['product_id'];
        $query = $connection->prepare('UPDATE products SET views = views+1 WHERE id=?');
        $query->bind_param('i', $product_id);
        $query->execute();
        
        $response = $common->getRepsonse(1, null, 'query execute successfully');
        echo json_encode($response);
    }
?>