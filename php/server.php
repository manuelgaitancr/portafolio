<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'Exception.php';
require 'PHPMailer.php';
require 'SMTP.php';

// Funciones creadas por el administrador
require 'functions.php';

// Variable que almacena los puntos por cada campo llenado correctamente
$points = 0;

// Validación del campo nombre (1pts)
if ($_POST['name']) {
  $name = $_POST['name'];

  if (!empty($name)) {
    cleanString($name);
    $points += 1;
  } else {
    die();
  }
} else {
  die();
} // Fin validación campo nombre

// Validación del campo apellido (2pts)
if ($_POST['surname']) {
  $surname = $_POST['surname'];

  if (!empty($surname)) {
    cleanString($surname);
    $points += 1;
  } else {
    die();
  }
} else {
  die();
} // Fin validación campo apellido

// Validación del campo correo (3pts)
if ($_POST['email']) {
  $email = $_POST['email'];

  if (!empty($email)) {
    cleanEmail($email);
    $points += 1;
  } else {
    die();
  }
} else {
  die();
} // Fin validación campo correo

// Validación del campo mensaje (4pts)
if ($_POST['message']) {
  $message = $_POST['message'];

  if (!empty($message)) {
    cleanString($message);
    $points += 1;
  } else {
    die();
  }
} else {
  die();
} // Fin validación campo mensaje

// Validación del campo política (5pts)
if ($_POST['policy']) {
  $policy = $_POST['policy'];

  if (!empty($policy)) {
    cleanString($policy);
    $points += 1;
  } else {
    die();
  }
} else {
  die();
} // Fin validación campo política

//  Validación reCAPTCHA (6pts)
if ($_POST['token']) {
  $secret = '6LdKOfUUAAAAAC-XFFG4yJmosRNf3iHUyBEuopsO';
  $googleToken = $_POST['token'];
  $remoteIp = $_SERVER['REMOTE_ADDR'];

  $url = "https://www.google.com/recaptcha/api/siteverify?secret=$secret&response=$googleToken&remoteip=$remoteIp";

  $response = file_get_contents($url);
  $response =  json_decode($response);

  $response = (array) $response;

  if ($response['success'] && ($response['score'] && $response['score'] > 0.5)) {
    $points += 1;
  } else {
    die();
  }
} else {
  die();
} // Fin validación reCAPTCHA

// Validar segun puntos obtenidos
if ($points == 6) {
  // Instantiation and passing `true` enables exceptions
  $mail = new PHPMailer(true);

  try {
    //Server settings
    $mail->SMTPDebug = 0;                      // Enable verbose debug output
    $mail->isSMTP();                                            // Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = 'manuelgaitan.frontend@gmail.com';                     // SMTP username
    $mail->Password   = 'MrRider1984*+';                               // SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
    $mail->Port       = 587;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

    //Recipients
    $mail->setFrom('manuelgaitan.frontend@gmail.com', 'Sitio Web manuelgaitan.com');
    $mail->addAddress('me@manuelgaitan.com', 'Manuel Gaitán - Trabajo');     // Add a recipient
    $mail->addAddress('manuel_gaitan@outlook.com', 'Manuel Gaitán - Personal');               // Name is optional
    //$mail->addReplyTo('info@example.com', 'Information');
    //$mail->addCC('cc@example.com');
    //$mail->addBCC('bcc@example.com');

    // Attachments
    //$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
    //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

    // Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->CharSet = 'UTF-8';
    $mail->Subject = "Mensaje enviado desde manuelgaitan.com";
    $mail->Body    = "<body>
                      <header>
                        <div style='background: black;'>
                          <h1 style='text-align: center; color: white;'>manuelgaitan.com</h1>
                        </div>
                      </header>
                      <br/>
                      <hr/>
                      <main>
                        <label><b>Nombre Cliente:</b></label> <p>$name $surname</p>
                        <br/>
                        <label><b>Correo electrónico:</b></label> <p>$email</p>
                        <br/>
                        <label><b>Mensaje Cliente:</b></label> <p><i>$message</i></p>
                      </main>
                      <footer>
                        <div>
                          <h2 style='text-align: center; background: gray; color: white;'>
                            © 2020 Manuel Gaitán. Todos los derechos reservardos.
                          </h2>
                        <div>
                      <footer>
                    </body>";
    //$mail->AltBody = "";

    $mail->send();
    echo 'success';
  } catch (Exception $e) {
    echo "El mensaje no pudo ser enviado. Error de correo: {$mail->ErrorInfo}";
  }
} else {
  die();
}
