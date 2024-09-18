<?php
include "../../database/conexion.php"; // Asegúrate de que la ruta a conexion.php sea correcta

$direccion = $_POST['direccion'];
$id_p = $_POST['id_p'];
$query = 'DELETE FROM registro WHERE direccion = :direccion AND id_p = :id_p';

try {
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':direccion', $direccion, PDO::PARAM_STR);
    $stmt->bindParam(':id_p', $id_p, PDO::PARAM_STR);
    
    if ($stmt->execute()) {
        echo "Eliminación exitosa";
    } else {
        echo "Error al eliminar el registro";
    }
} catch (PDOException $e) {
    echo "Hubo un error: " . $e->getMessage();
}
?>