const params = new URLSearchParams(window.location.search);

        var rutaImagen = decodeURIComponent(params.get('ruta'));
        var Nombre_del_producto = decodeURIComponent(params.get('nombre'));
        var Precio_Real = decodeURIComponent(params.get('Precio_Real'));
        var Precio_Real_O_Descuento = decodeURIComponent(params.get('Precio_Real_O_Descuento'))

        var article = document.querySelector('main section .Contenedor article');

        article.innerHTML = `
            <div style="display: flex; justify-content: center;">
                <img src="${rutaImagen}" style="width: 314px; height: 314px;" alt="${Nombre_del_producto}">
            </div>
            
            <div>
                <ul>
                    <li> <p class="Nombre_del_producto">${Nombre_del_producto}</p> </li>

                    <li>
                        <div class="rating">
                            <input type="radio" id="star5" name="rating" value="5">
                            <label for="star5"></label>
                            <input type="radio" id="star4" name="rating" value="4">
                            <label for="star4"></label>
                            <input type="radio" id="star3" name="rating" value="3">
                            <label for="star3"></label>
                            <input type="radio" id="star2" name="rating" value="2">
                            <label for="star2"></label>
                            <input type="radio" id="star1" name="rating" value="1">
                            <label for="star1"></label>
                        </div>
                    </li>

                    <li> <p class="Precio_real">${Precio_Real}</p> </li>

                    <li> <p class="Precio_real_o_descuento">${Precio_Real_O_Descuento}</p> </li>

                    <li style="margin-bottom: 15px;"> <p>Cantidad (+20 disponibles)</p> </li>

                    <li style="margin-bottom: 20px;">
                            <div style="display: flex; justify-content: space-evenly;">
                                <button>
                                    <img src="Icons/mas.png" style="width: 20px; height: 20px;">
                                </button>                                        
                                        
                                <p>1</p>
                                    
                                <button>
                                    <img src="Icons/menos.png" style="width: 20px; height: 20px;">
                                </button>
                            </div>
                    </li>

                    <li>
                            <div style="display: flex;">
                                <button>
                                    <p style="margin-top: 0;">Comprar ahora</p>
                                </button>

                                <button style="text-align: left; padding-left: 10px; margin-left: 10px;">
                                    <p>Agregar al</p>
                                    <img src="Icons/anadir-al-carrito.png" style="width: 18px; height: auto; position: relative; top: -18px; left: 75px;">                                    
                                </button>
                            </div>
                    </li>
                </ul>
            </div>
            `;


var Mostrar_overflow_caracteristicas_del_producto = document.querySelector('main section .Contenedor_2 .Caracteristicas_del_producto');
var Boton_Eliminar_Overflow_1 = document.getElementById('Eliminar-overflow_1');

Boton_Eliminar_Overflow_1.addEventListener('click', function() {
    Mostrar_overflow_caracteristicas_del_producto.style.height = 'auto';
});

var Mostrar_overflow_Descripcion = document.querySelector('main section .Contenedor_3 .Descripcion');
var Boton_Eliminar_Overflow_2 = document.getElementById('Eliminar-overflow_2');

Boton_Eliminar_Overflow_2.addEventListener('click', function() {
    Mostrar_overflow_Descripcion.style.height = 'auto';
});