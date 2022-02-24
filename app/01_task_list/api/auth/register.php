<?php
if (!isset($_REQUEST["login"]) or !isset($_REQUEST["password"])) {
    http_response_code(400);
    exit("Missed some required arguments");
}

require("../db_connect.php");

$s = sprintf(
    "SELECT * FROM `users` WHERE `login` = '%s'",
    $_REQUEST["login"]
);
$res = mysqli_query($con, $s);

if ($res->num_rows > 0) {
    http_response_code(409);
    exit("Login already exist");
}

$s = sprintf(
    "INSERT INTO `users` (`login`, `password`) VALUES ('%s', '%s')",
    $_REQUEST["login"],
    $_REQUEST["password"]
);
mysqli_query($con, $s);

print("Ok");
