<?php
include "../../database/conexion.php"; // Asegúrate de que la ruta a conexion.php sea correcta

$nombre_p = $_POST['nombre'];
$curso = $_POST['curso'];
$bloques = $_POST['bloques'];
$turno = $_POST['turno'];

$query = 'INSERT INTO profesor (nombre_p, curso, bloques, turno) VALUES (:nombre, :curso, :bloques, :turno)';

try {
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':nombre', $nombre_p, PDO::PARAM_STR);
    $stmt->bindParam(':curso', $curso, PDO::PARAM_STR);
    $stmt->bindParam(':bloques', $bloques, PDO::PARAM_STR);
    $stmt->bindParam(':turno', $turno, PDO::PARAM_STR);
    
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

