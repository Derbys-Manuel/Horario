<?php
include("../../database/conexion.php");

$id = $_POST['id'];

$bloques = $_POST['bloques'];


$query = 'UPDATE profesor SET  bloques = :bloques  WHERE id = :id';

try {
    $result = $conn->prepare($query);
    $result->bindParam(":id", $id, PDO::PARAM_INT);
    $result->bindParam(":bloques", $bloques, PDO::PARAM_STR);
    
    $finish = $result->execute();
    echo "Registro actualizado exitosamente";
} catch (Exception $e) {
    echo "Hubo un error";
}
?>