<?php
include("../../database/conexion.php");

$query = "SELECT * FROM horarios_creados";
$result = $conn->query($query);

$horarios = array();
while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
    $horarios[] = $row;
}

echo json_encode($horarios);
?>
