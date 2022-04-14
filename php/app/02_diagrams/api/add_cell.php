<?php
if (!isset($_REQUEST["cell_value"])) {
    http_response_code(400);
    exit("Missed some required arguments");
}
$cell_value = intval($_REQUEST["cell_value"]);
if ($cell_value <= 0) {
    http_response_code(400);
    exit("cell_value should be number greater than 0");
}
require("db_connect.php");

$s = $con->prepare("INSERT INTO cells (value) VALUES (?)");
$s->bind_param("d", $cell_value);
if (!$s->execute()) {
    http_response_code(500);
    exit("sql error");
}

print("Ok");
