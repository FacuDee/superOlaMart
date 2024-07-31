// Enviar información del formulario

let nombreFormulario = document.getElementById("nombre");
let apellidoFormulario = document.getElementById("apellido");
let emailFormulario = document.getElementById("email");
let telefonoFormulario = document.getElementById("telefono");
let consultaFormulario = document.getElementById("consulta");

document.getElementById("contactoForm").addEventListener("submit", (e) => {
    e.preventDefault();

    // Guarda la información del formulario en una cadena de texto
    let informacionFormulario = `
        Nombre: ${nombreFormulario.value}
        Apellido: ${apellidoFormulario.value}
        Email: ${emailFormulario.value}
        Teléfono: ${telefonoFormulario.value}
        Consulta: ${consultaFormulario.value}
    `;

    // Crea un Blob con la información del formulario
    let blob = new Blob([informacionFormulario], { type: "text/plain;charset=utf-8" });

    saveAs(blob, "consulta-cliente.txt");

    // Muestra un mensaje al enviarse 
    alert(`Muchas gracias ${nombreFormulario.value} ${apellidoFormulario.value}. Su consulta fue realizada y le responderemos a la brevedad. Haz click en aceptar para finalizar.`);

    // Vaciar los campos del formulario
    
    nombreFormulario.value = "";
    apellidoFormulario.value = "";
    emailFormulario.value = "";
    telefonoFormulario.value = "";
    consultaFormulario.value = "";
});
