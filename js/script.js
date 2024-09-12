"use strict";

// Tres arreglos para productos, precios y stock

const productos = [
  "Yerba 'Playadito' X1kg.",
  "Mayonesa 'Natura' X250g.",
  "Galletitas 'Don Satur' X200g.",
  "Galletitas 9 de Oro X200g.",
  "Pepas Terepin X200g.",
  "Detergente 'Ala' X500ml.",
  "Shampoo 'Plusbelle' X1000ml.",
  "Jabón Dove Original 3u X90g.",
  "Desod. Dove Roll X50ml.",
  "Ala Matic Ecolavado X3kg.",
  "Cunnington Pomelo X2,25l.",
  "Sprite X2,25l.",
  "Aquarius Naranja X2,25l.",
  "Agua Villavicencio X2l.",
  "Coca Cola X1,5l.",
  "Arcor Leche c/ maní X95g.",
  "Cofler Block X38g.",
  "Graffiti Negro X45g.",
  "Milka Avellanas X100g.",
  "Nestle Crunch X80g.",
];

const precios = [
  3200, 750, 700, 730, 550, 1600, 1850, 3000, 1700, 5100, 2500, 2600, 2000,
  1600, 1800, 1800, 750, 720, 2800, 1300,
];

const stock = [
  12, 11, 16, 11, 7, 21, 8, 23, 20, 13, 27, 17, 27, 15, 17, 16, 7, 20, 23, 27,
];

// Variables

let totalCompra = 0;

const grillaProductos = document.querySelector(".grilla-productos");
const unidadesCompra = document.querySelector(".unidades-compra");
const confirmacionCompra = document.getElementById("confirmacion-compra");
const comprarBtn = document.getElementById("comprar-btn");

// Cargar los productos en el html de compras

function cargarProductos() {
  for (let i = 0; i < productos.length; i++) {
    const productoDiv = document.createElement("div");
    productoDiv.classList.add("producto");

    const nombreProducto = document.createElement("h6");
    nombreProducto.textContent = productos[i];
    productoDiv.appendChild(nombreProducto);

    const imagenProducto = document.createElement("img");
    imagenProducto.src = `./imgs/producto${i + 1}.jpg`;
    imagenProducto.alt = productos[i];
    productoDiv.appendChild(imagenProducto);

    const precioProducto = document.createElement("p");
    precioProducto.textContent = `$${precios[i]}`;
    productoDiv.appendChild(precioProducto);

    const unidadesDiv = document.createElement("div");
    unidadesDiv.classList.add("unidades");

    const inputCantidad = document.createElement("input");
    inputCantidad.type = "number";
    inputCantidad.min = "0";
    unidadesDiv.appendChild(inputCantidad);

    const botonAgregar = document.createElement("button");
    botonAgregar.textContent = "Agregar";
    unidadesDiv.appendChild(botonAgregar);

    // Añadir al carrito el producto x cantidad de veces

    inputCantidad.value = 0;

    botonAgregar.addEventListener("click", () => {
      const cantidad = parseInt(inputCantidad.value);
      const precioProducto = precios[i];
      if (cantidad > 0 && cantidad <= stock[i]) {
        for (let j = 0; j < cantidad; j++) {
          const compraProducto = document.createElement("p");
          compraProducto.textContent = `1 - ${productos[i]} | $${precios[i]}`;
          unidadesCompra.appendChild(compraProducto);
          totalCompra += precioProducto;
        }
        stock[i] -= cantidad;
        document.getElementById(
          "total-compra"
        ).textContent = `Total: $${totalCompra}`;
      } else if (cantidad == 0) {
        alert(`Debes seleccionar al menos 1 unidad del producto.`);
      } else {
        alert(
          `Stock insuficiente. Solo es posible agregar ${stock[i]} unidades.`
        );
      }
      inputCantidad.value = 0;
    });

    productoDiv.appendChild(unidadesDiv);
    grillaProductos.appendChild(productoDiv);
  }
}

cargarProductos();

// Confirmación de la compra

comprarBtn.addEventListener("click", () => {
  if (unidadesCompra.children.length > 0) {
    confirmacionCompra.innerHTML = `
        <div class="mensaje-confirmacion">
            <p class="p-compra">Total a pagar: $${totalCompra}</p>
            <p>¿Confirma la compra?</p>
            <button id="aceptar-btn">Aceptar</button>
            <button id="cancelar-btn">Cancelar</button>
        </div>
    `;

    // document.getElementById('aceptar-btn').addEventListener('click', () => {
    //     alert('La operación fue realizada. ¡Muchas gracias por su compra!');
    //     confirmacionCompra.innerHTML = '';
    //     unidadesCompra.innerHTML = '';
    //     totalCompra = 0;
    //     document.getElementById('total-compra').textContent = `Total: $${totalCompra}`;
    // });

    document.getElementById("aceptar-btn").addEventListener("click", () => {
      Swal.fire({
        title: "¡Compra realizada!",
        text: "La operación fue realizada con éxito. ¡Muchas gracias por su compra!",
        icon: "success",
        confirmButtonText: "Aceptar",
      }).then(() => {
        // Limpiar la pantalla y los valores después de aceptar
        confirmacionCompra.innerHTML = "";
        unidadesCompra.innerHTML = "";
        totalCompra = 0;
        document.getElementById(
          "total-compra"
        ).textContent = `Total: $${totalCompra}`;
        window.location.reload();
      });
    });

    document.getElementById("cancelar-btn").addEventListener("click", () => {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Si cancelas, perderás todos los productos seleccionados.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, cancelar",
        cancelButtonText: "No, continuar con la compra",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Cancelado",
            text: "Tu compra ha sido cancelada.",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
          // Limpiar la pantalla y los valores después de cancelar
          confirmacionCompra.innerHTML = "";
          unidadesCompra.innerHTML = "";
          totalCompra = 0;
          document.getElementById(
            "total-compra"
          ).textContent = `Total: $${totalCompra}`;
        }
      });
    });
  }
});
