<?php
include "../../database/conexion.php"; 
$disponibilidad_i = $_POST['disponibilidad_i'];
$disponibilidad_f = $_POST['disponibilidad_f'];
$dia = $_POST['dia'];
$id_p = $_POST['id_p'];
$tiempo = $_POST['tiempo'];


$query = 'INSERT INTO registro (disponibilidad_i,disponibilidad_f,dia,id_p,tiempo) VALUES (:disponibilidad_i,:disponibilidad_f,:dia,:id_p,:tiempo)';

try {
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':disponibilidad_i', $disponibilidad_i, PDO::PARAM_STR);
    $stmt->bindParam(':disponibilidad_f', $disponibilidad_f, PDO::PARAM_STR);
    $stmt->bindParam(':dia', $dia, PDO::PARAM_STR);
    $stmt->bindParam(':tiempo', $tiempo, PDO::PARAM_STR);
    $stmt->bindParam(':id_p', $id_p, PDO::PARAM_STR);
  
    if ($stmt->execute()) {
        echo "Ingreso exitoso";
    } else {
        echo "Error al ingresar el registro";
    }
} catch (PDOException $e) {
    echo "Hubo un error: " . $e->getMessage();
}


?>