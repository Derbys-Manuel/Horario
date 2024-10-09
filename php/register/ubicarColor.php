<?php
include "../../database/conexion.php"; 
$numerico = $_POST['numerico'];
$query = "SELECT p.numerico,p.id, r.id_r, p.id_h, p.curso,p.bloques,r.direccion,r.turno from profesor p
    join  registro r on p.id = r.id_p having numerico = :numerico order by id";
$result = $conn->prepare($query);
$result->bindParam(":numerico", $numerico, PDO::PARAM_INT);
$result->execute();
if(!$result){
    die ('Hubo un error');
}
else {
    $row = $result -> fetchAll(PDO::FETCH_ASSOC);
    $json_string = json_encode($row);
    echo $json_string;
}