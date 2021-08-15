<?php 
require_once '../functions.php'; 

if(!request_is_post()) {
  echo json_encode([
    'success' => false, 
    'error' => 'Received request has incorrect format.'
  ]);
  exit(); 
} else if(isset($_FILES['file']['name'])) {
  $filename = $_FILES['file']['name'];
  $location = '../../uploads/';

  if(move_uploaded_file($_FILES['file']['tmp_name'], $location.$filename)) {
    echo json_encode(array(
      'success' => true, 
      'url' => $filename
    ));
  } else {
    echo json_encode(array(
      'success' => false, 
      'error' => 'image'
    ));
  }
} else {
  echo json_encode(array(
    'success' => false, 
    'error' => 'noimage'
  ));
}