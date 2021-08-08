<?php 

// check if method is POST
function request_is_post() {
  return $_SERVER['REQUEST_METHOD'] === 'POST';
}

//data validation
function check_email($email) {
  return filter_var($email, FILTER_VALIDATE_EMAIL);
}

function check_password($password) {
  $uppercase = preg_match('/[A-Z]/', $password);
  $lowercase = preg_match('/[a-z]/', $password);
  $number    = preg_match('/[0-9]/', $password);
  $special_char = preg_match('/[\^.$%&*@#!]/', $password);

  return $uppercase && $lowercase && $number && $special_char && strlen($password) >= 8;
}

function check_string($input) {
  $regex = "/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u"; 
  return preg_match($regex, $input);
}

//check if user detail taken
function check_detail_taken($column, $value) {
  require 'includes/connect.inc.php'; 
  $sql = 'SELECT COUNT(*) as result 
          FROM users
          WHERE ' . $column . ' = :value;';
  $stmt = $db->prepare($sql);
  $stmt->bindParam(':value', $value);
  $stmt->execute();
  $row = $stmt->fetch(PDO::FETCH_ASSOC); 
  return $row['result']; 
}

//get details of user
function get_account_info($column, $detail, $value) {
  require 'includes/connect.inc.php'; 
  $sql = 'SELECT ' . $column . ' 
          FROM users
          WHERE ' . $detail . ' = :value;';
  $stmt = $db->prepare($sql);
  $stmt->bindParam(':value', $value);
  $stmt->execute();
  $row = $stmt->fetch(PDO::FETCH_ASSOC); 
  return $row; 
}

function get_userdata($email) {
  require 'includes/connect.inc.php'; 
  $sql = 'SELECT * FROM users
          LEFT JOIN details ON users.id = details.uid
          WHERE email = :email';
  $stmt = $db->prepare($sql);
  $stmt->bindParam(':email', $email);
  $stmt->execute();
  $row = $stmt->fetch(PDO::FETCH_ASSOC); 
  return $row;
}


// ACCOUNT 

//register user 
function register_user($firstname, $lastname, $email, $password) {
  require 'includes/connect.inc.php';
  $sql = 'INSERT INTO users (firstname, lastname, email, password)
          VALUES (:firstname, :lastname, :email, :password)';
  $stmt = $db->prepare($sql);
  $values = array(':firstname' => $firstname,
                  ':lastname' => $lastname,
                  ':email' => $email,
                  ':password' => password_hash($password, PASSWORD_DEFAULT));
  $stmt->execute($values);
  return $db->lastInsertId(); 
}