<?php
include("../../database/conexion.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $direccion = $_POST['direccion'];
    $id_h = $_POST['id_h'];
    $turno = $_POST['turno'];

    $sql = "INSERT INTO examenes (direccion, id_h, turno) VALUES (:direccion, :id_h, :turno)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':direccion', $direccion);
    $stmt->bindParam(':id_h', $id_h);
    $stmt->bindParam(':turno', $turno);

    if ($stmt->execute()) {
        echo "Examen insertado correctamente";
    } else {
        echo "Error al insertar examen";
    }
}
?>
