<?php
include ("../../database/conexion.php");


$query = "select * from registro_generado ";
$result = $conn->query($query);

if(!$result){
    die ('Hubo un error');
}
else {
    $registro = $result -> fetchAll(PDO::FETCH_ASSOC);

    $query2 = "select * from horarios_creados";
    $result2 = $conn->query($query2);
    $horario = $result2->fetchAll(PDO::FETCH_ASSOC);


    
    $json_string = json_encode($row);
    echo $json_string;
}
