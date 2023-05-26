<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$connection = mysqli_connect("localhost", "root", "", "news_database");

$data = file_get_contents("php://input");
$request = json_decode($data);

if(isset($data) && !empty($data))
{
    $username = mysqli_real_escape_string($connection, trim($request->username));
    $password = mysqli_real_escape_string($connection, trim($request->password));
    $query='';
    $query = "SELECT * FROM users where username='$username' and password='$password'";
    if($result = mysqli_query($connection, $query))
    {
        $rows = array();
        while($row = mysqli_fetch_assoc($result))
        {
            $rows[] = $row;
        }

        echo json_encode($rows);
    }
    else
    {
        http_response_code(404);
    }
}