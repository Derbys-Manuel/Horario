<?php 
$date = getdate(); //CAPTURAR SEGUNDOS PARA REALIZAR UNA ACTUALIZACION DINAMICA DEL NAVEGADOR
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Horario Inteligente</title>
    <!-- Bootstrap CSS para estilos y diseño responsive -->
    <link rel="stylesheet" href="../assets/css/bootstrap.min.css?v=<?php echo $date['seconds'] ?>">
    <!-- Estilos personalizados -->
    <link rel="stylesheet" href="../assets/style_css.css?v=<?php echo $date['seconds'] ?>">
    <!-- Bootstrap Icons para íconos -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.8.1/font/bootstrap-icons.min.css?v=<?php echo $date['seconds'] ?>">
    <!-- DataTables CSS para tablas interactivas -->
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.21/css/jquery.dataTables.min.css?v=<?php echo $date['seconds'] ?>">
    <!-- Fuente Orbitron para estilos de texto -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap?v=<?php echo $date['seconds'] ?>">
    <!-- jQuery para manipulación del DOM y AJAX -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js?v=<?php echo $date['seconds'] ?>" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <!-- DataTables JS para funcionalidad de tablas -->
    <script src="https://cdn.datatables.net/1.10.21/js/jquery.dataTables.min.js?v=<?php echo $date['seconds'] ?>"></script>
</head>

<body>
    <!-- Incluir el modal desde un archivo separado -->
    <?php include "../views/modal.php" ?>
    
    <div class="container mt-5">
        <h1 id="titulo">Horario Inteligente</h1>
        
        <!-- Barra de herramientas con iconos -->
        <div class="toolbar">
            <div class="menu">
                <i id="toolbarIcon" class="bi bi-tools" style="font-size: 2rem;"></i>
            </div>
            <div id="toolbarContent" class="toolbar-content">
                <div class="btn-icon" id="btn2">
                    <i class="bi bi-plus-circle"></i>
                    <span class="tooltiptext">Añadir</span>
                </div>
                <div class="btn-icon" id="btnEdit">
                    <i class="bi bi-pencil"></i>
                    <span class="tooltiptext">Editar</span>
                </div>
                <div class="btn-icon" id="btn3">
                    <i class="bi bi-trash"></i>
                    <span class="tooltiptext">Eliminar</span>
                </div>               
                <!-- Nuevo botón Enviar a -->
                <div class="btn-icon" id="btnEnviar">
                    <i class="bi bi-envelope"></i>
                    <span class="tooltiptext">Enviar a</span>
                </div>
                <!-- Botón Cancelar oculto por defecto -->
                <div class="btn-icon" id="btnCancel" style="display:none;">
                    <i class="bi bi-x-circle"></i>
                    <span class="tooltiptext">Cancelar</span>
                </div>
            </div>
        </div>
       
        <!-- Opciones de filtro -->
        <div class="row justify-content-center mt-5">
            <div class="col-12">
                <div class="card">
                    <div class="row">
                    <div class="col-12 d-flex justify-content-center mt-4 ms-4">
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1">
                            <label class="form-check-label" for="inlineCheckbox1">AM</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2">
                            <label class="form-check-label" for="inlineCheckbox2">PM</label>
                        </div>
                        <!-- Agregar un span para mostrar el horario seleccionado -->
                        <span id="selectedHorarioText" class="ms-3" style="color: #4CAF50; font-weight: bold;"></span>
                        </div>

                    </div>

                    <!-- Tabla para mostrar los registros -->
                    <div class="card-body">
                        <table id="example" class="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Curso</th>
                                    <th id="toolsHeader">Herramientas</th>
                                </tr>
                            </thead>
                            <tbody id="lista">
                                <!-- Aquí se generarán dinámicamente las filas de la tabla -->
                            </tbody>
                        </table>
                    </div>
                </div>
                <!-- Botón Volver -->
                <div class="text-center mt-4">
                    <a href='../index.php?v=<?php echo $date['seconds'] ?>' class="btn btn-success" style="background-color: #4CAF50; border-color: #4CAF50;">Volver</a>
                </div>
               <div class="text-center mt-4">
                <button class="btn btn-success" id="btn_prueba">Horario</button>
               </div>
            </div>
        </div>
    </div>

    <!-- Modal para enviar a horario -->
    <div class="modal fade" id="enviarHorarioModal" tabindex="-1" aria-labelledby="enviarHorarioLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="enviarHorarioLabel">Enviar a Horario</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="enviarHorarioForm">
                        <div class="mb-3">
                            <label for="selectHorario" class="form-label">Seleccionar Horario</label>
                            <select id="selectHorario" class="form-select" required>
                                <!-- Opciones cargadas dinámicamente -->
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary">Aceptar</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal de alerta -->
    <div class="modal fade" id="alertModal" tabindex="-1" role="dialog" aria-labelledby="alertModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="alertModalLabel">Alerta</h5>
                </div>
                <div class="modal-body" id="alertModalBody">
                    <!-- Mensaje de alerta se colocará aquí -->
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Aceptar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal de confirmación de eliminación -->
    <div class="modal fade" id="confirmDeleteModal" tabindex="-1" role="dialog" aria-labelledby="confirmDeleteModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="confirmDeleteModalLabel">Confirmar Eliminación</h5>
                </div>
                <div class="modal-body" id="confirmDeleteModalBody">
                    ¿Estás seguro de que quieres eliminar este registro?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn" id="confirmDeleteBtn" style="background-color: #4CAF50; color: white;">Eliminar</button>


                </div>
            </div>
        </div>
    </div>

    <!-- Incluir archivos JavaScript de Bootstrap y el archivo js.js -->
    <script src="../assets/js/bootstrap.min.js?v=<?php echo $date['seconds'] ?>"></script>
    <script src="../assets/js.js?v=<?php echo $date['seconds'] ?>"></script>
</body>
</html>
