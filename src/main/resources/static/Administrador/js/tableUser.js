const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
    id: /^([\d]){1,40}$/,
    identificacion: /^([\d]){6,10}$/,
    nombre: /^[a-zA-ZÀ-ÿ\s]{2,40}$/,
    direccion: /^[\da-zA-ZÀ-ÿ\s\.\,\-\_\#]{2,40}$/,
    telefono: /^([\d]){7,10}$/,
    correo: /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
    contraseña: /^([\da-zA-Z_\.-]){4,12}$/,
    zona: /^[\da-zA-ZÀ-ÿ\s]{2,40}$/,
    tipoUsuario: /^[a-zA-ZÀ-ÿ\s]{2,40}$/
}

const campos = {
    id: false,
    identificacion: false,
    nombre: false,
    direccion: false,
    telefono: false,
    correo: false,
    contraseña: false,
    zona: false,
    tipoUsuario: false
};

const validarFormulario = (e) => {
    switch (e.target.name) {

        case "id":
            validarCampo(expresiones.id, e.target, 'id');
            break;
        case "identificacion":
            validarCampo(expresiones.identificacion, e.target, 'identificacion');
            break;
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
            break;
        case "direccion":
            validarCampo(expresiones.direccion, e.target, 'direccion');
            break;

        case "telefono":
            validarCampo(expresiones.telefono, e.target, 'telefono');
            break;

        case "usuario":
            validarCampo(expresiones.usuario, e.target, 'usuario');
            break;

        case "correo":
            validarCampo(expresiones.correo, e.target, 'correo');
            break;

        case "contraseña":
            validarCampo(expresiones.contraseña, e.target, 'contraseña');
            validarPassword2();
            break;

        case "contraseña2":
            validarPassword2();
            break;

        case "zona":
            validarCampo(expresiones.zona, e.target, 'zona');
            break;

        case "tipoUsuario":
            validarCampo(expresiones.tipoUsuario, e.target, 'tipoUsuario');
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
    const inputPassword1 = document.getElementById('contraseña');
    const inputPassword2 = document.getElementById('contraseña2');

    if (inputPassword1.value !== inputPassword2.value) {
        document.getElementById(`contraseña2`).classList.remove('is-valid')
        document.getElementById(`contraseña2`).classList.add('is-invalid')
        campos['contraseña'] = false;
    } else {
        if (expresiones.contraseña.test(inputPassword1.value)) {
            document.getElementById(`contraseña2`).classList.remove('is-invalid')
            document.getElementById(`contraseña2`).classList.add('is-valid')
            campos['contraseña'] = true;
        } else {
            campos['contraseña'] = false
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
    if (campos.id && campos.identificacion && campos.nombre && campos.direccion && campos.telefono && campos.correo && campos.contraseña && campos.zona && campos.tipoUsuario == true) {
        var correo = $("#correo").val();
        var elemento = {
            id: $("#id").val(),
            identification: $("#identificacion").val(),
            name: $("#nombre").val(),
            address: $("#direccion").val(),
            cellPhone: $("#telefono").val(),
            email: $("#correo").val(),
            password: $("#contraseña").val(),
            zone: $("#zona").val(),
            type: $("#tipoUsuario").val()
        }

        formulario.reset();
        document.querySelectorAll('#formulario input').forEach((icono) => {
            icono.classList.remove('is-valid');
        });
        validarRegistro(correo, elemento);

    } else {
        // Ejecutar mensaje de error
        Swal.fire({
            icon: 'error',
            title: 'Formulario incorrecto',
            text: 'Por favor rellenar el formulario correctamente'
        });
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
        myTable += "<td>" + respuesta[i].id + "</td>";
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
    document.getElementById(`mi-boton`).classList.add('d-none')
    if ($('#actualizar').length == 0) {
        $("#accion").append('<button class="button btn btn-primary text-center mt-2" id="actualizar" onclick="actualizarItem(' + id + ')">Actualizar</button>');
    }

    $.ajax({
        dataType: 'json',
        url: "http://localhost:8080/api/user/" + id,
        type: 'GET',

        success: function (response) {
            $("#id").val(response.id);
            $("#identificacion").val(response.identification);
            $("#nombre").val(response.name);
            $("#direccion").val(response.address);
            $("#telefono").val(response.cellPhone);
            $("#correo").val(response.email);
            $("#contraseña").val(response.password);
            $("#zona").val(response.zone);
            $("#tipoUsuario").val(response.type);
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

/* ----- -----  Funcion Ajax para validar el correo ----- -----  */
function validarRegistro(correo, elemento) {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: "http://localhost:8080/api/user/emailexist/" + correo,

        success: function (response) {
            if (response == false) {
                registro(elemento);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'El correo ya existe'
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

}

/* ----- -----  Funcion Ajax para registrar un nuevo usuario ----- -----  */
function registro(elemento) {

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

}

/* ----- -----  Funcion para actualizar un usuario existente ----- -----  */
function actualizarItem(idElemento) {

    var elemento = {
        id: idElemento,
        identification: $("#identificacion").val(),
        name: $("#nombre").val(),
        address: $("#direccion").val(),
        cellPhone: $("#telefono").val(),
        email: $("#correo").val(),
        password: $("#contraseña").val(),
        zone: $("#zona").val(),
        type: $("#tipoUsuario").val()
    }

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
            window.location.reload();
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