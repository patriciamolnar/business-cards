<?php 

$postJSON = file_get_contents("php://input");
$dataArr = json_decode($postJSON, TRUE);

var_dump($dataArr);