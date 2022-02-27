<?php
if (!isset($_REQUEST["login"]) or !isset($_REQUEST["password"])) {
    http_response_code(400);
    exit("Missed some required arguments");
}

require("../db_connect.php");

# check if login already exists
$s = $con->prepare("SELECT 1 FROM users WHERE login = ?");
$s->bind_param("s", $_REQUEST["login"]);
if (!$s->execute()) {
    http_response_code(500);
    exit("sql error");
}
$res = $s->get_result();
if ($res->num_rows >= 1) {
    http_response_code(409);
    exit("Login already exists");
}

# insert new user
$s = $con->prepare("INSERT INTO users (login, password) VALUES (?, ?)");
$s->bind_param("ss", $_REQUEST["login"], $_REQUEST["password"]);
if (!$s->execute()) {
    http_response_code(500);
    exit("sql error");
}

print("Ok");
