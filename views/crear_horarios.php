<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crear Horarios</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link rel="stylesheet" href="../assets/horarios.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</head>
<body>
    <div class="container-fluid text-center">
        <h1 id="titulo">Crear Horarios</h1>
        <button id="btnCrearHorario" class="btn btn-success mb-3 mt-2">Crear Horario</button>
        <div class="table-responsive d-flex justify-content-center">
            <table class="table table-dark table-bordered" style="width: 60%;">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Herramientas</th>
                    </tr>
                </thead>
                <tbody id="listaHorarios">
                    <!-- Aquí se cargarán los horarios dinámicamente -->
                </tbody>
            </table>
        </div>
        <button onclick="history.back()" class="btn btn-secondary mt-3">Volver</button>

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

        <!-- Modal de confirmación para eliminar horario -->
        <div class="modal fade" id="confirmarEliminarModal" tabindex="-1" role="dialog" aria-labelledby="confirmarEliminarLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="confirmarEliminarLabel">Confirmar Eliminación</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        ¿Estás seguro de que quieres eliminar este horario?
                        <input type="hidden" id="eliminarHorarioId">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-success" id="confirmarEliminarBtn">Eliminar</button>
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
                            <tr>
                                <td>${horario.nombre}</td>
                                <td>
                                    <button class="btn btn-primary btn-sm editarHorario" data-id="${horario.id}" data-nombre="${horario.nombre}">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn-danger btn-sm eliminarHorario" data-id="${horario.id}">
                                        <i class="fas fa-trash-alt"></i>
                                    </button>
                                </td>
                            </tr>
                        `;
                    });
                    $('#listaHorarios').html(html);
                });
            }

            $(document).on('click', '.eliminarHorario', function() {
                const id = $(this).data('id');
                $('#eliminarHorarioId').val(id);
                $('#confirmarEliminarModal').modal('show');
            });

            $('#confirmarEliminarBtn').click(function() {
                const id = $('#eliminarHorarioId').val();
                $.post('../php/horario/eliminar_horario_creado.php', { id: id }, function(response) {
                    $('#confirmarEliminarModal').modal('hide');
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
