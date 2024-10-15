<?php
include ("../../database/conexion.php");

$turno = $_POST['turno'];

$query = "select * from profesor where id_h = :id_h and turno = :turno";
$result = $conn->prepare($query);
$result->bindParam(':id_h', $id_h, PDO::PARAM_STR);
$result->bindParam(':turno', $turno, PDO::PARAM_STR);
if(!$result->execute()){
    die ('Hubo un error');
}
else {
    $row = $result -> fetchAll(PDO::FETCH_ASSOC);
    $json_string = json_encode($row);
    echo $json_string;
}
