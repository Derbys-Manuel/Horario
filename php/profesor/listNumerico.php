<?php
include ("../../database/conexion.php");

$turno = $_POST['turno'];

$query = "SELECT numerico, id_h, id, turno FROM horario.profesor where turno = :turno order by numerico desc";
$result = $conn->prepare($query);
$result->bindParam(':turno', $turno, PDO::PARAM_STR);
if(!$result->execute()){
    die ('Hubo un error');
}
else {
    $row = $result -> fetchAll(PDO::FETCH_ASSOC);
    $json_string = json_encode($row);
    echo $json_string;
}

