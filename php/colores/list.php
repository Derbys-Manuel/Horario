<?php
include ("../../database/conexion.php");
$numerico = $_POST['numerico'];

$query = "SELECT * FROM horario.color where numerico = :numerico;";
$result = $conn->prepare($query);
$result->bindParam(':numerico', $numerico, PDO::PARAM_INT);
if(!$result->execute()){
    die ('Hubo un error');
}
else {
    $row = $result -> fetchAll(PDO::FETCH_ASSOC);
    $json_string = json_encode($row);
    echo $json_string;
}
