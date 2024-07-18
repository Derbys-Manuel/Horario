


$(document).ready(function(){
    listar();
    //FUNCION PARA INGRESAR REGISTROS

    $(document).on("submit","#modal1",function(e){
        e.preventDefault();
        const data = {
            nombre: $("#nombre").val(),
            curso: $("#curso").val()
        }
        $.ajax({
            url:"./php/insert.php",
            data: data,
            type: "POST",
            success: function(response)
            {
                alert(response);
                listar();
    
            }

        })

    })
    
    function listar ()
    {
        $.ajax({
            url: './php/list.php',
            type: 'GET',
            success: function(r) {
                const profesor = JSON.parse(r);
                let template = "";
                profesor.forEach(element => {
                    template += `
                    <tr id="lista_1${element.id}">
                        <td>${element.nombre_p}</td>
                        <td>${element.curso}</td>
                        <td><button id="id=${element.id}" value="id=${element.id}" class="btn enviar_group"><i class="bi bi-fast-forward-fill text-primary"></i></button></td>
                    </tr>
                    `;
                });
                $('#lista').html(template);
            }
        })
    }

    
})
