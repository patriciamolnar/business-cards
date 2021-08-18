<?php 
require_once '../functions.php'; 

if(!request_is_post()) {
  echo json_encode([
    'success' => false, 
    'error' => 'Received request has incorrect format.'
  ]);
  exit(); 
} else if(isset($_FILES['file']['name']) && isset($_POST['id'])) {
  $filename = $_FILES['file']['name'];
  $filetemp = $_FILES['file']['tmp_name'];
  $filetype = pathinfo($filename, PATHINFO_EXTENSION);
  $location = '../../uploads/';

  //check if filetype is allowed
  $allowed_types = array('jpg', 'png', 'jpeg');
  if(!in_array($filetype, $allowed_types, true)) {
    echo json_encode(array(
      'success' => false, 
      'error' => 'type'
    ));
    exit();
  } 

  //check if size exceeds 2MB
  if($_FILES['file']['size'] > 2000000 || $_FILES['file']['size'] === 0) {
    echo json_encode(array(
      'success' => false, 
      'error' => 'size'
    ));
    exit();
  }  

  // check if file contains php 
  if(file_contains_php($filetemp)) {
    echo json_encode(array(
      'success' => false, 
      'error' => 'generic'
    ));
    exit();
  }

  //upload image and add to DB
  $userid = $_POST['id'];
  $uniquename = round(microtime(true)) . '-' . $filename;

  if(move_uploaded_file($_FILES['file']['tmp_name'], $location.$uniquename)) {
    //check if user already has a row in image table
    $has_image = has_image($userid); 
    if($has_image) {
      $update_success = update_image($userid, $uniquename); 
      if($update_success) {
        //delete prev image 
        unlink('C:\wamp64\www\BZcards\dist\uploads/' . $has_image['image']);
        echo json_encode(array(
          'success' => true, 
          'url' => $uniquename
        ));
      } else { //couldn't save img name in DB
        echo json_encode(array(
          'success' => false, 
          'url' => 'generic'
        ));
      }

    } else {
      $save_success = add_image($userid, $uniquename); 

      if($save_success) {
        echo json_encode(array(
          'success' => true, 
          'url' => $uniquename
        ));
      } else { //couldn't save img name in DB
        echo json_encode(array(
          'success' => false, 
          'url' => 'generic'
        ));
      }
    }
    
  } else { //couldn't upload image to server
    echo json_encode(array(
      'success' => false, 
      'error' => 'generic'
    ));
  }
} else { //no image uploaded 
  echo json_encode(array(
    'success' => false, 
    'error' => 'noimage'
  ));
}