<!-- MODAL DE INSERTAR/EDITAR PROFESOR -->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Ingresar Registro</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form id="modal1">
        <div class="modal-body">
          <div class="mb-3">
            <label for="nombre" class="form-label">Nombre</label>
            <input type="text" class="form-control text-capitalize" id="nombre" name="nombre" required>
          </div>
          <div class="mb-3">
            <label for="curso" class="form-label">Curso</label>
            <input type="text" class="form-control text-capitalize" id="curso" name="curso" required>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="submit" id="btn1" class="btn btn-primary">Añadir</button>
          <button type="button" id="btnUpdate" class="btn btn-primary" style="display: none;">Actualizar</button>
        </div>
      </form>
    </div>
  </div>
</div>


<!-- MODAL HORARIO MAÑANA -->

<div class="modal fade modal-xl " id="calendario" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog ">
    <div class="modal-content">
      <div class="modal-header ">
      <h1 class="modal-title fs-5" id="staticBackdropLabel1">HORARIO: <span id="nombre-horario-am"></span></h1>
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
                        <tr id="h8" value ="AM">
                            <th scope="row" class="p-3">8:00 - 8:50</th>
                            <td id="lu8-AM"  value ="08:00-8:50|08:50-09:40"  class="mañana menu" rowspan="2"></td>
                            <td id="ma8-AM" value ="08:00-8:50|08:50-09:40" class="mañana menu" rowspan="2"></td>
                            <td id="mi8-AM" value ="08:00-8:50|08:50-09:40" class="mañana menu" rowspan="2"></td>
                            <td id="ju8-AM" value ="08:00-8:50|08:50-09:40" class="mañana menu" rowspan="2"></td>
                            <td id="vi8-AM" value ="08:00-8:50|08:50-09:40" class="mañana menu" rowspan="2"></td>
                            <td id="sa8-AM" value ="08:00-8:50|08:50-09:40" class="mañana menu" rowspan="2"></td>
                            <td id="do8-AM" value ="08:00-8:50|08:50-09:40" class="mañana menu" rowspan="2"></td>
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
                            <td id="lu11-AM" value="10:00-10:50" class="mañana menu" rowspan=""></td>
                            <td id="ma11-AM" value="10:00-10:50" class="mañana menu" rowspan=""></td>
                            <td id="mi11-AM" value="10:00-10:50" class="mañana menu" rowspan=""></td>
                            <td id="ju11-AM" value="10:00-10:50" class="mañana menu" rowspan=""></td>
                            <td id="vi11-AM" value="10:00-10:50" class="mañana menu" rowspan=""></td>
                            <td id="sa11-AM" value="10:00-10:50" class="mañana menu" rowspan=""></td>
                            <td id="do11-AM" value="10:00-10:50" class="mañana menu" rowspan=""></td>
                        </tr>
                        <tr id="h12">
                            <th scope="row" class="p-3">10:50 - 11:40</th>
                            <td id="lu12-AM" value="10:50-11:40" class="mañana menu" rowspan=""></td>
                            <td id="ma12-AM" value="10:50-11:40" class="mañana menu" rowspan=""></td>
                            <td id="mi12-AM" value="10:50-11:40" class="mañana menu" rowspan=""></td>
                            <td id="ju12-AM" value="10:50-11:40" class="mañana menu" rowspan=""></td>
                            <td id="vi12-AM" value="10:50-11:40" class="mañana menu" rowspan=""></td>
                            <td id="sa12-AM" value="10:50-11:40" class="mañana menu" rowspan=""></td>
                            <td id="do12-AM" value="10:50-11:40" class="mañana menu" rowspan=""></td>
                        </tr>
                        <tr id="h13">
                            <th scope="row" class="p-3">11:40 - 12:00</th>
                            <td id="receso2" colspan="7" class="table-success"></td>
                        </tr>
                        <tr id="h14">
                            <th scope="row" class="p-3">12:00 - 12:50</th>
                            <td id="lu14-PM" value="12:00-12:50|12:50-01:30" class="mañana menu" rowspan="2"></td>
                            <td id="ma14-PM" value="12:00-12:50|12:50-01:30" class="mañana menu" rowspan="2"></td>
                            <td id="mi14-PM" value="12:00-12:50|12:50-01:30" class="mañana menu" rowspan="2"></td>
                            <td id="ju14-PM" value="12:00-12:50|12:50-01:30" class="mañana menu" rowspan="2"></td>
                            <td id="vi14-PM" value="12:00-12:50|12:50-01:30" class="mañana menu" rowspan="2"></td>
                            <td id="sa14-PM" value="12:00-12:50|12:50-01:30" class="mañana menu" rowspan="2"></td>
                            <td id="do14-PM" value="12:00-12:50|12:50-01:30" class="mañana menu" rowspan="2"></td>
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
        <button type="button" class="btn btn-secondary" id="closeBtn1" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

<!-- MODAL HORARIO TARDE -->

<div class="modal fade modal-xl " id="calendario2" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog ">
    <div class="modal-content">
      <div class="modal-header ">
      <h1 class="modal-title fs-5" id="staticBackdropLabel2">HORARIO: <span id="nombre-horario-pm"></span></h1>
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
                        <tr id="h17">
                            <th scope="row" class="p-3">5:00 - 5:50</th>
                            <td id="lu17-PM" value="05:00-06:40" class="tarde menu"  rowspan="2"></td>
                            <td id="ma17-PM" value="05:00-06:40" class="tarde menu" rowspan="2"></td>
                            <td id="mi17-PM" value="05:00-06:40" class="tarde menu" rowspan="2"></td>
                            <td id="ju17-PM" value="05:00-06:40" class="tarde menu" rowspan="2"></td>
                            <td id="vi17-PM" value="05:00-06:40" class="tarde menu" rowspan="2"></td>
                            <td id="sa17-PM" value="05:00-06:40" class="tarde menu" rowspan="2"></td>
                            <td id="do17-PM" value="05:00-06:40" class="tarde menu" rowspan="2"></td>
                        </tr>
                        <tr id="h18">
                            <th scope="row" class="p-3">5:50 - 6:40</th>
                        </tr>
                        <tr id="h19">
                            <th scope="row" class="p-3">6:40 - 7:00</th>
                            <td id="receso3" colspan="7" class="table-success"></td>
                        </tr>
                        <tr id="h20">
                            <th scope="row" class="p-3">7:00 - 7:50</th>
                            <td id="lu20-PM" value="07:00-07:50" class="tarde menu" rowspan="2"></td>
                            <td id="ma20-PM" value="07:00-07:50" class="tarde menu" rowspan="2"></td>
                            <td id="mi20-PM" value="07:00-07:50" class="tarde menu" rowspan="2"></td>
                            <td id="ju20-PM" value="07:00-07:50" class="tarde menu" rowspan="2"></td>
                            <td id="vi20-PM" value="07:00-07:50" class="tarde menu" rowspan="2"></td>
                            <td id="sa20-PM" value="07:00-07:50" class="tarde menu" rowspan="2"></td>
                            <td id="do20-PM" value="07:00-07:50" class="tarde menu" rowspan="2"></td>
                        </tr>
                        <tr id="h12">
                            <th scope="row" class="p-3">7:50 - 8:40</th>
                        </tr>
                   </tbody>
                </table>
            </div>
            
        </div>

      </div>
      <div class="modal-footer">
        <button type="button" id="closeBtn2"class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

