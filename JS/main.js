/* Script para ver el menu y la barra de busqueda */

var MenuButton = document.getElementById('Menu-Button');
var MenuOptions = document.querySelector('.Menu-Options');

var LupaIconForMobile = document.getElementById('Lupa-Icon-For-Mobile');
var ContainerSearch = document.querySelector('.Container-Search');

var CarritoDeCompras = document.getElementById('Carrito-De-Compras');
var Ruta_donde_debe_buscarDeCompra = document.querySelector('.Container-Carrito-De-Compra');

var CloseIcons = document.querySelectorAll('.Close-Icon'); // Corregido a querySelectorAll

MenuButton.addEventListener('click', function() {
    MenuOptions.style.left = '0';
});

LupaIconForMobile.addEventListener('click', function() {
    ContainerSearch.style.top = '0';
});

CarritoDeCompras.addEventListener('click', function() {
    Ruta_donde_debe_buscarDeCompra.style.right = '0';
});
// Añadir event listener a cada elemento CloseIcon

CloseIcons.forEach(function(icon) {
    icon.addEventListener('click', function() {
        MenuOptions.style.left = '-100%';
        ContainerSearch.style.top = '-100%';
        Ruta_donde_debe_buscarDeCompra.style.right = '-100%';
    });
});
// ------------------------------------------------------------- //

var Almacen = []; // Lugar donde se va almacenar todos los productos cuando se le de click a "Agregar al carrito"
var contadorImagenes = 0; // Asignar cada id a las imagenes
var imagenIds = {}; // Lugar donde se almacenera los IDs de imágenes según su URL

// Seleccionar el contenedor principal
var Ruta_donde_debe_buscar = document.querySelector('.Container-Carrito-De-Compra');

function Mensaje() {
    // Verifica si existe el contenedor de productos
    var existeContenedorProductos = Ruta_donde_debe_buscar.querySelector('.Contenedor-De-Productos-En-El-Carro-De-Compra');

    var precioTotal = Almacen.reduce(function(total, producto) {
        return total + (producto.cantidad * producto.precio);
    }, 0);
    
    var precioTotalConComas = precioTotal.toLocaleString('es-ES');
    var precioTotalConSimbolo = `$${precioTotalConComas}`;
    
    // Obtener el botón dentro de .Finalizar_Pedido para ponerle el mensaje
    var botonFinalizarPedido = document.querySelector('.Finalizar_Pedido button');

    // Verificar si ya existe un mensaje en el botón
    var mensajeExistente = botonFinalizarPedido.querySelector('.mensaje');
    if (mensajeExistente) {
        // Si existe, actualiza el texto
        mensajeExistente.textContent = !existeContenedorProductos ? "Sigue explorando" : `Finalizar pedido - ${precioTotalConSimbolo}`;
    } else {
        // Crear un nuevo elemento <a> solo si no existe
        var mensaje = document.createElement('a');
        mensaje.className = 'mensaje'; // Asignar una clase

        // Establecer el texto del mensaje
        mensaje.textContent = !existeContenedorProductos ? "Sigue explorando" : `Finalizar pedido - ${precioTotalConSimbolo}`;
        
        // Agregar el mensaje al botón
        botonFinalizarPedido.appendChild(mensaje);
    }
}

function actualizarCantidadTotal() {
    var cantidadTotal = Almacen.reduce(function(total, producto) {
        return total + producto.cantidad;
    }, 0);
    
    var cantidadTotalElementoCarrito = document.querySelector('.Container-Carrito-De-Compra .Container-Carrito-De-Compra-Icons .Numero');
    var cantidadTotalElementoNav = document.querySelector('nav .Container-Icons-Search-Buy .Numero');
    
    if (cantidadTotalElementoCarrito) {
        cantidadTotalElementoCarrito.textContent = `Carrito de compra (${cantidadTotal})`;
    }
    if (cantidadTotalElementoNav) {
        cantidadTotalElementoNav.textContent = cantidadTotal;
    }
}

Mensaje(); // Ejecutar la función

var BotonAgregarAlCarrito = document.querySelectorAll('.Agregar-Al-Carrito-De-Compras');

BotonAgregarAlCarrito.forEach(function(boton) {
    boton.addEventListener('click', function() {
        var nombreProducto = boton.closest('.Productos').querySelector('#Nombre_Del_Producto').textContent;
        var Precio_Formato_Texto = boton.closest('.Productos').querySelector('#Precio-Real-O-Descuento').textContent;
        var Precio_Tipo_Entero = parseFloat(Precio_Formato_Texto.replace('$', '').replace('.', '').trim());
        var imagen = boton.closest('.Productos').querySelector('.Imagen-Del-Producto');
        var rutaImagen = imagen.getAttribute('src');
        var idImagen;

        if (imagenIds[rutaImagen] !== undefined) {
            idImagen = imagenIds[rutaImagen];
        } else {
            idImagen = contadorImagenes++;
            imagenIds[rutaImagen] = idImagen;
        }

        var productoExistente = Almacen.find(function(item) {
            return item.idImagen === idImagen;
        });

        if (productoExistente) {
            productoExistente.cantidad++;
            var cantidadElemento = Ruta_donde_debe_buscar.querySelector(`#imagen-${idImagen}`).nextElementSibling.querySelector('p');
            cantidadElemento.textContent = productoExistente.cantidad;
            actualizarCantidadTotal();
            Mensaje();
            return;
        } else {
            // Seleccionar el contenedor .Contenedor
            var contenedorPrincipal = Ruta_donde_debe_buscar.querySelector('.Contenedor');
            if (!contenedorPrincipal) {
                // Si no existe el contenedor .Contenedor, crearlo y añadirlo a .Container-Carrito-De-Compra
                contenedorPrincipal = document.createElement('div');
                contenedorPrincipal.classList.add('Contenedor');
                Ruta_donde_debe_buscar.appendChild(contenedorPrincipal);
            }

            var Contenedor_De_Los_Productos = document.createElement('div');
            Contenedor_De_Los_Productos.classList.add('Contenedor-De-Productos-En-El-Carro-De-Compra');
            contenedorPrincipal.appendChild(Contenedor_De_Los_Productos);

            var imagenElemento = document.createElement('img');
            imagenElemento.src = rutaImagen;
            imagenElemento.alt = nombreProducto;
            imagenElemento.id = `imagen-${idImagen}`;

            Contenedor_De_Los_Productos.appendChild(imagenElemento);

            var ul = document.createElement('ul');
            var nombreElemento = document.createElement('li');
            nombreElemento.textContent = nombreProducto;
            nombreElemento.style.fontSize = '15px';
            nombreElemento.style.fontWeight = 400;
            ul.appendChild(nombreElemento);

            var precioElemento = document.createElement('li');
            precioElemento.textContent = Precio_Formato_Texto;
            ul.appendChild(precioElemento);

            var liBotones = document.createElement('li');

            var cantidadElemento = document.createElement('p');
            cantidadElemento.textContent = '1';
            cantidadElemento.style.width = '16px';
            cantidadElemento.style.height = '16px';
            cantidadElemento.style.fontSize = '16px';
            cantidadElemento.style.textAlign = 'center';
            cantidadElemento.style.border = '0';
            cantidadElemento.style.display = 'inline-block';
            cantidadElemento.style.margin = '0';
            cantidadElemento.style.padding = '0 5px';

            var buttonMenos = document.createElement('button');
            buttonMenos.style.backgroundColor = 'white';
            buttonMenos.style.border = 'none';
            buttonMenos.innerHTML = '<img src="Icons/menos.png" style="width: 13px; height: auto; position: relative; right: 6px;">';
            buttonMenos.addEventListener('click', function() {
                var producto = Almacen.find(function(item) {
                    return item.idImagen === idImagen;
                });

                if (producto.cantidad > 1) {
                    producto.cantidad--;
                    cantidadElemento.textContent = producto.cantidad;
                    Mensaje();
                    actualizarCantidadTotal();
                } else {
                    Almacen = Almacen.filter(function(item) {
                        return item.idImagen !== idImagen;
                    });
                    Contenedor_De_Los_Productos.remove();
                    actualizarCantidadTotal();
                    Mensaje();
                }
            });

            var buttonMas = document.createElement('button');
            buttonMas.style.backgroundColor = 'white';
            buttonMas.style.border = 'none';
            buttonMas.style.position = 'relative';
            buttonMas.style.right = '8px';
            buttonMas.innerHTML = '<img src="Icons/mas.webp" style="width: 13px; height: auto;">';
            buttonMas.addEventListener('click', function() {
                var producto = Almacen.find(function(item) {
                    return item.idImagen === idImagen;
                });

                producto.cantidad++;
                cantidadElemento.textContent = producto.cantidad;
                actualizarCantidadTotal();
                Mensaje();
            });

            ul.appendChild(liBotones);
            liBotones.appendChild(buttonMenos);
            liBotones.appendChild(cantidadElemento);
            liBotones.appendChild(buttonMas);

            Contenedor_De_Los_Productos.appendChild(ul);

            Almacen.push({
                idImagen,
                nombre: nombreProducto,
                Precio: Precio_Formato_Texto,
                precio: Precio_Tipo_Entero,
                cantidad: 1,
            });
        }

        actualizarCantidadTotal();
        Mensaje();
    });
});
