<?php
session_start();
if (!isset($_SESSION["user_id"])) {
    http_response_code(403);
    exit("Not authorized");
}

require("../db_connect.php");

$s = $con->prepare("SELECT id, name FROM tasks WHERE user_id = ? ORDER BY id DESC");
$s->bind_param("d", $_SESSION["user_id"]);
if (!$s->execute()) {
    http_response_code(500);
    exit("sql error");
}

$res = $s->get_result();

$tasks = $res->fetch_all(MYSQLI_ASSOC);
print(json_encode($tasks));
