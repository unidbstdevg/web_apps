<?php
require("../constants.php");

session_start();
if (!isset($_SESSION["user_id"])) {
    http_response_code(403);
    exit("Not authorized");
}

if (!isset($_REQUEST["task_id"]) || !isset($_REQUEST["new_task_name"])) {
    http_response_code(400);
    exit("Missed some required arguments");
}
if (strlen($_REQUEST["new_task_name"]) > $TASK_NAME_LEN_LIMIT) {
    http_response_code(413);
    exit("Task name too long");
}

require("../db_connect.php");

$s = $con->prepare("UPDATE tasks SET name = ? WHERE id = ? AND user_id = ?");
$s->bind_param(
    "sdd",
    $_REQUEST["new_task_name"],
    $_REQUEST["task_id"],
    $_SESSION["user_id"]
);
if (!$s->execute()) {
    http_response_code(500);
    exit("sql error");
}

print("Ok");
