<?php
include ("../../database/conexion.php");

$id_h = $_POST['id_h'];

$query = "select * from profesor where id_h = :id_h";
$result = $conn->prepare($query);
$result->bindParam(':id_h', $id_h, PDO::PARAM_STR);
if(!$result->execute()){
    die ('Hubo un error');
}
else {
    $row = $result -> fetchAll(PDO::FETCH_ASSOC);
    $json_string = json_encode($row);
    echo $json_string;
}
