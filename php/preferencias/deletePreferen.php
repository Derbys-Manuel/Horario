<?php
include "../../database/conexion.php"; // Asegúrate de que la ruta a conexion.php sea correcta

$id_r = $_POST['id_r'];
$query = 'DELETE FROM preferencias WHERE id_r = :id_r';

try {
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':id_r', $id_r, PDO::PARAM_STR);
    
    if ($stmt->execute()) {
        echo "Eliminación exitosa";
    } else {
        echo "Error al eliminar el registro";
    }
} catch (PDOException $e) {
    echo "Hubo un error: " . $e->getMessage();
}
?>