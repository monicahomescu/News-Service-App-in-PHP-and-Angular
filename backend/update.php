<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$connection = mysqli_connect("localhost", "root", "", "news_database");

$data = file_get_contents("php://input");

if (isset($data) && !empty($data)) {
    $request = json_decode($data);

    $id = $request->id;
    $text = mysqli_real_escape_string($connection, trim($request->text));
    $title = mysqli_real_escape_string($connection, trim($request->title));
    $producer = mysqli_real_escape_string($connection, trim($request->producer));
    $date = mysqli_real_escape_string($connection, trim($request->date));
    $category = mysqli_real_escape_string($connection, trim($request->category));

    $query = "UPDATE news SET text='$text', title='$title', producer='$producer', date='$date', category='$category' WHERE id='$id'";

    if (mysqli_query($connection,$query)) {
        http_response_code(204);
    }
    else {
        return http_response_code(422);
    }
}
