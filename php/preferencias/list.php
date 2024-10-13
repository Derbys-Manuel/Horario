<?php
include ("../../database/conexion.php");

$turno = $_POST['turno'];
$id_h = $_POST['id_h'];

$query = "select * from preferencias WHERE id_h = :id_h AND turno = :turno ";
$result = $conn->prepare($query);
$result->bindParam(":turno", $turno, PDO::PARAM_STR);
$result->bindParam(":id_h", $id_h, PDO::PARAM_STR);
$result->execute();
if(!$result){
    die ('Hubo un error');
}
else {
    $row = $result -> fetchAll(PDO::FETCH_ASSOC);
    $json_string = json_encode($row);
    echo $json_string;
}
