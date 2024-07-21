<?php
include "../../database/conexion.php"; // Asegúrate de que la ruta a conexion.php sea correcta

$id = $_POST['id'];

$query = 'DELETE FROM profesor WHERE id = :id';

try {
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    
    if ($stmt->execute()) {
        echo "Eliminación exitosa";
    } else {
        echo "Error al eliminar el registro";
    }
} catch (PDOException $e) {
    echo "Hubo un error: " . $e->getMessage();
}
?>


