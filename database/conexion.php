<?php 

	$server = 'localhost:3306';
	$username = 'root';
	$password = '27508062';
	$database = 'horario';

	try{
		$conn = new PDO("mysql:host=$server;dbname=$database;",$username, $password);
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	} catch(PDOException $e){
		die('Conexión fallida: '.$e->getMessage());
	}
	
?>
