$(document).ready(function() {
    borrar_localstorage();
    listar_horarios();

    const direccion2024 =   
    [
        "lu8-AM","ma8-AM","mi8-AM","ju8-AM","vi8-AM","sa8-AM","do8-AM",
        "lu11-AM","ma11-AM","mi11-AM","ju11-AM","vi11-AM","sa11-AM","do11-AM",
        "lu12-AM","ma12-AM","mi12-AM","ju12-AM","vi12-AM","sa12-AM","do12-AM", 
        "lu14-PM","ma14-PM","mi14-PM","ju14-PM","vi14-PM","sa14-PM","do14-PM",
        "lu17-PM","ma17-PM","mi17-PM","ju17-PM","vi17-PM","sa17-PM","do17-PM",
        "lu20-PM","ma20-PM","mi20-PM","ju20-PM","vi20-PM","sa20-PM","do20-PM"
    ]
    let selectedCourse = "";
    let selectedTeacher = "";
    let selectedHorarioText = localStorage.getItem('selectedHorarioText') || ""; // Obtener el nombre del horario del localStorage
    let selectedHorarioId = localStorage.getItem('selectedHorarioId') || ""; // Obtener el ID del horario del localStorage
    let selectedPeriod = localStorage.getItem('selectedPeriod') || "";
    let selectedId = "";
    let selectedIdRegistro = "";
    let deleteId = null; // Variable para almacenar el ID del elemento a eliminar

    let modoExamen = false; // Variable para controlar el modo examen
    let modoHorario = false; // Variable para controlar el modo horario

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
    listar_otras_preferencias();

    // Mostrar/Ocultar barra de herramientas
    $('#toolbarIcon').click(function() {
        $('#toolbarContent').toggle();
    });

    function listarNumeroRegistro()
    {
        numerico = localStorage.getItem('numero')
            const data = {
                turno: selectedPeriod,
                numerico: numerico
            };
            $.ajax({
                url:  "../php/profesor/listNumerico.php",
                type: "POST",
                data: data,
                success: function(response) {
                    respuesta = JSON.parse(response); 
                        localStorage.setItem('numerosArray', JSON.stringify(respuesta));
                }
            });    
    }

    function listarNumerico()
    {
        numerico = ""
        if (!selectedPeriod)          
            {
                console.log('esperando por elegir turno');
            }
        else {
            const data = {
                turno: selectedPeriod,
                numerico: numerico
            };
            $.ajax({
                url:  "../php/profesor/listNumerico.php",
                type: "POST",
                data: data,
                success: function(response) {
                    respuesta = JSON.parse(response);
                    if(respuesta.length === 0)
                    {
                        console.log('Sin registros de profesores en listar numerico');
                    }
                    else
                    {
                        localStorage.setItem('numerico', respuesta[0].numerico);    
                    }
                }
            });
        }      
    }

    function listarNumerico_horario() {
        let numerico = 0;
        $.ajax({
            url: "../php/horario_generados/list.php",
            type: "GET",
            success: function(response) {
                let respuesta = JSON.parse(response);
    
                if (respuesta.length === 0) {
                    numerico = 1; // Si no hay datos, empieza desde 1
                    numerico = parseInt(numerico);
                } else {
                    respuesta.reverse();
                    numerico = respuesta[0].numerico; // Incrementa el valor del primer objeto
                    numerico = parseInt(numerico);
                    numerico += 1;
                } 
                localStorage.setItem('numerico_horario', numerico); // Guarda el valor actualizado
            },
            error: function(err) {
                console.error("Error al obtener los datos:", err);
            }
        });
    }
    
    // Evento para el formulario de agregar profesor
    $(document).on("submit", "#modal1", function(e) {
        e.preventDefault();
        let num;
        let url = "../php/profesor/insert.php";
        if(!localStorage.getItem('numerico'))
        {
            num = 1;
        }
        else {
            num = parseInt(localStorage.getItem('numerico'), 10);  
            num += 1;
        }
        const data = {
            nombre: $("#nombre").val(),
            curso: $("#curso").val(),
            id_h: selectedHorarioId,
            bloques: $('#bloques').val(),
            turno: "Mañana",
            numerico: num
        };
        $.ajax({
            url: url,
            data: data,
            type: "POST",
            success: function(response) {
                listar();
                $('#staticBackdrop').modal('hide');
                resetForm();
                listarNumerico();
            }
        });
        let turno = ['Mañana', 'Tarde'];
        horarios = localStorage.getItem('horarios');
        horarios = JSON.parse(horarios);
        console.log(horarios);
        console.log(turno.length);
        for(i=0; i < turno.length; i++)
            {
                if(selectedPeriod != turno[i])
                    {
                        for (e=0; e < horarios.length; e++)
                            {
                                const data = {
                                    nombre: $("#nombre").val(),
                                    curso: $("#curso").val(),
                                    id_h: horarios[e].id,
                                    bloques: $('#bloques').val(),
                                    turno: turno[i],
                                    numerico: num
                                };
                                $.ajax({
                                    url: "../php/profesor/insert.php",
                                    data: data,
                                    type: "POST",
                                    success: function(response) {
                                        console.log('se ingreso ok', response);
                                    }
                                })
                            }
                    }
    
            }
        for (i=0; i < horarios.length; i++)
        {
            if (parseInt(horarios[i].id) === parseInt(selectedHorarioId)) {
                continue; // Omitir esta iteración si es igual a selectedHorarioId
            }
            else
            {
                const data = {
                    nombre: $("#nombre").val(),
                    curso: $("#curso").val(),
                    id_h: horarios[i].id,
                    bloques: $('#bloques').val(),
                    turno: selectedPeriod,
                    numerico: num
                };
                $.ajax({
                    url: "../php/profesor/insert.php",
                    data: data,
                    type: "POST",
                    success: function(response) {
                        console.log('se ingreso ok', response);
                    }
                })
            }
        }

    });

    // Función para listar los profesores FFFFFFFFFFFF
    function listar_horarios() {

        $.ajax({
            url: '../php/horario/listar_horarios.php',
            type: 'GET',
            success: function (response)
            {
                const horari = JSON.parse(response);
                const dato = {
                    id_h: selectedHorarioId,
                    turno: selectedPeriod
                }
                $.ajax({
                    url: '../php/profesor/lista.php',
                    type: 'POST',
                    data: dato,
                    success: function(r) {
                        const profesor = JSON.parse(r);
                        agg_horarios = [];
                        // Comprobar si hay algún horari.id que no exista en profesor.id_h
                        if (horari.length > 0 && profesor.length > 0) {
                            horari.forEach(horario => {
                                // Verificar si el id del horario existe en profesor.id_h
                                const existe = profesor.some(prof => prof.id_h === horario.id);                             
                                // Si no existe, mostramos el resultado en consola
                                if (!existe) {
                                    console.log(`El horario con id ${horario.id} no existe en profesor.id_h`);
                                    agg_horarios.push(horario.id);
                                }
                            });
                        }
                        profesores = [];
                        for (i=0; i< profesor.length;i++)
                        {
                            if(profesor[0].id_h === profesor[i].id_h)
                            {
                                profesores.push(profesor[i]);
                            }
                        }
                        console.log('profesores => ', profesores );
                        console.log('agg_horario', agg_horarios);
                        if(agg_horarios.length > 0)
                        {
                            turno = ['Mañana', 'Tarde'];
                            for(i=0;i<agg_horarios.length;i++)   
                            {
                                for(u=0;u<turno.length;u++)
                                {
                                    for(e=0;e<profesores.length;e++)
                                    {
                                        const data = 
                                        {
                                            nombre: profesores[e].nombre_p,
                                            curso: profesores[e].curso,
                                            id_h: agg_horarios[i],
                                            bloques: profesores[e].bloques,
                                            turno: turno[u],
                                            numerico: profesores[e].numerico
                                        }
                                        $.ajax({
                                            url: '../php/profesor/insert.php',
                                            data: data,
                                            type: "POST",
                                            success: function(response) {
                                                console.log(response);
                                                registrar_register();
                                            }
                                        });
                                    }                 
                                }   
                            }
                        }                
                    }
                });
            }
        });
    }

    function registrar_register()
    {
        $.ajax ({
            url: '../php/register/listar2.php',
            type: 'GET',
            success: function(r)
            {
                console.log(r);
            }
        });
    }

    // Función para listar los profesores
    function listar() {
        const dato = {
            id_h: selectedHorarioId,
            turno: selectedPeriod
        }
        $.ajax({
            url: '../php/profesor/list.php',
            type: 'POST',
            data: dato,
            success: function(r) {
                const profesor = JSON.parse(r);
                profesor.sort((a, b) => Number(a.numerico) - Number(b.numerico));
                const calculo = profesor.length;
                let template = "";
                if (calculo === 0) {
                    const enfoque = `
                    <tr>
                        <td colspan="3"> No hay Profesores Registrados</td>
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
                                <button value="${element.id}" class="btn btn-primary tool-action default-action calendarios" data-numerico=${element.numerico} data-id="${element.id}" data-curso="${element.curso}" data-nombre="${element.nombre_p}" data-bloques="${element.bloques}">
                                    <i class="bi bi-calendar2-week "></i>
                                </button>
                            </td>
                        </tr>
                        `;
                    });
                    $('#lista').html(template);
                    numerico = profesor.length;
                    localStorage.setItem('numerico', numerico);
                    attachEvents();
                }
            }
        });
    }

    function listar2() {
        const dato = {
            id_h: selectedHorarioId,
            turno: selectedPeriod
        }
        $.ajax({
            url: '../php/profesor/list02.php',
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
                        <tr id="${element.id}" class="menu profe" data-nombre="${element.nombre_p}" data-curso="${element.curso}" data-id="${element.id}" data-bloques="${element.bloques}" data-turno="${element.turno}"data-activo="on">
                            <td>${element.nombre_p}</td>
                            <td>${element.curso}</td>
                        </tr>
                        `;
                    });
                    $('#lista-002').html(template);
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
        if (!selectedHorarioId || !selectedPeriod) { // verificar si hay un horario seleccionado
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
            listar();
            listarNumerico();
            $('#turno_profesor').val(selectedPeriod);
        } else {
            selectedPeriod = "";
            localStorage.removeItem('selectedPeriod');
            listar();
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
            listarNumerico();
            listar();
            localStorage.setItem('selectedPeriod', selectedPeriod);
            $('#turno_profesor').val(selectedPeriod);
        } else {
            selectedPeriod = "";
            listar();
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
                    listar_examenes();

                    $('#nombre-horario-am').text(selectedHorarioText); // Actualizar el nombre del horario en el modal AM
                } else if ($('#inlineCheckbox2').is(':checked')) {
                    $('#calendario').modal('hide');
                    $('#calendario2').modal('show');
                    listar_registros(); //LISTA LOS REGISTRO DE CADA PROFESOR EN EL HORARIO
                    listar_examenes();

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
            numerico = localStorage.getItem('numero');
            console.log(numerico);
            const data = {
                id: id,
                nombre: $("#nombre").val(),
                curso: $("#curso").val(),
                numerico: numerico
            };
            $.ajax({
                url: "../php/profesor/editar.php",
                data: data,
                type: "POST",
                success: function(response) {
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
                localStorage.setItem('horarios', JSON.stringify(horarios));
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
        numerico = localStorage.getItem('numero');
            $.ajax({
                url: "../php/profesor/delete.php",
                data: { numerico: numerico},
                type: "POST",
                success: function(response) {
                    listar();
                    resetButtons();
                    resetForm();
                    $('#confirmDeleteModal').modal('hide'); // Oculta el modal de confirmación
                }
            });
        
    });

    // Evento para el botón de cerrar en el modal de alerta
    $('#alertModal .btn-primary').click(function() {
        $('#alertModal').modal('hide');
    });

    // Evento para manejar el clic en las celdas del horario
    $(document).on('click', '.mañana, .tarde', function() {
        const element = $(this).attr('id');
        const tiempo = element.split('-')[1];
        localStorage.setItem('direccion',element);

        if (modoExamen) {
            // Modo Examen activado, insertar o eliminar exámenes
            if ($(`.${element}`).hasClass('examen')) {
                $(`.${element}`).removeClass('examen').empty();

                const dato = {
                    direccion: element,
                    id_h: selectedHorarioId
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
                    id_h: selectedHorarioId,
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
        } else if (!modoHorario) {
            // Modo normal, insertar o eliminar clases
            if ($(`.${element}`).length) {  
                $(`.${element}`).remove();
                $(`#${element}`).removeClass('border-danger border-3');
                let numerosArray = JSON.parse(localStorage.getItem('numerosArray'));
                console.log(numerosArray, "Eliminar registro , parte Numerico");
                for (i=0; i<numerosArray.length; i++)
                    {
                        if(numerosArray[i].id_h === selectedHorarioId )
                        {
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
                                    $(`#${element}`).val("");                           
                                }
                            });
                        }
                        else 
                        {
                            const dato = {
                                direccion: element,
                                id_p: numerosArray[i].id
                            };
                            $.ajax({
                                url: "../php/register/delete.php",
                                type: "POST",
                                data: dato,
                                success: function(result) {
                                    console.log("Registro eliminado:", result);
                                    $(`#${element}`).val("");                                                   
                                }
                            });
                        }
                    }             
            } else {
                //RESUMIR LA LATENCIA DEL INSERTAR
                const parte = $(this).data('dia');
                const hora = $(this).attr('value');
                const numerico = localStorage.getItem('numero');
                let numerosArray = JSON.parse(localStorage.getItem('numerosArray'));
                console.log(numerosArray, "Inserte , parte Numerico");
                let datas = {};
                for (i=0; i<numerosArray.length; i++)
                {
                    if(numerosArray[i].id_h === selectedHorarioId )
                    {
                        const [hora_inicial2_i, hora_inicial2_f] = hora.split('-');
                        datas = {
                            disponibilidad_i: hora_inicial2_i,
                            disponibilidad_f: hora_inicial2_f,
                            dia: parte,
                            tiempo: tiempo,
                            id_p: selectedId,
                            direccion: element,
                            turno: selectedPeriod,
                            numerico: numerico
                        }
                        dato = {
                            id_p: selectedId
                        }
    
                        $.ajax({
                            url: "../php/register/insert_r.php",
                            data: datas,
                            type: "POST",
                            success: function(response) {
                                console.log(response);
                                listar_registros();
                            }
                        });
                    }
                    else 
                    {
                        const [hora_inicial2_i, hora_inicial2_f] = hora.split('-');
                        datas = {
                            disponibilidad_i: hora_inicial2_i,
                            disponibilidad_f: hora_inicial2_f,
                            dia: parte,
                            tiempo: tiempo,
                            id_p: numerosArray[i].id,
                            direccion: element,
                            turno: selectedPeriod,
                            numerico: numerico
                        }
                        dato = {
                            id_p: selectedId
                        }   
                        $.ajax({
                            url: "../php/register/insert_r.php",
                            data: datas,
                            type: "POST",
                            success: function(response) {
                                console.log(response);
                                listar_registros();
                            }
                        });
                    }
                }               
            }
        }
    });

    $(document).on('click', '.h1Bloques', function() {
        $('#btnCancel5, #btnCancel6').css('display', 'block'); 
        $('.mañana, .tarde').removeClass('menu');
        $('.AM').removeClass('mañana');
        $('.PM').removeClass('tarde');
        $('.AM, .PM').addClass('preferencias');
        });

    $(document).on('click', '#btnCancel5, #btnCancel6 ', function() {
        $('#btnCancel5, #btnCancel6').css('display', 'none');
        $('.AM').addClass('mañana');
        $('.PM').addClass('tarde');
        $('.mañana, .tarde').addClass('menu');
        $('.AM, .PM').removeClass('preferencias');
        });

    $(document).on('click', '.preferencias', function() {
        if ($(this).hasClass('on')) {
            // Si tiene la clase "on", no hace nada
            console.log('El elemento tiene la clase "on" y no se puede modificar');
            showAlert('No se pueden alterar las selecciones de otro horario');
            return; 
        }
        else 
        {
            // Verifica si el elemento ya tiene la clase 'border-danger border-2'
            if ($(this).hasClass('border-danger border-3')) {
                // Si ya la tiene, la quita
                id_r = $(this).val();
                console.log(id_r);
                const dato = {
                    id_r: id_r
                }
                $.ajax ({
                    url: "../php/preferencias/deletePreferen.php",
                    type: "POST",
                    data: dato,
                    success: function(res) {
                        console.log('Delete de Preferencias');
                        listar_preferencias();
                    }
                });
                $(this).removeClass('border-danger border-3');
            } else {
                // Si no la tiene, la agrega          
                direccion = $(this).attr('id');
                id_r = $(this).val();
                if(!id_r)
                {
                    showAlert('No puede seleccionar un bloque vacio');
                }
                else
                {
                    $(this).addClass('border-danger border-3');
                    selectedID = localStorage.getItem('selectedID');
                    numerico = localStorage.getItem('numero');
                    nombre = localStorage.getItem('selectedHorarioText');
                    turno = localStorage.getItem('selectedPeriod');
                    console.log(direccion);
                    console.log(id_r);
                    const dato = {
                        id_r: id_r,
                        id_h: selectedHorarioId,
                        id_p: selectedID,
                        direccion: direccion,
                        numerico: numerico,
                        nombre: nombre,
                        turno: turno
                    }
                    $.ajax ({
                        url: "../php/preferencias/insertPrefen.php",
                        type: "POST",
                        data: dato,
                        success: function(res) {
                            console.log('Ingreso de Preferencias');
                            listar_preferencias();
                            localStorage.setItem('id_r', id_r);
                        }
                    });
                }    
            }
        }       
        });
 
    // Evento para cambiar el estado del modo examen
    $(document).on('change', '#modoExamen', function() {
        modoExamen = $(this).is(':checked');
    });

    $(document).on('change', '#modoExamen2', function() {
        modoExamen = $(this).is(':checked');
    });

    //LLAMADA A LA FUNCION LIMPIAR, REALIZANDO CLICK EN LOS BOTONES DE CLOSE, DE LOS MODALES DEL HORARIO

    $('#closeBtn1').click(function() {
        limpiarTodo(); 
        $('.h').removeClass('horarios');
        $('.h').removeClass('menu');

        localStorage.removeItem('color_Array');
        localStorage.removeItem('numerico_horario');
        $('.mañana').removeClass('modal1');
        $('#btnCancel1').css('display', 'none');  
        $('#btnCancel2').css('display', 'none');
        $('#btnCancel3, #btnCancel4').css('display','none');
        $('#btnCancel5, #btnCancel6').css('display', 'none');
        $('.AM').addClass('mañana');
        $('.PM').addClass('tarde');
        $('.mañana, .tarde').addClass('menu');
        $('.AM, .PM').removeClass('preferencias');
        $('.AM, .PM').removeClass('on');
        restaurarModoHorario();
        $('#colorPickerAM').val('#FFFFFF');
        listar();
    });

    $('#closeBtn2').click(function() {
        limpiarTodo();
        $('.h').removeClass('horarios');
        $('.h').removeClass('menu');

        localStorage.removeItem('color_Array');
        localStorage.removeItem('numerico_horario');
        $('.tarde').removeClass('modal2');
        $('#btnCancel1').css('display', 'none'); 
        $('#btnCancel2').css('display', 'none');
        $('#btnCancel3, #btnCancel4').css('display','none');
        $('#btnCancel5, #btnCancel6').css('display', 'none');
        $('.AM').addClass('mañana');
        $('.PM').addClass('tarde');
        $('.mañana, .tarde').addClass('menu');
        $('.AM, .PM').removeClass('preferencias');
        $('.AM, .PM').removeClass('on');
        restaurarModoHorario();
        $('#colorPickerAM').val('#FFFFFF');
        listar();
    });

    // Función para restaurar el modo horario y examen
    function restaurarModoHorario() {
        modoHorario = false;
        modoExamen = false;
        $('.mañana, .tarde').addClass('menu');
        $('.table').addClass('table-hover');
        $('#modoExamenLabel').hide();
        $('#guardarPDF').hide();
        $('#exportarExcel').hide();
        $('#modoExamenLabel2').hide();
        $('#guardarPDF2').hide();
        $('#exportarExcel2').hide();
        attachEvents(); // Reasignar los eventos
    }

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
                    $(`#${res.direccion}`).html(`<div class="text-success ${res.direccion}" data-direccion="${res.direccion}" value="${res.id_r}" >
                        <div>${selectedCourse}</div>
                        <div>(${selectedTeacher})</div>
                    </div>`);
                    $(`#${res.direccion}`).val(`${res.id_r}`);
                });
                listar_preferencias();
                listar_otras_preferencias();
            }
        });
    }
    function listar_preferencias() {
        const dato = {
            id_p: selectedId
        };
        $.ajax({
            url: "../php/preferencias/listarPreferen.php",
            type: "POST",
            data: dato,
            success: function(respo) {
                const re = JSON.parse(respo);
                re.forEach(res => {
                    $(`#${res.direccion}`).addClass('border-danger border-3');
                });  
                
                bloques = re.length;
                data = {
                    id: selectedId,
                    bloques: bloques
                }
                url = "../php/profesor/editarBloques.php";
                $.ajax({
                    url: url,
                    data: data,
                    type: "POST",
                    success: function(response) {
                        console.log('esta bn el editar bloques', bloques);
                    }
                });
            }
        });
    }
    function listar_otras_preferencias() {
        numerico = localStorage.getItem('numero');
        const dato = {
            id_p: selectedId
        };
        $.ajax({
            url: "../php/preferencias/listarNoPreferen.php",
            type: "POST",
            data: dato,
            success: function(respo) {
                const re = JSON.parse(respo);
                re.forEach(res => {
                    if(numerico === res.numerico && selectedId != res.id_p)
                    {
                        $(`#${res.direccion}`).css('opacity', '0.7');
                        $(`#${res.direccion}`).removeClass('menu mañana tarde');
                        $(`#${res.direccion}`).addClass('on');
                        $(`#${res.direccion}`).html(`<div class="text-success ${res.direccion}" data-direccion="${res.direccion}" value="${res.id_r}" >
                            <div>${selectedCourse}</div>
                            <div>(${selectedTeacher})</div>
                            <div>${res.nombre}</div>
                        </div>`);
                    }          
                });              
            }
        });
    }
    function listar_preferencias_horario(){       
        const dato = {
            id_h: selectedHorarioId,
            turno: selectedPeriod
        };
        $.ajax({
            url: "../php/preferencias/listarNoPreferen.php",
            type: "POST",
            data: dato,
            success: function(respo) {
                const re = JSON.parse(respo);
                localStorage.setItem('horario_preferencias', JSON.stringify(re));   
            }
        });
    }


    //FUNCION PARA LISTAR EXAMENES EN EL HORARIO
    function listar_examenes() {
        const dato = {
            id_h: selectedHorarioId
        };
        $.ajax({
            url: "../php/examen/listar.php",
            type: "POST",
            data: dato,
            success: function(respo) {
                const re = JSON.parse(respo);
                re.forEach(res => {
                    $(`#${res.direccion}`).html(`<div class="text-danger  examen ${res.direccion}" value="${res.id_h}">
                        <div>Examen</div>
                    </div>`);
                });
            }
        });
    }
    //FUNCION PARA LIMPIAR HORARIO CON EL BOTON DE CLOSE
    function limpiarTodo() {

        direccion =   
        [
            "lu8-AM","ma8-AM","mi8-AM","ju8-AM","vi8-AM","sa8-AM","do8-AM",
            "lu11-AM","ma11-AM","mi11-AM","ju11-AM","vi11-AM","sa11-AM","do11-AM",
            "lu12-AM","ma12-AM","mi12-AM","ju12-AM","vi12-AM","sa12-AM","do12-AM", 
            "lu14-PM","ma14-PM","mi14-PM","ju14-PM","vi14-PM","sa14-PM","do14-PM",
            "lu17-PM","ma17-PM","mi17-PM","ju17-PM","vi17-PM","sa17-PM","do17-PM",
            "lu20-PM","ma20-PM","mi20-PM","ju20-PM","vi20-PM","sa20-PM","do20-PM"
        ]

        for(i=0;i<direccion.length;i++)
        {
            $(`#${direccion[i]}`).text("");
            $(`#${direccion[i]}`).removeClass("border-danger border-3");
            $(`#${direccion[i]}`).css('opacity', '1');
            $(`#${direccion[i]}`).val("");
            $(`#${direccion[i]}`).css('background-color', `#FFFFFF`);
        }
    }
    //GENERAR HORARIO INTELIGENTE
    $(document).on('click', '.btn_horarios', function() {
        listar_preferencias_horario();

        $('.h').addClass('horarios');
        $('.h').addClass('menu');
        $('#btnAgregar').css('display','block');
        $('#btnAgregar1').css('display','block');
        $('#btnCancel3, #btnCancel4').css('display','none');
        $('.h1Bloques').css('display','none');
        nomb = selectedHorarioText;
        $('#nombre-horario-pm').text(nomb);
        $('#nombre-horario-am').text(nomb);
        // $('.decrease2, .increase2').css('display','none');
        $('.btn-001').css('display','block');
        $('.color01').css('display','block');
        $('.color02').css('display','block');
        $('#checkAM, #checkPM').css('display','block');
        modoHorario = true;
        $('#modoExamenLabel').show();
        $('#modoExamenLabel2').show();
        $('#guardarPDF').show();
        $('#exportarExcel').show();
        $('#guardarPDF2').show();
        $('#exportarExcel2').show();
        $('.mañana, .tarde').removeClass('menu');
        $('.table').removeClass('table-hover');

        listar_examenes(); // Llamar a listar_examenes después de listar registros normales
        if (selectedPeriod === 'Mañana') {
            $('#calendario').modal('show');
        } else if (selectedPeriod === 'Tarde') {
            $('#calendario2').modal('show');
        } else if (!$('#inlineCheckbox1').is(':checked') && !$('#inlineCheckbox2').is(':checked')) {
            showAlert("Seleccione AM o PM"); 
            return false;
        }
    });

    //GENERAR HORARIO INTELIGENTE
    $(document).on('click', '#btnHorario', function() {

        const dato = {
            turno: selectedPeriod,
            id_h: selectedHorarioId
        };
        //SE REALIZA LA COLSULTA A LA BASE DE DATOS // algoritmo prioridad
        $.ajax({
            url: "../php/generar_h/generar_horario.php",
            type: "POST",   
            data: dato,
            success: function(response) {
                const re = JSON.parse(response);
                const horarioPreferencia = JSON.parse(localStorage.getItem('horario_preferencias')) || [];
                function capturarIndicesDeRepetidos(re) {
                    let elementosVistos = {};
                    let indices1 = [];
                    let indices2 = [];         
                    for (let i = 0; i < re.length; i++) {
                        let elemento = re[i].direccion;
                        if (elementosVistos[elemento] !== undefined) {
                            // Si el elemento ya ha sido visto, capturamos los índices
                            indices1.push(elementosVistos[elemento]);
                            indices2.push(i);
                        } else {
                            // Si es la primera vez que vemos el elemento, lo almacenamos
                            elementosVistos[elemento] = i;
                        }
                    }    
                    return { indices1, indices2 };
                }
                let resultado = capturarIndicesDeRepetidos(re);
                const elementos_repetidos_a = [];
                const elementos_repetidos_b = [];
                for (let i = 0; i < resultado.indices1.length; i++) {
                    elementos_repetidos_a.push(re[resultado.indices1[i]]);
                    elementos_repetidos_b.push(re[resultado.indices2[i]]);
                }
                console.log('elementos_repetidos_a => ', elementos_repetidos_a);
                console.log('elementos_repetidos_b => ', elementos_repetidos_b);
                const prioridad = [];
                const no_prioridad = [];
                const result = {};
                //aqui se almacen los datos en => resultado
                re.forEach(el => (result[el.id] = result[el.id] + 1 || 1));  
                //este for sirve para ir almacenando los datos en => prioridad y => no_prioridad
                for (let i = 0; i < elementos_repetidos_a.length; i++) {
                    //aqui se compara para ver quien tenie mayor o menor disponibilidad y se almacenan en => priodad y => no_prioridad
                    const existeEnHorarioA = horarioPreferencia.some(horario => horario.id_r === elementos_repetidos_a[i].id_r);
                    const existeEnHorarioB = horarioPreferencia.some(horario => horario.id_r === elementos_repetidos_b[i].id_r);
                    if(existeEnHorarioA === true && existeEnHorarioB === false)
                    {
                        prioridad.push(elementos_repetidos_a[i]);
                        no_prioridad.push(elementos_repetidos_b[i]);
                        const index = elementos_repetidos_b[i].id;
                        const num_restar = result[elementos_repetidos_b[i].id];
                        result[index] = num_restar -1;           
                    }
                    else if (existeEnHorarioB === true && existeEnHorarioA === false)
                    {
                        prioridad.push(elementos_repetidos_b[i]);
                        no_prioridad.push(elementos_repetidos_a[i]);
                        const index = elementos_repetidos_a[i].id;
                        const num_restar = result[elementos_repetidos_a[i].id];
                        result[index] = num_restar -1; 
                    }
                    else if (existeEnHorarioB === false && existeEnHorarioA === false || existeEnHorarioB === true && existeEnHorarioA === true)
                    {
                        if (result[elementos_repetidos_a[i].id] > result[elementos_repetidos_b[i].id]) 
                        {
                            prioridad.push(elementos_repetidos_b[i]);
                            no_prioridad.push(elementos_repetidos_a[i]);
                            const index = elementos_repetidos_a[i].id;
                            const num_restar = result[elementos_repetidos_a[i].id];
                            result[index] = num_restar -1;  
                        }
                        //lo mismo que arriba ^_^, solo que aqui se realiza con los elementos del grupo b
                        else if (result[elementos_repetidos_a[i].id] < result[elementos_repetidos_b[i].id]) 
                        {
                            prioridad.push(elementos_repetidos_a[i]);
                            no_prioridad.push(elementos_repetidos_b[i]);
                            const index = elementos_repetidos_b[i].id;
                            const num_restar = result[elementos_repetidos_b[i].id];
                            result[index] = num_restar - 1;
                        } else if (result[elementos_repetidos_a[i].id] === result[elementos_repetidos_b[i].id]) 
                        {
                            prioridad.push(elementos_repetidos_a[i]);
                            no_prioridad.push(elementos_repetidos_b[i]);
                            const index = elementos_repetidos_b[i].id;
                            const num_restar = result[elementos_repetidos_b[i].id];
                            result[index] = num_restar - 1;
                        }
                    }
                    }
                    
                for (let i = 0; i < no_prioridad.length; i++) {         
                    const index = re.findIndex(res => res.id_r === no_prioridad[i].id_r);
                    if (index !== -1) {
                        re.splice(index, 1);         
                    }
                }

                horarioPe = [];
                selectedHorarioId = localStorage.getItem('selectedHorarioId');
                // Verifica si selectedHorarioId no es nulo
                if (selectedHorarioId !== null) {
                    const selectedId = parseInt(selectedHorarioId); // Convertir a entero

                    horarioPreferencia.forEach(horario => {
                        if (selectedId === parseInt(horario.id_h)) {
                            horarioPe.push(horario);
                        }
                    });
                }
      
                console.log('selectedHorarioId: ', selectedHorarioId);
                console.log('horarioPreferencia: ', horarioPreferencia);
                console.log('horarioPea: ', horarioPe);
        
                let horario_pre = []; // Inicializar horario_pre

                for (let i = 0; i < re.length; i++) {
                    for (let e = 0; e < horarioPe.length; e++) { // Corregir la condición
                        if (re[i].id_r === horarioPe[e].id_r) {
                            horario_pre.push(re[i]);
                            break; // Salir del bucle interno al encontrar una coincidencia
                        }
                    }
                }
           
                console.log('horarioPre: ', horario_pre);

                let limite_bloques = [];
                let descartados = [];
                let contador_bloques = {};
                // Primera pasada: Agregar los elementos de `re` que cumplan con las reglas
                for (let i = 0; i < re.length; i++) {
                    let id_actual = re[i].id;
                    let bloques_permitidos = parseInt(re[i].bloques); // Convertir 'bloques' a número
                    if (!contador_bloques[id_actual]) {
                        contador_bloques[id_actual] = 0;
                    }
                    // Verificamos si aún podemos agregar más registros para este id
                    if (contador_bloques[id_actual] < bloques_permitidos) {
                        let agregado = false; 
                        for (let e = 0; e < horario_pre.length; e++) {
                            if (re[i].id_r === horario_pre[e].id_r) {
                                // Solo agregar si la dirección no existe en limite_bloques
                                if (!limite_bloques.some(item => item.direccion === re[i].direccion)) {
                                    limite_bloques.push(re[i]); 
                                    contador_bloques[id_actual]++; 
                                }
                                agregado = true; 
                                break; 
                            }
                        }
                        if (!agregado) {
                            descartados.push(re[i]);
                        }
                    } else {
                        descartados.push(re[i]);
                    }
                }
                for (let i = 0; i < re.length; i++) {
                    let id_actual = re[i].id;
                    let bloques_permitidos = parseInt(re[i].bloques);
                    while (contador_bloques[id_actual] < bloques_permitidos) {
                        let encontrado = false;
                
                        for (let j = 0; j < descartados.length; j++) {
                            if (descartados[j].id === id_actual) {
                                // Verificar que la dirección no esté ya en limite_bloques
                                if (!limite_bloques.some(item => item.direccion === descartados[j].direccion)) {
                                    limite_bloques.push(descartados[j]); 
                                    contador_bloques[id_actual]++;
                                    descartados.splice(j, 1); 
                                    encontrado = true;
                                    break; 
                                }
                            }
                        }
                        if (!encontrado) {
                            break;
                        }
                    }
                }
                // Verificar si hay ids en limite_bloques que no han alcanzado su límite y completarlos desde nuevo
                for (let i = 0; i < limite_bloques.length; i++) {
                    let id_actual = limite_bloques[i].id;
                    let bloques_permitidos = parseInt(limite_bloques[i].bloques);

                    // Si este id no ha alcanzado su límite de bloques
                    while (contador_bloques[id_actual] < bloques_permitidos) {
                        let encontrado = false;

                        // Buscar en el array nuevo si hay algún elemento con el mismo id
                        for (let j = 0; j < elementos_repetidos_b.length; j++) {
                            if (elementos_repetidos_b[j].id === id_actual) {
                                // Verificar que la dirección no esté ya en limite_bloques
                                if (!limite_bloques.some(item => item.direccion === elementos_repetidos_b[j].direccion)) {
                                    limite_bloques.push(elementos_repetidos_b[j]);
                                    contador_bloques[id_actual]++; // Actualizar el contador de bloques para este id
                                    encontrado = true;
                                    break; // Salir del ciclo una vez que se ha agregado un elemento
                                }
                            }
                        }
                        // Si no se encontró ningún elemento en el array nuevo para este id, salir del bucle
                        if (!encontrado) {
                            break;
                        }
                    }
                }
           
                console.log('limite_bloques completado =>', limite_bloques);
                console.log('Elementos descartados =>', descartados);

                localStorage.setItem('horario_generado', JSON.stringify(limite_bloques));
                localStorage.setItem('nuevo_horario_generado', JSON.stringify(limite_bloques));
                limite_bloques.forEach(res => {
                        $(`#${res.direccion}`).html(`<div class="text-success ${res.direccion}" value="${res.id_r}">
                            <div>${res.curso}</div>
                            <div>(${res.nombre_p})</div>
                        </div>`);
                });

            }    
        });
    });

    $('#btnVolver').click(function(){
        borrar_localstorage();
    });

    function borrar_localstorage()
    {
        localStorage.clear();
    }

    $(document).on('click', '.calendarios' ,function(){
        
        $('.PM').addClass('.tarde');
        $('.AM').addClass('.mañana');
        $('#btnCancel3, #btnCancel4').css('display','none');
        $('#btnAgregar').css('display','none');
        $('#btnAgregar1').css('display','none');
        $('.btn-001').css('display','none');
        $('.color01').css('display','none');
        $('.color02').css('display','none');
        $('#checkAM, #checkPM').css('display','none');
        $('.decrease2, .increase2').css('display','block');
        $('.h1Bloques').css('display','block');
        selectedBloques = $(this).data('bloques');
        selectedNombre = $(this).data('nombre');
        selectedCurso = $(this).data('curso');
        $('#cantidadBloques').text(selectedBloques);
        $('#cantidadBloques2').text(selectedBloques);
        localStorage.setItem('selectedBloques', selectedBloques);
        const selectedID = $(this).data('id');
        localStorage.setItem('selectedID', selectedID);
        localStorage.setItem('selectedNombre', selectedNombre);
        localStorage.setItem('selectedCurso', selectedCurso);

        numerico = $(this).data('numerico');
        console.log('estoy', numerico);
        localStorage.setItem('numero', numerico)

        listarNumeroRegistro();
        })
    $(document).on('click', '.btn-001', function(){
        $('#modal-001').modal('show');
        listar2();
    });
    $(document).on('click', '.profe', function(){     
        $('.mañana, .tarde').addClass('menu');
        $('.mañana').addClass('modal1');
        $('.tarde').addClass('modal2');
        $('#modal-001').modal('hide');
        $('#btnCancel1').css('display', 'block');
        $('#btnCancel2').css('display', 'block');
        nombre = $(this).data('nombre');
        curso = $(this).data('curso');
        bloques = $(this).data('bloques');
        id = $(this).data('id');
        activo = $(this).data('activo');
        localStorage.setItem('curso', curso);
        localStorage.setItem('nombre', nombre);
        localStorage.setItem('id', id);
        localStorage.setItem('bloques', bloques);
        localStorage.setItem('activo', activo);
        activoColor = localStorage.getItem('colorActivo');    

        if(activoColor === 'color')
        {
            $('.mañana, .tarde').removeClass('menu');
            $('.mañana').removeClass('modal1');
            $('.tarde').removeClass('modal2');
        }
    });
    $(document).on('click', '.modal1, .modal2', function(){
        direccion = localStorage.getItem('direccion');
        nombre = localStorage.getItem('nombre');
        curso = localStorage.getItem('curso');
        bloques = localStorage.getItem('bloques');
        id = localStorage.getItem('id');
        selectedPeriod = localStorage.getItem('selectedPeriod');
        let elemento = { direccion: direccion, nombre_p: nombre, curso: curso, id_h: selectedHorarioId, id: id, turno: selectedPeriod, bloques: bloques };
        let horario = JSON.parse(localStorage.getItem('nuevo_horario_generado')) || [];
        if ($(`.${direccion}`).length) {  
            $(`.${direccion}`).remove();
             // Filtrar el array 'horario' para eliminar el elemento con la dirección especificada
            horario = horario.filter(function(element) {
                return element.direccion !== direccion;
            });
            localStorage.setItem('nuevo_horario_generado', JSON.stringify(horario));
            console.log("Array actualizado en localStorage:", horario);
                }
        else {
            $(`#${direccion}`).html(`<div class="text-success ${direccion}">
                <div>${curso}</div>
                <div>(${nombre})</div>
            </div>`);
            horario.push(elemento);
            localStorage.setItem('nuevo_horario_generado', JSON.stringify(horario));
            agregarElementoAlArray(direccion);
            function agregarElementoAlArray(nuevoElemento) {
                let miArray = JSON.parse(localStorage.getItem('miArray')) || [];
                miArray.push(nuevoElemento);
                localStorage.setItem('miArray', JSON.stringify(miArray));
            }
        }
    });

    $(document).on('click', '#btnCancel1', function(){
        $('#btnCancel1').css('display', 'none');
        $('.mañana').removeClass('modal1');
        $('.tarde').removeClass('modal2');
        $('.mañana, .tarde').removeClass('menu');
        localStorage.removeItem('activo');
        localStorage.removeItem('nuevo_horario_generado');
        let horario = JSON.parse(localStorage.getItem('horario_generado')) || [];
        localStorage.setItem('nuevo_horario_generado', JSON.stringify(horario));

    });
    $(document).on('click', '#btnCancel2', function(){
        $('#btnCancel2').css('display', 'none');
        $('.mañana').removeClass('modal1');
        $('.tarde').removeClass('modal2');
        $('.mañana, .tarde').removeClass('menu');
        localStorage.removeItem('activo');
        let horario = JSON.parse(localStorage.getItem('horario_generado')) || [];
        localStorage.setItem('nuevo_horario_generado', JSON.stringify(horario));
    });

    $(document).on('click', '#checkAM, #checkPM', function(){
        listarNumerico_horario();
        $('.mañana, .tarde').removeClass('menu');
        $('.mañana').removeClass('modal1');
        $('.tarde').removeClass('modal2');
        $('#btnCancel3, #btnCancel4').css('display','block');
        colorActivo = $(this).data('color');
        localStorage.setItem('colorActivo', colorActivo);
        $(".PM").addClass('colores');
        $(".AM").addClass('colores');
    });
    $(document).on('click', '#btnCancel3, #btnCancel4', function(){
        $('.mañana, .tarde').addClass('menu');
        $('.mañana').addClass('modal1');
        $('.tarde').addClass('modal2');
        $('#btnCancel3, #btnCancel4').css('display','none');
        localStorage.removeItem('colorActivo');
        $(".PM").removeClass('colores');
        $(".AM").removeClass('colores');     
    });
    $(document).on('click', '#btnAgregar', function(){
        $('#staticBackdropLabel3').text('Guardar Horario');
        $('#nombreHorario').val("");
        $('#horarioGuardar').modal('show');    
        listarNumerico_horario();      
    });
    function ingresar_colores_horario()
    {     
        colores = JSON.parse(localStorage.getItem('color_Array'));
        numerico =localStorage.getItem('numerico_horario');
        for (i=0; i<colores.length; i++)
        {
            color = colores[i].color;
            direccion = colores[i].direccion;
            num = numerico;

            data = {
                id_h: selectedHorarioId,
                color: color,
                direccion: direccion,
                numerico: num      
            }

            $.ajax({
                url: '../php/colores/insert_c.php',
                data: data,
                type: 'POST',
                success: function(response)
                {
                    console.log(response);
                }
            })
        }
    }

    $(document).on('click', '.colores', function(){
        let color_generado = JSON.parse(localStorage.getItem('color_Array')) || [];
        color = localStorage.getItem('colorArray');
        direccion = localStorage.getItem('direccion');  
        console.log(color, 'color', direccion, 'direccion'); 
        let colorArray = 
        {
            color: color,
            direccion: direccion
        }   
        color_generado.push(colorArray);
        localStorage.setItem('color_Array', JSON.stringify(color_generado));
    });
    $(document).on('click', '#btnGuardar1', function(){    
        nombreHorario = $('#nombreHorario').val();
        guardar = JSON.parse(localStorage.getItem('nuevo_horario_generado'));
        numerico =localStorage.getItem('numerico_horario');
        console.log(numerico);
        for (i=0;i<guardar.length;i++)
        {
            data = {
                nombre_horario: nombreHorario,
                nombre_p: guardar[i].nombre_p,
                curso: guardar[i].curso,
                turno: guardar[i].turno,
                id_h: guardar[i].id_h,
                id_p: guardar[i].id,
                direccion: guardar[i].direccion,
                bloques: guardar[i].bloques,
                numerico: numerico
            }  
            $.ajax({
                url: "../php/horario_generados/insert_h.php",
                data: data,
                type: "POST",
                success: function(response) {
                    console.log(response);                          
                }
            });
        }
        ingresar_colores_horario(); 
        $('#horarioGuardar').modal('hide'); 
    });

     function listar_horarios_generados() {
        $.ajax({
            url: '../php/horario_generados/list.php',
            type: 'GET',
            success: function(r) {
                const profesor = JSON.parse(r);
                const calculo = profesor.length;
                let template = "";
                if (calculo === 0) {
                    const enfoque = `
                    <tr>
                        <td colspan="3"> No hay Horarios Guardados</td>
                    </tr>
                    `;
                    $('#lista-003').html(enfoque);          
                } else {
                    for(i=0;i<profesor.length;i++)
                    {
                        if(i === 0 || profesor[i].numerico !== profesor[i-1].numerico)
                        {
                            template += `
                            <tr class="numerico-${profesor[i].numerico} text-center menu ">
                                <td class="listar-horario" data-numerico="${profesor[i].numerico}">${profesor[i].nombre_horario}</td>
                                <td class="listar-horario" data-numerico="${profesor[i].numerico}">${profesor[i].creado_en}</td>
                                <td>
                                    <button value="${profesor[i].numerico}" class="btn btn-primary editar_horario" data-numerico="${profesor[i].numerico}"  data-nombre="${profesor[i].nombre_horario}" data-creado="${profesor[i].creado_en}">
                                       <i class="bi bi-pencil"></i>
                                    </button>
                                </td>
                                <td>
                                    <button value="${profesor[i].numerico}" class="btn btn-primary eliminar_horario " data-numerico="${profesor[i].numerico}"  data-nombre="${profesor[i].nombre_horario}" data-creado="${profesor[i].creado_en}">
                                        <i class="bi bi-trash "></i>
                                    </button>
                                </td>
                            </tr>
                            `;
                        }     
                    }          
                    $('#lista-003').html(template);
                }
            }
        });
    }

    $(document).on('click', '.listar-horario', function(){
        $('#modal-004').modal('hide'); 
       limpiarTodo();
       numerico = $(this).data('numerico');

       data ={
        numerico: numerico
       }
       
       $.ajax ({
        url: "../php/colores/list.php",
        data: data,
        type: "POST",
        success: function(response)
        {
            res = JSON.parse(response);
            localStorage.setItem('color_Array', JSON.stringify(res));

            for (i=0; i < res.length; i++)
            {
                $(`#${res[i].direccion}`).css('background-color', `${res[i].color}`);              
            }
        }
       });
       $.ajax ({
        url: "../php/horario_generados/listar_horarios.php",
        data: data,
        type: "POST",
        success: function(response)
        {
            res = JSON.parse(response);
            localStorage.setItem('nuevo_horario_generado',JSON.stringify(res));

            for (i=0; i < res.length; i++)
            {
                $(`#${res[i].direccion}`).html(`<div class="text-success ${res[i].direccion}" value="${res[i].id_r}">
                    <div>${res[i].curso}</div>
                    <div>(${res[i].nombre_p})</div>
                </div>`); 

            }
        }
       });
    });

    $(document).on('click', '.eliminar_horario', function(){
        $('#confirmDeleteModal1').modal('show'); 
        numerico = $(this).data('numerico');
        localStorage.setItem('numerico_eliminar', numerico);     
    });
    $(document).on('click', '#confirmarDelete', function(){
        numerico = localStorage.getItem('numerico_eliminar'); 
        data = {
            numerico: numerico
        }
        $.ajax({

            url: "../php/horario_generados/delete.php",
            data: data,
            type: 'POST',
            success: function(response)
            {
                console.log(response);
                $('#confirmDeleteModal1').modal('hide');
                eliminar_color_horario();
                listar_horarios_generados(); 
            }
        })       
    });

    function eliminar_color_horario()
    {
        numerico =localStorage.getItem('numerico_horario');
        data = {
            numerico: numerico
        }
        $.ajax({

            url: "../php/colores/delete.php",
            data: data,
            type: 'POST',
            success: function(response)
            {
                console.log(response);
            }
        })     
    }

    $(document).on('click', '.horarios', function(){ 
        listar_horarios_generados();
        $('#modal-004').modal('show');             
    });

    $(document).on('click', '#btnCerrar4', function(){
        $('#staticBackdropLabel3').text('Guardar Horario');
        $('#btnUpdate1').css('display','none');
        $('#btnGuardar1').css('display','block');    
    });
    $(document).on('click', '#btnUpdate1', function(){
        
        numerico = localStorage.getItem('numerico_h');
        nombreHorario = $('#nombreHorario').val();
        data = {
            numerico: numerico,
            nombre_horario: nombreHorario
        }

        $.ajax({    
            url: "../php/horario_generados/editar.php",
            type: "POST",
            data: data,
            success:  function(response){
                console.log(response);
                $('#horarioGuardar').modal('hide');
                $('#btnUpdate1').css('display','none');
                $('#btnGuardar1').css('display','block'); 
            }
       });
    });
    $(document).on('click', '.editar_horario', function(){
        numerico = $(this).data('numerico');
        nombre = $(this).data('nombre');
        localStorage.setItem('nombre_h', nombre);
        localStorage.setItem('numerico_h', numerico);
        $('#staticBackdropLabel3').text('Actualizar Horario');
        $('#nombreHorario').val(nombre);
        $('#horarioGuardar').modal('show');
        $('#modal-004').modal('hide');
        $('#btnGuardar1').css('display','none');
        $('#btnUpdate1').css('display','block');      
    });


    
});
 