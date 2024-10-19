<?php
include "../../database/conexion.php"; 
$nombre_horario = $_POST['nombre_horario'];
$nombre_p = $_POST['nombre_p'];
$curso = $_POST['curso'];
$turno = $_POST['turno'];
$id_h = $_POST['id_h'];
$id_p = $_POST['id_p'];
$bloques = $_POST['bloques'];
$direccion = $_POST['direccion'];
$numerico = $_POST['numerico'];


$query = 'INSERT INTO horarios_generados (nombre_horario,nombre_p,curso,turno,id_h,id_p,bloques, direccion, numerico) VALUES (:nombre_horario,:nombre_p,:curso,:turno,:id_h,:id_p, :bloques, :direccion, :numerico)';

try {
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':nombre_horario', $nombre_horario, PDO::PARAM_STR);
    $stmt->bindParam(':nombre_p', $nombre_p, PDO::PARAM_STR);
    $stmt->bindParam(':curso', $curso, PDO::PARAM_STR);
    $stmt->bindParam(':turno', $turno, PDO::PARAM_STR);
    $stmt->bindParam(':id_h', $id_h, PDO::PARAM_INT);
    $stmt->bindParam(':id_p', $id_p, PDO::PARAM_INT);
    $stmt->bindParam(':bloques', $bloques, PDO::PARAM_STR);
    $stmt->bindParam(':direccion', $direccion, PDO::PARAM_STR);
    $stmt->bindParam(':numerico', $numerico, PDO::PARAM_INT);
  
    if ($stmt->execute()) {
        echo "Ingreso exitoso";
    } else {
        echo "Error al ingresar el registro";
    }
} catch (PDOException $e) {
    echo "Hubo un error: " . $e->getMessage();
}


?>