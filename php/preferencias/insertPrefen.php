<?php
include "../../database/conexion.php"; 

$id_p = $_POST['id_p'];
$id_r = $_POST['id_r'];
$id_h = $_POST['id_h'];
$direccion = $_POST['direccion'];
$numerico = $_POST['numerico'];
$nombre = $_POST['nombre'];
$turno = $_POST['turno'];

$query = 'INSERT INTO horario.preferencias ( id_r,  id_p, id_h, direccion, numerico, nombre, turno) VALUES ( :id_r, :id_p, :id_h, :direccion, :numerico, :nombre, :turno)';

try {
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':id_p', $id_p, PDO::PARAM_INT);
    $stmt->bindParam(':id_r', $id_r, PDO::PARAM_STR);
    $stmt->bindParam(':id_h', $id_h, PDO::PARAM_STR);
    $stmt->bindParam(':direccion', $direccion, PDO::PARAM_STR);
    $stmt->bindParam(':numerico', $numerico, PDO::PARAM_STR);
    $stmt->bindParam(':nombre', $nombre, PDO::PARAM_STR);
    $stmt->bindParam(':turno', $turno, PDO::PARAM_STR);
  
    if ($stmt->execute()) {
        echo "Ingreso exitoso";
    } else {
        echo "Error al ingresar el registro";
    }
} catch (PDOException $e) {
    echo "Hubo un error: " . $e->getMessage();
}


?>