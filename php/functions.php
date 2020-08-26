<?php

function cleanString($string)
{
  $string = trim($string);
  $string = stripslashes($string);
  $string = htmlspecialchars($string);
  $string = filter_var($string, FILTER_SANITIZE_STRING);
  return $string;
}

function cleanEmail($email)
{
  $email = trim($email);
  $email = filter_var($email, FILTER_SANITIZE_EMAIL);

  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    return false;
  }

  return $email;
}
