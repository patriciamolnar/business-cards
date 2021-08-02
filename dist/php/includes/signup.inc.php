<?php 
require_once '../functions.php'; 

if(!request_is_post()) {
  echo json_encode([
    'success' => false, 
    'error' => 'Received request has incorrect format.'
  ]);
  exit(); 

} else {
  //get submitted user data 
  $postJSON = file_get_contents("php://input");
  $dataArr = json_decode($postJSON, TRUE);

  $firstname = $dataArr['firstname'] ?? null; 
  $lastname = $dataArr['lastname'] ?? null; 
  $email = $dataArr['email'] ?? null; 
  $password = $dataArr['password'] ?? null; 

  //valudate input 
  $errors = []; 

  if(empty(trim($firstname)) || !check_string($firstname)) {
    $errors[] = 'firstname';
  }

  if(empty(trim($lastname)) || !check_string($lastname)) {
    $errors[] = 'lastname';
  }

  if(empty(trim($email)) || !check_email($email)) {
    $errors[] = 'email';
  }

  if(empty($password) || !check_password($password)) {
    $errors[] = 'password';
  }

  //if error terminate registration 
  if(count($errors) > 0) {
    echo json_encode([
      'success' => false, 
      'errors' => $errors
    ]);
 
    exit(); 
  } 

  //check if user is already registered 
  $email_taken = check_detail_taken('email', $email);
  
  if($email_taken) {
    $errors[] = 'taken';
    echo json_encode([
      'success' => false, 
      'errors' => $errors
    ]);

    exit();
  }

  //register user
  $userid = register_user($firstname, $lastname, $email, $password);
   
  if($userid) {
    echo json_encode([
      'success' => true, 
      'errors' => $errors, 
      'id' => $userid
    ]);
  }
  
}


