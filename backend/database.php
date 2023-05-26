<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

function connect() {
    $connection = mysqli_connect("localhost", "root", "", "news_database");
    if (mysqli_connect_errno($connection)) {
        die("Failed to connect:" . mysqli_connect_error());
    }
    mysqli_set_charset($connection, "utf8");
    return $connection;
}

$connection = connect();
