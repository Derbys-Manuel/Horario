<?php
include("../../database/conexion.php");

$id_h = $_POST['id_h'];

try {
    $sql = "SELECT * FROM examenes WHERE id_h = :id_h";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id_h', $id_h, PDO::PARAM_INT);
    $stmt->execute();

    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
} catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
