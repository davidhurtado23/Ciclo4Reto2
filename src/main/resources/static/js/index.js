const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
    clave: /^([\da-zA-Z_\.-]){4,12}$/, //4-12 caracteres
    correo: /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/ // Correo; El correo solo puede contener letras, numeros, puntos, guiones y guion bajo
}

const campos = {
    clave: false,
    correo: false
};

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "correo":
            validarCampo(expresiones.correo, e.target, 'correo');
            break;

        case "clave":
            validarCampo(expresiones.clave, e.target, 'clave');
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

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    // Cuando el formulario esta correcto
    if (campos.correo && campos.clave == true) {
        var correo = $("#correo").val();
        var clave = $("#clave").val();
        formulario.reset();
        document.querySelectorAll('#formulario input').forEach((icono) => {
            icono.classList.remove('is-valid');
        });
        ingresar(correo, clave);

    } else {
        // Ejecutar mensaje de error
        Swal.fire({
            icon: 'error',
            title: 'Formulario incorrecto',
            text: 'Por favor rellenar el formulario correctamente'
        });
    }

});

/* ----- -----  Funcion Ajax para consultar por email y password----- -----  */
function ingresar(correo, clave) {

    $.ajax({
        dataType: 'json',
        url: "http://localhost:8080/api/user/" + correo + "/" + clave,
        type: "GET",

        success: function (response) {
            if (response.id == null) {
                Swal.fire({
                    icon: 'error',
                    title: 'No existe un usuario'
                });
            } else {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Bienvenido ' + response.name,
                    showConfirmButton: false,
                    timer: 1500
                });
                location.href = "/src/main/resources/static/Administrador/tablaAdmin.html"
            }
        },

        error: function (jqHRX, textStatus, errorThrown) {
            Swal.fire({
                title: '<strong>Algo fallo</strong>',
                icon: 'error',
                html:
                    '<iframe src="https://giphy.com/embed/8L0Pky6C83SzkzU55a" width="280" height="150" ></iframe><p>Ingreso fallido</p>'
            });
        }
    });

}
