<?php
include ("../../database/conexion.php");
$query = "SELECT numerico FROM horario.profesor order by numerico desc";
$result = $conn->query($query);
if(!$result){
    die ('Hubo un error');
}
else {
    $row = $result -> fetchAll(PDO::FETCH_ASSOC);
    $json_string = json_encode($row);
    echo $json_string;
}

