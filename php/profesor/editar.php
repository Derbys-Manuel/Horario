<?php
include("../../database/conexion.php");

$id = $_POST['id'];
$nombre_p = $_POST['nombre'];
$curso = $_POST['curso'];
$numerico = $_POST['numerico'];

$query = 'UPDATE profesor SET nombre_p = :nombre, curso = :curso  WHERE numerico = :numerico';

try {
    $result = $conn->prepare($query);

    $result->bindParam(":nombre", $nombre_p, PDO::PARAM_STR);
    $result->bindParam(":curso", $curso, PDO::PARAM_STR);
    $result->bindParam(":numerico", $numerico, PDO::PARAM_INT);
    $finish = $result->execute();
    echo "Registro actualizado exitosamente";
} catch (Exception $e) {
    echo "Hubo un error";
}
?>

