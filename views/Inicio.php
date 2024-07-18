<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Horario Inteligente</title>
    <!-- Bootstrap CSS para estilos y diseño responsive -->
    <link rel="stylesheet" href="../assets/css/bootstrap.min.css">
    <!-- Estilos personalizados -->
    <link rel="stylesheet" href="../assets/style_css.css">
    <!-- Bootstrap Icons para íconos -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.8.1/font/bootstrap-icons.min.css">
    <!-- DataTables CSS para tablas interactivas -->
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.21/css/jquery.dataTables.min.css">
    <!-- Fuente Orbitron para estilos de texto -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap">
    <!-- jQuery para manipulación del DOM y AJAX -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <!-- DataTables JS para funcionalidad de tablas -->
    <script src="https://cdn.datatables.net/1.10.21/js/jquery.dataTables.min.js"></script>
</head>
<body>
    <!-- Incluir el modal desde un archivo separado -->
    <?php include "../views/modal.php" ?>
    <?php include "../views/modal_h.php" ?>
    
    <div class="container mt-5">
        <h1 id="titulo">Horarios de la academia Elite</h1>
        
        <!-- Barra de herramientas con iconos -->
        <div class="toolbar">
            <div class="menu">
                <i id="toolbarIcon" class="bi bi-tools" style="font-size: 2rem;"></i>
            </div>
            <div id="toolbarContent" class="toolbar-content">
                <div class="btn-icon" id="btn2">
                    <i class="bi bi-plus-circle "></i>
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
                        <div class="col-12 d-flex mt-4 ms-4">
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
                                <label class="form-check-label" for="inlineRadio1">1</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
                                <label class="form-check-label" for="inlineRadio2">2</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" disabled>
                                <label class="form-check-label" for="inlineRadio3">3 (deshabilitado)</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1">
                                <label class="form-check-label" for="inlineCheckbox1">AM</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2">
                                <label class="form-check-label" for="inlineCheckbox2">PM</label>
                            </div>
                        </div>
                    </div>

                    <!-- Tabla para mostrar los registros -->
                    <div class="card-body">
                        <table class="table table-bordered text-center">
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
                    <button class="btn btn-secondary" onclick="history.back()">Volver</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Incluir archivos JavaScript de Bootstrap y el archivo js.js -->
    <script src="../assets/js/bootstrap.min.js"></script>
    <script src="../assets/js.js"></script>
</body>
</html>
