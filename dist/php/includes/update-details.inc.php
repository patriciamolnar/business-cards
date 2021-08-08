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

  $id = $dataArr['id'] ?? null;
  $password = $dataArr['password'] ?? null; 
  
  //check if id / password is empty
  if(empty(trim($id)) || empty(trim($password))) { 
    echo json_encode([
      'success' => false, 
      'errors' => 'noid'
    ]);
    exit(); 
  }

  //check if password is correct.
  $user = get_account_info('*', 'users', 'id', $id);
  if(!$user) {
    echo json_encode([
      'success' => false, 
      'errors' => 'noid'
    ]);
    exit(); 
  } 

  //verify password 
  $password_check = password_verify($password, $user['password']);
  if(!$password_check) {
    echo json_encode([
      'success' => false, 
      'errors' => 'incorrect'
    ]);
    exit();
  } 

  //get input
  $jobtitle = isset($dataArr['details']['jobtitle']) ? trim($dataArr['details']['jobtitle']) : null;
  $description = isset($dataArr['details']['description']) ? trim($dataArr['details']['description']) : null;
  $sector = isset($dataArr['details']['sector']) ? trim($dataArr['details']['sector']) : null;
  $office = isset($dataArr['details']['office']) ? trim($dataArr['details']['office']) : null;
  $mobile = isset($dataArr['details']['mobile']) ? trim($dataArr['details']['mobile']) : null;
  $website = isset($dataArr['details']['website']) ? trim($dataArr['details']['website']) : null;
  $twitter = isset($dataArr['details']['twitter']) ? trim($dataArr['details']['twitter']) : null;
  $instagram = isset($dataArr['details']['instagram']) ? trim($dataArr['details']['instagram']) : null;
  $facebook = isset($dataArr['details']['facebook']) ? trim($dataArr['details']['facebook']) : null;

  //check if user already has a row in `details`
  $details = get_account_info('*', 'details', 'uid', $id); 

  if($details) { //update row
    $success = update_details($id, $jobtitle, $description, $sector, $office, $mobile, $website, $twitter, $instagram, $facebook);
    if($success) {
      echo json_encode([
        'success' => true, 
        'errors' => '', 
        'user' => array(
          'jobtitle' => $jobtitle, 
          'description' => $description,
          'sector' => $sector,
          'office' => $office,
          'mobile' => $mobile,
          'website' => $website,
          'twitter' => $twitter,
          'instagram' => $instagram,
          'facebook' => $facebook
        )
      ]);
    } else { //data was not successfully saved to DB
      echo json_encode([
        'success' => false, 
        'error' => 'unknown'
      ]);
    }
  } else { //create row
    $success = set_details($id, $jobtitle, $description, $sector, $office, $mobile, $website, $twitter, $instagram, $facebook);
    if($success) {
      echo json_encode([
        'success' => true, 
        'errors' => '', 
        'user' => array(
          'jobtitle' => $jobtitle, 
          'description' => $description,
          'sector' => $sector,
          'office' => $office,
          'mobile' => $mobile,
          'website' => $website,
          'twitter' => $twitter,
          'instagram' => $instagram,
          'facebook' => $facebook
        )
      ]);
    } else { //data was not successfully saved to DB
      echo json_encode([
        'success' => false, 
        'error' => 'unknown'
      ]);
    }
  }
}