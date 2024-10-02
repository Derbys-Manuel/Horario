<?php
include("../../database/conexion.php");

$id_r = $_POST['id_r'];
$marca = $_POST['marca'];


$query = 'UPDATE registro SET marca = :marca  WHERE id_r = :id_r';

try {
    $result = $conn->prepare($query);

    $result->bindParam(":id_r", $id_r, PDO::PARAM_STR);
    $result->bindParam(":marca", $marca, PDO::PARAM_STR);

    $finish = $result->execute();
    echo "Registro actualizado exitosamente";
} catch (Exception $e) {
    echo "Hubo un error";
}
?>