<?php
include("../../database/conexion.php");

$id = $_POST['id'];
$nombre = $_POST['nombre'];

try {
    $query = "UPDATE horarios_creados SET nombre = :nombre WHERE id = :id";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(":nombre", $nombre, PDO::PARAM_STR);
    $stmt->bindParam(":id", $id, PDO::PARAM_INT);
    $stmt->execute();
    echo 'Horario actualizado';
} catch (Exception $e) {
    echo 'Error al actualizar horario: ' . $e->getMessage();
}
?>
