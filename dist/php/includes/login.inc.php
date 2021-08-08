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

  $email = $dataArr['email'] ?? null; 
  $password = $dataArr['password'] ?? null; 

  //check if both fields filled out
  if(empty(trim($email)) || empty($password)) {
    echo json_encode([
      'success' => false, 
      'errors' => 'blank'
    ]);

    exit(); 
  }

  //check if there is a user with email
  $user = get_userdata($email);
  if(!$user) {
    echo json_encode([
      'success' => false, 
      'errors' => 'incorrect'
    ]);

    exit(); 
  } 

  //verify password correct
  $password_check = password_verify($password, $user['password']);
  if(!$password_check) {
    echo json_encode([
      'success' => false, 
      'errors' => 'incorrect'
    ]);
    exit();
  } else {  //return user data to frontend
    echo json_encode([
      'success' => true, 
      'errors' => '',
      'user' => array(
        'id' => $user['id'], 
        'firstname' => $user['firstname'],
        'lastname' => $user['lastname'],
        'email' => $user['email'], 
        'jobtitle' => $user['jobtitle'], 
        'description' => $user['description'],
        'sector' => $user['sector'],
        'office' => $user['office'],
        'mobile' => $user['mobile'],
        'website' => $user['website'],
        'twitter' => $user['twitter'],
        'instagram' => $user['instagram'],
        'facebook' => $user['facebook']
      )
    ]);
  }
}