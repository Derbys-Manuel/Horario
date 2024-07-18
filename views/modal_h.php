<div class="modal fade modal-xl " id="calendario" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog ">
    <div class="modal-content">
      <div class="modal-header ">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">HORARIO</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="container-fluid">
            <div class="table-responsive">
                <table class="table  text-center align-middle">
                    <thead>
                        <tr>
                            <th scope="col">Hora</th>
                            <th scope="col" id="lunes">Lunes</th>
                            <th scope="col" id="martes">Martes</th>
                            <th scope="col" id="miercoles">Miercoles</th>
                            <th scope="col" id="jueves">Jueves</th>
                            <th scope="col" id="viernes">Viernes</th>
                            <th scope="col" id="sabado">Sabado</th>
                            <th scope="col" id="domingo">Domingo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr id="h8">
                            <th scope="row" class="p-3">8:00 - 8:50</th>
                            <td id="lu8" class="mañana menu" rowspan="2"></td>
                            <td id="ma8" class="mañana menu" rowspan="2"></td>
                            <td id="mi8" class="mañana menu" rowspan="2"></td>
                            <td id="ju8" class="mañana menu" rowspan="2"></td>
                            <td id="vi8" class="mañana menu" rowspan="2"></td>
                            <td id="sa8" class="mañana menu" rowspan="2"></td>
                            <td id="do8" class="mañana menu" rowspan="2"></td>
                        </tr>
                        <tr id="h9">
                            <th scope="row" class="p-3">8:50 - 9:40</th>
                        </tr>
                        <tr id="h10">
                            <th scope="row" class="p-3">9:40 - 10:00</th>
                            <td id="receso1" colspan="7" class="table-success"></td>
                        </tr>
                        <tr id="h11">
                            <th scope="row" class="p-3">10:00 - 10:50</th>
                            <td id="lu11" class="mañana menu" rowspan=""></td>
                            <td id="ma11" class="mañana menu" rowspan=""></td>
                            <td id="mi11" class="mañana menu" rowspan=""></td>
                            <td id="ju11" class="mañana menu" rowspan=""></td>
                            <td id="vi11" class="mañana menu" rowspan=""></td>
                            <td id="sa11" class="mañana menu" rowspan=""></td>
                            <td id="do11" class="mañana menu" rowspan=""></td>
                        </tr>
                        <tr id="h12">
                            <th scope="row" class="p-3">10:50 - 11:40</th>
                            <td id="lu12" class="mañana menu" rowspan=""></td>
                            <td id="ma12" class="mañana menu" rowspan=""></td>
                            <td id="mi12" class="mañana menu" rowspan=""></td>
                            <td id="ju12" class="mañana menu" rowspan=""></td>
                            <td id="vi12" class="mañana menu" rowspan=""></td>
                            <td id="sa12" class="mañana menu" rowspan=""></td>
                            <td id="do12" class="mañana menu" rowspan=""></td>
                        </tr>
                        <tr id="h13">
                            <th scope="row" class="p-3">11:40 - 12:00</th>
                            <td id="receso2" colspan="7" class="table-success"></td>
                        </tr>
                        <tr id="h14">
                            <th scope="row" class="p-3">12:00 - 12:50</th>
                            <td id="lu14" class="mañana menu" rowspan="2"></td>
                            <td id="ma14" class="mañana menu" rowspan="2"></td>
                            <td id="mi14" class="mañana menu" rowspan="2"></td>
                            <td id="ju14" class="mañana menu" rowspan="2"></td>
                            <td id="vi14" class="mañana menu" rowspan="2"></td>
                            <td id="sa14" class="mañana menu" rowspan="2"></td>
                            <td id="do14" class="mañana menu" rowspan="2"></td>
                        </tr >
                        <tr id="h15">
                            <th scope="row" class="p-3">12:50 - 01:30</th>
                        </tr>
                   </tbody>
                </table>
            </div>
            
        </div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" id="guardar_h">Guardar</button>
      </div>
    </div>
  </div>
</div>