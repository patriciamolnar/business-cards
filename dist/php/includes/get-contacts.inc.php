<?php  
require_once '../functions.php'; 

if(isset($_GET['id'])) {
  $userid = trim($_GET['id']); 
  
  //get all contacts
  $contacts = get_contacts('saved_by', $userid); 
  if($contacts) {
    echo json_encode(array(
      'success' => true, 
      'contacts' => $contacts, 
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