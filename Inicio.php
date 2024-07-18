<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="./assets/style_css.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.21/css/jquery.dataTables.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap"> 
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <script src="https://cdn.datatables.net/1.10.21/js/jquery.dataTables.min.js"></script>   
</head>
<body>
    <?php include "modal.php" ?> 
    <div class="container-fluid m-5 p-5">  
        <div class="row justify-content-center  m-5 p-5">
            <div class="col col-6  m-5 p-5">
                <div class="card">
                    <div class="row">
                        <div class="col-col-4 d-flex mt-4 ms-4">
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
                                <label class="form-check-label" for="inlineRadio1">1</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
                                <label class="form-check-label" for="inlineRadio2">2</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" disabled>
                                <label class="form-check-label" for="inlineRadio3">3 (disabled)</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1">
                                <label class="form-check-label" for="inlineCheckbox1">AM</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2">
                                <label class="form-check-label" for="inlineCheckbox2">PM</label>
                            </div>
                            <div>
                                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop"> + </button>
                            </div>
                        </div>
                           

                    </div>

                    <div class="card-body">
                        <table class="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Curso</th>
                                    <th>Tools</th>
                                </tr>   
                            </thead>
                            <tbody id="lista">
         
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>


    
</body>
<script src="./assets/js/bootstrap.min.js"></script>
<script src="./assets/js.js"></script>

</html>