<?php
include "../../database/conexion.php"; // Asegúrate de que la ruta a conexion.php sea correcta

$nombre_p = $_POST['nombre'];
$curso = $_POST['curso'];
$id_h = $_POST['id_h'];
$bloques = $_POST['bloques'];

$query = 'INSERT INTO profesor (nombre_p, curso, id_h, bloques) VALUES (:nombre, :curso, :id_h, :bloques)';

try {
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':nombre', $nombre_p, PDO::PARAM_STR);
    $stmt->bindParam(':curso', $curso, PDO::PARAM_STR);
    $stmt->bindParam(':id_h', $id_h, PDO::PARAM_STR);
    $stmt->bindParam(':bloques', $bloques, PDO::PARAM_STR);
    
    if ($stmt->execute()) {
        echo "Ingreso exitoso";
    } else {
        echo "Error al ingresar el registro";
    }
} catch (PDOException $e) {
    echo "Hubo un error: " . $e->getMessage();
}

// No es necesario cerrar la conexión explícitamente en PDO
?>

