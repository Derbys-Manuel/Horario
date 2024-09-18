<?php
include "../../database/conexion.php"; 
$id_p = $_POST['id_p'];
$id_h = $_POST['id_h'];

$query = "SELECT id_r, direccion, id_h FROM horario.registro where id_p = :id_p and id_h = :id_h";
$result = $conn->prepare($query);
$result->bindParam(":id_p", $id_p, PDO::PARAM_INT);
$result->bindParam(":id_h", $id_h, PDO::PARAM_INT);
$result->execute();
if(!$result){
    die ('Hubo un error');
}
else {
    $row = $result -> fetchAll(PDO::FETCH_ASSOC);
    $json_string = json_encode($row);
    echo $json_string;
}