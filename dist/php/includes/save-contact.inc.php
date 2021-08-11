<?php 
require_once '../functions.php'; 

if(!request_is_post()) {
  echo json_encode([
    'success' => false, 
    'error' => 'Received request has incorrect format.'
  ]);
  exit(); 
} else {
  $postJSON = file_get_contents("php://input");
  $dataArr = json_decode($postJSON, TRUE);
  $saved_user = isset($dataArr['saved_user']) ? trim($dataArr['saved_user']) : null; 
  $saved_by = isset($dataArr['saved_by']) ? trim($dataArr['saved_by']) : null; 
  

  if(!$saved_by) {
    echo json_encode([
      'success' => false, 
      'error' => 'userid'
    ]);
  }

  $success = save_contact($saved_user, $saved_by); 
  if($success) {
    echo json_encode([
      'success' => true, 
      'message' => 'saved',
      'error' => ''
    ]);
  } else {
    echo json_encode([
      'success' => false, 
      'error' => 'sql'
    ]);
  }
}