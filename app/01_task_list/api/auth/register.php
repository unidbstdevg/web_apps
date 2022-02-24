<?php
require("../db_connect.php");

if (!isset($_REQUEST["login"]) or !isset($_REQUEST["password"])) {
    http_response_code(400);
    exit("missed some required arguments");
}

$s = sprintf(
    "SELECT * FROM `users` WHERE `login` = '%s'",
    $_REQUEST["login"]
);
$res = mysqli_query($con, $s);

if ($res->num_rows > 0) {
    http_response_code(409);
    exit("login already exist");
}

$s = sprintf(
    "INSERT INTO `users` (`login`, `password`) VALUES ('%s', '%s')",
    $_REQUEST["login"],
    $_REQUEST["password"]
);
mysqli_query($con, $s);
