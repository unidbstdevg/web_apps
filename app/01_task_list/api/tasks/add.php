<?php
session_start();
if (!isset($_SESSION["user_id"])) {
    http_response_code(403);
    exit("Not authorized");
}

if (!isset($_REQUEST["task_name"])) {
    http_response_code(400);
    exit("Missed some required arguments");
}

require("../db_connect.php");

$s = $con->prepare("INSERT INTO tasks (name, user_id) VALUES (?, ?)");
$s->bind_param("sd", $_REQUEST["task_name"], $_SESSION["user_id"]);
if (!$s->execute()) {
    http_response_code(500);
    exit("sql error");
}

print("Ok");
