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
function get_account_info($column, $table, $detail, $value) {
  require 'includes/connect.inc.php'; 
  $sql = 'SELECT ' . $column . ' 
          FROM ' . $table . '
          WHERE ' . $detail . ' = :value;';
  $stmt = $db->prepare($sql);
  $stmt->bindParam(':value', $value);
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

//get details from tables: users and details
function get_details($key, $value) {
  require 'includes/connect.inc.php'; 
  $sql = 'SELECT users.*, details.jobtitle,  details.description, details.sector, details.office, details.mobile, details.website, details.twitter, details.instagram, details.facebook 
          FROM users
          LEFT JOIN details ON users.id = details.uid
          WHERE users.' . $key . ' = :value;';
  $stmt = $db->prepare($sql);
  $stmt->bindParam(':value', $value);
  $stmt->execute();
  $row = $stmt->fetch(PDO::FETCH_ASSOC); 
  return $row;
}

function set_details($id, $jobtitle, $description, $sector, $office, $mobile, $website, $twitter, $instagram, $facebook) {
  require 'includes/connect.inc.php';
  $sql = 'INSERT INTO `details` (uid, jobtitle, description, sector, office, mobile, website, twitter, instagram, facebook)
          VALUES (:id, :jobtitle, :description, :sector, :office, :mobile, :website, :twitter, :instagram, :facebook);';
  $stmt = $db->prepare($sql);
  $values = array(':id' => $id,
                  ':jobtitle' => $jobtitle,
                  ':description' => $description,
                  ':sector' => $sector,
                  ':office' => $office,
                  ':mobile' => $mobile,
                  ':website' => $website,
                  ':twitter' => $twitter,
                  ':instagram' => $instagram,
                  ':facebook' => $facebook);
  return $stmt->execute($values);
}

function update_details($id, $jobtitle, $description, $sector, $office, $mobile, $website, $twitter, $instagram, $facebook) {
  require 'includes/connect.inc.php';
  $sql = 'UPDATE `details`
          SET `jobtitle` = :jobtitle, `description` = :description, sector = :sector, `office` = :office, `mobile` = :mobile, `website` = :website, `twitter` = :twitter, `instagram` = :instagram, `facebook` = :facebook
          WHERE `uid` = :id;';
  $stmt = $db->prepare($sql);
  $values = array('id' => $id,
                  ':jobtitle' => $jobtitle,
                  ':description' => $description,
                  ':sector' => $sector,
                  ':office' => $office,
                  ':mobile' => $mobile,
                  ':website' => $website,
                  ':twitter' => $twitter,
                  ':instagram' => $instagram,
                  ':facebook' => $facebook); 
  return $stmt->execute($values);
}

//search user from table: details 
function search_user($key, $value) {
  require 'includes/connect.inc.php';
  $sql = 'SELECT * FROM users
          WHERE ' . $key . ' = :value;'; 
  $stmt = $db->prepare($sql);
  $stmt->execute(array(':value' => $value));
  $row = $stmt->fetch(PDO::FETCH_ASSOC); 
  return $row;
}

//Save & Unsave Contacts

//check if user is already a saved contact
function check_if_saved($saved_user, $saved_by) {
  require 'includes/connect.inc.php';
  $sql = 'SELECT COUNT(*) as num
          FROM contacts 
          WHERE saved_user = :saved_user AND saved_by = :saved_by;'; 
  $stmt = $db->prepare($sql);
  $stmt->execute(array(
    ':saved_user' => $saved_user,
    ':saved_by' => $saved_by
  ));
  $row = $stmt->fetch(PDO::FETCH_ASSOC); 
  return $row['num'];
}

//save contact
function save_contact($saved_user, $saved_by) {
  require 'includes/connect.inc.php';
  $sql = 'INSERT INTO contacts (saved_user, saved_by)
          VALUES (:saved_user, :saved_by)'; 
  $stmt = $db->prepare($sql);
  return $stmt->execute(array(
    ':saved_user' => $saved_user, 
    ':saved_by' => $saved_by
  ));
}

//unsave_contact
function unsave_contact($saved_user, $saved_by) {
  require 'includes/connect.inc.php';
  $sql = 'DELETE FROM contacts
          WHERE saved_user = :saved_user AND saved_by = :saved_by LIMIT 1'; 
  $stmt = $db->prepare($sql);
  return $stmt->execute(array(
    ':saved_user' => $saved_user, 
    ':saved_by' => $saved_by
  ));
}

//get contact details
function get_contacts($userid) {
  require 'includes/connect.inc.php';
  $sql = 'SELECT users.firstname, users.lastname, users.id, details.jobtitle, details.sector
          FROM users
          LEFT JOIN details on details.uid = users.id
          LEFT JOIN contacts on contacts.saved_user = users.id
          WHERE contacts.saved_by = :userid; '; 
  $stmt = $db->prepare($sql);
  $stmt->execute(array(
    ':userid' => $userid
  ));
  $row = $stmt->fetchAll(PDO::FETCH_ASSOC); 
  return $row;
}

function get_followers($userid) {
  require 'includes/connect.inc.php';
  $sql = 'SELECT users.firstname, users.lastname, users.id, details.jobtitle, details.sector
          FROM users
          LEFT JOIN details on details.uid = users.id
          LEFT JOIN contacts on contacts.saved_by = users.id
          WHERE contacts.saved_user = :userid; '; 
  $stmt = $db->prepare($sql);
  $stmt->execute(array(
    ':userid' => $userid
  ));
  $row = $stmt->fetchAll(PDO::FETCH_ASSOC); 
  return $row;
}