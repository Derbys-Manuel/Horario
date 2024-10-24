<?php
include ("../../database/conexion.php");


$query = "select * from registro_generado ";
$result = $conn->query($query);

if(!$result){
    die ('Hubo un error');
}
else {
    $row = $result -> fetchAll(PDO::FETCH_ASSOC);


    
    $json_string = json_encode($row);
    echo $json_string;
}
