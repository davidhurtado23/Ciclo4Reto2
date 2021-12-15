const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
    reference: /^([\da-zA-Z\-\.\_\,\#]){1,40}$/,
    brand: /^[a-zA-ZÀ-ÿ0-9\_\-]{1,16}$/,
    category: /^[\d\D\s]+$/,
    presentation: /^[\d\D\s]+$/,
    description: /^[\d\D\s]+$/,
    availability: /^[a-z]{4,5}$/,
    price: /^([\d])+$/,
    quantity: /^([\d])+$/,
    photography: /^[\d\D\s]+$/
}

const campos = {
    reference: false,
    brand: false,
    category: false,
    presentation: false,
    description: false,
    availability: false,
    price: false,
    quantity: false,
    photography: false
};

var actualizar = false;
var actReference;

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "reference":
            validarCampo(expresiones.reference, e.target, 'reference');
            break;

        case "brand":
            validarCampo(expresiones.brand, e.target, 'brand');
            break;

        case "category":
            validarCampo(expresiones.category, e.target, 'category');
            break;

        case "presentation":
            validarCampo(expresiones.presentation, e.target, 'presentation');
            break;

        case "description":
            validarCampo(expresiones.description, e.target, 'description');
            break;

        case "availability":
            validarCampo(expresiones.availability, e.target, 'availability');
            break;

        case "price":
            validarCampo(expresiones.price, e.target, 'price');
            break;

        case "quantity":
            validarCampo(expresiones.quantity, e.target, 'quantity');
            break;

        case "photography":
            validarCampo(expresiones.photography, e.target, 'photography');
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
    if (actualizar == true) {
        actualizarItem(actReference);
        document.getElementById("reference").disabled = true;
        formulario.reset();
        document.querySelectorAll('#formulario input').forEach((icono) => {
            icono.classList.remove('is-valid');
            icono.classList.remove('is-invalid');
        });
    } else {
        if (campos.reference && campos.brand && campos.category && campos.presentation && campos.description && campos.availability && campos.price && campos.quantity && campos.photography == true) {
            var elemento = {
                reference: $("#reference").val(),
                brand: $("#brand").val(),
                category: $("#category").val(),
                presentation: $("#presentation").val(),
                description: $("#description").val(),
                availability: $("#availability").val(),
                price: $("#price").val(),
                quantity: $("#quantity").val(),
                photography: $("#photography").val()
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
        myTable += "<td> <button class='button btn btn-primary text-center mt-2' onclick='editarProducto(" + JSON.stringify(respuesta[i].reference) + "), desactivar()'>Editar</button>";
        myTable += "<td> <button class='button btn btn-primary text-center mt-2' onclick='borrarProducto(" + JSON.stringify(respuesta[i].reference) + ")'>Eliminar</button>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultado3").html(myTable);
}

function desactivar() {
    document.getElementById('reference').disabled = true;
}

function activar() {
    document.getElementById('reference').disabled = false;
}

/* ----- -----  Funcion para editar los datos de los productos por reference ----- -----  */
function editarProducto(reference) {
    actualizar = true;
    actReference = reference;

    $.ajax({
        dataType: 'json',
        url: "http://localhost:8080/api/fragance/" + reference,
        type: 'GET',

        success: function (response) {
            $("#reference").val(response.reference);
            $("#brand").val(response.brand);
            $("#category").val(response.category);
            $("#presentation").val(response.presentation);
            $("#description").val(response.description);
            $("#availability").val(response.availability);
            $("#price").val(response.price);
            $("#quantity").val(response.quantity);
            $("#photography").val(response.photography);
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

/* ----- -----  Funcion para eliminar los datos de los productos por reference ----- -----  */
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
    console.log(elemento)

    $.ajax({
        type: 'POST',
        contentType: 'application/JSON',
        dataType: 'json',
        data: JSON.stringify(elemento),
        url: "http://localhost:8080/api/fragance/new",

        success: function (response) {
            console.log(response);
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
        brand: $("#brand").val(),
        category: $("#category").val(),
        presentation: $("#presentation").val(),
        description: $("#description").val(),
        availability: $("#availability").val(),
        price: $("#price").val(),
        quantity: $("#quantity").val(),
        photography: $("#photography").val()
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
            activar();
            traerInformacionProductos();
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