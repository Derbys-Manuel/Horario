$(document).ready(function() {
    borrar_localstorage();
    listarHorari();
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
            id_h: selectedHorarioId,
            bloques: $('#bloques').val(),
            turno: selectedPeriod
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
                listar();
                $('#staticBackdrop').modal('hide');
                resetForm();
            }
        });
        horarios = localStorage.getItem('horarios');
        horarios = JSON.parse(horarios);
        console.log(horarios);
        for (i=0; i < horarios.length; i++)
        {
            console.log('Comparando:', horarios[i].id, selectedHorarioId); 
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
                    turno: selectedPeriod
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

    // Función para listar los profesores
    function listar() {
        selectedHorarioId = localStorage.getItem('selectedHorarioId');
        selectedPeriod = localStorage.getItem('selectedPeriod');
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
                const calculo = profesor.length;
                let template = "";
                if (calculo === 0) {
                    const enfoque = `
                    <tr>
                        <td colspan="3"> No hay profesores registrados </td>
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
                                <button value="${element.id}" class="btn btn-primary tool-action default-action calendarios" data-id="${element.id}" data-curso="${element.curso}" data-nombre="${element.nombre_p}" data-bloques="${element.bloques}">
                                    <i class="bi bi-calendar2-week "></i>
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
                        <tr id="${element.id}" class="menu profe" data-nombre="${element.nombre_p}" data-curso="${element.curso}" data-activo="on">
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
        if ($(this).is(':checked')) {
            $('#inlineCheckbox2').prop('checked', false);
            selectedPeriod = 'Mañana';
            localStorage.setItem('selectedPeriod', selectedPeriod);
            listar();
            $('#turno_profesor').val(selectedPeriod);
        } else {
            selectedPeriod = "";
            localStorage.removeItem('selectedPeriod');
            listar();
        }
    });

    $(document).on('change', '#inlineCheckbox2', function() {
        if ($(this).is(':checked')) {
            $('#inlineCheckbox1').prop('checked', false);
            selectedPeriod = 'Tarde';
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
            const data = {
                id: id,
                nombre: $("#nombre").val(),
                curso: $("#curso").val(),
                bloques: $("#bloques").val(),
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

    function listarHorari() {
        $.ajax({
            url: '../php/horario/listar_horarios.php',
            type: 'GET',
            success: function(response) {
                const horarios = JSON.parse(response);
                for (i=0; i<horarios.length; i++)
                {
                    localStorage.setItem('selectedHorarioId', horarios[0].id);
                    localStorage.setItem('selectedHorarioText', horarios[0].nombre);
                    nombre = localStorage.getItem('selectedHorarioText');
                    $('#nombre-horario-am').html(nombre);
                    $('#nombre-horario-pm').html(nombre);
                }
            }
        });
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
        if (deleteId) {
            $.ajax({
                url: "../php/profesor/delete.php",
                data: { id: deleteId },
                type: "POST",
                success: function(response) {
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
                $(`#${element}`).removeClass('border-danger border-2');

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
                        ubicarColor();
                        
                    }
                });
                
            } else {
                //RESUMIR LA LATENCIA DEL INSERTAR
                const parte = $(this).data('dia');
                const hora = $(this).attr('value');
                const valor = $(this).data('valor');
                let datas = {};

                const [hora_inicial2_i, hora_inicial2_f] = hora.split('-');
                datas = {
                    disponibilidad_i: hora_inicial2_i,
                    disponibilidad_f: hora_inicial2_f,
                    dia: parte,
                    tiempo: tiempo,
                    id_p: selectedId,
                    direccion: element,
                    turno: selectedPeriod,
                    valor: valor
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
    });
    //FUNCION COLOR
    function ubicarColor() {
        let id = localStorage.getItem('selectedID');
        let dato = {
            id_p: id
        };
        let selectedBloque = parseInt(localStorage.getItem('selectedBloques'), 10);

        $.ajax({
            url: "../php/register/ubicarColor.php",
            type: "POST",
            data: dato,
            success: function(respuest) {
                const respuesta = JSON.parse(respuest);
                console.log(respuesta);

                for (let i = 0; i < respuesta.length; i++) {
                    if (i < selectedBloque) {
                        const element = $(`#${respuesta[i].direccion}`);
                        if (element.length) {  // Verifica si el elemento existe
                            element.addClass('border-danger border-2');
                        } else {
                            console.warn(`Elemento con ID ${respuesta[i].direccion} no encontrado.`);
                        }
                    }
                }
            },
            error: function(error) {
                console.error("Error en la petición AJAX", error);
            }
        });
    }

   
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
        $('.mañana').removeClass('modal1');
        $('#btnCancel1').css('display', 'none');  
        $('#btnCancel2').css('display', 'none');
        $('#btnCancel3, #btnCancel4').css('display','none');
        restaurarModoHorario();
        $('#colorPickerAM').val('#FFFFFF');
        listar();
    });

    $('#closeBtn2').click(function() {
        limpiarTodo();
        $('.tarde').removeClass('modal2');
        $('#btnCancel1').css('display', 'none'); 
        $('#btnCancel2').css('display', 'none');
        $('#btnCancel3, #btnCancel4').css('display','none');
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
                    $(`#${res.direccion}`).html(`<div class="text-success ${res.direccion}" value="${res.id_r}">
                        <div>${selectedCourse}</div>
                        <div>(${selectedTeacher})</div>
                    </div>`);
                });
                ubicarColor();
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
        $.ajax({
            url: "../php/generar_h/limpiar.php",
            type: "GET",
            success: function(respo) {
                const re = JSON.parse(respo);
                re.forEach(res => {
                    $(`#${res.direccion}`).text("");
                    $(`#${res.direccion}`).removeClass("border-danger border-2");
                });
                limpiar_registro_editar();
            }
        });
    }

    //GENERAR HORARIO INTELIGENTE

    $(document).on('click', '#btnHorario', function() {
        $('.h1Bloques').css('display','none');
        $('.decrease2, .increase2').css('display','none');
        nombre = localStorage.getItem('selectedHorarioText');
        $('#nombre-horario-am').html(nombre);
        $('#nombre-horario-pm').html(nombre);
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

        const dato = {
            id_h: selectedHorarioId,
            turno: selectedPeriod
        };

        //SE REALIZA LA COLSULTA A LA BASE DE DATOS // algoritmo prioridad
        $.ajax({
            url: "../php/generar_h/generar_horario.php",
            type: "POST",   
            data: dato,
            success: function(response) {
                const re = JSON.parse(response);   
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
                console.log(elementos_repetidos_a ,"Elementos repetidos A" );
                console.log(elementos_repetidos_b ,"Elementos repetidos B");
                const prioridad = [];
                const no_prioridad = [];
                const result = {};
                //aqui se almacen los datos en => resultado
                re.forEach(el => (result[el.id] = result[el.id] + 1 || 1));  
                //este for sirve para ir almacenando los datos en => prioridad y => no_prioridad
                for (let i = 0; i < elementos_repetidos_a.length; i++) {
                    //aqui se compara para ver quien tenie mayor o menor disponibilidad y se almacenan en => priodad y => no_prioridad
                    if (result[elementos_repetidos_a[i].id] > result[elementos_repetidos_b[i].id]) {
                        prioridad.push(elementos_repetidos_b[i]);
                        no_prioridad.push(elementos_repetidos_a[i]);
                        const index = elementos_repetidos_a[i].id;
                        const num_restar = result[elementos_repetidos_a[i].id];
                        result[index] = num_restar -1;  
                    }
                    //lo mismo que arriba ^_^, solo que aqui se realiza con los elementos del grupo b
                    else if (result[elementos_repetidos_a[i].id] < result[elementos_repetidos_b[i].id]) {
                        prioridad.push(elementos_repetidos_a[i]);
                        no_prioridad.push(elementos_repetidos_b[i]);
                        const index = elementos_repetidos_b[i].id;
                        const num_restar = result[elementos_repetidos_b[i].id];
                        result[index] = num_restar - 1;
                    } else {
                        prioridad.push(elementos_repetidos_a[i]);
                        no_prioridad.push(elementos_repetidos_b[i]);
                        const index = elementos_repetidos_b[i].id;
                        const num_restar = result[elementos_repetidos_b[i].id];
                        result[index] = num_restar - 1;
                    }
                }
                for (let i = 0; i < no_prioridad.length; i++) {         
                    const index = re.findIndex(res => res.id_r === no_prioridad[i].id_r);
                    if (index !== -1) {
                        re.splice(index, 1);         
                    }
                }
                // Paso 1: Inicializar un objeto para contar las ocurrencias por 'id'
                const conteo = {};
                // Paso 2: Crear el array 'resultadoFinal' priorizando los elementos que están en 'prioridad'
                const resultadoFinal = [];
                re.forEach(item => {
                    const key = `${item.id}-${item.id_r}`;         
                    // Obtener el máximo de bloques para este 'id'
                    const maxBloques = parseInt(item.bloques, 10);
                    // Incrementar el contador de ocurrencias para este 'id'
                    if (!conteo[item.id]) {
                        conteo[item.id] = 0;
                    } 
                    // Verificar si el item está en prioridad
                    const enPrioridad = prioridad.some(priItem => priItem.id === item.id && priItem.id_r === item.id_r); 
                    // Agregar solo si no excede el límite de bloques
                    if (conteo[item.id] < maxBloques) {
                        resultadoFinal.push(item);
                        conteo[item.id]++;
                    } else if (enPrioridad) {
                        // Si está en prioridad pero el límite se ha alcanzado, preferimos incluirlo si hay espacio
                        const indexNoPrioridad = resultadoFinal.findIndex(
                            resultItem => resultItem.id === item.id && !prioridad.some(priItem => priItem.id === resultItem.id && priItem.id_r === resultItem.id_r)
                        );  
                        if (indexNoPrioridad !== -1) {
                            // Reemplazamos un elemento que no está en prioridad por uno que sí lo está
                            resultadoFinal.splice(indexNoPrioridad, 1, item);
                        }
                    }
                });

                console.log("Resultado final:", resultadoFinal);
                localStorage.setItem('horario_generado', JSON.stringify(resultadoFinal));
                resultadoFinal.forEach(res => {
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
        borrar_localstorage();
    });

    function borrar_localstorage()
    {
        localStorage.clear();
    }

    $(document).on('click', '.calendarios' ,function(){
        listarHorari();
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
        activo = $(this).data('activo');
        localStorage.setItem('curso', curso);
        localStorage.setItem('nombre', nombre);
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
        if ($(`.${direccion}`).length) {  
            $(`.${direccion}`).remove();
        }
        else {
            $(`#${direccion}`).html(`<div class="text-success ${direccion}">
                <div>${curso}</div>
                <div>(${nombre})</div>
            </div>`);
            agregarElementoAlArray(direccion);
            // Función para agregar un nuevo elemento al array en localStorage
            function agregarElementoAlArray(nuevoElemento) {
                // Obtener el array existente en localStorage
                let miArray = JSON.parse(localStorage.getItem('miArray')) || [];
                // Agregar el nuevo elemento al array
                miArray.push(nuevoElemento);
                // Guardar el array actualizado en localStorage
                localStorage.setItem('miArray', JSON.stringify(miArray));
            }
        }
    });
    function limpiar_registro_editar() {
        const arrayGuardado = JSON.parse(localStorage.getItem('miArray'));
        // Verifica si arrayGuardado es null o no es un array
        if (!arrayGuardado || !Array.isArray(arrayGuardado) || arrayGuardado.length === 0) {
            console.log('');
        } else {
            for (let i = 0; i < arrayGuardado.length; i++) {
                $(`#${arrayGuardado[i]}`).html('');
            }
        }
    }
    
    function guardar_horario_generado()
    {
        const horario_generado = JSON.parse(localStorage.getItem('horario_generado'));
        for (i = 0 ; i < horario_generado.length; i++)
        {
            $(`#${horario_generado[i].direccion}`).html(`<div class="text-success ${horario_generado[i].direccion}" value="${horario_generado[i].id_r}">
                <div>${horario_generado[i].curso}</div>
                <div>(${horario_generado[i].nombre_p})</div>
            </div>`);
        }
    }
    $(document).on('click', '#btnCancel1', function(){
        $('#btnCancel1').css('display', 'none');
        $('.mañana').removeClass('modal1');
        $('.tarde').removeClass('modal2');
        $('.mañana, .tarde').removeClass('menu');
        localStorage.removeItem('activo');
        limpiar_registro_editar();
        guardar_horario_generado();
    });
    $(document).on('click', '#btnCancel2', function(){
        $('#btnCancel2').css('display', 'none');
        $('.mañana').removeClass('modal1');
        $('.tarde').removeClass('modal2');
        $('.mañana, .tarde').removeClass('menu');
        localStorage.removeItem('activo');
        limpiar_registro_editar();
        guardar_horario_generado();    
    });

    $(document).on('click', '.decrease2, .increase2', function(){
        nombre = localStorage.getItem('selectedNombre');
        curso = localStorage.getItem('selectedCurso');
        id = localStorage.getItem('selectedID');
        id_h = localStorage.getItem('selectedHorarioId');
        turno = localStorage.getItem('selectedPeriod');
        blo = localStorage.getItem('selectedBloques');
        bloques = parseInt(blo);
        
        num = $(this).data('num'); // Obtener el valor de num      
        num = Number(num); // Convertir num a un número

        if (num === 1) {
            bloques += 1; // Sumar 1 a bloques
        } else if (num === -1) {
            bloques -= 1; // Restar 1 a bloques
        } 
        console.log('Resultado de bloques:', bloques);

        data = {
            id: id,
            nombre: nombre,
            curso: curso,
            bloques: bloques
        }
        const url = "../php/profesor/editar.php";
        $.ajax({
            url: url,
            data: data,
            type: "POST",
            success: function(response) {
                console.log(response);
                if (num === 1)
                {
                    localStorage.setItem('selectedBloques', bloques);
                    $('#cantidadBloques').text(bloques);
                    $('#cantidadBloques2').text(bloques);
                    ubicarColor();
                }
                else if (num === -1) {
                    localStorage.setItem('selectedBloques', bloques);
                    $('#cantidadBloques').text(bloques);
                    $('#cantidadBloques2').text(bloques);
                    limpiarTodo2();
                }            
            }
        }) 
    });
    function limpiarTodo2() {
        $.ajax({
            url: "../php/generar_h/limpiar.php",
            type: "GET",
            success: function(respo) {
                const re = JSON.parse(respo);
                re.forEach(res => {
                    $(`#${res.direccion}`).removeClass("border-danger border-2");
                });
                ubicarColor();
            }
        });
    }
    $(document).on('click', '#checkAM, #checkPM', function(){
        $('#btnCancel3, #btnCancel4').css('display','block');
        colorActivo = $(this).data('color');
        localStorage.setItem('colorActivo', colorActivo);
        activoEditar = localStorage.getItem('activo');

        if(activoEditar === 'on')
        {
            $('.mañana, .tarde').removeClass('menu');
            $('.mañana').removeClass('modal1');
            $('.tarde').removeClass('modal2');
        }
    });
    $(document).on('click', '#btnCancel3, #btnCancel4', function(){
        $('#btnCancel3, #btnCancel4').css('display','none');
        localStorage.removeItem('colorActivo');
        activoEditar = localStorage.getItem('activo');
        if (activoEditar==='on')
        {
            $('.mañana, .tarde').addClass('menu');
            $('.mañana').addClass('modal1');
            $('.tarde').addClass('modal2'); 
        }       
    });
});
