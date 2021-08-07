<?php 
require_once '../functions.php'; 
require_once './connect.inc.php'; 

if(!request_is_post()) {
  echo json_encode([
    'success' => false, 
    'error' => 'Received request has incorrect format.'
  ]);
  exit(); 
} else {
  $postJSON = file_get_contents("php://input");
  $dataArr = json_decode($postJSON, TRUE); 

  $firstname = $dataArr['core']['firstname'] ?? null;
  $lastname = $dataArr['core']['lastname'] ?? null;
  $id = $dataArr['id'] ?? null; 
  $newEmail = $dataArr['core']['email'] ?? null; 
  $password = $dataArr['password'] ?? null; 

  //check if original email from localstorage was sent on
  if(empty(trim($id))) { 
    echo json_encode([
      'success' => false, 
      'errors' => 'noid'
    ]);
    exit(); 
  }

  //check if there is a user with email
  $user = get_account_info('*', 'id', $id);
  if(!$user) {
    echo json_encode([
      'success' => false, 
      'errors' => 'noid'
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
  } else { //update DB
    $q = array();
    if(!empty(trim($firstname))) {
      $q[] = "firstname = :firstname";
    }
    if(!empty(trim($lastname))) {
      $q[] = "lastname = :lastname";
    }
    if(!empty(trim($newEmail))) {
      $q[] = "email = :newEmail";
    }
    if(sizeof($q) > 0) { //check if we have any updates otherwise don't execute
        $sql = "UPDATE users SET " . implode(", ", $q) . " WHERE id= :id";
        $stmt = $db->prepare($sql);
        $stmt->bindParam(":id", $id);

        if(!empty(trim($firstname))) {
          $stmt->bindParam(":firstname", $firstname);
        }
        if(!empty(trim($lastname))) {
          $stmt->bindParam(":lastname", $lastname);
        }
        if(!empty(trim($newEmail))) {
          $stmt->bindParam(":newEmail", $newEmail);
        }

        $success = $stmt->execute();
        // echo json_encode($q);

        if($success) { //update success: return userdata to frontend for localstorage
          echo json_encode([
            'success' => true, 
            'errors' => '',
            'user' => array(
              'id' => $id, 
              'firstname' => $firstname ?? $user['firstname'],
              'lastname' => $lastname ?? $user['lastname'], 
              'email' => $newEmail ?? $user['email']
            )
          ]);
        } else { // return error
          echo json_encode([
            'success' => false, 
            'errors' => 'sql'
          ]); 
        }
    } else {
      echo json_encode([
        'success' => false, 
        'errors' => 'nochange'
      ]);
    }
  }
}