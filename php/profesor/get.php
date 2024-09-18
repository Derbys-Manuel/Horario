<?php
include("../../database/conexion.php");

$id = $_GET['id'];

$query = 'SELECT * FROM profesor WHERE id = :id';

try {
    $result = $conn->prepare($query);
    $result->bindParam(":id", $id, PDO::PARAM_INT);
    $result->execute();
    $data = $result->fetch(PDO::FETCH_ASSOC);
    echo json_encode($data);
} catch (Exception $e) {
    echo json_encode(['error' => 'No se encontraron datos.']);
}
?>
