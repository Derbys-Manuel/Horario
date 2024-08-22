<?php
include("../../database/conexion.php");

$nombre = $_POST['nombre'];

try {
    $query = "INSERT INTO horarios_creados (nombre) VALUES (:nombre)";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(":nombre", $nombre, PDO::PARAM_STR);
    $stmt->execute();
    echo 'Horario guardado';
} catch (Exception $e) {
    echo 'Error al guardar horario: ' . $e->getMessage();
}
?>
