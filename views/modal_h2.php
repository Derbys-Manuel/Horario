<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.8.1/font/bootstrap-icons.min.css">
<div class="modal fade modal-xl " id="calendario2" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
                        <tr id="h17">
                            <th scope="row" class="p-3">5:00 - 5:50</th>
                            <td id="lu17" class="tarde menu"  rowspan="2"></td>
                            <td id="ma17" class="tarde menu" rowspan="2"></td>
                            <td id="mi17" class="tarde menu" rowspan="2"></td>
                            <td id="ju17" class="tarde menu" rowspan="2"></td>
                            <td id="vi17" class="tarde menu" rowspan="2"></td>
                            <td id="sa17" class="tarde menu" rowspan="2"></td>
                            <td id="do17" class="tarde menu" rowspan="2"></td>
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
                            <td id="lu20" class="tarde menu" rowspan="2"></td>
                            <td id="ma20" class="tarde menu" rowspan="2"></td>
                            <td id="mi20" class="tarde menu" rowspan="2"></td>
                            <td id="ju20" class="tarde menu" rowspan="2"></td>
                            <td id="vi20" class="tarde menu" rowspan="2"></td>
                            <td id="sa20" class="tarde menu" rowspan="2"></td>
                            <td id="do20" class="tarde menu" rowspan="2"></td>
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
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" id="guardar_h">Guardar</button>
      </div>
    </div>
  </div>
</div>