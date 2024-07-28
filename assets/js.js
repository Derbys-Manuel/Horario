$(document).ready(function() {
    let selectedCourse = "";
    let selectedTeacher = "";
    let selectedHorarioText = localStorage.getItem('selectedHorarioText') || ""; // Obtener el nombre del horario del localStorage
    let selectedHorarioId = localStorage.getItem('selectedHorarioId') || ""; // Obtener el ID del horario del localStorage
    let selectedPeriod = localStorage.getItem('selectedPeriod') || "";
    let selectedId = "";
    let selectedIdRegistro = "";
    let deleteId = null; // Variable para almacenar el ID del elemento a eliminar

    // Mostrar el horario almacenado al cargar la página
    if (selectedHorarioText) {
        $('#selectedHorarioText').text(`Horario: ${selectedHorarioText}`);
        $("#btnCancel").show(); // Mostrar el botón Cancelar si hay un horario seleccionado
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
        dato = {
            id_h: selectedHorarioId
        }
        $.ajax({
            url: '../php/profesor/list.php',
            type: 'POST',
            data: dato,
            success: function(r) {
                const profesor = JSON.parse(r);
                calculo = profesor.length;
                let template = "";
                if (calculo === 0)
                {
                    enfoque = `
                    <tr>
                        <td colspan="3"> No hay horario seleccionado </td>
                    </tr>
                    `;
                $('#lista').html(enfoque);          
                }
                else
                {
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
        if ($(this).is(':checked')) {
            $('#inlineCheckbox2').prop('checked', false);
            selectedPeriod = 'Mañana';
            localStorage.setItem('selectedPeriod',selectedPeriod);

        } else {
            selectedPeriod = "";
            localStorage.removeItem('selectedPeriod');
        }
    });

    $(document).on('change', '#inlineCheckbox2', function() {
        if ($(this).is(':checked')) {
            $('#inlineCheckbox1').prop('checked', false);
            selectedPeriod = 'Tarde';
            localStorage.setItem('selectedPeriod',selectedPeriod);
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
    console.log(element);
    const tiempo = element.split('-')[1];
    console.log(selectedId);

    //SI EXITE UN REGISTRO EN ESE HORARIO, ELIMINAR DEL HORARIO Y DE LA BASE DE DATOS

    if ($(`.${element}`).length) {
        $(`.${element}`).remove();

        dato = {
            direccion: element,
            id_p: selectedId
        }
        $.ajax({
            url:"../php/register/delete.php",
            type:"POST",
            data:dato,
            success: function(result){

            }
        })

    
    // SINO INSERTAR EN LA TABLA REGISTRO

    } else {

    listar_registros()
    
    //CONDICIONALES PARA UBICAR DIA Y COMPLETAR EL RESTO DE LA ORACION

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
            id_p: selectedId,
            direccion: element,
            turno: selectedPeriod
        }
        
        //INSERTANDO DATOS EN LA TABLA REGISTRO (DEL TURNO AM)

        $.ajax ({
            url: "../php/register/insert_r.php",
           data: datas,
           type: "POST",
          success: function(response){
            listar_registros()
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
            id_p: selectedId,
            direccion: element,
            turno: selectedPeriod
        }

        //INSERTANDO DATOS EN LA TABLA REGISTROS (DEL TURNO PM)
        
        $.ajax ({
            url: "../php/register/insert_r.php",
           data: datas,
           type: "POST",
          success: function(response){
            listar_registros()
          }
        })
    }
}    
});

//LLAMADA A LA FUNCION LIMPIAR, REALIZANDO CLICK EN LOS BOTONES DE CLOSE, DE LOS MODALES DEL HORARIO

$('#closeBtn1').click(function(){
    limpiar();
    limpiarTodo();
})
$('#closeBtn2').click(function(){
    limpiar();
    limpiarTodo();
})

//FUNCION PARA LISTAR REGISTROS EN EL CUADRO CON EL CAMPO DIRECCION (QUE CONTIENE EL ID DE LA UBICACION EN EL MODAL DEL HORARIO)

function listar_registros(){
    dato = {
        id_p: selectedId
    }
    $.ajax({
        url: "../php/register/listar.php",
        type: "POST",
        data: dato,
        success: function(respo){
            re = JSON.parse(respo);
            re.forEach(res =>{
                $(`#${res.direccion}`).html(`<div class="text-success ${res.direccion}" value="${res.id_r}">
                    <div>${selectedCourse}</div>
                    <div>(${selectedTeacher})</div>
                </div>`);
            })
        }
    })
}

//FUNCION PARA LIMPIAR HORARIO CON EL BOTON DE CLOSE

function limpiar(){
    dato = {
        id_p: selectedId
    }
    $.ajax({
        url: "../php/register/listar.php",
        type: "POST",
        data: dato,
        success: function(respo){
            re = JSON.parse(respo);
            re.forEach(res =>{
                $(`#${res.direccion}`).text("");
            })
        }
    })
}

function limpiarTodo(){
    $.ajax({
        url: "../php/generar_h/limpiar.php",
        type: "GET",
        success: function(respo){
            re = JSON.parse(respo);
            re.forEach(res =>{
                $(`#${res.direccion}`).text("");
            })
        }
    })
}

//GENERAR HORARIO INTELIGENTE

$(document).on('click','#btn_prueba',function(){
    const dato = {
        id_h: selectedHorarioId,
        turno: selectedPeriod
    }

    //SE REALIZA LA COLSULTA A LA BASE DE DATOS

    $.ajax({
        url: "../php/generar_h/generar_horario.php",
        type: "POST",   
        data: dato,
        success: function(response)
        {
            re = JSON.parse(response);
            console.log(re);
            
            //array  => ALMACENA LOS REGISTROS SIN REPETIDOS, pero no cumple ninguna funcion sino solo la de distribuir los datos
            array = [];

            //array_index_a => almacena el valor que repetido, pero el que ya ha estado en el array... si un array tiene [1] y ingresas otro [1]
            //serian dos 1... En este array se almacena el primero [^1^,1].
            array_index_a = [];

            //array_index_b => almacena el segundo valor repetido [1,^1^]
            array_index_b = [];

            //array_direccion => almacena el valor direccion de los valores traidos de la base de datos
            array_direccion = [];

            
            //Este for iteractua con los valores del array re
            for (i=0; i < re.length; i++)
            {
                //se usa includes para detectar los valores repetidos
                if(array.includes(re[i].direccion))
                {              
                    //del valor repetido se almacena su direccion   
                    array_direccion.push(re[i].direccion);

                    //del valor repetido se almacena el index 
                    array_index_a.push(array.indexOf(re[i].direccion));

                    //del valor repetido se almacena el index
                    array_index_b.push(i);
                    
                    console.log('Se repite', re[i].direccion);                

                }
                else 
                {
                    //este array almacena solo los datos repetidos, para poder saber mas facilmente cuales son
                    array.push(re[i].direccion);  
                    console.log(array);
                    
                } 
            }

            //aqui verifico los datos en la consola
            console.log('Array completo de elementos sin los repetidos',array);
            console.log('dia',array_direccion);
            console.log('index_a',array_index_a);
            console.log('index_b',array_index_b);

            //elementos_repetidos_a => sirve para almacenar el registro completo, el cual obtendremos utilizando el array_index_a
            elementos_repetidos_a = [];

            //elementos_repetidos_b => sirve para almacenar el registro completo, el cual obtendremos utilizando el array_index_b
            elementos_repetidos_b = [];

            //con este for recorremos la cantidad de indices
            for (i=0; i < array_index_a.length;i++)
            {
                //aqui se almacenan los todos los datos de cada registro
                elementos_repetidos_a.push(re[array_index_a[i]]);
                elementos_repetidos_b.push(re[array_index_b[i]]);
            }

            //se verifican los datos en la consola
            console.log('Elementos repetidos a: ', elementos_repetidos_a);
            console.log('Elementos repetidos b: ', elementos_repetidos_b);

            //prioridad => se almacenan todos los registros que han aprobado el algoritmo de PRIORIDADES
            prioridad = [];

            //no_prioridad => se almacenan todos los registros que seran eliminados por el algoritmo de PRIORIDADES
            no_prioridad = [];

            //resultado => esta lista almacena cuantos registros en el caledanario tiene cada profesor, utilizando el id del profesor y sumando
            //el id del registro
            const resultado = {}
            console.log(resultado);

            //aqui se almacen los datos en => resultado
            re.forEach(el => (resultado[el.id] = resultado[el.id] + 1 || 1));
            
            //este for sirve para ir almacenando los datos en => prioridad y => no_prioridad
            for (i=0; i < elementos_repetidos_a.length; i++)
            {
                //aqui se compara para ver quien tenie mayor o menor disponibilidad y se almacenan en => priodad y => no_prioridad
                if (resultado[elementos_repetidos_a[i].id] > resultado[elementos_repetidos_b[i].id])
                {
                    console.log ('Se repite mas veces a => ', resultado[elementos_repetidos_a[i].id], ' | id = ',elementos_repetidos_a[i].id);
                    prioridad.push(elementos_repetidos_b[i]);
                    no_prioridad.push(elementos_repetidos_a[i]);

                    //Esta variable sirve para almacenar el indice de la lista => resultados. para poder capturar el total de los elementos repetidos
                    index = elementos_repetidos_a[i].id;

                    //es el total de los elementos repetidos
                    num_restar = resultado[elementos_repetidos_a[i].id];

                    //aqui se efectua a restarle 1 por cada iteracion
                    resultado[index] = num_restar -1;
                    
                    //verificar resultados en la consola
                    console.log(resultado);
                   
                    
                }
                //lo mismo que arriba ^_^, solo que aqui se realiza con los elementos del grupo b
                else if (resultado[elementos_repetidos_a[i].id] < resultado[elementos_repetidos_b[i].id])
                {
                    console.log ('Se repite mas veces b => ', resultado[elementos_repetidos_b[i].id], ' | id = ',elementos_repetidos_b[i].id)
                    prioridad.push(elementos_repetidos_a[i]);
                    no_prioridad.push(elementos_repetidos_b[i]);
                    index = elementos_repetidos_b[i].id;
                    num_restar = resultado[elementos_repetidos_b[i].id];
                    resultado[index] = num_restar -1;
                    console.log(resultado);
                }
            }

            //se verifica en la consola los datos
            console.log('prioridad: ',prioridad);
            console.log('no prioridad: ',no_prioridad);

            //se elimina del array => re , el cual contiene todos los datos, los datos => no_prioridad
            for (i=0; i < no_prioridad.length; i++)
            {
                console.log(no_prioridad[i].id_r);          
                const index = re.findIndex(res => res.id_r === no_prioridad[i].id_r);

                if (index !== -1) {
                  re.splice(index, 1);         
                }

            }

            //se verifican los datos en la consola 
            console.log(re); 

            //se imprimen los datos ya pasados por el algoritmo de PRIORIDAD
            re.forEach(res =>{
                $(`#${res.direccion}`).html(`<div class="text-success ${res.direccion}" value="${res.id_r}">
                    <div>${res.curso}</div>
                    <div>(${res.nombre_p})</div>
                </div>`);
            });
            if (selectedPeriod=== 'Mañana')
            {
                $('#calendario').modal('show');
            }
            else if (selectedPeriod=== 'Tarde') 
            {
                $('#calendario2').modal('show');
            }
            else if (!$('#inlineCheckbox1').is(':checked') && !$('#inlineCheckbox2').is(':checked')) {
                showAlert("Seleccione AM o PM"); 
                return false;
            } 
                 
        }
    })

})

});
