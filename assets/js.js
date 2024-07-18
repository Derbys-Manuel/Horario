$(document).ready(function() {
    listar(); // Llamar a la función listar() al cargar la página

    // Mostrar/Ocultar barra de herramientas
    $('#toolbarIcon').click(function() {
        $('#toolbarContent').toggle();
    });

    // Función para ingresar registros
    $(document).on("submit", "#modal1", function(e) {
        e.preventDefault();
        const data = {
            nombre: $("#nombre").val(),
            curso: $("#curso").val()
        };
        $.ajax({
            url: "../php/insert.php",
            data: data,
            type: "POST",
            success: function(response) {
                alert(response);
                listar();
                $('#staticBackdrop').modal('hide'); // Cierra el modal después de añadir
                resetForm(); // Restablece el formulario
            }
        });
    });

    // Función para eliminar registros
    $(document).on("click", ".delete-action", function() {
        const id = $(this).val();
        $.ajax({
            url: "../php/delete.php",
            data: { id: id },
            type: "POST",
            success: function(response) {
                alert(response);
                listar();
                resetForm(); // Restablece el formulario después de eliminar
            }
        });
    });

    // Mostrar modal para editar
    $(document).on("click", ".edit-action", function() {
        const id = $(this).val();
        // Lógica para obtener los valores actuales y llenar el formulario
        $.ajax({
            url: '../php/get.php', // Archivo PHP para obtener los datos del registro
            data: { id: id },
            type: 'GET',
            success: function(response) {
                const data = JSON.parse(response);
                $("#nombre").val(data.nombre_p);
                $("#curso").val(data.curso);
                $("#btn1").hide();
                $("#btnUpdate").show().val(id); // Guardar el ID en el botón actualizar
                $("#btnCancelEdit").show();
                $('#staticBackdrop').modal('show');
            }
        });
    });

    // Acción para actualizar el registro
    $(document).on('click', '#btnUpdate', function() {
        const id = $(this).val();
        const data = {
            id: id,
            nombre: $("#nombre").val(),
            curso: $("#curso").val()
        };
        $.ajax({
            url: "../php/editar.php",
            data: data,
            type: "POST",
            success: function(response) {
                alert(response);
                listar();
                $('#staticBackdrop').modal('hide'); // Cierra el modal después de actualizar
                resetForm(); // Restablece el formulario después de actualizar
            }
        });
    });

    // Acción para cancelar la edición
    $(document).on('click', '#btnCancelEdit', function() {
        $('#staticBackdrop').modal('hide'); // Cierra el modal
        resetForm(); // Restablece el formulario
    });

    // Función para listar registros
    function listar() {
        $.ajax({
            url: '../php/list.php',
            type: 'GET',
            success: function(r) {
                const profesor = JSON.parse(r);
                let template = "";
                profesor.forEach(element => {
                    template += `
                    <tr id="lista_1${element.id}">
                        <td>${element.nombre_p}</td>
                        <td>${element.curso}</td>
                        <td>
                            <button value="${element.id}" class="btn btn-primary default-action calender">
                                <i class="bi bi-calendar2-week"></i> <!-- Icono de horario -->
                            </button>
                        </td>
                    </tr>
                    `;
                });
                $('#lista').html(template);
            }
        });
    }

    // Función para establecer el modo (editar o eliminar)
    function setMode(mode) {
        resetButtons(); // Resetea los botones antes de aplicar el nuevo modo
        if (mode === 'editar') {
            $("#toolsHeader").text("Editar");
            $(".default-action").each(function() {
                $(this).html('<i class="bi bi-pencil"></i>');
                $(this).removeClass("default-action").addClass("edit-action");
            });
        } else if (mode === 'eliminar') {
            $("#toolsHeader").text("Eliminar");
            $(".default-action").each(function() {
                $(this).html('<i class="bi bi-trash"></i>');
                $(this).removeClass("default-action").addClass("delete-action");
            });
        }
        $("#btnCancel").show();
        $("#toolbarContent").show(); // Mantener la barra visible
    }

    // Función para restablecer los botones
    function resetButtons() {
        $("#toolsHeader").text("Herramientas");
        $(".edit-action, .delete-action").each(function() {
            $(this).html('<i class="bi bi-calendar2-week"></i>'); // Icono de horario
            $(this).removeClass("edit-action delete-action").addClass("default-action");
        });
        $("#btnCancel").hide();
        $("#toolbarContent").show();
    }

    // Función para restablecer el formulario
    function resetForm() {
        $("#nombre").val("");
        $("#curso").val("");
        $("#btn1").show();
        $("#btnUpdate").hide();
        $("#btnCancelEdit").hide();
    }

    // Cambiar entre modos de acción
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
        resetForm(); // Restablecer el formulario al abrir el modal para añadir
        $('#staticBackdrop').modal('show');
    });
    
    // *NUEVO* Manejar los checkboxes AM y PM
    $(document).on('change', '#inlineCheckbox1', function() {
        if ($(this).is(':checked')) {
            $('#inlineCheckbox2').prop('checked', false);
        }
    });

    $(document).on('change', '#inlineCheckbox2', function() {
        if ($(this).is(':checked')) {
            $('#inlineCheckbox1').prop('checked', false);
        }
    })
    
    //MARCAR HORARIO

    $(document).on('click', '.mañana', function(e) {
        $(this).toggle(500,function(){
            $(this).html(`<svg class="text-success" bg-secondary xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-calendar-check-fill" viewBox="0 0 16 16">
                <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2m-5.146-5.146-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708"/>
              </svg>`);
        })
        e.preventDefault();
 
    })
    $(document).on('click', '.tarde', function() {
        $(this).html(`<svg class="text-success" bg-secondary xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-calendar-check-fill" viewBox="0 0 16 16">
  <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2m-5.146-5.146-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708"/>
</svg>`);
    })

    // MOSTRAR MODAL DE CALENDARIO

    $(document).on('click', '.calender', function() {
        if ($('#inlineCheckbox1').is(':checked')) {
            $('#calendario2').modal('hide'); // Asegurarse de que el otro modal esté cerrado
            $('#calendario').modal('show'); // Mostrar modal AM
        } else if ($('#inlineCheckbox2').is(':checked')) {
            $('#calendario').modal('hide'); // Asegurarse de que el otro modal esté cerrado
            $('#calendario2').modal('show'); // Mostrar modal PM
        } else {
            alert("Seleccione AM o PM"); // Mostrar alerta si no se seleccionó AM o PM
            return false; // Detener cualquier acción posterior
        }
    });
});
