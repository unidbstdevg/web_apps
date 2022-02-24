<?php
require("../db_connect.php");

if (!isset($_REQUEST["login"]) or !isset($_REQUEST["password"])) {
    http_response_code(400);
    exit("missed some required arguments");
}

$s = sprintf(
    "SELECT * FROM `users` WHERE `login` = '%s' AND `password` = '%s'",
    $_REQUEST["login"],
    $_REQUEST["password"]
);
$res = mysqli_query($con, $s);

if ($res->num_rows <= 0) {
    http_response_code(401);
    exit("wrong login/password");
}

$user = mysqli_fetch_assoc($res);

session_start();
$_SESSION["login"] = $user["login"];
$_SESSION["user_id"] = $user["id"];
