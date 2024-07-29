<?php
include("../../database/conexion.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $direccion = $_POST['direccion'];
    $id_p = $_POST['id_p'];
    $turno = $_POST['turno'];

    $sql = "INSERT INTO examenes (direccion, id_p, turno) VALUES (:direccion, :id_p, :turno)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':direccion', $direccion);
    $stmt->bindParam(':id_p', $id_p);
    $stmt->bindParam(':turno', $turno);

    if ($stmt->execute()) {
        echo "Examen insertado correctamente";
    } else {
        echo "Error al insertar examen";
    }
}
?>
