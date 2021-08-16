<?php 
require_once '../functions.php'; 

if(isset($_GET['search'])) {
  $email = trim($_GET['search']);
  $user = search_user('email', $email);
  if($user) {
    echo json_encode(array(
      'success' => true, 
      'error' => '',
      'user' => $user
    ));
  } else { //no user found
    echo json_encode(array(
      'success' => false,
      'error' => 'nouser'
    ));
  }
} else { //search term missing
    echo json_encode(array(
      'success' => false, 
      'error' => 'search'
    ));
}

