
<?php
include("connection.php");
include("common.php");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
//PHP to get a specific seller's info
$common = new Common();
$response = [];
if (isset($_POST['id'])) {
    $id = $_POST['id'];
    $sql = 'SELECT * from users where id = ? and is_deleted = 0';
    $stmt = $connection->prepare($sql);
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $response = $common->getRepsonse(1, [$result->fetch_assoc()], 'Success');

        $stmt->close();
    } else {
        $response = $common->getRepsonse(0, null, 'Not Found');
    }
} else {
    $response = $common->getRepsonse(0, null, 'Not enough data submitted');
}

echo json_encode($response);