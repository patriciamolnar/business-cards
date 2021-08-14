<?php  
require_once '../functions.php'; 

if(isset($_GET['id'])) {
  $userid = trim($_GET['id']); 
  
  //get all contacts
  $followers = get_contacts('saved_user', $userid); 
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
  echo json_encode(array(
    'success' => false, 
    'error' => 'internal'
  )); 
}