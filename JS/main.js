/* Script para ver el menu y la barra de busqueda */

var MenuButton = document.getElementById('Menu-Button');
var MenuOptions = document.querySelector('.Menu-Options');

var LupaIconForMobile = document.getElementById('Lupa-Icon-For-Mobile');
var ContainerSearch = document.querySelector('.Container-Search');

var CarritoDeCompras = document.getElementById('Carrito-De-Compras');
var ContainerCarritoDeCompra = document.querySelector('.Container-Carrito-De-Compra');

var CloseIcons = document.querySelectorAll('.Close-Icon'); // Corregido a querySelectorAll

MenuButton.addEventListener('click', function() {
    MenuOptions.style.left = '0';
});

LupaIconForMobile.addEventListener('click', function() {
    ContainerSearch.style.top = '0';
});

CarritoDeCompras.addEventListener('click', function() {
    ContainerCarritoDeCompra.style.right = '0';
});
// Añadir event listener a cada elemento CloseIcon

CloseIcons.forEach(function(icon) {
    icon.addEventListener('click', function() {
        MenuOptions.style.left = '-100%';
        ContainerSearch.style.top = '-100%';
        ContainerCarritoDeCompra.style.right = '-100%';
    });
});
// ------------------------------------------------------------- //

/*
var Caracteristicas_Del_Producto = []; // Array para almacenar los productos agregados al carrito
var contadorImagenes = 0; // Contador para IDs de imágenes
var imagenIds = {}; // Mapa para almacenar IDs de imágenes según su URL

// Crear el contenedor principal del carrito de compra si no existe
var containerCarrito = document.querySelector('.Container-Carrito-De-Compra');
if (!containerCarrito) {
    containerCarrito = document.createElement('div');
    containerCarrito.classList.add('Container-Carrito-De-Compra');
    document.body.appendChild(containerCarrito); // Agregar al body o a otro elemento padre según tu estructura
}

// Elemento para mostrar la cantidad total en el carrito
var cantidadTotalElemento = document.querySelector('.Container-Carrito-De-Compra .Container-Carrito-De-Compra-Icons .Numero');

var BotonAgregarAlCarrito = document.querySelectorAll('.Agregar-Al-Carrito-De-Compras');

BotonAgregarAlCarrito.forEach(function(boton) {
    boton.addEventListener('click', function() { 
        // Crear un nuevo contenedor para este producto en el carrito
        var contenedorProductos = document.createElement('div');
        contenedorProductos.classList.add('Contenedor-De-Productos-En-El-Carro-De-Compra');
        
        // Obtener el nombre del producto
        var nombreProducto = boton.closest('.Productos').querySelector('#Nombre_Del_Producto').textContent;

        // Obtener el precio del producto y convertirlo a número
        var precioTexto = boton.closest('.Productos').querySelector('#Precio-Real-O-Descuento').textContent;
        var precio = parseFloat(precioTexto.replace('.', '').replace(',', '.').replace('$', '').trim());

        // Obtener la ruta de la imagen del producto
        var imagen = boton.closest('.Productos').querySelector('.Imagen-Del-Producto');
        var rutaImagen = imagen.getAttribute('src');

        // Verificar si la imagen ya tiene un ID asignado
        var idImagen;
        if (imagenIds[rutaImagen] !== undefined) {
            idImagen = imagenIds[rutaImagen]; // Usar ID existente
        } else {
            idImagen = contadorImagenes++; // Crear nuevo ID
            imagenIds[rutaImagen] = idImagen; // Almacenar en el mapa
        }

        // Comprobar si la imagen ya existe en el contenedor principal del carrito
        var productoExistente = Caracteristicas_Del_Producto.find(function(item) {
            return item.idImagen === idImagen;
        });

        if (productoExistente) {
            // Incrementar la cantidad en Caracteristicas_Del_Producto
            productoExistente.cantidad++;
            
            // Actualizar la cantidad en la etiqueta p del DOM
            var cantidadElemento = containerCarrito.querySelector(`#imagen-${idImagen}`).nextElementSibling.querySelector('p');
            cantidadElemento.textContent = productoExistente.cantidad;

            // Mostrar mensaje en consola
            console.log('Se incrementó la cantidad para', nombreProducto, 'a', productoExistente.cantidad);
            console.log(Caracteristicas_Del_Producto);

            // Actualizar la cantidad total en el carrito
            actualizarCantidadTotal();
            
            // Salir de la función ya que la imagen ya está en el carrito
            return;
        }

        // Crear la imagen
        var imagenElemento = document.createElement('img');
        imagenElemento.src = rutaImagen;
        imagenElemento.alt = nombreProducto;
        imagenElemento.id = `imagen-${idImagen}`; // Asigna el ID a la imagen

        // Crear una lista desordenada para el nombre y botones
        var ul = document.createElement('ul');

        // Crear el nombre del producto
        var nombreElemento = document.createElement('li');
        nombreElemento.textContent = nombreProducto;
        ul.appendChild(nombreElemento);

        // Crear los botones y el párrafo para la cantidad
        var liBotones = document.createElement('li');

        var buttonMenos = document.createElement('button');
        buttonMenos.style.backgroundColor = 'white';
        buttonMenos.style.border = 'none';
        buttonMenos.innerHTML = '<img src="Icons/menos.png" style="width: 13px; height: auto; position: relative; right: 6px;">';
        buttonMenos.addEventListener('click', function() {
            // Obtener la etiqueta p de cantidad dentro del contenedor
            var cantidadElemento = contenedorProductos.querySelector('p');
            
            // Buscar el producto correspondiente en Caracteristicas_Del_Producto
            var producto = Caracteristicas_Del_Producto.find(function(item) {
                return item.idImagen === idImagen;
            });

            // Verificar si la cantidad es mayor que 1 antes de restar
            if (producto.cantidad > 1) {
                producto.cantidad--;
                cantidadElemento.textContent = producto.cantidad;
                console.log('Se restó una unidad. Nueva cantidad:', producto.cantidad);
            } else {
                console.log('La cantidad mínima es 1. No se puede restar más.');
            }

            // Actualizar la cantidad total en el carrito
            actualizarCantidadTotal();
        });
        liBotones.appendChild(buttonMenos);

        var cantidadElemento = document.createElement('p');
        cantidadElemento.textContent = '1'; // Valor inicial de cantidad
        cantidadElemento.style.width = '16px';
        cantidadElemento.style.height = '16px';
        cantidadElemento.style.fontSize = '16px';
        cantidadElemento.style.textAlign = 'center';
        cantidadElemento.style.border = '0';
        cantidadElemento.style.display = 'inline-block';
        cantidadElemento.style.margin = '0';
        cantidadElemento.style.padding = '0 5px';
        liBotones.appendChild(cantidadElemento);

        var buttonMas = document.createElement('button');
        buttonMas.style.backgroundColor = 'white';
        buttonMas.style.border = 'none';
        buttonMas.style.position = 'relative';
        buttonMas.style.right = '8px';
        buttonMas.innerHTML = '<img src="Icons/mas.webp" style="width: 13px; height: auto;">';
        buttonMas.addEventListener('click', function() {
            // Obtener la etiqueta p de cantidad dentro del contenedor
            var cantidadElemento = contenedorProductos.querySelector('p');
            
            // Buscar el producto correspondiente en Caracteristicas_Del_Producto
            var producto = Caracteristicas_Del_Producto.find(function(item) {
                return item.idImagen === idImagen;
            });

            // Incrementar la cantidad y actualizar en el DOM
            producto.cantidad++;
            cantidadElemento.textContent = producto.cantidad;
            console.log('Se sumó una unidad. Nueva cantidad:', producto.cantidad);

            // Actualizar la cantidad total en el carrito
            actualizarCantidadTotal();
        });
        liBotones.appendChild(buttonMas);

        // Agregar la lista de botones a la lista desordenada
        ul.appendChild(liBotones);

        // Agregar todos los elementos al contenedor del producto
        contenedorProductos.appendChild(imagenElemento);
        contenedorProductos.appendChild(ul);

        // Agregar el contenedor del producto al contenedor principal del carrito
        containerCarrito.appendChild(contenedorProductos);

        // Almacenar el producto en el array Caracteristicas_Del_Producto
        Caracteristicas_Del_Producto.push({
            nombre: nombreProducto,
            precio: precio,
            imagen: rutaImagen,
            idImagen: idImagen, // Almacena el ID de la imagen
            cantidad: 1 // Inicializar la cantidad en 1
        });

        // Mostrar la información en la consola
        console.log('Información del producto agregado:', {
            nombre: nombreProducto,
            precio: precio,
            imagen: rutaImagen,
            idImagen: idImagen,
            cantidad: 1
        });

        console.log(Caracteristicas_Del_Producto);

        // Actualizar la cantidad total en el carrito al agregar un nuevo producto
        actualizarCantidadTotal();
    });
});

// Función para actualizar la cantidad total en el carrito
function actualizarCantidadTotal() {
    var cantidadTotal = Caracteristicas_Del_Producto.reduce(function(total, producto) {
        return total + producto.cantidad;
    }, 0);
    
    cantidadTotalElemento.textContent = `Carrito de compra (${cantidadTotal})`;
}
*/


var Caracteristicas_Del_Producto = []; // Array para almacenar los productos agregados al carrito
var contadorImagenes = 0; // Contador para IDs de imágenes
var imagenIds = {}; // Mapa para almacenar IDs de imágenes según su URL

// Crear el contenedor principal del carrito de compra si no existe
var containerCarrito = document.querySelector('.Container-Carrito-De-Compra');
if (!containerCarrito) {
    containerCarrito = document.createElement('div');
    containerCarrito.classList.add('Container-Carrito-De-Compra');
    document.body.appendChild(containerCarrito); // Agregar al body o a otro elemento padre según tu estructura
}

// Elemento para mostrar la cantidad total en el carrito en el Container-Carrito-De-Compra-Icons
var cantidadTotalElementoCarrito = document.querySelector('.Container-Carrito-De-Compra .Container-Carrito-De-Compra-Icons .Numero');

// Elemento para mostrar la cantidad total en el carrito en nav .Container-Icons-Search-Buy .Numero
var cantidadTotalElementoNav = document.querySelector('nav .Container-Icons-Search-Buy .Numero');

var BotonAgregarAlCarrito = document.querySelectorAll('.Agregar-Al-Carrito-De-Compras');

BotonAgregarAlCarrito.forEach(function(boton) {
    boton.addEventListener('click', function() { 
        // Crear un nuevo contenedor para este producto en el carrito
        var contenedorProductos = document.createElement('div');
        contenedorProductos.classList.add('Contenedor-De-Productos-En-El-Carro-De-Compra');
        
        // Obtener el nombre del producto
        var nombreProducto = boton.closest('.Productos').querySelector('#Nombre_Del_Producto').textContent;

        // Obtener el precio del producto y convertirlo a número
        var precioTexto = boton.closest('.Productos').querySelector('#Precio-Real-O-Descuento').textContent;
        var precio = parseFloat(precioTexto.replace('.', '').replace(',', '.').replace('$', '').trim());

        // Obtener la ruta de la imagen del producto
        var imagen = boton.closest('.Productos').querySelector('.Imagen-Del-Producto');
        var rutaImagen = imagen.getAttribute('src');

        // Verificar si la imagen ya tiene un ID asignado
        var idImagen;
        if (imagenIds[rutaImagen] !== undefined) {
            idImagen = imagenIds[rutaImagen]; // Usar ID existente
        } else {
            idImagen = contadorImagenes++; // Crear nuevo ID
            imagenIds[rutaImagen] = idImagen; // Almacenar en el mapa
        }

        // Comprobar si la imagen ya existe en el contenedor principal del carrito
        var productoExistente = Caracteristicas_Del_Producto.find(function(item) {
            return item.idImagen === idImagen;
        });

        if (productoExistente) {
            // Incrementar la cantidad en Caracteristicas_Del_Producto
            productoExistente.cantidad++;
            
            // Actualizar la cantidad en la etiqueta p del DOM
            var cantidadElemento = containerCarrito.querySelector(`#imagen-${idImagen}`).nextElementSibling.querySelector('p');
            cantidadElemento.textContent = productoExistente.cantidad;

            // Mostrar mensaje en consola
            console.log('Se incrementó la cantidad para', nombreProducto, 'a', productoExistente.cantidad);
            console.log(Caracteristicas_Del_Producto);

            // Actualizar la cantidad total en el carrito
            actualizarCantidadTotal();
            
            // Salir de la función ya que la imagen ya está en el carrito
            return;
        }

        // Crear la imagen
        var imagenElemento = document.createElement('img');
        imagenElemento.src = rutaImagen;
        imagenElemento.alt = nombreProducto;
        imagenElemento.id = `imagen-${idImagen}`; // Asigna el ID a la imagen

        // Crear una lista desordenada para el nombre y botones
        var ul = document.createElement('ul');

        // Crear el nombre del producto
        var nombreElemento = document.createElement('li');
        nombreElemento.textContent = nombreProducto;
        ul.appendChild(nombreElemento);

        // Crear los botones y el párrafo para la cantidad
        var liBotones = document.createElement('li');

        var buttonMenos = document.createElement('button');
        buttonMenos.style.backgroundColor = 'white';
        buttonMenos.style.border = 'none';
        buttonMenos.innerHTML = '<img src="Icons/menos.png" style="width: 13px; height: auto; position: relative; right: 6px;">';
        buttonMenos.addEventListener('click', function() {
            // Obtener la etiqueta p de cantidad dentro del contenedor
            var cantidadElemento = contenedorProductos.querySelector('p');
            
            // Buscar el producto correspondiente en Caracteristicas_Del_Producto
            var producto = Caracteristicas_Del_Producto.find(function(item) {
                return item.idImagen === idImagen;
            });

            // Verificar si la cantidad es mayor que 1 antes de restar
            if (producto.cantidad > 1) {
                producto.cantidad--;
                cantidadElemento.textContent = producto.cantidad;
                console.log('Se restó una unidad. Nueva cantidad:', producto.cantidad);
            } else {
                console.log('La cantidad mínima es 1. No se puede restar más.');
            }

            // Actualizar la cantidad total en el carrito
            actualizarCantidadTotal();
        });
        liBotones.appendChild(buttonMenos);

        var cantidadElemento = document.createElement('p');
        cantidadElemento.textContent = '1'; // Valor inicial de cantidad
        cantidadElemento.style.width = '16px';
        cantidadElemento.style.height = '16px';
        cantidadElemento.style.fontSize = '16px';
        cantidadElemento.style.textAlign = 'center';
        cantidadElemento.style.border = '0';
        cantidadElemento.style.display = 'inline-block';
        cantidadElemento.style.margin = '0';
        cantidadElemento.style.padding = '0 5px';
        liBotones.appendChild(cantidadElemento);

        var buttonMas = document.createElement('button');
        buttonMas.style.backgroundColor = 'white';
        buttonMas.style.border = 'none';
        buttonMas.style.position = 'relative';
        buttonMas.style.right = '8px';
        buttonMas.innerHTML = '<img src="Icons/mas.webp" style="width: 13px; height: auto;">';
        buttonMas.addEventListener('click', function() {
            // Obtener la etiqueta p de cantidad dentro del contenedor
            var cantidadElemento = contenedorProductos.querySelector('p');
            
            // Buscar el producto correspondiente en Caracteristicas_Del_Producto
            var producto = Caracteristicas_Del_Producto.find(function(item) {
                return item.idImagen === idImagen;
            });

            // Incrementar la cantidad y actualizar en el DOM
            producto.cantidad++;
            cantidadElemento.textContent = producto.cantidad;
            console.log('Se sumó una unidad. Nueva cantidad:', producto.cantidad);

            // Actualizar la cantidad total en el carrito
            actualizarCantidadTotal();
        });
        liBotones.appendChild(buttonMas);

        // Agregar la lista de botones a la lista desordenada
        ul.appendChild(liBotones);

        // Agregar todos los elementos al contenedor del producto
        contenedorProductos.appendChild(imagenElemento);
        contenedorProductos.appendChild(ul);

        // Agregar el contenedor del producto al contenedor principal del carrito
        containerCarrito.appendChild(contenedorProductos);

        // Almacenar el producto en el array Caracteristicas_Del_Producto
        Caracteristicas_Del_Producto.push({
            nombre: nombreProducto,
            precio: precio,
            imagen: rutaImagen,
            idImagen: idImagen, // Almacena el ID de la imagen
            cantidad: 1 // Inicializar la cantidad en 1
        });

        // Mostrar la información en la consola
        console.log('Información del producto agregado:', {
            nombre: nombreProducto,
            precio: precio,
            imagen: rutaImagen,
            idImagen: idImagen,
            cantidad: 1
        });

        console.log(Caracteristicas_Del_Producto);

        // Actualizar la cantidad total en el carrito al agregar un nuevo producto
        actualizarCantidadTotal();
    });
});

// Función para actualizar la cantidad total en el carrito
function actualizarCantidadTotal() {
    var cantidadTotal = Caracteristicas_Del_Producto.reduce(function(total, producto) {
        return total + producto.cantidad;
    }, 0);
    
    // Actualizar solo el número en los elementos correspondientes
    cantidadTotalElementoCarrito.textContent = `Carrito de compra (${cantidadTotal})`;;
    cantidadTotalElementoNav.textContent = cantidadTotal;
}
