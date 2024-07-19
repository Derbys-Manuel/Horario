<?php
include("../database/conexion.php");

$dia = $_POST['dia'];
$disponibilidad_i = $_POST['disponibilidad_i'];

try {
    $query = "DELETE FROM registro WHERE dia=:dia AND disponibilidad_i=:disponibilidad_i";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(":dia", $dia, PDO::PARAM_STR);
    $stmt->bindParam(":disponibilidad_i", $disponibilidad_i, PDO::PARAM_STR);
    $stmt->execute();

    echo 'Horario eliminado';
} catch (Exception $e) {
    echo 'Error al eliminar horario: ' . $e->getMessage();
}
?>
