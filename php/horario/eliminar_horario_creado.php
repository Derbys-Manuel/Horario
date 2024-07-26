<?php
include("../../database/conexion.php");

$id = $_POST['id'];

try {
    $query = "DELETE FROM horarios_creados WHERE id = :id";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(":id", $id, PDO::PARAM_INT);
    $stmt->execute();
    echo 'Horario eliminado';
} catch (Exception $e) {
    echo 'Error al eliminar horario: ' . $e->getMessage();
}
?>
