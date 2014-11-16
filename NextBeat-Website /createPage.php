<?php
$eURL = $_POST['eURL'];
$fileName = $eURL.'.html';
$eName = $_POST['eName'];
$myfile = fopen($fileName, 'w') or die('Unable to open file!');
$txt = "

<!DOCTYPE HTML>

<html>

<head>

	<title>".$eName."</title>
	<!-- place holder favicon -->
	<link rel='icon' type='image/png' href='favicon.png'>
	<script src='http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js'></script>
	<script src='//code.jquery.com/ui/1.11.0/jquery-ui.js'></script>
	<link href='http://fonts.googleapis.com/css?family=Raleway' rel='stylesheet' type='text/css'>
	<link rel='stylesheet' type='text/css' href='css/eventstyle.css'>
	<script type='text/javascript' src='js/eventjs.js'></script>
	<script type='text/javascript' src='http://www.parsecdn.com/js/parse-1.3.1.min.js'></script>
	<link href='//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css' rel='stylesheet'>
	<link href='http://fonts.googleapis.com/css?family=Lobster' rel='stylesheet' type='text/css'>
	<link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
	<script type='text/javascript' src='http://l2.io/ip.js?var=userIP'></script>
	<script>
		eventName = '".$eURL."';
	</script>
</head>

<body>
	

	<div id='menu'>
		<span id='menuLogo'>NextBeat</span>
		<span id='new'>New</span>
		<span id='hot'>Hot</span>

		<span id='instructions'>Request a song</span>
		<span id='write'><i class='fa fa-pencil-square-o'></i></span>
	</div>
	<div id='eventName'>".$eName."
	<div id='nothingYet' style='display:none'>Nothing here yet... Request a song using the top right icon!</div>
	</div>

	<div id='overlay'></div>
	<div id='modalCompose'>

		<form id='form1' method='post'>
			<!--need to supply post id with hidden field-->
			<textarea type='text' id='songName' maxlength='75' autocomplete='off' placeholder='Request a song *' required></textarea>
			<input id='artistName' placeholder='Artist' maxlength='30' autocomplete='off'>

			<input type='submit' value='Submit' id='submitButton'>

		</form>


	</div>

</div>

<div class='allPosts'>
	<!--posts will be appended here from database-->




</body>

</html>

";
fwrite($myfile, $txt);
fclose($myfile);
?>