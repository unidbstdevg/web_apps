<?php
if (!isset($_REQUEST["login"]) or !isset($_REQUEST["password"])) {
    http_response_code(400);
    exit("Missed some required arguments");
}

require("../db_connect.php");

$s = $con->prepare("SELECT id FROM users WHERE login = ? AND password = ?");
$s->bind_param("ss", $_REQUEST["login"], $_REQUEST["password"]);
if (!$s->execute()) {
    http_response_code(500);
    exit("sql error");
}
$res = $s->get_result();
if ($res->num_rows != 1) {
    http_response_code(401);
    exit("Wrong login/password");
}

$user_id = $res->fetch_row()[0];

session_start();
$_SESSION["user_id"] = $user_id;

print("Ok");
