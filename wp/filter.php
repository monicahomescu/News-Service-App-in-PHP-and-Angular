<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$connection = mysqli_connect("localhost", "root", "", "news_database");

$dateFilter = $_GET["date"];
$categoryFilter = $_GET["category"];


    $query = "SELECT * FROM news WHERE 1=1";
    if ($dateFilter != 'mm/dd/yyyy') {
        $query .= " AND date='$dateFilter'";
    }
    if ($categoryFilter != '') {
        $query .= " OR category='$categoryFilter'";
    }

    $allNews = [];

    if ($result = mysqli_query($connection,$query)) {
        $i = 0;
        while ($row = mysqli_fetch_assoc($result)) {
            $allNews[$i]['id'] = $row['id'];
            $allNews[$i]['text'] = $row['text'];
            $allNews[$i]['title'] = $row['title'];
            $allNews[$i]['producer'] = $row['producer'];
            $allNews[$i]['date'] = $row['date'];
            $allNews[$i]['category'] = $row['category'];
            $i++;
        }
        echo json_encode($allNews);
    }
