<?php
// Who you want to recieve the emails from the form.
$sendto = 'efteruddannelse@easv.dk';

// The subject you'll see in your inbox
$subject = 'En besked fra jeres dejlige elever';

// Message for the user when he/she doesn't fill in the form correctly.
$errormessage = 'Det ser ud til at du mangler noget information. Prøv igen';

//Message for the user when he/she fills in the form correctly.
$thanks = "Tak fordi du har sendt os en mail - vi vil vende tilbage til dig snarest.";

// Message for the bot when it fills in in at all.
$honeypot = "Get outta here, bot. Fack off m8";

// Various messages displayed when the fields are empty.
$emptyname =  'Indtast dit navn';
$emptyemail = 'Indtast din email adresse';
$emptymessage = 'Indtast en besked';

// Various messages displayed when the fields are incorrectly formatted.
$alertname =  'Entering your name using only the standard alphabet?';
$alertemail = 'Indtast din email i følgende format: <i>navn@domæne.dk</i>?';
$alertmessage = "Undgå at bruge parantes eller andre specielle tegn, som er 'escape characters'";

$alert = '';
$pass = 0;

function clean_var($variable) {
	$variable = strip_tags(stripslashes(trim(rtrim($variable))));
  return $variable;
}

if ( empty($_REQUEST['last']) ) {

  if ( empty($_REQUEST['name']) ) {
	$pass = 1;
	$alert .= "<li>" . $emptyname . "</li>";
	$alert .= "<script>jQuery(\"#name\").addClass(\"error\");</script>";
  } elseif ( ereg( "[][{}()*+?.\\^$|]", $_REQUEST['name'] ) ) {
	$pass = 1;
	$alert .= "<li>" . $alertname . "</li>";
  }
  if ( empty($_REQUEST['email']) ) {
	$pass = 1;
	$alert .= "<li>" . $emptyemail . "</li>";
	$alert .= "<script>jQuery(\"#email\").addClass(\"error\");</script>";
  } elseif ( !eregi("^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,3})$", $_REQUEST['email']) ) {
	$pass = 1;
	$alert .= "<li>" . $alertemail . "</li>";
  }
  if ( empty($_REQUEST['message']) ) {
	$pass = 1;
	$alert .= "<li>" . $emptymessage . "</li>";
	$alert .= "<script>jQuery(\"#message\").addClass(\"error\");</script>";
  } elseif ( ereg( "[][{}()*+\\^$|]", $_REQUEST['message'] ) ) {
	$pass = 1;
	$alert .= "<li>" . $alertmessage . "</li>";
  }

  if ( $pass==1 ) {

  echo "<script>$(\".message\").toggle();$(\".message\").toggle().hide(\"slow\").show(\"slow\"); </script>";
  echo "<script>$(\".alert\").addClass('alert-block alert-error').removeClass('alert-success'); </script>";
  echo $errormessage;
  echo $alert;

  } elseif (isset($_REQUEST['message'])) {

	$message = "From: " . clean_var($_REQUEST['name']) . "\n";
	$message .= "Email: " . clean_var($_REQUEST['email']) . "\n";
	$message .= "Message: \n" . clean_var($_REQUEST['message']);
	$header = 'From:'. clean_var($_REQUEST['email']);

	mail($sendto, $subject, $message, $header);
	echo "<script>$(\".message\").toggle();$(\".message\").toggle().hide(\"slow\").show(\"slow\");$('#contactForm')[0].reset();</script>";
	echo "<script>$(\".alert\").addClass('alert-block alert-success').removeClass('alert-error'); </script>";
	echo $thanks;
	echo "<script>jQuery(\"#name\").removeClass(\"error\");jQuery(\"#email\").removeClass(\"error\");jQuery(\"#message\").removeClass(\"error\");</script>";
	die();

	echo "<br/><br/>" . $message;

	}

} else {
  echo "<script>$(\".message\").toggle();$(\".message\").toggle().hide(\"slow\").show(\"slow\"); </script>";
  echo $honeypot;
}
?>