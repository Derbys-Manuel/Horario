<?php
include ("../../database/conexion.php");

$turno = $_POST['turno'];
$numerico = $_POST['numerico'];

$query = "SELECT numerico, id_h, id, turno FROM horario.profesor where turno = :turno and numerico = :numerico order by id_h";
$result = $conn->prepare($query);
$result->bindParam(':turno', $turno, PDO::PARAM_STR);
$result->bindParam(':numerico', $numerico, PDO::PARAM_STR);
if(!$result->execute()){
    die ('Hubo un error');
}
else {
    $row = $result -> fetchAll(PDO::FETCH_ASSOC);
    $json_string = json_encode($row);
    echo $json_string;
}

