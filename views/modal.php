<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Horario</title>
    <!-- Incluir bibliotecas -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx-style/0.8.16/xlsx-style.full.min.js"></script>
    <!-- Agregar estilos para Receso -->
    <style>
        /* Cambiar el diseño de la letra de "Receso" */
        #receso1, #receso2 {
            font-family: 'Courier New', Courier, monospace; /* Fuente tipo monoespaciada */
            font-size: 24px; /* Tamaño de letra grande */
            font-weight: bold; /* Negrita */
            color: #000000; /* Color negro */
            text-align: center; /* Centrado horizontal */
            padding: 20px 0; /* Espaciado arriba y abajo */
        }
    </style>
</head>
<body>
  <!-- MODAL DE INSERTAR/EDITAR PROFESOR -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Ingresar Registro</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form id="modal1">
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="nombre" class="form-label">Nombre</label>
                            <input type="text" class="form-control " id="nombre" name="nombre" required>
                        </div>
                        <div class="mb-3">
                            <label for="curso" class="form-label">Curso</label>
                            <input type="text" class="form-control" id="curso" name="curso" required>
                        </div>
                        <div class="mb-3">
                            <input type="hidden" id="turno_profesor">
                        </div>
                        <!-- Bloque Selector -->
                        <div class="mb-3" style="display: none;">
                            <label for="bloques" class="form-label">Bloques</label>
                            <div class="input-group">
                                <button class="btn btn-outline-secondary" type="button" id="decrease">-</button>
                                <input type="text" class="form-control text-center" id="bloques" name="bloques" value="1 Bloque" readonly>
                                <button class="btn btn-outline-secondary" type="button" id="increase">+</button>
                            </div>
                        </div>
                    </div>
                    <script>
                    // Variables para mantener el estado de los bloques
                    let bloque = 1;
                    const bloqueInput = document.getElementById('bloques');
        
                    // Función para actualizar el valor del input
                    function updateBloqueInput() {
                        bloqueInput.value = bloque;
                    }
                    
                                // Evento para incrementar el bloque
                    document.getElementById('increase').addEventListener('click', function() {
                        bloque += 1;
                        updateBloqueInput();
                    });

                    // Evento para decrementar el bloque
                    document.getElementById('decrease').addEventListener('click', function() {
                        if (bloque > 1) {
                            bloque -= 1;
                            updateBloqueInput();
                        }
                    });

                    // Reiniciar el valor del bloque cuando se cierra el modal
                    const modalElement = document.querySelector('.modal'); // Selecciona tu modal aquí
                    modalElement.addEventListener('hidden.bs.modal', function () {
                        bloque = 1; // Reiniciar el bloque a 1
                        updateBloqueInput(); // Actualizar el input
                    });

                    // Inicializar el valor del input
                    updateBloqueInput();
                </script>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" id="btn1" class="btn btn-primary">Añadir</button>
                        <button type="button" id="btnUpdate" class="btn btn-primary" style="display: none;">Actualizar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    

    <!-- MODAL HORARIO MAÑANA -->
    <div class="modal fade modal-xl" id="calendario" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header horario-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel1">HORARIO: <span id="nombre-horario-am"></span></h1> 
                    <div class=" d-flex position-absolute top-0 end-0 mx-3 ">
                        <button class="btn btn-outline-secondary decrease2 d-none" data-num="-1" type="button" >-</button>
                            <h1 class="modal-title fs-5 h1Bloques m-3 menu " id="staticBackdropLabel1">SELECCIÓN <span class="d-none"id="cantidadBloques"></span></h1>
                        <button class="btn btn-outline-secondary increase2 d-none" data-num="1" type="button" >+</button>
                        <div class="btn-icon2 mx-2 mt-3 menu" id="btnCancel5" style="display:none;">
                            <i class="bi bi-x-circle"></i>
                            <span class="tooltiptext">Cancelar</span>
                        </div>
                    </div>
                    <div class="d-flex align-items-center mt-2">
                        <label for="colorPickerAM" class="me-1 color01" style="font-size: 0.9rem;">color:</label>
                        <input type="color" id="colorPickerAM" class="form-control color02 form-control-color me-1" title="Elige un color" style="height: 30px; width: 30px; border: none; padding: 0;" value="#FFFFFF">
                        <i class="bi bi-check-lg text-light bg-success rounded p-1 px-2 mx-2 menu" id="checkAM" data-color="color"></i>
                        <div class="btn-icon2 mx-2 mt-2 menu" id="btnCancel3" style="display:none;">
                            <i class="bi bi-x-circle"></i>
                            <span class="tooltiptext">Cancelar</span>
                        </div>
                    </div>  
                    <div class="row">
                        <div class="col-5">
                            <button class="btn-001 btn btn-success menu mt-1">Editar</button>
                        </div>
                        <div class="col-7">
                            <div class="btn-icon2 mt-3 menu" id="btnCancel1" style="display:none;">
                                <i class="bi bi-x-circle"></i>
                                <span class="tooltiptext">Cancelar</span>
                            </div>
                        </div>
                    </div>
                    <label id="modoExamenLabel" class="switch" style="display: none;">
                        <input type="checkbox" id="modoExamen">
                        <span class="slider round">Modo Examen</span>
                    </label>
                </div>
            <div class="modal-body">
                    <div class="container-fluid">
                        <div class="table-responsive">
                            <table class="table text-center align-middle " id="table-horario-am">
                                <thead>
                                    <tr>
                                        <th scope="col">Hora</th>
                                        <th scope="col" id="lunes">Lunes</th>
                                        <th scope="col" id="martes">Martes</th>
                                        <th scope="col" id="miercoles">Miércoles</th>
                                        <th scope="col" id="jueves">Jueves</th>
                                        <th scope="col" id="viernes">Viernes</th>
                                        <th scope="col" id="sabado">Sábado</th>
                                        <th scope="col" id="domingo">Domingo</th>
                                    </tr>
                                </thead>
                                <tbody id="AM">
                                    <tr id="h8" value="AM">
                                        <th scope="row" class="p-3">8:00 - 8:50</th>
                                        <td id="lu8-AM" data-dia="Lunes"  data-valor="1" value="08:00-08:50" class="mañana menu AM"></td>
                                        <td id="ma8-AM" data-dia="Martes"  data-valor="1" value="08:00-08:50" class="mañana menu AM"></td>
                                        <td id="mi8-AM" data-dia="Miércoles"  data-valor="1" value="08:00-08:50" class="mañana menu AM"></td>
                                        <td id="ju8-AM" data-dia="Jueves"  data-valor="1" value="08:00-08:50" class="mañana menu AM"></td>
                                        <td id="vi8-AM" data-dia="Viernes"  data-valor="1" value="08:00-08:50" class="mañana menu AM"></td>
                                        <td id="sa8-AM" data-dia="Sábado"  data-valor="1" value="08:00-08:50" class="mañana menu AM"></td>
                                        <td id="do8-AM" data-dia="Domingo"  data-valor="1" value="08:00-08:50" class="mañana menu AM"></td>
                                    </tr>
                                    <tr id="h9" value="AM">
                                        <th scope="row" class="p-3">8:50 - 9:40</th>
                                        <td id="lu9-AM" data-dia="Lunes"  data-valor="1" value="08:50-09:40" class="mañana menu AM"></td>
                                        <td id="ma9-AM" data-dia="Martes"  data-valor="1" value="08:50-09:40" class="mañana menu AM" AM></td>
                                        <td id="mi9-AM" data-dia="Miércoles"  data-valor="1" value="08:50-09:40" class="mañana menu AM"></td>
                                        <td id="ju9-AM" data-dia="Jueves"  data-valor="1" value="08:50-09:40" class="mañana menu AM"></td>
                                        <td id="vi9-AM" data-dia="Viernes" data-valor="1"  value="08:50-09:40" class="mañana menu AM"></td>
                                        <td id="sa9-AM" data-dia="Sábado" data-valor="1"  value="08:50-09:40" class="mañana menu AM"></td>
                                        <td id="do9-AM" data-dia="Domingo"  data-valor="1" value="08:50-09:40" class="mañana menu AM"></td>
                                    </tr>
                                    <tr id="h10">
                                        <th scope="row" class="p-2">9:40 - 10:00</th>
                                        <td id="receso1" colspan="7"><h2>Receso</h2></td>
                                    </tr>
                                    <tr id="h11">
                                        <th scope="row" class="p-3">10:00 - 10:50</th>
                                        <td id="lu10-AM" data-dia="Lunes"  data-valor="1" value="10:00-10:50" class="mañana menu AM" rowspan=""></td>
                                        <td id="ma10-AM" data-dia="Martes"  data-valor="1" value="10:00-10:50" class="mañana menu AM" rowspan=""></td>
                                        <td id="mi10-AM" data-dia="Miércoles"  data-valor="1" value="10:00-10:50" class="mañana menu AM" rowspan=""></td>
                                        <td id="ju10-AM" data-dia="Jueves"  data-valor="1" value="10:00-10:50" class="mañana menu AM" rowspan=""></td>
                                        <td id="vi10-AM" data-dia="Viernes"  data-valor="1" value="10:00-10:50" class="mañana menu AM" rowspan=""></td>
                                        <td id="sa10-AM" data-dia="Sábado"  data-valor="1" value="10:00-10:50" class="mañana menu AM" rowspan=""></td>
                                        <td id="do10-AM" data-dia="Domingo"  data-valor="1" value="10:00-10:50" class="mañana menu AM" rowspan=""></td>
                                    </tr>
                                    <tr id="h12">
                                        <th scope="row" class="p-3">10:50 - 11:40</th>
                                        <td id="lu11-AM" data-dia="Lunes"  data-valor="1" value="10:50-11:40" class="mañana menu AM" rowspan=""></td>
                                        <td id="ma11-AM" data-dia="Martes"  data-valor="1" value="10:50-11:40" class="mañana menu AM" rowspan=""></td>
                                        <td id="mi11-AM" data-dia="Miércoles"  data-valor="1" value="10:50-11:40" class="mañana menu AM" rowspan=""></td>
                                        <td id="ju11-AM" data-dia="Jueves"  data-valor="1" value="10:50-11:40" class="mañana menu AM" rowspan=""></td>
                                        <td id="vi11-AM" data-dia="Viernes"  data-valor="1" value="10:50-11:40" class="mañana menu AM" rowspan=""></td>
                                        <td id="sa11-AM" data-dia="Sábado"  data-valor="1" value="10:50-11:40" class="mañana menu AM" rowspan=""></td>
                                        <td id="do11-AM" data-dia="Domingo"  data-valor="1" value="10:50-11:40" class="mañana menu AM" rowspan=""></td>
                                    </tr>
                                    <tr id="h13">
                                        <th scope="row" class="p-3">11:40 - 12:00</th>
                                        <td id="receso2" colspan="7"><h2>Receso</h2></td>
                                    </tr>
                                    <tr id="h14">
                                        <th scope="row" class="p-3">12:00 - 12:50</th>
                                        <td id="lu12-PM" data-dia="Lunes"  data-valor="1" value="12:00-12:50" class="mañana menu AM"></td>
                                        <td id="ma12-PM" data-dia="Martes"  data-valor="1" value="12:00-12:50" class="mañana menu AM"></td>
                                        <td id="mi12-PM" data-dia="Miércoles" data-valor="1"  value="12:00-12:50" class="mañana menu AM"></td>
                                        <td id="ju12-PM" data-dia="Jueves"  data-valor="1" value="12:00-12:50" class="mañana menu AM"></td>
                                        <td id="vi12-PM" data-dia="Viernes"  data-valor="1" value="12:00-12:50" class="mañana menu AM"></td>
                                        <td id="sa12-PM" data-dia="Sábado"  data-valor="1" value="12:00-12:50" class="mañana menu AM"></td>
                                        <td id="do12-PM" data-dia="Domingo"  data-valor="1" value="12:00-12:50" class="mañana menu AM"></td>
                                    </tr>
                                    <tr id="h15">
                                        <th scope="row" class="p-3">12:50 - 01:30</th>
                                        <td id="lu1-PM" data-dia="Lunes"  data-valor="1" value="12:50-01:30" class="mañana menu AM"></td>
                                        <td id="ma1-PM" data-dia="Martes"  data-valor="1" value="12:50-01:30" class="mañana menu AM"></td>
                                        <td id="mi1-PM" data-dia="Miércoles"  data-valor="1" value="12:50-01:30" class="mañana menu AM"></td>
                                        <td id="ju1-PM" data-dia="Jueves"  data-valor="1" value="12:50-01:30" class="mañana menu AM"></td>
                                        <td id="vi1-PM" data-dia="Viernes"  data-valor="1" value="12:50-01:30" class="mañana menu AM"></td>
                                        <td id="sa1-PM" data-dia="Sábado"  data-valor="1" value="12:50-01:30" class="mañana menu AM"></td>
                                        <td id="do1-PM" data-dia="Domingo" data-valor="1"  value="12:50-01:30" class="mañana menu AM"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="guardarPDF" style="display:none;">Exporta PDF</button>
                    <button type="button" class="btn btn-primary" id="exportarExcel" style="display:none;">Exportar a Excel</button>
                    <button type="button" id="closeBtn1" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>



    <!-- MODAL HORARIO TARDE -->
    <div class="modal fade modal-xl" id="calendario2" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header horario-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel2">HORARIO: <span id="nombre-horario-pm"></span></h1>
                    <div class=" d-flex position-absolute top-0 end-0 mx-3 ">
                        <button class="btn btn-outline-secondary decrease2 d-none" data-num="-1" type="hidden" >-</button>
                            <h1 class="modal-title fs-5 h1Bloques m-3 menu " id="staticBackdropLabel1">SELECCIÓN<span class="d-none"id="cantidadBloques2"></span></h1>
                        <button class="btn btn-outline-secondary increase2 d-none" data-num="1" type="hidden" >+</button>
                        <div class="btn-icon2 mx-2 mt-3 menu" id="btnCancel6" style="display:none;">
                            <i class="bi bi-x-circle"></i>
                            <span class="tooltiptext">Cancelar</span>
                        </div>
                    </div>
                    <!-- Añadido: Selector de color y botón para aplicar en horario PM -->
                    <div class="d-flex align-items-center mt-2 ">
                        <label for="colorPickerPM" class="me-1 color01" style="font-size: 0.9rem;">Color:</label>
                        <input type="color"  id="colorPickerPM" class="form-control color02 form-control-color me-1" title="Elige un color" style="height: 30px; width: 30px; border: none; padding: 0;" value="#FFFFFF">
                        <i class="bi bi-check-lg text-light bg-success rounded p-1 px-2 mx-2 menu" id="checkPM" data-color="color"></i>
                        <div class="btn-icon2 mx-2 mt-2 menu" id="btnCancel4" style="display:block;">
                            <i class="bi bi-x-circle"></i>
                            <span class="tooltiptext">Cancelar</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-5">
                            <button class="btn-001 btn btn-success menu mt-1">Editar</button>         
                        </div>
                        <div class="col-7">
                            <div class="btn-icon2 mt-3 menu" id="btnCancel2" style="display:none;">
                                <i class="bi bi-x-circle"></i>
                                <span class="tooltiptext">Cancelar</span>
                            </div>
                        </div>
                    </div>
                    <label id="modoExamenLabel2" class="switch" style="display: none;">
                        <input type="checkbox" id="modoExamen2">
                        <span class="slider round">Modo Examen</span>
                    </label>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <div class="table-responsive">
                            <table class="table text-center align-middle" id="table-horario-pm">
                                <thead>
                                    <tr>
                                        <th scope="col">Hora</th>
                                        <th scope="col" id="lunes">Lunes</th>
                                        <th scope="col" id="martes">Martes</th>
                                        <th scope="col" id="miercoles">Miércoles</th>
                                        <th scope="col" id="jueves">Jueves</th>
                                        <th scope="col" id="viernes">Viernes</th>
                                        <th scope="col" id="sabado">Sábado</th>
                                        <th scope="col" id="domingo">Domingo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr id="h17">
                                        <th scope="row" class="p-3">5:00 - 5:50</th>
                                        <td id="lu17-PM" data-dia="Lunes" data-valor="1" value="05:00-06:40" class="tarde menu PM"></td>
                                        <td id="ma17-PM" data-dia="Martes" data-valor="1" value="05:00-06:40" class="tarde menu PM"></td>
                                        <td id="mi17-PM" data-dia="Miércoles" data-valor="1" value="05:00-06:40" class="tarde menu PM"></td>
                                        <td id="ju17-PM" data-dia="Jueves" data-valor="1" value="05:00-06:40" class="tarde menu PM"></td>
                                        <td id="vi17-PM" data-dia="Viernes" data-valor="1" value="05:00-06:40" class="tarde menu PM"></td>
                                        <td id="sa17-PM" data-dia="Sábado" data-valor="1" value="05:00-06:40" class="tarde menu PM"></td>
                                        <td id="do17-PM" data-dia="Domingo" data-valor="1" value="05:00-06:40" class="tarde menu PM"></td>
                                    </tr>
                                    <tr id="h18">
                                        <th scope="row" class="p-3">5:50 - 6:40</th>
                                        <td id="lu18-PM" data-dia="Lunes" data-valor="1" value="05:00-06:40" class="tarde menu PM"></td>
                                        <td id="ma18-PM" data-dia="Martes" data-valor="1" value="05:00-06:40" class="tarde menu PM"></td>
                                        <td id="mi18-PM" data-dia="Miércoles" data-valor="1" value="05:00-06:40" class="tarde menu PM"></td>
                                        <td id="ju18-PM" data-dia="Jueves" data-valor="1" value="05:00-06:40" class="tarde menu PM"></td>
                                        <td id="vi18-PM" data-dia="Viernes" data-valor="1" value="05:00-06:40" class="tarde menu PM"></td>
                                        <td id="sa18-PM" data-dia="Sábado" data-valor="1" value="05:00-06:40" class="tarde menu PM"></td>
                                        <td id="do18-PM" data-dia="Domingo" data-valor="1" value="05:00-06:40" class="tarde menu PM"></td>
                                    </tr>
                                    <tr id="h19">
                                        <th scope="row" class="p-3">6:40 - 7:00</th>
                                        <td id="receso3" colspan="7"><h2>Receso</h2></td>
                                    </tr>
                                    <tr id="h20">
                                        <th scope="row" class="p-3">7:00 - 7:50</th>
                                        <td id="lu20-PM" data-dia="Lunes" data-valor="1" value="07:00-07:50" class="tarde menu PM"></td>
                                        <td id="ma20-PM" data-dia="Martes" data-valor="1" value="07:00-07:50" class="tarde menu PM"></td>
                                        <td id="mi20-PM" data-dia="Miércoles" data-valor="1" value="07:00-07:50" class="tarde menu PM"></td>
                                        <td id="ju20-PM" data-dia="Jueves" data-valor="1" value="07:00-07:50" class="tarde menu PM"></td>
                                        <td id="vi20-PM" data-dia="Viernes" data-valor="1" value="07:00-07:50" class="tarde menu PM"></td>
                                        <td id="sa20-PM" data-dia="Sábado" data-valor="1" value="07:00-07:50" class="tarde menu PM"></td>
                                        <td id="do20-PM" data-dia="Domingo" data-valor="1" value="07:00-07:50" class="tarde menu PM"></td>
                                    </tr>
                                    <tr id="h21">
                                        <th scope="row" class="p-3">7:50 - 8:40</th>
                                        <td id="lu21-PM" data-dia="Lunes" data-valor="1" value="07:50-08:40" class="tarde menu PM"></td>
                                        <td id="ma21-PM" data-dia="Martes" data-valor="1" value="07:50-08:40" class="tarde menu PM"></td>
                                        <td id="mi21-PM" data-dia="Miércoles" data-valor="1" value="07:50-08:40" class="tarde menu PM"></td>
                                        <td id="ju21-PM" data-dia="Jueves" data-valor="1" value="07:50-08:40" class="tarde menu PM"></td>
                                        <td id="vi21-PM" data-dia="Viernes" data-valor="1" value="07:50-08:40" class="tarde menu PM"></td>
                                        <td id="sa21-PM" data-dia="Sábado" data-valor="1" value="07:50-08:40" class="tarde menu PM"></td>
                                        <td id="do21-PM" data-dia="Domingo" data-valor="1" value="07:50-08:40" class="tarde menu PM"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="guardarPDF2" style="display:none;">Descargar como PDF</button>
                    <button type="button" class="btn btn-primary" id="exportarExcel2" style="display:none;">Exportar a Excel</button>
                    <button type="button" id="closeBtn2" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
    <script>
    let selectedColorAM = document.getElementById('colorPickerAM').value;
    let selectedColorPM = document.getElementById('colorPickerPM').value;
    let canApplyColorAM = false;  // Control de color para AM
    let canApplyColorPM = false;  // Control de color para PM
    document.getElementById('colorPickerAM').addEventListener('input', function() {
        selectedColorAM = this.value;
    });
    document.getElementById('colorPickerPM').addEventListener('input', function() {
        selectedColorPM = this.value;
    });
    document.getElementById('checkAM').addEventListener('click', function() {
        canApplyColorAM = true;  // Habilita la aplicación del color en el horario AM
    });
    document.getElementById('checkPM').addEventListener('click', function() {
        canApplyColorPM = true;  // Habilita la aplicación del color en el horario PM
    });
    document.querySelectorAll('#table-horario-am td').forEach(function(td) {
        td.addEventListener('click', function() {
            if (canApplyColorAM) {  // Solo aplica el color si está habilitado
                this.style.backgroundColor = selectedColorAM;
                this.classList.add('selected');  } });
    });
    document.querySelectorAll('#table-horario-pm td').forEach(function(td) {
        td.addEventListener('click', function() {
            if (canApplyColorPM) {  // Solo aplica el color si está habilitado
                this.style.backgroundColor = selectedColorPM;
                this.classList.add('selected');} });
    });
    document.getElementById('btnCancel3').addEventListener('click', function() {
        canApplyColorAM = false;  // Deshabilita la aplicación del color en el horario AM
    });
    document.getElementById('btnCancel4').addEventListener('click', function() {
        canApplyColorPM = false;  // Deshabilita la aplicación del color en el horario PM
    });
    document.getElementById('closeBtn1').addEventListener('click', function() {
        document.querySelectorAll('#table-horario-am td.selected').forEach(function(td) {
            td.style.backgroundColor = '#FFFFFF';  // Limpiar color y volver a blanco
            td.classList.remove('selected');  // Quitar clase de selección
        });
        selectedColorAM = '#FFFFFF';  // Restablecer el color seleccionado a blanco
    });
    document.getElementById('closeBtn2').addEventListener('click', function() {
        document.querySelectorAll('#table-horario-pm td.selected').forEach(function(td) {
            td.style.backgroundColor = '#FFFFFF';  // Limpiar color y volver a blanco
            td.classList.remove('selected');  // Quitar clase de selección
        });
        selectedColorPM = '#FFFFFF';  // Restablecer el color seleccionado a blanco
    }); 
    </script>


    <div class="modal fade" id="modal-001" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="container text-center">
                        <div class="row justify-content-center">
                            <div class="col"><h1 class="modal-title fs-5" id="staticBackdropLabel">Lista de Profesores</h1></div>
                        </div> 
                    </div>
                </div>
                <table id="example-002" class="table table-bordered text-center">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Curso</th>
                        </tr>
                    </thead>
                    <tbody id="lista-002">
                        <!-- Aquí se generarán dinámicamente las filas de la tabla -->
                    </tbody>
                </table>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>


    <script>
        document.getElementById('guardarPDF').addEventListener('click', function() {
            var horario = document.getElementById('table-horario-am');
            var opt = {
                margin: [20, 10, 20, 10], // Ajusta los márgenes para espaciar mejor
                filename: 'horario.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

            html2canvas(horario, { scale: 2 }).then(function(canvas) {
                var imgData = canvas.toDataURL('image/jpeg', 1.0);
                var pdf = new jspdf.jsPDF(opt.jsPDF);

                var pageWidth = pdf.internal.pageSize.getWidth();
                var pageHeight = pdf.internal.pageSize.getHeight();
                var imgWidth = canvas.width;
                var imgHeight = canvas.height;
                var ratio = Math.min((pageWidth - 20) / imgWidth, (pageHeight - 40) / imgHeight); // Ajuste del ratio
                var imgX = (pageWidth - imgWidth * ratio) / 2;
                var imgY = 30; // Ajusta la posición Y de la tabla para que no esté demasiado abajo

                pdf.text('HORARIO: ' + document.getElementById('nombre-horario-am').innerText, pageWidth / 2, 20, { align: 'center' });
                pdf.addImage(imgData, 'JPEG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
                var pdfBlob = pdf.output('bloburl');
                window.open(pdfBlob);
            });
        });

        document.getElementById('guardarPDF2').addEventListener('click', function() {
            var horario = document.getElementById('table-horario-pm');
            var opt = {
                margin: [20, 10, 20, 10], // Ajusta los márgenes para espaciar mejor
                filename: 'horario.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

            html2canvas(horario, { scale: 2 }).then(function(canvas) {
                var imgData = canvas.toDataURL('image/jpeg', 1.0);
                var pdf = new jspdf.jsPDF(opt.jsPDF);

                var pageWidth = pdf.internal.pageSize.getWidth();
                var pageHeight = pdf.internal.pageSize.getHeight();
                var imgWidth = canvas.width;
                var imgHeight = canvas.height;
                var ratio = Math.min((pageWidth - 20) / imgWidth, (pageHeight - 40) / imgHeight); // Ajuste del ratio
                var imgX = (pageWidth - imgWidth * ratio) / 2;
                var imgY = 30; // Ajusta la posición Y de la tabla para que no esté demasiado abajo

                pdf.text('HORARIO: ' + document.getElementById('nombre-horario-pm').innerText, pageWidth / 2, 20, { align: 'center' });
                pdf.addImage(imgData, 'JPEG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
                var pdfBlob = pdf.output('bloburl');
                window.open(pdfBlob);
            });
        });

        document.getElementById('exportarExcel').addEventListener('click', function() {
            exportToExcel('table-horario-am');
        });

        document.getElementById('exportarExcel2').addEventListener('click', function() {
            exportToExcel('table-horario-pm');
        });

        function exportToExcel(tableId) {
            var table = document.getElementById(tableId);
            var wb = XLSX.utils.table_to_book(table, { sheet: "Horario" });

            // Obtener la hoja de trabajo
            var ws = wb.Sheets["Horario"];

            // Ajustar el ancho de las columnas
            ws['!cols'] = [
                { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 12 },
                { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 12 }
            ];

            // Ajustar la altura de las filas
            ws['!rows'] = [
                { hpt: 30 }, { hpt: 30 }, { hpt: 30 }, { hpt: 30 },
                { hpt: 30 }, { hpt: 30 }, { hpt: 30 }
            ];

            // Aplicar estilos a las celdas
            const range = XLSX.utils.decode_range(ws['!ref']);
            for (let R = range.s.r; R <= range.e.r; ++R) {
                for (let C = range.s.c; C <= range.e.c; ++C) {
                    const cell_address = { c: C, r: R };
                    const cell_ref = XLSX.utils.encode_cell(cell_address);
                    if (!ws[cell_ref]) continue;
                    if (!ws[cell_ref].s) ws[cell_ref].s = {};

                    // Aplicar bordes y centrado
                    ws[cell_ref].s.alignment = { horizontal: 'center', vertical: 'center' };
                    ws[cell_ref].s.border = {
                        top: { style: 'thin', color: { rgb: '000000' } },
                        bottom: { style: 'thin', color: { rgb: '000000' } },
                        left: { style: 'thin', color: { rgb: '000000' } },
                        right: { style: 'thin', color: { rgb: '000000' } }
                    };
                }
            }

            // Aplicar estilos a los encabezados
            const headerRow = 0;
            for (let C = range.s.c; C <= range.e.c; ++C) {
                const cell_address = { c: C, r: headerRow };
                const cell_ref = XLSX.utils.encode_cell(cell_address);
                if (!ws[cell_ref]) continue;
                if (!ws[cell_ref].s) ws[cell_ref].s = {};

                // Estilo para encabezados
                ws[cell_ref].s.font = { name: 'Arial', sz: 12, bold: true, color: { rgb: 'FFFFFF' } };
                ws[cell_ref].s.fill = { fgColor: { rgb: '000000' } };
                ws[cell_ref].s.alignment = { horizontal: 'center', vertical: 'center' };
                ws[cell_ref].s.border = {
                    top: { style: 'thin', color: { rgb: '000000' } },
                    bottom: { style: 'thin', color: { rgb: '000000' } },
                    left: { style: 'thin', color: { rgb: '000000' } },
                    right: { style: 'thin', color: { rgb: '000000' } }
                };
            }

            XLSX.writeFile(wb, 'horario.xlsx');
        }
    </script>
</body>
</html>
