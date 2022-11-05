<?php 
    header('Access-Control-Allow-Origin');
    header('Access-Control-Allow-Headers: *');
    include('connection.php');
    include('common.php');
    $common = new Common();


    if(isset($_POST['id']) && isset($_POST['interval'])){
        $id = $_POST['id'];
        $interval = $_POST['interval'];

        $today = date('Y-m-d');
        if($interval == 'week'){
            $interval = date("Y-m-d", strtotime($today . "-1 week"));
        }else if($interval == 'month'){
            $interval = date("Y-m-d", strtotime($today . "-1 month"));
        }else if($interval == 'year'){
            $interval = date("Y-m-d", strtotime($today . "-1 year"));
        }


        // get the price and the quantaty sold of the products that are not discounted
        $query = $connection->prepare('SELECT p.price, SUM(ci.quantity) AS purchased_number
                                        FROM categories AS c, products AS p, cart_items AS ci, carts AS ca, discounts AS d
                                        WHERE c.seller_id=? AND c.id=p.categorie_id AND p.id=ci.product_id AND ci.cart_id=ca.id AND ca.purchased_at>=? AND (ca.discount_id IS NULL OR (ca.discount_id=d.id AND d.seller_id != ?))
                                        GROUP BY p.id');
        $query->bind_param('isi', $id, $interval, $id);
        $query->execute();
        $result = $query->get_result();

        $noDiscount = [];
        while($value = $result->fetch_assoc()){
            $noDiscount[] = $value;
        }
        // price of all non discounted products
        $noDiscountPrice = 0;
        foreach($noDiscount as $value){
            $noDiscountPrice += $value['price'] * $value['purchased_number'];
        }

        // get the price, the quantity, and the discount percentage of the discounted prducts
        $query = $connection->prepare('SELECT p.price, d.percentage, SUM(ci.quantity) AS purchased_number
                                        FROM categories AS c, products AS p, cart_items AS ci, carts AS ca, discounts AS d
                                        WHERE c.seller_id=? AND c.id=p.categorie_id AND p.id=ci.product_id AND ci.cart_id=ca.id AND ca.purchased_at>=? AND ca.discount_id=d.id AND d.seller_id = ?
                                        GROUP BY p.id');
        $query->bind_param('isi', $id, $interval, $id);
        $query->execute();
        $result = $query->get_result();
        
        $discounted = [];
        while($value = $result->fetch_assoc()){
            $discounted[] = $value;
        }

        $discountedPrice = 0;
        foreach($discounted as $value){
            $discountedPrice += $value['price'] * $value['percentage']/100 * $value['purchased_number'];
        }

        // getting the quantity sold of each product and its price through the wishlist directly
        $query = $connection->prepare('SELECT p.price, SUM(wi.quantity) AS purchased_number
                                        FROM wishlists AS w, wishlist_items AS wi, products AS p, categories AS c
                                        WHERE c.seller_id=? AND c.id=p.categorie_id AND p.id=wi.product_id AND wi.wishlist_id=w.id AND w.purchased_at>=?
                                        GROUP BY p.id');
        $query->bind_param('is', $id, $interval);
        $query->execute();
        $result = $query->get_result();

        $wishlist = [];
        while($value = $result->fetch_assoc()){
            $wishlist[] = $value;
        }
        
        $wishlistPrice = 0;
        foreach($wishlist as $value){
            $wishlistPrice += $value['price'] * $value['purchased_number'];
        }

        // add the 3 revenues to get the total revenue of the seller
        $final_price = $discountedPrice + $noDiscountPrice + $wishlistPrice;
        $response = $common->getRepsonse(1, $final_price, "query executed successfully");

        echo json_encode($response);
    }else{
        $response = $common->getRepsonse(0, null, "no sufficient data is given");
        echo json_encode($response);
    }
?>