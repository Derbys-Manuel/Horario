<?php 
include("../../database/conexion.php");

$turno = $_POST['turno'];
$id_h = $_POST['id_h'];



try {
    $query = 'SELECT p.id_h,p.id, r.id_r, p.nombre_p, p.curso,p.bloques,r.direccion,r.turno from profesor p
    join  registro r on p.id = r.id_p having id_h = :id_h and turno = :turno order by id';

    $result = $conn->prepare($query);
 
    $result->bindParam(":turno", $turno, PDO::PARAM_STR);
    $result->bindParam(":id_h", $id_h, PDO::PARAM_STR);
    $result->execute();
    $data = $result->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($data);
} catch (Exception $e) {
    echo ('No se encontraron datos.');
}





?>