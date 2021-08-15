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
  

  if(!$saved_by || !$saved_user) {
    echo json_encode([
      'success' => false, 
      'error' => 'internal'
    ]);
  } else {
    //delete DB entry
    $delete_success = remove_follower($saved_user, $saved_by); 

    if($delete_success) { //pull followers again
      $followers = get_followers($saved_user); 
      if($followers) {
        echo json_encode(array(
          'success' => true, 
          'followers' => $followers, 
          'error' => ''
        ));
      } else {
        echo json_encode(array(
          'success' => false, 
          'error' => 'none'
        ));
      }
    } else {
      echo json_encode([
        'success' => false, 
        'error' => 'internal'
      ]);
    }
  }
}