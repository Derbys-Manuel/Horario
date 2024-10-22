<?php
include ("../../database/conexion.php");

$query = "select * from registro";
$result = $conn->query($query);
if (!$result) {
    die('Hubo un error');
} else {
    $registro = $result->fetchAll(PDO::FETCH_ASSOC);

    $query2 = "select * from horarios_creados";
    $result2 = $conn->query($query2);
    $horario = $result2->fetchAll(PDO::FETCH_ASSOC);

    $query3 = "select * from profesor";
    $result3 = $conn->query($query3);
    $profesor = $result3->fetchAll(PDO::FETCH_ASSOC);

    $registros_arr = [];
    for ($i = 0; $i < count($profesor); $i++) {
        // Cambiamos la forma de acceder a los valores
        if ($horario[0]['id'] == $profesor[$i]['id_h']) {
            for ($e = 0; $e < count($registro); $e++) {
                if ($registro[$e]['id_p'] === $profesor[$i]['id']) {
                    $registros_arr[] = $registro[$e];
                }
            }
        }
    }

    $json_string = json_encode($registros_arr);
    echo $json_string;
}


