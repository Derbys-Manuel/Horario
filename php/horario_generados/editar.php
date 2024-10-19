<?php
include("../../database/conexion.php");

$numerico = $_POST['numerico'];
$nombreHorario = $_POST['nombre_horario'];

$query = 'UPDATE horarios_generados SET nombre_horario = :nombreHorario  WHERE numerico = :numerico';

try {
    $result = $conn->prepare($query);

    $result->bindParam(":nombreHorario", $nombreHorario, PDO::PARAM_STR);
    $result->bindParam(":numerico", $numerico, PDO::PARAM_INT);
    $finish = $result->execute();
    echo "Registro actualizado exitosamente";
} catch (Exception $e) {
    echo "Hubo un error";
}
?>

