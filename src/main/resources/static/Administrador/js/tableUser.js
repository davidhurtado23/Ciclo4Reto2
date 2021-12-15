const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {

    identification: /^([\d]){6,10}$/,
    name: /^[a-zA-ZÀ-ÿ\s]{2,40}$/,
    address: /^[\da-zA-ZÀ-ÿ\s\.\,\-\_\#]{2,40}$/,
    cellPhone: /^([\d]){7,10}$/,
    email: /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
    password: /^([\da-zA-Z_\.-]){4,12}$/,
    zone: /^[\da-zA-ZÀ-ÿ\s]{2,40}$/,
    type: /^[a-zA-ZÀ-ÿ\s]{2,40}$/
}

const campos = {
    identification: false,
    name: false,
    address: false,
    cellPhone: false,
    email: false,
    password: false,
    password2: false,
    zone: false,
    type: false
};

var estado = {
    id: null,
    identification: $("#identification").bind("change"),
    name: $("#name").bind("change"),
    address: $("#address").bind("change"),
    cellPhone: $("#cellPhone").bind("change"),
    email: $("#email").bind("change"),
    password: $("#password").bind("change"),
    zone: $("#zone").bind("change"),
    type: $("#type").bind("change"),
}

const validarFormulario = (e) => {
    switch (e.target.name) {

        case "identification":
            validarCampo(expresiones.identification, e.target, 'identification');
            break;

        case "name":
            validarCampo(expresiones.name, e.target, 'name');
            break;

        case "address":
            validarCampo(expresiones.address, e.target, 'address');
            break;

        case "cellPhone":
            validarCampo(expresiones.cellPhone, e.target, 'cellPhone');
            break;

        case "usuario":
            validarCampo(expresiones.usuario, e.target, 'usuario');
            break;

        case "email":
            validarCampo(expresiones.email, e.target, 'email');
            break;

        case "password":
            validarCampo(expresiones.password, e.target, 'password');
            validarPassword2();
            break;

        case "password2":
            validarPassword2();
            break;

        case "zone":
            validarCampo(expresiones.zone, e.target, 'zone');
            break;

        case "type":
            validarCampo(expresiones.type, e.target, 'type');
            break;
    }
};

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`${campo}`).classList.remove('is-invalid')
        document.getElementById(`${campo}`).classList.add('is-valid')
        campos[campo] = true;
    } else {

        document.getElementById(`${campo}`).classList.remove('is-valid')
        document.getElementById(`${campo}`).classList.add('is-invalid')
        campos[campo] = false;
    }
};

const validarPassword2 = () => {
    const inputPassword1 = document.getElementById('password');
    const inputPassword2 = document.getElementById('password2');

    if (inputPassword1.value !== inputPassword2.value) {
        document.getElementById(`password2`).classList.remove('is-valid')
        document.getElementById(`password2`).classList.add('is-invalid')
        campos['password'] = false;
        campos['password2'] = false;
    } else {
        if (expresiones.password.test(inputPassword1.value)) {
            document.getElementById(`password2`).classList.remove('is-invalid')
            document.getElementById(`password2`).classList.add('is-valid')
            campos['password'] = true;
            campos['password2'] = true;
        } else {
            campos['password'] = false
            campos['password2'] = false
        }

    }

};

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});


formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    // Cuando el formulario esta correcto
    if (estado.id == null) {
        if (campos.identification && campos.name && campos.address && campos.cellPhone && campos.email && campos.password && campos.zone && campos.type == true) {
            var email = $("#email").val();
            var elemento = {
                id: estado.id,
                identification: estado.identification.val(),
                name: estado.name.val(),
                address: estado.address.val(),
                cellPhone: estado.cellPhone.val(),
                email: estado.email.val(),
                password: estado.password.val(),
                zone: estado.zone.val(),
                type: estado.type.val(),
            }

            formulario.reset();
            document.querySelectorAll('#formulario input').forEach((icono) => {
                icono.classList.remove('is-valid');
            });
            validarRegistro(email, elemento);

        } else {
            // Ejecutar mensaje de error
            Swal.fire({
                icon: 'error',
                title: 'Formulario incorrecto',
                text: 'Por favor rellenar el formulario correctamente'
            });
        }
    } else {
        if (campos.password2 == true) {
            var email = $("#email").val();
            var elemento = {
                id: estado.id,
                identification: estado.identification.val(),
                name: estado.name.val(),
                address: estado.address.val(),
                cellPhone: estado.cellPhone.val(),
                email: estado.email.val(),
                password: estado.password.val(),
                zone: estado.zone.val(),
                type: estado.type.val(),
            }
            formulario.reset();
            document.querySelectorAll('#formulario input').forEach((icono) => {
                icono.classList.remove('is-valid');
            });
            validarRegistro(email, elemento);
        } else {
            // Ejecutar mensaje de error
            Swal.fire({
                icon: 'error',
                title: 'Formulario incorrecto',
                text: 'Por favor rellenar el formulario correctamente'
            });
        }
    }
});

/* ----- -----  Funcion para mostrar los datos de los usuarios en la tabla ----- -----  */
function traerInformacionUsuarios() {
    $.ajax({
        url: "http://localhost:8080/api/user/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            pintarRespuesta(respuesta);
        }
    });
}

function pintarRespuesta(respuesta) {

    let myTable = "<table>";
    for (i = 0; i < respuesta.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + respuesta[i].identification + "</td>";
        myTable += "<td>" + respuesta[i].name + "</td>";
        myTable += "<td>" + respuesta[i].address + "</td>";
        myTable += "<td>" + respuesta[i].cellPhone + "</td>";
        myTable += "<td>" + respuesta[i].email + "</td>";
        myTable += "<td>" + respuesta[i].password + "</td>";
        myTable += "<td>" + respuesta[i].zone + "</td>";
        myTable += "<td>" + respuesta[i].type + "</td>";
        myTable += "<td> <button class='button btn btn-primary text-center mt-2' onclick='editarUsuario(" + JSON.stringify(respuesta[i].id) + ")'>Editar</button>";
        myTable += "<td> <button class='button btn btn-primary text-center mt-2' onclick='borrarUsuario(" + JSON.stringify(respuesta[i].id) + ")'>Eliminar</button>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultado3").html(myTable);
}

/* ----- -----  Funcion para editar los datos de los usuarios por id ----- -----  */
function editarUsuario(id) {
    $.ajax({
        dataType: 'json',
        url: "http://localhost:8080/api/user/" + id,
        type: 'GET',

        success: function (response) {
            estado.id = response.id;
            $("#identification").val(response.identification);
            $("#name").val(response.name);
            $("#address").val(response.address);
            $("#cellPhone").val(response.cellPhone);
            $("#email").val(response.email);
            $("#password").val(response.password);
            $("#zone").val(response.zone);
            $("#type").val(response.type);
        },

        error: function (jqXHR, textStatus, errorThrown) {
            Swal.fire({
                title: '<strong>Algo fallo</strong>',
                icon: 'error',
                html:
                    '<iframe src="https://giphy.com/embed/8L0Pky6C83SzkzU55a" width="280" height="150" ></iframe><p>Fallo al editar usuario</p>'
            });
        }
    });
}

/* ----- -----  Funcion para eliminar los datos de los usuarios por id ----- -----  */
function borrarUsuario(id) {

    let myData = {
        id: id
    };

    let dataToSend = JSON.stringify(myData);

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: '¿Seguro que deseas eliminar el elemento?',
        text: "No podras revertir esta decision",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "http://localhost:8080/api/user/" + id,
                type: "DELETE",
                data: dataToSend,
                contentType: "application/JSON",
                datatype: "JSON",
                success: function (respuesta) {
                    swalWithBootstrapButtons.fire(
                        'Eliminado',
                        'El usuario se elimino de la BD correctamente',
                        'success'
                    )
                    traerInformacionUsuarios();
                },

                error: function (jqXHR, textStatus, errorThrown) {
                    Swal.fire({
                        icon: 'error',
                        title: 'No se pudo eliminar el usuario de la BD'
                    });
                }
            });
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelado',
                'El usuario NO fue eliminado',
                'error'
            )
        }
    })
}

/* ----- -----  Funcion Ajax para validar el email ----- -----  */
function validarRegistro(email, elemento) {
    if (elemento.id == null) {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: "http://localhost:8080/api/user/emailexist/" + email,

            success: function (response) {
                if (response == false) {
                    registro(elemento);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'El email ya existe'
                    });
                }

            },

            error(jqHRX, textStatus, errorThrown) {
                Swal.fire({
                    title: '<strong>Algo fallo</strong>',
                    icon: 'error',
                    html:
                        '<iframe src="https://giphy.com/embed/8L0Pky6C83SzkzU55a" width="280" height="150" ></iframe><p>Validacion del registro fallido</p>'
                });

            }

        });
    } else {
        registro(elemento);
    }

}

/* ----- -----  Funcion Ajax para registrar un nuevo usuario ----- -----  */
function registro(elemento) {
    if (elemento.id == null) {
        $.ajax({
            type: 'POST',
            contentType: 'application/JSON',
            dataType: 'json',
            data: JSON.stringify(elemento),
            url: "http://localhost:8080/api/user/new",

            success: function (response) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Usuario creado con exito',
                    showConfirmButton: false,
                    timer: 1500
                });
                traerInformacionUsuarios();
            },

            error: function (jqHRX, textStatus, errorThrown) {
                Swal.fire({
                    title: '<strong>Algo fallo</strong>',
                    icon: 'error',
                    html:
                        '<iframe src="https://giphy.com/embed/8L0Pky6C83SzkzU55a" width="280" height="150" ></iframe><p>Registro fallido</p>'
                });
            }

        });
    } else {
        $.ajax({
            dataType: 'json',
            data: JSON.stringify(elemento),
            contentType: 'application/json',
            url: "http://localhost:8080/api/user/update",
            type: 'PUT',

            success: function (response) {

                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Usuario editado con exito',
                    showConfirmButton: false,
                    timer: 1500
                });
                traerInformacionUsuarios();

            },

            error: function (jqXHR, textStatus, errorThrown) {
                Swal.fire({
                    title: '<strong>Algo fallo</strong>',
                    icon: 'error',
                    html:
                        '<iframe src="https://giphy.com/embed/8L0Pky6C83SzkzU55a" width="280" height="150" ></iframe><p>Actualizacion de usuario fallido</p>'
                });
            }
        });
    }

}