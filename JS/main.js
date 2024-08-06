var Carrito_De_Compra = [];

localStorage.setItem('Carrito_De_Compra', JSON.stringify(Carrito_De_Compra)); // Guardamos el localstorage del inicio

function actualizarLocalStorage() {
    // Convierte el array del carrito en una cadena JSON
    const carritoJSON = JSON.stringify(Carrito_De_Compra);

    // Actualiza el localStorage con la cadena JSON del carrito
    localStorage.setItem('Carrito_De_Compra', carritoJSON);
}

// Agrega el listener para el evento de almacenamiento
//window.addEventListener('storage', manejarCambioEnLocalStorage);

function Agregar_al_Nicho_Correspondiente() {
    var Nicho = document.querySelectorAll("main .Nicho"); // Selecciona todos los elementos con la clase .Nicho

    Nicho.forEach((Nichos) => {
        var nichoNombre = Nichos.textContent.trim(); // Obtiene el texto del Nicho y lo recorta
        var Contenedor_de_productos = Nichos.nextElementSibling; // Obtiene el siguiente elemento hermano

        var productosFiltrados = Productos.filter( // Filtra los productos por el nicho
            (producto) => producto.Nicho === nichoNombre
        );

        productosFiltrados.forEach((producto) => {
            var div = document.createElement("div"); // Crea un nuevo div
            div.classList.add("Producto"); // Añade la clase Producto

            var imagen = document.createElement("img"); // Crea una imagen
            imagen.alt = producto.Nombre; // Añade texto alternativo
            imagen.height = 250; // Ajusta la altura de la imagen
            imagen.classList.add("Pointer") // Añade un clase
            imagen.src = producto.rutaImagen.Img0; // Asigna la ruta de la imagen
            imagen.width = 270;

            // Manejador de clic en la imagen
            imagen.addEventListener("click", function() {
                var link = document.createElement('a');
                link.href = `producto.html?Nombre=${producto.Nombre}`; // Usar un ID único del producto
                link.target = "_blank"; // Abrir en una nueva pestaña
                link.click();
            });

            div.appendChild(imagen); // Añade la imagen al div
            Contenedor_de_productos.appendChild(div); // Añade el div al contenedor de productos
        });
    });
}

Agregar_al_Nicho_Correspondiente();
