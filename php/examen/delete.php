<?php
include("../../database/conexion.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $direccion = $_POST['direccion'];
    $id_h = $_POST['id_h'];

    $sql = "DELETE FROM examenes WHERE direccion = :direccion AND id_h = :id_h";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':direccion', $direccion);
    $stmt->bindParam(':id_h', $id_h);

    if ($stmt->execute()) {
        echo "Examen eliminado correctamente";
    } else {
        echo "Error al eliminar examen";
    }
}
?>
