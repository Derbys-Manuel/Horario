<?php 
include("../../database/conexion.php");

$id_h = $_POST['id_h'];
$turno = $_POST['turno'];



try {
    $query = 'SELECT r.turno, p.id_h, r.id_p, count(r.id_r) as total_registros from profesor p
    join  registro r on p.id = r.id_p group by  r.turno, r.id_p  having id_h = :id_h and turno = :turno';

    $result = $conn->prepare($query);
    $result->bindParam(":id_h", $id_h, PDO::PARAM_STR);
    $result->bindParam(":turno", $turno, PDO::PARAM_STR);
    $result->execute();
    $data = $result->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($data);
} catch (Exception $e) {
    echo ('No se encontraron datos.');
}





?>