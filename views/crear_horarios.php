<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crear Horarios</title>
    <link rel="stylesheet" href="../assets/horarios.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</head>
<body>
    <div class="container-fluid">
        <div class="row text-center justify-content-center mt-5">
            <div class="col col-4 mt-5">
                <div class="card">
                    <div class="card-body">
                    
                        <h1 class="mt-2">Crear Horarios</h1>
                        <button id="btnCrearHorario" class="btn btn-success mb-3 mt-2">Crear Horario</button>
                        <ul id="listaHorarios" class="list-group mb-3"></ul>
                        <button onclick="history.back()" class="btn btn-secondary">Volver</button>
                   

                        <!-- Modal para crear/editar horario -->
                        <div class="modal fade" id="crearHorarioModal" tabindex="-1" role="dialog" aria-labelledby="crearHorarioLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="crearHorarioLabel">Crear Horario</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <input type="text" id="nombreHorario" class="form-control" placeholder="Nombre del Horario">
                                        <input type="hidden" id="horarioId">
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                        <button type="button" class="btn btn-primary" id="guardarHorarioBtn">Aceptar</button>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    </div>


   
    <script>
        $(document).ready(function() {
            cargarHorarios();

            $('#btnCrearHorario').click(function() {
                $('#nombreHorario').val('');
                $('#horarioId').val('');
                $('#crearHorarioLabel').text('Crear Horario');
                $('#crearHorarioModal').modal('show');
            });

            $('#guardarHorarioBtn').click(function() {
                const nombreHorario = $('#nombreHorario').val();
                const id = $('#horarioId').val();
                if (nombreHorario) {
                    const url = id ? '../php/horario/editar_horario_creado.php' : '../php/horario/guardar_horario_creado.php';
                    const data = id ? { id: id, nombre: nombreHorario } : { nombre: nombreHorario };
                    $.post(url, data, function(response) {
                        $('#crearHorarioModal').modal('hide');
                        cargarHorarios();
                    });
                }
            });

            function cargarHorarios() {
                $.get('../php/horario/listar_horarios.php', function(response) {
                    const horarios = JSON.parse(response);
                    let html = '';
                    horarios.forEach(horario => {
                        html += `
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                ${horario.nombre}
                                <div>
                                    <button class="btn btn-primary btn-sm editarHorario" data-id="${horario.id}" data-nombre="${horario.nombre}">Editar</button>
                                    <button class="btn btn-danger btn-sm eliminarHorario" data-id="${horario.id}">Eliminar</button>
                                </div>
                            </li>
                        `;
                    });
                    $('#listaHorarios').html(html);
                });
            }

            $(document).on('click', '.eliminarHorario', function() {
                const id = $(this).data('id');
                $.post('../php/horario/eliminar_horario_creado.php', { id: id }, function(response) {
                    cargarHorarios();
                });
            });

            $(document).on('click', '.editarHorario', function() {
                const id = $(this).data('id');
                const nombre = $(this).data('nombre');
                $('#nombreHorario').val(nombre);
                $('#horarioId').val(id);
                $('#crearHorarioLabel').text('Editar Horario');
                $('#crearHorarioModal').modal('show');
            });
        });
    </script>
</body>
</html>
