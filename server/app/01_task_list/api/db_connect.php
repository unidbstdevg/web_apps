<?php
$host="localhost";
$user="root";
$pass="";
$db="01_task_list";

$con = mysqli_connect($host, $user, $pass) or die("no sql connection");
mysqli_select_db($con, $db);
?>
