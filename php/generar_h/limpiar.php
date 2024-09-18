<?php
include ("../../database/conexion.php");

$query = "select * from registro";
$result = $conn->prepare($query);
$result->execute();
if(!$result){
    die ('Hubo un error');
}
else {
    $row = $result -> fetchAll(PDO::FETCH_ASSOC);
    $json_string = json_encode($row);
    echo $json_string;
}
