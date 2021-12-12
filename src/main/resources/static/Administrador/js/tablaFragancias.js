const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
    referencia: /^([\da-zA-Z\-\.\_\,\#]){1,40}$/,
    marca: /^[a-zA-ZÀ-ÿ0-9\_\-]{1,16}$/,
    categoria: /^[\d\D\s]+$/,
    presentacion: /^[\d\D\s]+$/,
    descripcion: /^[\d\D\s]+$/,
    disponibilidad: /^[a-z]{4,5}$/,
    precio: /^([\d])+$/,
    cantidad: /^([\d])+$/,
    fotografia: /^[\d\D\s]+$/
}

const campos = {
    referencia: false,
    marca: false,
    categoria: false,
    presentacion: false,
    descripcion: false,
    disponibilidad: false,
    precio: false,
    cantidad: false,
    fotografia: false
};

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "referencia":
            validarCampo(expresiones.referencia, e.target, 'referencia');
            break;

        case "marca":
            validarCampo(expresiones.marca, e.target, 'marca');
            break;

        case "categoria":
            validarCampo(expresiones.categoria, e.target, 'categoria');
            break;

        case "presentacion":
            validarCampo(expresiones.presentacion, e.target, 'presentacion');
            break;

        case "descripcion":
            validarCampo(expresiones.descripcion, e.target, 'descripcion');
            break;

        case "disponibilidad":
            validarCampo(expresiones.disponibilidad, e.target, 'disponibilidad');
            break;

        case "precio":
            validarCampo(expresiones.precio, e.target, 'precio');
            break;

        case "cantidad":
            validarCampo(expresiones.cantidad, e.target, 'cantidad');
            break;

        case "fotografia":
            validarCampo(expresiones.fotografia, e.target, 'fotografia');
            break;
    };
}

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
    if (campos.referencia && campos.marca && campos.categoria && campos.presentacion && campos.descripcion && campos.disponibilidad && campos.precio && campos.cantidad && campos.fotografia == true) {
        var elemento = {
            reference: $("#referencia").val(),
            brand: $("#marca").val(),
            category: $("#categoria").val(),
            presentation: $("#presentacion").val(),
            description: $("#descripcion").val(),
            availability: $("#disponibilidad").val(),
            price: $("#precio").val(),
            quantity: $("#cantidad").val(),
            photography: $("#fotografia").val()
        }

        formulario.reset();
        document.querySelectorAll('#formulario input').forEach((icono) => {
            icono.classList.remove('is-valid');
        });
        registro(elemento);

    } else {
        // Ejecutar mensaje de error
        Swal.fire({
            icon: 'error',
            title: 'Formulario incorrecto',
            text: 'Por favor rellenar el formulario correctamente'
        });
    }

});

/* ----- -----  Funcion para mostrar los datos de los productos en la tabla ----- -----  */
function traerInformacionProductos() {
    $.ajax({
        url: "http://localhost:8080/api/fragance/all",
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
        myTable += "<td>" + respuesta[i].reference + "</td>";
        myTable += "<td>" + respuesta[i].brand + "</td>";
        myTable += "<td>" + respuesta[i].category + "</td>";
        myTable += "<td>" + respuesta[i].presentation + "</td>";
        myTable += "<td>" + respuesta[i].description + "</td>";
        myTable += "<td>" + respuesta[i].availability + "</td>";
        myTable += "<td>" + respuesta[i].price + "</td>";
        myTable += "<td>" + respuesta[i].quantity + "</td>";
        myTable += "<td>" + respuesta[i].photography + "</td>";
        myTable += "<td> <button class='button btn btn-primary text-center mt-2' onclick='editarProducto(" + JSON.stringify(respuesta[i].reference) + ")'>Editar</button>";
        myTable += "<td> <button class='button btn btn-primary text-center mt-2' onclick='borrarProducto(" + JSON.stringify(respuesta[i].reference) + ")'>Eliminar</button>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultado3").html(myTable);
}

/* ----- -----  Funcion para editar los datos de los productos por referencia ----- -----  */
function editarProducto(reference) {
    document.getElementById(`mi-boton`).classList.add('d-none')
    if ($('#actualizar').length == 0) {
        $("#accion").append('<button class="button btn btn-primary text-center mt-2" id="actualizar" onclick="actualizarItem(' + reference + ')">Actualizar</button>');
    }

    $.ajax({
        dataType: 'json',
        url: "http://localhost:8080/api/fragance/" + reference,
        type: 'GET',

        success: function (response) {
            $("#referencia").val(response.reference);
            $("#marca").val(response.brand);
            $("#categoria").val(response.category);
            $("#presentacion").val(response.presentation);
            $("#descripcion").val(response.description);
            $("#disponibilidad").val(response.availability);
            $("#precio").val(response.price);
            $("#cantidad").val(response.quantity);
            $("#fotografia").val(response.photography);
        },

        error: function (jqXHR, textStatus, errorThrown) {
            Swal.fire({
                title: '<strong>Algo fallo</strong>',
                icon: 'error',
                html:
                    '<iframe src="https://giphy.com/embed/8L0Pky6C83SzkzU55a" width="280" height="150" ></iframe><p>Fallo al editar producto</p>'
            });
        }
    });
}

/* ----- -----  Funcion para eliminar los datos de los productos por referencia ----- -----  */
function borrarProducto(reference) {
    let myData = {
        reference: reference
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
                url: "http://localhost:8080/api/fragance/" + reference,
                type: "DELETE",
                data: dataToSend,
                contentType: "application/JSON",
                datatype: "JSON",
                success: function (respuesta) {
                    swalWithBootstrapButtons.fire(
                        'Eliminado',
                        'El producto se elimino de la BD correctamente',
                        'success'
                    )
                    traerInformacionProductos();
                },

                error: function (jqXHR, textStatus, errorThrown) {
                    Swal.fire({
                        icon: 'error',
                        title: 'No se pudo eliminar el producto de la BD'
                    });
                }
            });
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelado',
                'El producto NO fue eliminado',
                'error'
            )
        }
    })


}

/* ----- -----  Funcion Ajax para registrar un nuevo producto ----- -----  */
function registro(elemento) {

    $.ajax({
        type: 'POST',
        contentType: 'application/JSON',
        dataType: 'json',
        data: JSON.stringify(elemento),
        url: "http://localhost:8080/api/fragance/new",

        success: function (response) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Producto añadido con exito',
                showConfirmButton: false,
                timer: 1500
            });
            traerInformacionProductos();
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
function actualizarItem(reference) {

    var elemento = {
        reference: reference,
        brand: $("#marca").val(),
        category: $("#categoria").val(),
        presentation: $("#presentacion").val(),
        description: $("#descripcion").val(),
        availability: $("#disponibilidad").val(),
        price: $("#precio").val(),
        quantity: $("#cantidad").val(),
        photography: $("#fotografia").val()
    }

    $.ajax({
        dataType: 'json',
        data: JSON.stringify(elemento),
        contentType: 'application/json',
        url: "http://localhost:8080/api/fragance/update",
        type: 'PUT',

        success: function (response) {

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Producto editado con exito',
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
                    '<iframe src="https://giphy.com/embed/8L0Pky6C83SzkzU55a" width="280" height="150" ></iframe><p>Actualizacion de producto fallido</p>'
            });
        }
    });
}