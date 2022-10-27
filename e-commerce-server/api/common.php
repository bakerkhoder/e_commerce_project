<?php
class Common
{

    public function __construct()
    {
    }

    public function convertToBase64($file)
    {
        list($type, $file) = explode(';', $file); //split the type of image from its url
        list(, $extension)          = explode('/', $type); //get the extension of the file by splitting the type (data:image/jpeg)
        list(, $file)       = explode(',', $file); //remove (base64) prefix
        $file_name                  = uniqid('te1am', true) . date('Y-m-d') . '.' . $extension; //define unique name for the image
        $base64string              = base64_decode($file); //decode base64 string

        $data = [
            'file_name' => $file_name,
            'base64string' =>  $base64string,
        ];
        return $data;
    }

    public function getSellerPath()
    {
        return '../../admin-electron/src/images/sellers-profiles/';
    }

    public function getClientPath()
    {
        return '../../client-fronend/assets/images/profiles/';
    }

    public function getProductsPath()
    {
        return '../../seller-frontend/assets/images/products/';
    }

    public function emailAndUsernameExist($username, $email)
    {
        require("connection.php");
        //check if username or email exist
        $sql = "SELECT id from users where username = ? or email = ?";
        $stmt = $connection->prepare($sql);
        $stmt->bind_param('ss', $username, $email);
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();
        $connection->close();
        return $result->num_rows > 0;
    }

    public function emailAndUsernameExistWithID($username, $email, $id)
    {
        require("connection.php");
        //check if username or email exist
        $sql = "SELECT id from users where (username = ? or email = ?) and id != ?";
        $stmt = $connection->prepare($sql);
        $stmt->bind_param('ssi', $username, $email, $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();
        $connection->close();
        return $result->num_rows > 0;
    }

    public function getUserData($id)
    {
        require("connection.php");
        //check if username or email exist
        $sql = "SELECT * from users where id = ? ";
        $stmt = $connection->prepare($sql);
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();
        $connection->close();
        return $result->fetch_assoc();
    }

    public function getRepsonse($status, $data, $message)
    {
        return [
            'status' => $status,
            'data' => $data,
            'message' => $message
        ];
    }

    public function checkUser($id)
    {
        require("connection.php");
        $sql = "SELECT * from users where id = ? and is_deleted = 0";
        $stmt = $connection->prepare($sql);
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();
        $connection->close();
        return $result->num_rows == 1;
    }

    public function getUserType($id)
    {
        require("connection.php");
        $sql = "SELECT type from users inner join user_types on users.type_id = user_types.id where users.id = ?";
        $stmt = $connection->prepare($sql);
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();
        $connection->close();
        return $result->fetch_assoc()['type'];
    }

    public function getUserTypeID($type)
    {
        require("connection.php");
        $sql = "SELECT id from user_types where type = ?";
        $stmt = $connection->prepare($sql);
        $stmt->bind_param('s', $type);
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();
        $connection->close();
        return $result->fetch_assoc()['id'];
    }

    public function checkOpennedCart($client_id)
    {
        require("connection.php");
        $sql = "SELECT id from carts where client_id = ? and purchased_at is null and is_deleted = 0";
        $stmt = $connection->prepare($sql);
        $stmt->bind_param('i', $client_id);
        $stmt->execute();
        $result = $stmt->get_result();

        $id = 0;
        if ($result->num_rows > 0) {
            $id = $result->fetch_assoc()['id'];
        }
        $stmt->close();
        $connection->close();

        return $id;
    }

    public function checkProduct($id)
    {
        require("connection.php");
        $sql = "SELECT id from products where id = ? and is_deleted = 0";
        $stmt = $connection->prepare($sql);
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();
        $connection->close();
        return $result->num_rows == 1;
    }

    public function checkUserWithType($id, $type)
    {
        require("connection.php");
        $sql = "SELECT users.id from users 
                inner join user_types on users.type_id = user_types.id 
                where users.id = ? and type= ? and is_deleted = 0";
        $stmt = $connection->prepare($sql);
        $stmt->bind_param('is', $id, $type);
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();
        $connection->close();
        return $result->num_rows == 1;
    }

    public function checkProductInCart($cart_id, $product_id)
    {
        require("connection.php");
        $sql = "SELECT cart_items.id,cart_items.quantity  from carts 
                inner join cart_items on carts.id = cart_items.cart_id 
                where carts.id = ? and cart_items.product_id = ? and carts.is_deleted = 0";
        $stmt = $connection->prepare($sql);
        $stmt->bind_param('ii', $cart_id, $product_id);
        $stmt->execute();
        $result = $stmt->get_result();

        $data = [];
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $data['id'] = $row['id'];
            $data['quantity'] = $row['quantity'];
        }
        $stmt->close();
        $connection->close();

        return $data;
    }

    public function getDiscount($code)
    {
        require("connection.php");
        $sql = "SELECT id,percentage from discounts       
                where code = ?";
        $stmt = $connection->prepare($sql);
        $stmt->bind_param('s', $code);
        $stmt->execute();
        $result = $stmt->get_result();

        $data = [];
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $data['id'] = $row['id'];
            $data['percentage'] = $row['percentage'];
        }
        $stmt->close();
        $connection->close();

        return $data;
    }

    public function checkProductInFav($id, $client_id)
    {
        require("connection.php");
        $sql = "SELECT products.id from products
                inner join favorite_products on favorite_products.product_id = products.id
                inner join users on favorite_products.client_id = users.id
                where favorite_products.client_id= ? and favorite_products.product_id = ? and products.is_deleted=0 and users.is_deleted = 0";
        $stmt = $connection->prepare($sql);
        $stmt->bind_param('ii', $client_id, $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();
        $connection->close();
        return $result->num_rows > 0;
    }
}