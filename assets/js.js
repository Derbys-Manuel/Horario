$(document).ready(function() {
    borrar_localstorage()


    let selectedCourse = "";
    let selectedTeacher = "";
    let selectedHorarioText = localStorage.getItem('selectedHorarioText') || ""; // Obtener el nombre del horario del localStorage
    let selectedHorarioId = localStorage.getItem('selectedHorarioId') || ""; // Obtener el ID del horario del localStorage
    let selectedPeriod = localStorage.getItem('selectedPeriod') || "";
    let selectedId = "";
    let selectedIdRegistro = "";
    let deleteId = null; // Variable para almacenar el ID del elemento a eliminar

    let modoExamen = false; // Variable para controlar el modo examen

    // Mostrar el horario almacenado al cargar la página
    if (selectedHorarioText) {
        $('#selectedHorarioText').text(`Horario: ${selectedHorarioText}`);
        $("#btnCancel").show(); // Mostrar el botón Cancelar si hay un horario seleccionado
    }

    // Mantener la selección de AM o PM después de refrescar la página
    if (selectedPeriod === 'Mañana') {
        $('#inlineCheckbox1').prop('checked', true);
    } else if (selectedPeriod === 'Tarde') {
        $('#inlineCheckbox2').prop('checked', true);
    }

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
            curso: $("#curso").val(),
            id_h: selectedHorarioId
        };
        const id = $("#btnUpdate").val();
        const url = id ? "../php/profesor/editar.php" : "../php/profesor/insert.php";
        if (id) {
            data.id = id;
        }
        $.ajax({
            url: url,
            data: data,
            type: "POST",
            success: function(response) {
                showAlert(response); // Reemplaza alert(response) con showAlert(response)
                listar();
                $('#staticBackdrop').modal('hide');
                resetForm();
            }
        });
    });

    // Función para listar los profesores
    function listar() {
        const dato = {
            id_h: selectedHorarioId
        }
        $.ajax({
            url: '../php/profesor/list.php',
            type: 'POST',
            data: dato,
            success: function(r) {
                const profesor = JSON.parse(r);
                const calculo = profesor.length;
                let template = "";
                if (calculo === 0) {
                    const enfoque = `
                    <tr>
                        <td colspan="3"> No hay horario seleccionado </td>
                    </tr>
                    `;
                    $('#lista').html(enfoque);          
                } else {
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
            }
        });
    }

    // Función para establecer el modo de edición, eliminación o envío
    function setMode(mode) {
        resetButtons();
        if (mode === 'editar' || mode === 'eliminar' || mode === 'enviar') {
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
            } else if (mode === 'enviar') {
                // No cambiamos el header ni los iconos
            }
            $("#btnCancel").show();
        }
    }

    // Función para restablecer los botones
    function resetButtons() {
        $("#toolsHeader").text("Herramientas");
        $(".edit-action, .delete-action").each(function() {
            $(this).html('<i class="bi bi-calendar2-week"></i>');
            $(this).removeClass("edit-action delete-action").addClass("default-action");
        });
        $("#btnCancel").hide();
    }

    // Función para restablecer el formulario
    function resetForm() {
        $("#nombre").val("");
        $("#curso").val("");
        $("#btn1").show();
        $("#btnUpdate").hide().val("");
        $("#btnCancelEdit").hide();
        $("#staticBackdropLabel").text("Ingresar Registro"); // Restablecer el título del modal
    }

    // Eventos de botones para cambiar modos
    $(document).on('click', '#btn3', function() {
        setMode('eliminar');
    });

    $(document).on('click', '#btnEdit', function() {
        setMode('editar');
    });

    $(document).on('click', '#btnEnviar', function() {
        setMode('enviar');
    });

    $(document).on('click', '#btnCancel', function() {
        resetButtons();
        localStorage.removeItem('selectedHorarioText'); // Eliminar el horario del localStorage
        localStorage.removeItem('selectedHorarioId'); // Eliminar el ID del horario del localStorage
        $('#selectedHorarioText').text(""); // Limpiar el texto en el HTML
        selectedHorarioText = "";
        selectedHorarioId = "";
        selectedPeriod = ""; // Limpiar el periodo seleccionado
        localStorage.removeItem('selectedPeriod'); // Eliminar el periodo del localStorage
        $('#inlineCheckbox1').prop('checked', false);
        $('#inlineCheckbox2').prop('checked', false);
        listar();
    });

    // Evento para el botón de añadir
    $(document).on('click', '#btn2', function() {
        if (!selectedHorarioId) { // verificar si hay un horario seleccionado
            showAlert("Seleccione destino de horario"); // Mostrar alerta si no hay un horario seleccionado
            return; // Salir de la función si no hay un horario seleccionado
        }
        resetForm();
        $('#staticBackdrop').modal('show');
    });

    $(document).on('change', '#inlineCheckbox1', function() {
        if (!selectedHorarioId) { // verificar si hay un horario seleccionado
            showAlert("Seleccione destino de horario"); // Mostrar alerta si no hay un horario seleccionado
            $('#inlineCheckbox1').prop('checked', false);
            return;
        }
        if ($(this).is(':checked')) {
            $('#inlineCheckbox2').prop('checked', false);
            selectedPeriod = 'Mañana';
            localStorage.setItem('selectedPeriod', selectedPeriod);
        } else {
            selectedPeriod = "";
            localStorage.removeItem('selectedPeriod');
        }
    });

    $(document).on('change', '#inlineCheckbox2', function() {
        if (!selectedHorarioId) { // verificar si hay un horario seleccionado
            showAlert("Seleccione destino de horario"); // Mostrar alerta si no hay un horario seleccionado
            $('#inlineCheckbox2').prop('checked', false);
            return;
        }
        if ($(this).is(':checked')) {
            $('#inlineCheckbox1').prop('checked', false);
            selectedPeriod = 'Tarde';
            localStorage.setItem('selectedPeriod', selectedPeriod);
        } else {
            selectedPeriod = "";
            localStorage.removeItem('selectedPeriod');
        }
    });

    // Función para adjuntar eventos a los botones
    function attachEvents() {
        $(document).off('click', '.tool-action');
        $(document).on('click', '.tool-action', function() {
            const isEditOrDelete = $(this).hasClass('edit-action') || $(this).hasClass('delete-action');
            if (!isEditOrDelete && !selectedHorarioId) {
                showAlert("Seleccione destino de horario"); // Reemplaza alert("Seleccione destino de horario") con showAlert("Seleccione destino de horario")
                return;
            }
            if (!isEditOrDelete && !$('#inlineCheckbox1').is(':checked') && !$('#inlineCheckbox2').is(':checked')) {
                showAlert("Seleccione AM o PM"); // Reemplaza alert("Seleccione AM o PM") con showAlert("Seleccione AM o PM")
                return false;
            }
            if ($(this).hasClass('edit-action')) {
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
                        $("#staticBackdropLabel").text("Editar Registro"); // Cambiar el título del modal a "Editar Registro"
                        $("#btnCancelEdit").show();
                        $('#staticBackdrop').modal('show');
                    }
                });
            } else if ($(this).hasClass('delete-action')) {
                deleteId = $(this).val(); // Almacena el ID del elemento a eliminar
                $('#confirmDeleteModal').modal('show'); // Muestra el modal de confirmación
            } else if ($(this).hasClass('default-action')) {
                selectedCourse = $(this).data('curso');
                selectedTeacher = $(this).data('nombre');
                selectedId = $(this).val();
                selectedHorarioId = $('#selectHorario').val(); // Obtener el ID del horario seleccionado

                selectedHorarioText = $('#selectHorario option:selected').text(); // Obtener el nombre del horario seleccionado

                // Actualizar el nombre del horario en la tabla principal
                $('#selectedHorarioText').text(`Horario: ${selectedHorarioText}`);
                // Guardar el nombre y el ID del horario en el localStorage
                localStorage.setItem('selectedHorarioText', selectedHorarioText);
                localStorage.setItem('selectedHorarioId', selectedHorarioId);

                if ($('#inlineCheckbox1').is(':checked')) {
                    $('#calendario2').modal('hide');
                    $('#calendario').modal('show');
                    listar_registros(); //LISTA LOS REGISTRO DE CADA PROFESOR EN EL HORARIO

                    $('#nombre-horario-am').text(selectedHorarioText); // Actualizar el nombre del horario en el modal AM
                } else if ($('#inlineCheckbox2').is(':checked')) {
                    $('#calendario').modal('hide');
                    $('#calendario2').modal('show');
                    listar_registros(); //LISTA LOS REGISTRO DE CADA PROFESOR EN EL HORARIO

                    $('#nombre-horario-pm').text(selectedHorarioText); // Actualizar el nombre del horario en el modal PM
                }
                limpiarCeldas(); // Limpiar celdas antes de cargar nuevos horarios
                $('.calendar-cell').off('click').on('click', function() {
                    $(this).toggleClass('selected');
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
                    showAlert(response); // Reemplaza alert(response) con showAlert(response)
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

    // Evento para enviar a horario
    $(document).on('click', '#btnEnviar', function() {
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
        setMode('enviar');
    });

    // Evento para el formulario de enviar a horario
    $(document).on('submit', '#enviarHorarioForm', function(e) {
        e.preventDefault();
        selectedHorarioText = $('#selectHorario option:selected').text(); // Actualizar el nombre del horario seleccionado
        selectedHorarioId = $('#selectHorario').val(); // Actualizar el ID del horario seleccionado
        $('#enviarHorarioModal').modal('hide');
        // Actualizar el nombre del horario en la tabla principal
        $('#selectedHorarioText').text(`Horario: ${selectedHorarioText}`);
        // Guardar el nombre y el ID del horario en el localStorage
        localStorage.setItem('selectedHorarioText', selectedHorarioText);
        localStorage.setItem('selectedHorarioId', selectedHorarioId);
        $("#btnCancel").show(); // Mostrar el botón Cancelar al enviar a un horario
        listar(); //LISTAR PROFESORES DEPENDIENDO DEL HORARIO SELECCIONADO
    });

    // Función para mostrar alertas
    function showAlert(message) {
        $('#alertModalBody').text(message);
        $('#alertModal').modal('show');
    }

    // Manejar el evento de clic del botón de confirmación de eliminación
    $('#confirmDeleteBtn').click(function() {
        if (deleteId) {
            $.ajax({
                url: "../php/profesor/delete.php",
                data: { id: deleteId },
                type: "POST",
                success: function(response) {
                    showAlert(response); // Reemplaza alert(response) con showAlert(response)
                    listar();
                    resetButtons();
                    resetForm();
                    $('#confirmDeleteModal').modal('hide'); // Oculta el modal de confirmación
                }
            });
        }
    });

    // Evento para el botón de cerrar en el modal de alerta
    $('#alertModal .btn-primary').click(function() {
        $('#alertModal').modal('hide');
    });

    //CUADROS DE HORARIOS  ( INSERTAR DATOS, ELIMINAR DATOS)

    $(document).on('click', '.mañana, .tarde', function() {
        const element = $(this).attr('id');
        const tiempo = element.split('-')[1];

        if (modoExamen) {
            // Modo Examen activado, insertar o eliminar exámenes
            if ($(`.${element}`).hasClass('examen')) {
                $(`.${element}`).removeClass('examen').empty();

                const dato = {
                    direccion: element,
                    id_p: selectedId
                };
                $.ajax({
                    url: "../php/examen/delete.php",
                    type: "POST",
                    data: dato,
                    success: function(result) {
                        console.log("Examen eliminado:", result);
                    }
                });
            } else {
                const examenHTML = `<div class="text-danger examen ${element}">
                    <div>Examen</div>
                </div>`;
                $(`#${element}`).html(examenHTML);

                const datosExamen = {
                    direccion: element,
                    id_p: selectedId,
                    turno: selectedPeriod
                };

                $.ajax({
                    url: "../php/examen/insert.php",
                    type: "POST",
                    data: datosExamen,
                    success: function(result) {
                        console.log("Examen insertado:", result);
                    }
                });
            }
        } else {
            // Modo normal, insertar o eliminar clases
            if ($(`.${element}`).length) {
                $(`.${element}`).remove();

                const dato = {
                    direccion: element,
                    id_p: selectedId
                };
                $.ajax({
                    url: "../php/register/delete.php",
                    type: "POST",
                    data: dato,
                    success: function(result) {
                        console.log("Registro eliminado:", result);
                    }
                });
            } else {
                listar_registros();

                const dia = element.substring(0, 2);
                let parte = '';
                switch (dia) {
                    case 'lu': parte = 'lunes'; break;
                    case 'ma': parte = 'martes'; break;
                    case 'mi': parte = 'miércoles'; break;
                    case 'ju': parte = 'jueves'; break;
                    case 'vi': parte = 'viernes'; break;
                    case 'sa': parte = 'sábado'; break;
                    case 'do': parte = 'domingo'; break;
                    default: parte = '';
                }

                const hora = $(this).attr('value');
                let datas = {};

                if (hora.length > 15) {
                    const [hora_inicial, hora_final] = hora.split('|');
                    const [cuadro_largo_i1, cuadro_largo_f1] = hora_inicial.split('-');
                    const [cuadro_largo_i2, cuadro_largo_f2] = hora_final.split('-');

                    datas = {
                        disponibilidad_i: cuadro_largo_i1,
                        disponibilidad_f: cuadro_largo_f2,
                        dia: parte,
                        tiempo: tiempo,
                        id_p: selectedId,
                        direccion: element,
                        turno: selectedPeriod
                    };
                } else {
                    const [hora_inicial2_i, hora_inicial2_f] = hora.split('-');

                    datas = {
                        disponibilidad_i: hora_inicial2_i,
                        disponibilidad_f: hora_inicial2_f,
                        dia: parte,
                        tiempo: tiempo,
                        id_p: selectedId,
                        direccion: element,
                        turno: selectedPeriod
                    };
                }

                $.ajax({
                    url: "../php/register/insert_r.php",
                    data: datas,
                    type: "POST",
                    success: function(response) {
                        listar_registros();
                        console.log(response)
                    }
                });
            }
        }
    });

    // Evento para cambiar el estado del modo examen
    $(document).on('change', '#modoExamen', function() {
        modoExamen = $(this).is(':checked');
    });

    //LLAMADA A LA FUNCION LIMPIAR, REALIZANDO CLICK EN LOS BOTONES DE CLOSE, DE LOS MODALES DEL HORARIO

    $('#closeBtn1').click(function() {
        limpiar();
        limpiarTodo();
    });
    $('#closeBtn2').click(function() {
        limpiar();
        limpiarTodo();
    });

    //FUNCION PARA LISTAR REGISTROS EN EL CUADRO CON EL CAMPO DIRECCION (QUE CONTIENE EL ID DE LA UBICACION EN EL MODAL DEL HORARIO)

    function listar_registros() {
        const dato = {
            id_p: selectedId
        };
        $.ajax({
            url: "../php/register/listar.php",
            type: "POST",
            data: dato,
            success: function(respo) {
                const re = JSON.parse(respo);
                re.forEach(res => {
                    $(`#${res.direccion}`).html(`<div class="text-success ${res.direccion}" value="${res.id_r}">
                        <div>${selectedCourse}</div>
                        <div>(${selectedTeacher})</div>
                    </div>`);
                });
                listar_examenes(); // Llamar a listar_examenes después de listar registros normales
            }
        });
    }

    //FUNCION PARA LISTAR EXAMENES EN EL HORARIO
    function listar_examenes() {
        const dato = {
            id_p: selectedId
        };
        $.ajax({
            url: "../php/examen/listar.php",
            type: "POST",
            data: dato,
            success: function(respo) {
                const re = JSON.parse(respo);
                re.forEach(res => {
                    $(`#${res.direccion}`).html(`<div class="text-danger examen ${res.direccion}" value="${res.id_r}">
                        <div>Examen</div>
                    </div>`);
                });
            }
        });
    }

    //FUNCION PARA LIMPIAR HORARIO CON EL BOTON DE CLOSE

    function limpiar() {
        const dato = {
            id_p: selectedId
        };
        $.ajax({
            url: "../php/register/listar.php",
            type: "POST",
            data: dato,
            success: function(respo) {
                const re = JSON.parse(respo);
                re.forEach(res => {
                    $(`#${res.direccion}`).text("");
                });
            }
        });
    }

    function limpiarTodo() {
        $.ajax({
            url: "../php/generar_h/limpiar.php",
            type: "GET",
            success: function(respo) {
                const re = JSON.parse(respo);
                re.forEach(res => {
                    $(`#${res.direccion}`).text("");
                });
            }
        });
    }

    //GENERAR HORARIO INTELIGENTE

    $(document).on('click', '#btn_prueba', function() {

        const dato = {
            id_h: selectedHorarioId,
            turno: selectedPeriod
        };

        //SE REALIZA LA COLSULTA A LA BASE DE DATOS

        $.ajax({
            url: "../php/generar_h/generar_horario.php",
            type: "POST",   
            data: dato,
            success: function(response) {
                const re = JSON.parse(response);    
                const array = [];
                const array_index_a = [];
                const array_index_b = [];
                const array_direccion = [];
                for (let i = 0; i < re.length; i++) {
                    if (array.includes(re[i].direccion)) {                
                        array_direccion.push(re[i].direccion);
                        array_index_a.push(array.indexOf(re[i].direccion));
                        array_index_b.push(i);
                    } else {
                        array.push(re[i].direccion);  
                    } 
                }
                const elementos_repetidos_a = [];
                const elementos_repetidos_b = [];
                for (let i = 0; i < array_index_a.length; i++) {
                    elementos_repetidos_a.push(re[array_index_a[i]]);
                    elementos_repetidos_b.push(re[array_index_b[i]]);
                }
                const prioridad = [];
                const no_prioridad = [];
                const resultado = {};
                //aqui se almacen los datos en => resultado
                re.forEach(el => (resultado[el.id] = resultado[el.id] + 1 || 1));  
                //este for sirve para ir almacenando los datos en => prioridad y => no_prioridad
                for (let i = 0; i < elementos_repetidos_a.length; i++) {
                    //aqui se compara para ver quien tenie mayor o menor disponibilidad y se almacenan en => priodad y => no_prioridad
                    if (resultado[elementos_repetidos_a[i].id] > resultado[elementos_repetidos_b[i].id]) {
                        prioridad.push(elementos_repetidos_b[i]);
                        no_prioridad.push(elementos_repetidos_a[i]);
                        const index = elementos_repetidos_a[i].id;
                        const num_restar = resultado[elementos_repetidos_a[i].id];
                        resultado[index] = num_restar -1;  
                    }
                    //lo mismo que arriba ^_^, solo que aqui se realiza con los elementos del grupo b
                    else if (resultado[elementos_repetidos_a[i].id] < resultado[elementos_repetidos_b[i].id]) {
                        const index = elementos_repetidos_b[i].id;
                        const num_restar = resultado[elementos_repetidos_b[i].id];
                        resultado[index] = num_restar - 1;
                        console.log(resultado);

                        console.log ('Se repite mas veces b => ', resultado[elementos_repetidos_b[i].id], ' | id = ',elementos_repetidos_b[i].id)
                        prioridad.push(elementos_repetidos_a[i]);
                        no_prioridad.push(elementos_repetidos_b[i]);
                    } else {
                        const index = elementos_repetidos_b[i].id;
                        const num_restar = resultado[elementos_repetidos_b[i].id];
                        resultado[index] = num_restar - 1;
                        console.log(resultado);
                        console.log ('=> ', resultado[elementos_repetidos_b[i].id], ' | id = ',elementos_repetidos_b[i].id)
                        prioridad.push(elementos_repetidos_a[i]);
                        no_prioridad.push(elementos_repetidos_b[i]);
                    }
                }
                for (let i = 0; i < no_prioridad.length; i++) {         
                    const index = re.findIndex(res => res.id_r === no_prioridad[i].id_r);

                    if (index !== -1) {
                        re.splice(index, 1);         
                    }
                }
                //se imprimen los datos ya pasados por el algoritmo de PRIORIDAD
                re.forEach(res => {
                    $(`#${res.direccion}`).html(`<div class="text-success ${res.direccion}" value="${res.id_r}">
                        <div>${res.curso}</div>
                        <div>(${res.nombre_p})</div>
                    </div>`);
                });
                listar_examenes(); // Llamar a listar_examenes después de listar registros normales
                if (selectedPeriod === 'Mañana') {
                    $('#calendario').modal('show');
                } else if (selectedPeriod === 'Tarde') {
                    $('#calendario2').modal('show');
                } else if (!$('#inlineCheckbox1').is(':checked') && !$('#inlineCheckbox2').is(':checked')) {
                    showAlert("Seleccione AM o PM"); 
                    return false;
                }
            }
        });
    });
    $('#btnVolver').click(function(){
        borrar_localstorage()
    })

    function borrar_localstorage()
    {
        localStorage.removeItem('selectedHorarioText');
        localStorage.removeItem('horariosGenerados');
        localStorage.removeItem('selectedHorarioId');
        localStorage.removeItem('selectedPeriod');
    }
});
