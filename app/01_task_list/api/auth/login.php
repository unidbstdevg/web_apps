<?php
if (!isset($_REQUEST["login"]) or !isset($_REQUEST["password"])) {
    http_response_code(400);
    exit("Missed some required arguments");
}

require("../db_connect.php");

$s = sprintf(
    "SELECT * FROM `users` WHERE `login` = '%s' AND `password` = '%s'",
    $_REQUEST["login"],
    $_REQUEST["password"]
);
$res = mysqli_query($con, $s);

if ($res->num_rows <= 0) {
    http_response_code(401);
    exit("Wrong login/password");
}

$user = mysqli_fetch_assoc($res);

session_start();
$_SESSION["login"] = $user["login"];
$_SESSION["user_id"] = $user["id"];

print("Ok");
