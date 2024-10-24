<?php
include "../../database/conexion.php"; 


$id_r = $_POST['id_r'];
$id_p = $_POST['id_p'];
$id_h = $_POST['id_h'];
$direccion = $_POST['direccion'];
$turno = $_POST['turno'];
$numerico = $_POST['numerico'];

$query = 'INSERT INTO registro_generado (id_r,id_p,id_h,direccion,turno, numerico) VALUES (:id_r,:id_p,:id_h,:direccion,:turno, :numerico)';

try {
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':id_r', $id_r, PDO::PARAM_INT);
    $stmt->bindParam(':id_p', $id_p, PDO::PARAM_INT);
    $stmt->bindParam(':id_h', $id_h, PDO::PARAM_INT);
    $stmt->bindParam(':direccion', $direccion, PDO::PARAM_STR);
    $stmt->bindParam(':turno', $turno, PDO::PARAM_STR);
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