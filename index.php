<?php 
$date = getdate(); //CAPTURAR SEGUNDOS PARA REALIZAR UNA ACTUALIZACION DINAMICA DEL NAVEGADOR
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Horarios de la academia Elite</title>
    <link rel="stylesheet" href="assets/index.css?v=<?php $date['seconds'] ?>">
    <link rel="stylesheet" href="assets/style_css.css?v=<?php $date['seconds'] ?>">
</head>
<body>
    <div class="container">
        <h1>Horarios de la academia Elite</h1>
        <img src="assets/img/imagen-1.png" alt="Imagen de la academia Elite">
        <div class="botones-container">
            <div class="boton-wrapper" id="crear-horarios-wrapper">
                <a href='./views/crear_horarios.php?v=<?php echo $date['seconds'] ?>' class="button" id="crear-horarios-btn">Crear Horarios</a>
            </div>
            <div class="boton-wrapper" id="ver-profesores-wrapper">
                <a href='./views/Inicio.php?v=<?php echo $date['seconds'] ?>' class="button" id="registros-btn">Registros</a>
            </div>
            <div class="boton-wrapper" id="ver-wrapper">
                <a href='./views/horarios.php?v=<?php echo $date['seconds'] ?>' class="button" id="ver-btn">Ver Horarios</a>
            </div>
        </div>
    </div>
</body>
</html>
