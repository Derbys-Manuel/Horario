<?php
include("../../database/conexion.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $direccion = $_POST['direccion'];
    $id_p = $_POST['id_p'];

    $sql = "DELETE FROM examenes WHERE direccion = :direccion AND id_p = :id_p";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':direccion', $direccion);
    $stmt->bindParam(':id_p', $id_p);

    if ($stmt->execute()) {
        echo "Examen eliminado correctamente";
    } else {
        echo "Error al eliminar examen";
    }
}
?>
