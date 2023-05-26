<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


$connection = mysqli_connect("localhost", "root", "", "news_database");

$dataa = file_get_contents("php://input");
$data = json_decode($dataa);

$id = $_GET["id"];

$query = "SELECT * FROM news WHERE id='$id'";
$result = mysqli_query($connection, $query);


if($result = mysqli_query($connection,$query))
{
    $row = mysqli_fetch_assoc($result);
    $news = [
            "text" => $row['text'],
            "title" => $row['title'],
            "producer" => $row['producer'],
            "date" => $row['date'],
            "category" => $row['category']
    ];

    echo json_encode($news);
}
