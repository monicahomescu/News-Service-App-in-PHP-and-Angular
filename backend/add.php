<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$connection = mysqli_connect("localhost", "root", "", "news_database");

$data = file_get_contents("php://input");

if (isset($data) && !empty($data)) {
    $request = json_decode($data);

    if (trim($request->text) === '' || trim($request->title) === '' || trim($request->producer) === '' || trim($request->date) === '' || trim($request->category) === '') {
        return http_response_code(400);
    }

    $text = mysqli_real_escape_string($connection, trim($request->text));
    $title = mysqli_real_escape_string($connection, trim($request->title));
    $producer = mysqli_real_escape_string($connection, trim($request->producer));
    $date = mysqli_real_escape_string($connection, trim($request->date));
    $category = mysqli_real_escape_string($connection, trim($request->category));

    $query = "INSERT INTO news (text, title, producer, date, category) VALUES ('$text', '$title', '$producer', '$date', '$category')";

    if (mysqli_query($connection,$query)) {
        http_response_code(201);
        $news = [
            'text' => $text,
            'title' => $title,
            'producer' => $producer,
            'date' => $date,
            'category' => $category,
        ];
        echo json_encode($news);
    }
    else {
        http_response_code(422);
    }
}
