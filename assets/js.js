$(document).ready(function() {
    let selectedCourse = "";
    let selectedTeacher = "";
    let selectedId = "";

    listar();

    $('#toolbarIcon').click(function() {
        $('#toolbarContent').toggle();
    });

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
                $('#staticBackdrop').modal('hide');
                resetForm();
            }
        });
    });

    function listar() {
        $.ajax({
            url: '../php/list.php',
            type: 'GET',
            success: function(r) {
                const profesor = JSON.parse(r);
                let template = "";
                profesor.forEach(element => {
                    template += `
                    <tr id="id" value="${element.id}">
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
                console.log(profesor);
                attachEvents();
            }
        });
    }

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

    function resetButtons() {
        $("#toolsHeader").text("Herramientas");
        $(".edit-action, .delete-action").each(function() {
            $(this).html('<i class="bi bi-calendar2-week"></i>');
            $(this).removeClass("edit-action delete-action").addClass("default-action");
        });
        $("#btnCancel").hide();
        $("#toolbarContent").hide();
    }

    function resetForm() {
        $("#nombre").val("");
        $("#curso").val("");
        $("#btn1").show();
        $("#btnUpdate").hide();
        $("#btnCancelEdit").hide();
    }

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
        }
    });

    $(document).on('change', '#inlineCheckbox2', function() {
        if ($(this).is(':checked')) {
            $('#inlineCheckbox1').prop('checked', false);
        }
    });

    function attachEvents() {
        $(document).off('click', '.tool-action');
        $(document).on('click', '.tool-action', function() {
            if ($(this).hasClass('default-action')) {
                if (!$('#inlineCheckbox1').is(':checked') && !$('#inlineCheckbox2').is(':checked')) {
                    alert("Seleccione AM o PM");
                    return false;
                }
                selectedCourse = $(this).data('curso');
                selectedTeacher = $(this).data('nombre');
                selectedId = $(this).data('id');
                if ($('#inlineCheckbox1').is(':checked')) {
                    $('#calendario2').modal('hide');
                    $('#calendario').modal('show');
                } else if ($('#inlineCheckbox2').is(':checked')) {
                    $('#calendario').modal('hide');
                    $('#calendario2').modal('show');
                }
                $('.calendar-cell').off('click').on('click', function() {
                    $(this).toggleClass('selected');
                });
            } else if ($(this).hasClass('edit-action')) {
                const id = $(this).val();
                $.ajax({
                    url: '../php/get.php',
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
                    url: "../php/delete.php",
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
                url: "../php/editar.php",
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
