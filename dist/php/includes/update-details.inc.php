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
  $jobtitle = empty($dataArr['details']['jobtitle']) ? null: trim($dataArr['details']['jobtitle']);
  $description = empty($dataArr['details']['description']) ? null: trim($dataArr['details']['description']);
  $sector = empty($dataArr['details']['sector']) ? null: trim($dataArr['details']['sector']);
  $office = empty($dataArr['details']['office']) ? null: trim($dataArr['details']['office']);
  $mobile = empty($dataArr['details']['mobile']) ? null: trim($dataArr['details']['mobile']);
  $website = empty($dataArr['details']['website']) ? null: trim($dataArr['details']['website']);
  $twitter = empty($dataArr['details']['twitter']) ? null: trim($dataArr['details']['twitter']);
  $instagram = empty($dataArr['details']['instagram']) ? null: trim($dataArr['details']['instagram']);
  $facebook = empty($dataArr['details']['facebook']) ? null: trim($dataArr['details']['facebook']);

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
        'error' => 'unknown1'
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
        'error' => 'unknown2'
      ]);
    }
  }
}