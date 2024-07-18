<?php
include "../database/conexion.php";
$nombre_p = $_POST['nombre'];
$curso = $_POST['curso'];

$query = 'INSERT  INTO profesor (nombre_p,curso) VALUES (:nombre,:curso)';

try 
{
    $result = $conn->prepare($query);
    $result -> bindParam(":nombre",$nombre_p, PDO::PARAM_STR );
    $result -> bindParam(":curso",$curso, PDO::PARAM_STR );
    $finish = $result->execute();
    echo "Ingreso exitoso";

}catch (Exception $e)
{
    echo "Hubo un error";
}



?>