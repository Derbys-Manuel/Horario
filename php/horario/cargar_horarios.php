<?php
include("../../database/conexion.php");

$horario_id = $_GET['horario_id'];
$periodo = $_GET['periodo'];

$query = "SELECT r.*, p.nombre_p, p.curso 
          FROM registro r 
          JOIN profesor p ON r.id_p = p.id 
          WHERE r.horario_id = :horario_id AND r.periodo = :periodo";
$stmt = $conn->prepare($query);
$stmt->bindParam(':horario_id', $horario_id, PDO::PARAM_INT);
$stmt->bindParam(':periodo', $periodo, PDO::PARAM_STR);
$stmt->execute();

$horarios = array();
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $horarios[] = $row;
}

echo json_encode($horarios);
?>
