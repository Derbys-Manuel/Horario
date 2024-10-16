<?php
include "../../database/conexion.php"; 
$color = $_POST['color'];
$direccion = $_POST['direccion'];
$numerico = $_POST['numerico'];


$query = 'INSERT INTO color (color, direccion, numerico) VALUES (:color, :direccion, :numerico)';

try {
    $stmt = $conn->prepare($query);
  
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