<?php
include("../../database/conexion.php");

$id = $_POST['id'];
$nombre_p = $_POST['nombre'];
$curso = $_POST['curso'];

$query = 'UPDATE profesor SET nombre_p = :nombre, curso = :curso WHERE id = :id';

try {
    $result = $conn->prepare($query);
    $result->bindParam(":id", $id, PDO::PARAM_INT);
    $result->bindParam(":nombre", $nombre_p, PDO::PARAM_STR);
    $result->bindParam(":curso", $curso, PDO::PARAM_STR);
    $finish = $result->execute();
    echo "Registro actualizado exitosamente";
} catch (Exception $e) {
    echo "Hubo un error";
}
?>

