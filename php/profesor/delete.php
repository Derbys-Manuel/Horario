<?php
include "../../database/conexion.php"; // Asegúrate de que la ruta a conexion.php sea correcta

$numerico = $_POST['numerico'];

$query = 'DELETE FROM profesor WHERE numerico = :numerico';

try {
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':numerico', $numerico, PDO::PARAM_STR);
    
    if ($stmt->execute()) {
        echo "Eliminación exitosa";
    } else {
        echo "Error al eliminar el registro";
    }
} catch (PDOException $e) {
    echo "Hubo un error: " . $e->getMessage();
}
?>


