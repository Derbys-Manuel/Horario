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
