<?php
include "../../database/conexion.php"; 
$id_h = $_POST['id_h'];
$color = $_POST['color'];
$direccion = $_POST['direccion'];
$numerico = $_POST['numerico'];



$query = 'INSERT INTO color (id_h , color,direccion, numerico) VALUES (:id_h,:color, :direccion, :numerico)';

try {
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':id_h', $id_h, PDO::PARAM_INT);
    $stmt->bindParam(':color', $color, PDO::PARAM_STR);
    
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