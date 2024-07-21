$(document).ready(function() {
    let selectedCourse = "";
    let selectedTeacher = "";
    let selectedHorarioText = "";
    let selectedHorarioId = "";
    let selectedPeriod = "";
    let selectedId = "";

    listar();

    // Mostrar/Ocultar barra de herramientas
    $('#toolbarIcon').click(function() {
        $('#toolbarContent').toggle();
    });

    // Evento para el formulario de agregar profesor
    $(document).on("submit", "#modal1", function(e) {
        e.preventDefault();
        const data = {
            nombre: $("#nombre").val(),
            curso: $("#curso").val()
        };
        $.ajax({
            url: "../php/profesor/insert.php",
            data: data,
            type: "POST",
            success: function(response) {
                alert(response);
                listar();
                $('#staticBackdrop').modal('hide');
                resetForm();
            }
        });
    });

    // Función para listar los profesores
    function listar() {
        $.ajax({
            url: '../php/profesor/list.php',
            type: 'GET',
            success: function(r) {
                const profesor = JSON.parse(r);
                let template = "";
                profesor.forEach(element => {
                    template += `
                    <tr id="${element.id}">
                        <td>${element.nombre_p}</td>
                        <td>${element.curso}</td>
                        <td>
                            <button value="${element.id}" class="btn btn-primary tool-action default-action" data-id="${element.id}" data-curso="${element.curso}" data-nombre="${element.nombre_p}">
                                <i class="bi bi-calendar2-week"></i>
                            </button>
                        </td>
                    </tr>
                    `;
                });
                $('#lista').html(template);
                attachEvents();
            }
        });
    }

    // Función para establecer el modo de edición o eliminación
    function setMode(mode) {
        resetButtons();
        if (mode === 'editar') {
            $("#toolsHeader").text("Editar");
            $(".tool-action").each(function() {
                $(this).html('<i class="bi bi-pencil"></i>');
                $(this).removeClass("default-action").addClass("edit-action");
            });
        } else if (mode === 'eliminar') {
            $("#toolsHeader").text("Eliminar");
            $(".tool-action").each(function() {
                $(this).html('<i class="bi bi-trash"></i>');
                $(this).removeClass("default-action").addClass("delete-action");
            });
        }
        $("#btnCancel").show();
        $("#toolbarContent").show();
    }

    // Función para restablecer los botones
    function resetButtons() {
        $("#toolsHeader").text("Herramientas");
        $(".edit-action, .delete-action").each(function() {
            $(this).html('<i class="bi bi-calendar2-week"></i>');
            $(this).removeClass("edit-action delete-action").addClass("default-action");
        });
        $("#btnCancel").hide();
        $("#toolbarContent").hide();
    }

    // Función para restablecer el formulario
    function resetForm() {
        $("#nombre").val("");
        $("#curso").val("");
        $("#btn1").show();
        $("#btnUpdate").hide();
        $("#btnCancelEdit").hide();
    }

    // Eventos de botones para cambiar modos
    $(document).on('click', '#btn3', function() {
        setMode('eliminar');
    });

    $(document).on('click', '#btnEdit', function() {
        setMode('editar');
    });

    $(document).on('click', '#btnCancel', function() {
        resetButtons();
    });

    $(document).on('click', '#btn2', function() {
        resetForm();
        $('#staticBackdrop').modal('show');
    });

    $(document).on('change', '#inlineCheckbox1', function() {
        if ($(this).is(':checked')) {
            $('#inlineCheckbox2').prop('checked', false);
            selectedPeriod = 'AM';
        } else {
            selectedPeriod = "";
        }
    });

    $(document).on('change', '#inlineCheckbox2', function() {
        if ($(this).is(':checked')) {
            $('#inlineCheckbox1').prop('checked', false);
            selectedPeriod = 'PM';
        } else {
            selectedPeriod = "";
        }
    });

    // Función para adjuntar eventos a los botones
    function attachEvents() {
        $(document).off('click', '.tool-action');
        $(document).on('click', '.tool-action', function() {
            if (!selectedHorarioId) {
                alert("Seleccione destino de horario");
                return;
            }
            if ($(this).hasClass('default-action')) {
                if (!$('#inlineCheckbox1').is(':checked') && !$('#inlineCheckbox2').is(':checked')) {
                    alert("Seleccione AM o PM");
                    return false;
                }
                selectedCourse = $(this).data('curso');
                selectedTeacher = $(this).data('nombre');
                selectedId = $(this).val();
                console.log(selectedId);
                selectedHorarioId = $('#selectHorario').val(); // Obtener el ID del horario seleccionado
                selectedHorarioText = $('#selectHorario option:selected').text(); // Obtener el nombre del horario seleccionado

                if ($('#inlineCheckbox1').is(':checked')) {
                    $('#calendario2').modal('hide');
                    $('#calendario').modal('show');
                    $('#nombre-horario-am').text(selectedHorarioText); // Actualizar el nombre del horario en el modal AM
                } else if ($('#inlineCheckbox2').is(':checked')) {
                    $('#calendario').modal('hide');
                    $('#calendario2').modal('show');
                    $('#nombre-horario-pm').text(selectedHorarioText); // Actualizar el nombre del horario en el modal PM
                }
                limpiarCeldas(); // Limpiar celdas antes de cargar nuevos horarios
                cargarHorarios(); // Cargar horarios correspondientes al abrir el modal
                $('.calendar-cell').off('click').on('click', function() {
                    $(this).toggleClass('selected');
                });
            } else if ($(this).hasClass('edit-action')) {
                const id = $(this).val();
                $.ajax({
                    url: '../php/profesor/get.php',
                    data: { id: id },
                    type: 'GET',
                    success: function(response) {
                        const data = JSON.parse(response);
                        $("#nombre").val(data.nombre_p);
                        $("#curso").val(data.curso);
                        $("#btn1").hide();
                        $("#btnUpdate").show().val(id);
                        $("#btnCancelEdit").show();
                        $('#staticBackdrop').modal('show');
                    }
                });
            } else if ($(this).hasClass('delete-action')) {
                const id = $(this).val();
                $.ajax({
                    url: "../php/profesor/delete.php",
                    data: { id: id },
                    type: "POST",
                    success: function(response) {
                        alert(response);
                        listar();
                        resetButtons();
                        resetForm();
                    }
                });
            }
        });

        $(document).off('click', '#btnUpdate').on('click', '#btnUpdate', function() {
            const id = $(this).val();
            const data = {
                id: id,
                nombre: $("#nombre").val(),
                curso: $("#curso").val()
            };
            $.ajax({
                url: "../php/profesor/editar.php",
                data: data,
                type: "POST",
                success: function(response) {
                    alert(response);
                    listar();
                    resetButtons();
                    $('#staticBackdrop').modal('hide');
                    resetForm();
                }
            });
        });
    }

    // Función para limpiar celdas
    function limpiarCeldas() {
        $('td').removeClass('selected');
        $('.calendar-cell').html('');
    }

    // Función para cargar los horarios
    function cargarHorarios() {
        if (!selectedHorarioId || !selectedPeriod) {
            return; // No cargar horarios si no hay horario y periodo seleccionados
        }
        $.ajax({
            url: '../php/horario/cargar_horarios.php',
            type: 'GET',
            data: { horario_id: selectedHorarioId, periodo: selectedPeriod }, // Enviar los parámetros
            success: function(response) {
                const horarios = JSON.parse(response);
                limpiarCeldas(); // Limpiar las celdas antes de cargar los nuevos datos
                horarios.forEach(horario => {
                    const id = horario.dia.substring(0, 2) + horario.disponibilidad_i.replace(':', '');
                    $(`#${id}`).html(`<div class="text-success ${id}" bg-secondary>
                        <div>${horario.curso}</div>
                        <div>(${horario.nombre_p})</div>
                    </div>`);
                });
            }
        });
    }

    // Evento para enviar a horario
    $(document).on('click', '#btnEnviar', function() {
        if (!selectedPeriod) {
            alert("Seleccione AM o PM");
            return;
        }
        $.ajax({
            url: '../php/horario/listar_horarios.php',
            type: 'GET',
            success: function(response) {
                const horarios = JSON.parse(response);
                let options = "";
                horarios.forEach(horario => {
                    options += `<option value="${horario.id}">${horario.nombre}</option>`;
                });
                $('#selectHorario').html(options);
                $('#enviarHorarioModal').modal('show');
            }
        });
    });

    // Evento para el formulario de enviar a horario
    $(document).on('submit', '#enviarHorarioForm', function(e) {
        e.preventDefault();
        selectedHorarioText = $('#selectHorario option:selected').text(); // Actualizar el nombre del horario seleccionado
        selectedHorarioId = $('#selectHorario').val(); // Actualizar el ID del horario seleccionado
        $('#enviarHorarioModal').modal('hide');
    });

   //LLENAR CUADRO  E INSERTAR DATOS

   $(document).on('click', '.mañana, .tarde', function(e) {
    const element = $(this).attr('id');
    const tiempo = element.split('-')[1];
    if ($(`.${element}`).length) {
        $(`.${element}`).remove();

    
    } else {
        $(`#${element}`).html(`<div class="text-success ${element}" bg-secondary>
            <div>${selectedCourse}</div>
            <div>(${selectedTeacher})</div>
        </div>`);

        }

    const dia = element.substring(0, 2);
    if (dia == 'lu'){
         parte = dia + 'nes';
    }
    else if (dia == 'ma')
    {
         parte = dia + 'rtes';
    }
    else if (dia == 'mi')
    {
         parte = dia + 'ercoles';
    }
    else if (dia == 'ju')
    {
         parte = dia + 'eves';
    }
    else if (dia == 'vi')
    {
         parte = dia + 'ernes';
    }
    else if (dia == 'sa')
    {
         parte = dia + 'bado';
    }
    else if (dia == 'do')
        {
             parte = dia + 'mingo';
        }
    console.log(parte);

    const hora = $(this).attr('value');
    if (hora.length>15)
    {
        hora_inicial = hora.split('|')[0];
        hora_final = hora.split('|')[1];
        cuadro_largo_i1 = hora_inicial.split('-')[0];
        cuadro_largo_f1 = hora_inicial.split('-')[1];
        cuadro_largo_i2 = hora_final.split('-')[0];
        cuadro_largo_f2 = hora_final.split('-')[1];

        const datas = {
            disponibilidad_i: cuadro_largo_i1,
            disponibilidad_f: cuadro_largo_f2,
            dia: parte,
            tiempo: tiempo,
            id_p: selectedId
        }
        console.log(selectedId);
    
        $.ajax ({
            url: "../php/register/insert_r.php",
           data: datas,
           type: "POST",
          success: function(response){
            alert(response);
          }

        })
    }
    else if (hora.length<15)
    {
        hora_inicial2_i = hora.split('-')[0];
        hora_inicial2_f= hora.split('-')[1];

        const datas = {
            disponibilidad_i: hora_inicial2_i,
            disponibilidad_f: hora_inicial2_f,
            dia: parte,
            tiempo: tiempo,
            id_p: selectedId
        }
        
        $.ajax ({
            url: "../php/register/insert_r.php",
           data: datas,
           type: "POST",
          success: function(response){
            alert(response);
          }
        })
    } 
    
});

});
