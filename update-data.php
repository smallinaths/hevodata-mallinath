<?php
	//Action to perform
	$action = $_POST['act'];
	$user_prof = $_POST['user_prof'];

	if ($action == "new-card"){
		//Receive data from Ajax
		$cardimgurl = $_POST['imgurl'];
		$cardname= $_POST['cdname'];
		
		//Select Database
		$jsonString = file_get_contents('database.json');
		
		//Decode json
		$data = json_decode($jsonString, true);
		
		//Add data
		$data[$user_prof][] = ['img' => $cardimgurl, 'title' => $cardname];

		//array_push($tempArray, $data['user_prof']);
		//header('Content-Type: application/json');
		
		//Encode json and save to file
		file_put_contents('database.json', json_encode($data, JSON_PRETTY_PRINT));
		
		// Sending return message
		echo json_encode(array("message"=>'Successfuly Added'));
		
	}else if ($action == "delete-card"){
		
		//Select Database
		$jsonString = file_get_contents('database.json');

		//Receive data from Ajax
		$pos = $_POST['pos'];
		
		//Select Database
		$jsonString = file_get_contents('database.json');
		
		//Decode json
		$data = json_decode($jsonString, true);
		
		//Delete data
		//unset($data['user_prof'][$pos]);
		//$data['user_prof'].splice($pos, 1);
		array_splice($data[$user_prof], $pos, 1);
		//header('Content-Type: application/json');
		
		//Encode json and save to file
		file_put_contents('database.json', json_encode($data, JSON_PRETTY_PRINT));
		
		// Sending return message
		echo json_encode(array("message"=>"Card Deleted Successfuly"));
		//echo $pos;
	}else{
		
		// Sending return message
		echo json_encode(array("message"=>"Something Wrong"));
	}
?>