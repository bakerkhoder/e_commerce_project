<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: X-Requested-With');
header('Content-Type: application/json');

$host = "localhost";
$db_user = "root";
$db_pass = '';
$db_name = "ecommerce_db";

$connection = new mysqli($host, $db_user, $db_pass, $db_name);

if ($connection->connect_error) {
    die('Connection failed: ' + $connection->connect_error);
}