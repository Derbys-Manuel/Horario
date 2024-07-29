<?php
include("../../database/conexion.php");

$id_p = $_POST['id_p'];

try {
    $sql = "SELECT * FROM examenes WHERE id_p = :id_p";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id_p', $id_p, PDO::PARAM_INT);
    $stmt->execute();

    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
} catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
