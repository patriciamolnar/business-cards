<?php 
require_once '../functions.php'; 

if(isset($_GET['saved_by']) && isset($_GET['saved_user'])) {
  $saved_by = $_GET['saved_by']; 
  $saved_user = $_GET['saved_user']; 

  $saved_already = check_if_saved($saved_user, $saved_by);

  if($saved_already !== '0') {
    echo json_encode(array('saved' => true));
  } else {
    echo json_encode(array('saved' => false));
  }
} else {
  echo json_encode(array('error' => 'internal'));
}