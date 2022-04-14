<?php
require("db_connect.php");

$s = $con->prepare("SELECT value FROM cells ORDER BY id");
if (!$s->execute()) {
    http_response_code(500);
    exit("sql error");
}

$res = $s->get_result();

$values = [];
while ($row = $res->fetch_assoc()) {
    $values[] = $row["value"];
}

print(json_encode($values));
