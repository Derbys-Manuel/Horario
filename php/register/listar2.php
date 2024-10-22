<?php
include ("../../database/conexion.php");

$query = "select * from registro";
$result = $conn->query($query);
if (!$result) {
    die('Hubo un error');
} else {
    $registro = $result->fetchAll(PDO::FETCH_ASSOC);

    $query5 = "SELECT h.id AS id_h, COUNT(r.id_p) AS total_registros
            FROM horarios_creados h
            LEFT JOIN profesor p ON h.id = p.id_h
            LEFT JOIN registro r ON p.id = r.id_p
            GROUP BY h.id
            ORDER BY h.id;
                ";
    $result5 = $conn->query($query5);
    $horario_no = $result5->fetchAll(PDO::FETCH_ASSOC);





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
    $query4 = "SELECT p.id, p.nombre_p, p.numerico, p.id_h, p.turno
            FROM profesor p
            WHERE NOT EXISTS (
                SELECT 1
                FROM registro r
                WHERE r.id_p = p.id 
            ) order by numerico;";
    $result4 = $conn->query($query4);
    $id_sin = $result4->fetchAll(PDO::FETCH_ASSOC);

   // ... Tu código anterior permanece igual hasta el momento de la inserción

for ($i = 0; $i < count($id_sin); $i++) {
    for ($j = 0; $j < count($horario_no); $j++) {
        if ((int)$horario_no[$j]['total_registros'] === 0 && (int)$horario_no[$j]['id_h'] === (int)$id_sin[$i]['id_h']) {
            // Filtrar registros arr donde numerico y turno coincidan con id_sin
            foreach ($registros_arr as $registro) {
                if ((int)$id_sin[$i]['numerico'] === (int)$registro['numerico'] && $id_sin[$i]['turno'] === $registro['turno']) {
                    $id_p = $id_sin[$i]['id'];
                    $disponibilidad_i = $registro['disponibilidad_i'];
                    $disponibilidad_f = $registro['disponibilidad_f'];
                    $dia = $registro['dia'];
                    $tiempo = $registro['tiempo'];
                    $direccion = $registro['direccion'];
                    $turno = $registro['turno']; // Esto es importante, ya que necesitas el turno del registro
                    $numerico = $registro['numerico'];

                    // Preparar la consulta de inserción
                    $query = 'INSERT INTO registro (disponibilidad_i, disponibilidad_f, dia, id_p, tiempo, direccion, turno, numerico) VALUES (:disponibilidad_i, :disponibilidad_f, :dia, :id_p, :tiempo, :direccion, :turno, :numerico)';
                    
                    try {
                        $stmt = $conn->prepare($query);
                        $stmt->bindParam(':disponibilidad_i', $disponibilidad_i, PDO::PARAM_STR);
                        $stmt->bindParam(':disponibilidad_f', $disponibilidad_f, PDO::PARAM_STR);
                        $stmt->bindParam(':dia', $dia, PDO::PARAM_STR);
                        $stmt->bindParam(':tiempo', $tiempo, PDO::PARAM_STR);
                        $stmt->bindParam(':id_p', $id_p, PDO::PARAM_STR);
                        $stmt->bindParam(':direccion', $direccion, PDO::PARAM_STR);
                        $stmt->bindParam(':turno', $turno, PDO::PARAM_STR);
                        $stmt->bindParam(':numerico', $numerico, PDO::PARAM_INT);
                        
                        if ($stmt->execute()) {
                            echo "Ingreso exitoso para el profesor ID: $id_p, Numerico: $numerico, Turno: $turno<br>";
                        } else {
                            echo "Error al ingresar el registro para el profesor ID: $id_p, Numerico: $numerico, Turno: $turno<br>";
                        }
                    } catch (PDOException $e) {
                        echo "Hubo un error: " . $e->getMessage();
                    }
                }
            }
        }
    }
}
}


