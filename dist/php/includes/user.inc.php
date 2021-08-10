<?php 

require_once '../functions.php'; 

if(isset($_GET['id'])) {
  $userid = trim($_GET['id']); 
  $user = get_details('id', $userid); 
  if($user) {
    echo json_encode(array(
      'success' => true, 
      'error' => '',
      'user' => array(
        'firstname' => $user['firstname'],
        'lastname' => $user['lastname'],
        'email' => $user['email'],
        'id' => $user['id'], 
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
