function mostrarCaracteristicas() {
    // Definir la media query
    let mediaQuery = window.matchMedia("(max-width: 488px)");

    var params = new URLSearchParams(window.location.search);
    var nombreProducto = params.get('Nombre');

    // Encuentra el producto en el array de Productos
    producto = Productos.find(item => item.Nombre === nombreProducto);

    let caracteristicas = producto.Caracteristicas;

    var main = document.querySelector("main")

    var h2 = document.createElement("h2");
    h2.textContent = "Características";

    main.appendChild(h2);

    var div = document.createElement("div");
    div.classList.add("Caracteristicas");
    // Función que se ejecutará cuando la media query coincida
    function manejarCambioMediaQuery(e) {
        if (e.matches) {
            // Lógica para cuando la pantalla sea menor o igual a 488px
            console.log("Pantalla pequeña: 488px o menos");

            if (!document.querySelector("main .Caracteristicas")) {
                // Crear un único <ul>
                var ul = document.createElement("ul");

                for (let key in caracteristicas) {
                    if (caracteristicas.hasOwnProperty(key)) {
                        // Extraer el índice de la clave usando una expresión regular
                        let match = key.match(/(\d+)$/); // Busca el número al final de la clave
                        if (match) {
                            let index = match[1]; // Obtiene el número como string
                            let caracteristica = caracteristicas[key]; // Accede al valor

                            // Crear un elemento <li> para cada característica
                            var li = document.createElement("li");
                            li.style.display = "flex";
                            li.style.alignItems = "center";

                            var img = document.createElement("img");
                            img.alt = "Icono";
                            img.height = 32;
                            img.src = "Icons/default.svg"; // Reemplaza con la ruta correcta
                            img.width = 32;

                            li.appendChild(img);
                            li.appendChild(document.createTextNode(caracteristica)); // Añadir el texto después del <img>

                            // Añadir el <li> al <ul>
                            ul.appendChild(li);
                        }
                    }
                }

                // Añadir el <ul> al contenedor después del bucle
                div.appendChild(ul);

                //var main = document.querySelector("main");
                main.appendChild(div);
            }
        } else {
            // Lógica para cuando la pantalla sea mayor a 488px
            if (!document.querySelector("main .Caracteristicas")) {
                var ul1 = document.createElement("ul");
                var ul2 = document.createElement("ul");
                
                // Contadores para alternar entre las dos listas
                var contadorUl1 = 0;
                var contadorUl2 = 0;
                    /* ------------------ */
                    for (let key in caracteristicas) {
                        if (caracteristicas.hasOwnProperty(key)) {
                            // Extraer el índice de la clave usando una expresión regular
                            let match = key.match(/(\d+)$/); // Busca el número al final de la clave
                            if (match) {
                                let index = match[1]; // Obtiene el número como string
                                let caracteristica = caracteristicas[key]; // Accede al valor
                    
                                // Crear un elemento <li> para cada característica
                                var li = document.createElement("li");
                                li.style.display = "flex";
                                li.style.alignItems = "center";
                    
                                var img = document.createElement("img");
                                img.alt = "Icono";
                                img.height = 32;
                                img.src = "Icons/default.svg"; // Reemplaza con la ruta correcta
                                img.width = 32;
                    
                                li.appendChild(img);
                                li.appendChild(document.createTextNode(caracteristica)); // Añadir el texto después del <img>
                    
                                // Alternar entre las dos listas
                                if (contadorUl1 <= contadorUl2) {
                                    ul1.appendChild(li);
                                    contadorUl1++;
                                } else {
                                    ul2.appendChild(li);
                                    contadorUl2++;
                                }
                            
                        }
                    }
                    div.appendChild(ul1);
                    div.appendChild(ul2);

                    main.appendChild(div);
                    /* ------------------ */
                }
            }
        } // aca termina el else

        var verificar = document.querySelector("main .Caracteristicas");
        // Verifica si el contenido del div supera los 240px
        var contenidoHeight = verificar.scrollHeight;

        if (contenidoHeight > 240) {
            console.log("El contenido supera los 240px.");
            // Aquí puedes añadir el botón para mostrar más contenido, si lo deseas
            div1 = document.createElement("div");
            div1.style.display = "flex";
            div1.style.justifyContent = "center"

            var Button = document.createElement("button");
            Button.style.marginTop = "10px";
            Button.id = "Eliminar_overflow_2";
            Button.textContent = "Ver todas las caracteristicas";

             // Crear un elemento de imagen
            var img = document.createElement("img");
            img.alt = "Icono"
            img.height = 15;
            img.src = "Icons/flecha-hacia-abajo-para-navegar.png";  // Reemplaza con la ruta a tu imagen
            img.width = 15;  // Ajusta el tamaño según tus necesidades
            img.style.marginLeft = "8px"; // Espacio entre el texto y la imagen
            img.style.position = "relative";
            img.style.top = "2px";

            // Añadir la imagen al botón después del texto
            Button.appendChild(img);

            var div1 = document.createElement("div");
            div1.style.display = "flex";
            div1.style.justifyContent = "center";

            div1.appendChild(Button);

            main.appendChild(div1);

            verificar.style.height = "240px"
            verificar.style.overflowY = "hidden";

            Button.addEventListener('click' ,function() {
                verificar.style.height = "auto";
            })
        }
    }

    // Asociar la función manejarCambioMediaQuery con los cambios en la media query
    mediaQuery.addListener(manejarCambioMediaQuery);

    // Llamar a la función de inmediato para comprobar el estado inicial
    manejarCambioMediaQuery(mediaQuery);

    // Aquí puedes agregar el resto de la lógica de mostrarCaracteristicas
}

function contarImgRespaldo(producto) {
    var params = new URLSearchParams(window.location.search);
    var nombreProducto = params.get('Nombre');

    // Encuentra el producto en el array de Productos
    producto = Productos.find(item => item.Nombre === nombreProducto);

    // Inicializa el contador para las imágenes de respaldo
    let contador = 0;

    if (producto.Colores) {
        // Si `Colores` existe, cuenta los elementos a partir del tercero
        let colores = Object.keys(producto.Colores);

        // Cuenta los elementos a partir del tercero
        if (colores.length >= 3) {
            contador = colores.length - 2; // longitud - 2 para empezar desde el tercer elemento
        }

        let puntoDeInicio = 1;

        // Itera sobre las claves del objeto rutaImagen
        for (let clave in producto.rutaImagen) {
            // Verifica si la clave comienza con "ImgRespaldo"
            if (clave.startsWith("ImgRespaldo")) {
                // Extrae el número al final de la clave
                let match = clave.match(/(\d+)$/);
                if (match) {
                    let numero = parseInt(match[1]);
                    // Incrementa el contador si el número es mayor o igual al punto de inicio
                    if (numero >= puntoDeInicio) {
                        contador++;
                    }
                }
            }
        }
    } else {
        // Si `Colores` no existe, cuenta las imágenes de respaldo en `rutaImagen`
        // Establece el punto de inicio en ImgRespaldo3
        let puntoDeInicio = 3;

        // Itera sobre las claves del objeto rutaImagen
        for (let clave in producto.rutaImagen) {
            // Verifica si la clave comienza con "ImgRespaldo"
            if (clave.startsWith("ImgRespaldo")) {
                // Extrae el número al final de la clave
                let match = clave.match(/(\d+)$/);
                if (match) {
                    let numero = parseInt(match[1]);
                    // Incrementa el contador si el número es mayor o igual al punto de inicio
                    if (numero >= puntoDeInicio) {
                        contador++;
                    }
                }
            }
        }
    }

    return contador;
}

function prueba() {
    var params = new URLSearchParams(window.location.search);

    var nombreProducto = params.get('Nombre');

    var producto = Productos.find(item => item.Nombre === nombreProducto); 

    nombreProducto = document.querySelector("main .Contenedor-Del-Producto .Ul ul .Nombre");
    nombreProducto.textContent = producto.Nombre;

    precioProducto = document.querySelector("main .Contenedor-Del-Producto .Ul ul .Precio");
    precioProducto.textContent = producto.PrecioTEXTO;

    var Contenedor_imagenPrincipal = document.querySelector("main .Contenedor-Del-Producto .Imagen");

    var picture = document.createElement("picture");

    var ImagenPrincipal = document.createElement("img");
    ImagenPrincipal.alt = producto.Nombre;
    ImagenPrincipal.height = 310;
    ImagenPrincipal.src = producto.rutaImagen.ImgRespaldo0;
    ImagenPrincipal.width = 310;

    picture.appendChild(ImagenPrincipal);

    Contenedor_imagenPrincipal.appendChild(picture);

    var Contenedor_imagenesSecundarias = document.querySelector("main .Contenedor-Del-Producto .Imagenes");

    var picture = document.createElement("picture");

    var Imagen = document.createElement("img");
    Imagen.alt = producto.Nombre;
    Imagen.height = 65;
    Imagen.src = producto.rutaImagen.ImgRespaldo0;
    Imagen.width = 65;

    picture.appendChild(Imagen);

    Contenedor_imagenesSecundarias.appendChild(picture);

    if (producto.Colores) {
        // Recorre cada color en el objeto "Colores"
        
        for (var color in producto.Colores) {
            var Img0 = producto.Colores[color].Img0;
            var ImgRespaldo0 = producto.Colores[color].ImgRespaldo0;
            
            var picture = document.createElement("picture");
            picture.setAttribute("data-identificador", color);
            
            if (Img0) {
                var sourceWEBP = document.createElement("source");
                sourceWEBP.type = "image/webp";
                sourceWEBP.srcset = Img0;  
                picture.appendChild(sourceWEBP); 
            }
            
            if (ImgRespaldo0) {
                var sourcePNG = document.createElement("source");
                sourcePNG.type = "image/png"; 
                sourcePNG.srcset = ImgRespaldo0;  
                picture.appendChild(sourcePNG);                 
            }
            
            if (Img0 || ImgRespaldo0) { 
                var image = document.createElement("img");
                image.height = 65;
                image.src = ImgRespaldo0 || Img0;
                image.width = 65;
                picture.appendChild(image);                 
            }
                
            Contenedor_imagenesSecundarias.appendChild(picture);
        
            var buttonCantidad = document.createElement("button");
            buttonCantidad.id = "Pointer"
            var cantidad = producto.Colores[color].cantidad;
            var ContenedorCantidad = document.querySelector("main .Contenedor-Del-Producto .Ul ul .Cantidad");
            
            if (cantidad > 1) {
                buttonCantidad.textContent = `${color}: (${cantidad} disponibles)`;
                buttonCantidad.addEventListener("click", function() {
                    // Obtener la URL actual
                    let url = new URL(window.location.href);

                    var colorSeleccionado = this.textContent.split(':')[0].trim();

                    // Modificar o agregar el parámetro 'color'
                    url.searchParams.set('color', colorSeleccionado);

                    // Actualizar la URL sin recargar la página
                    window.history.pushState({}, '', url);

                    actualizarImagenes();
                });
            } else {
                buttonCantidad.textContent = `${color}: (No disponible)`;
            }
                   
            ContenedorCantidad.appendChild(buttonCantidad);
        }
    } else {
        let rutasAñadidas = new Set();

        for (let key in producto.rutaImagen) {
            // Extraer el índice de la clave
            let match = key.match(/(\d+)$/);  // Busca el número al final de la clave
            if (match) {
                    let index = match[1];  
                

                if (index === '0') {
                    continue;  // Salta al siguiente índice en el bucle
                }

                let webpKey = `Img${index}`;
                let pngKey = `ImgRespaldo${index}`;

                // Acceder a las rutas usando las claves dinámicas
                let webpRuta = producto.rutaImagen[webpKey];
                let pngRuta = producto.rutaImagen[pngKey];

                var picture = document.createElement("picture");

                if ((!rutasAñadidas.has(webpRuta) || !rutasAñadidas.has(pngRuta)) && (webpRuta || pngRuta)) {
                        
                        var picture = document.createElement("picture");
            
                        if (webpRuta) {
                            var sourceWEBP = document.createElement("source");
                            sourceWEBP.type = "image/webp";  // Ajusta el tipo MIME correcto
                            sourceWEBP.srcset = webpRuta;
                            picture.appendChild(sourceWEBP);
                        }
            
                        if (pngRuta) {
                            var sourcePNG = document.createElement("source");
                            sourcePNG.type = "image/png";  // Ajusta el tipo MIME correcto
                            sourcePNG.srcset = pngRuta;
                            picture.appendChild(sourcePNG);
                        }

                        var Imagen = document.createElement("img");
                        Imagen.alt = producto.Nombre;
                        Imagen.height = 65;
                        Imagen.src = pngRuta;
                        Imagen.width = 65;

                        picture.appendChild(Imagen);

                        Contenedor_imagenesSecundarias.appendChild(picture);

                        // Añadir rutas al conjunto para evitar duplicados
                        if (webpRuta) rutasAñadidas.add(webpRuta);
                        if (pngRuta) rutasAñadidas.add(pngRuta);
                }
            }
        }

        var buttonCantidad = document.createElement("button");
        buttonCantidad.id = "Pointer";
        var cantidad = producto.Stock;
        var ContenedorCantidad = document.querySelector("main .Contenedor-Del-Producto .Ul ul .Cantidad");
            
        if (cantidad <= 1) {
            buttonCantidad.textContent = `$(${cantidad} no dispoible)`
        } else {
            buttonCantidad.textContent = `Cantidad: (${cantidad} disponibles)`
        }

        ContenedorCantidad.appendChild(buttonCantidad);
    } // aca termina el else

    var pictures = Contenedor_imagenesSecundarias.querySelectorAll("picture");

    if (pictures.length > 3) {
        
        for (let i = 3; i < pictures.length; i++) {
            Contenedor_imagenesSecundarias.removeChild(pictures[i]);
        }

        var div = document.createElement("div");
        div.id = "Pointer";
        
        var cantidadImgRespaldo = contarImgRespaldo(producto);
        div.textContent = `+${cantidadImgRespaldo}`;
    
        Contenedor_imagenesSecundarias.appendChild(div);

        div.addEventListener('click', function() {
            alert("funciona");
        });
    }

    // Manejo de eventos de clic en imágenes
    pictures.forEach(function(picture) {
        picture.addEventListener("click", function() {
            // Resetea el borde de todas las imágenes
            pictures.forEach(function(pic) {
                let img = pic.querySelector("img");
                if (img) {
                    img.style.borderColor = "#bfbfbf";
                }
            });

            // Establece el borde de la imagen seleccionada
            let imagen = picture.querySelector("img");
            if (imagen) {
                imagen.style.borderColor = "#3483fa";

                // Crea y actualiza la imagen principal
                let imagenPrincipal = document.createElement("img");
                imagenPrincipal.alt = producto.Nombre;
                imagenPrincipal.height = 310;
                imagenPrincipal.src = imagen.src;
                imagenPrincipal.width = 310;

                let Contenedor_imagenPrincipal = document.querySelector("main .Contenedor-Del-Producto .Imagen");
                Contenedor_imagenPrincipal.innerHTML = '';
                Contenedor_imagenPrincipal.appendChild(imagenPrincipal);
            }
        });
    });

    var main = document.querySelector("main");

    if (producto.Caracteristicas) {
        mostrarCaracteristicas();

        var hr = document.createElement("hr");

        main.appendChild(hr);
    }
    
    if (document.querySelector("main hr")) {
        var div = document.createElement("div");
        div.classList.add("Descripcion");

        main.appendChild(div);

        /*----------------------------*/
        var Descripcion = producto.Descripcion;
        for (let key in Descripcion) {
            if (Descripcion.hasOwnProperty(key)) {
                // Extraer el índice de la clave usando una expresión regular
                let match = key.match(/(\d+)$/); // Busca el número al final de la clave
                if (match) {
                    let index = match[1]; // Obtiene el número como string
        
                    // Ajustar para índices que comienzan en 1
                    if (parseInt(index) > 0) {
                        let descripcion = Descripcion[key]; // Accede al valor
        
                        // Crear un elemento <p> para cada descripción
                        var p = document.createElement("p");
        
                        // Crear un nodo de texto para la descripción
                        var textNode = document.createTextNode(descripcion);
        
                        // Añadir el nodo de texto al elemento <p>
                        p.appendChild(textNode);
        
                        // Añadir el <p> al contenedor
                        div.appendChild(p);
                    }
                }
            }
        }
        /*----------------------------*/
    }
} // aca termina la funcion prueba

prueba();


function actualizarImagenes() {
    let url = new URL(window.location.href);
    let colorSeleccionado = url.searchParams.get('color');
    let nombreProducto = url.searchParams.get('Nombre');
    let producto = Productos.find(item => item.Nombre === nombreProducto);

    var Contenedor_imagenPrincipal = document.querySelector("main .Contenedor-Del-Producto .Imagen");

    let Contenedor_imagenesSecundarias = document.querySelector("main .Contenedor-Del-Producto .Imagenes");

    if (producto && colorSeleccionado && producto.Colores[colorSeleccionado]) {
        Contenedor_imagenesSecundarias.innerHTML = '';
        Contenedor_imagenPrincipal.innerHTML = '';
        // Obtener el objeto de color específico
        let colorInfo = producto.Colores[colorSeleccionado];

        var image = document.createElement("img");
        image.alt = producto.Nombre;
        image.height = 310;
        image.src = producto.Colores[colorSeleccionado].ImgRespaldo0;
        image.width = 310;

        Contenedor_imagenPrincipal.appendChild(image);

        for (let clave in colorInfo) {
            if (clave.startsWith('ImgRespaldo')) {
                let imgSrc = colorInfo[clave];
                
                // Crear y agregar el elemento <picture>
                let picture = document.createElement('picture');
                
                // Agregar <source> para webp
                let sourceWEBP = document.createElement('source');
                sourceWEBP.type = 'image/webp';
                sourceWEBP.srcset = imgSrc;  
                picture.appendChild(sourceWEBP);

                // Agregar <source> para png
                let sourcePNG = document.createElement('source');
                sourcePNG.type = 'image/png'; 
                sourcePNG.srcset = imgSrc;  
                picture.appendChild(sourcePNG);

                // Crear y agregar la imagen
                let img = document.createElement('img');
                img.src = imgSrc;
                img.alt = colorSeleccionado; // Opcional: texto alternativo para accesibilidad
                img.width = 65; // Ajusta el tamaño según sea necesario
                img.height = 65; // Ajusta el tamaño según sea necesario
                
                picture.appendChild(img);
                Contenedor_imagenesSecundarias.appendChild(picture);
            }
        }
    } else {
        var Contenedor_imagenPrincipal = document.querySelector("main .Contenedor-Del-Producto .Imagen");

        Contenedor_imagenPrincipal.innerHTML = '';

        var picture = document.createElement("picture");

        var sourceWEBP = document.createElement("source");
        sourceWEBP.type = "text/webp";
        sourceWEBP.src = producto.rutaImagen.Img0;

        var sourcePNG = document.createElement("source");
        sourcePNG.type = "text/png";
        sourcePNG.src = producto.rutaImagen.ImgRespaldo0;


        var image = document.createElement("img");
        image.alt = producto.Nombre;
        image.height = 310;
        image.src = producto.rutaImagen.ImgRespaldo0;
        image.width = 310;

        picture.appendChild(sourceWEBP);
        picture.appendChild(sourcePNG);
        picture.appendChild(image);

        Contenedor_imagenPrincipal.appendChild(picture);

        Contenedor_imagenesSecundarias.innerHTML = '';

        var picture = document.createElement("picture");

        var sourceWEBP = document.createElement("source");
        sourceWEBP.type = "text/webp";
        sourceWEBP.src = producto.rutaImagen.Img0;

        var sourcePNG = document.createElement("source");
        sourcePNG.type = "text/png";
        sourcePNG.src = producto.rutaImagen.ImgRespaldo0;

        var image = document.createElement("img");
        image.alt = producto.Nombre;
        image.height = 65;
        image.src = producto.rutaImagen.ImgRespaldo0;
        image.width = 65;

        picture.appendChild(sourceWEBP);
        picture.appendChild(sourcePNG);
        picture.appendChild(image);
        
        Contenedor_imagenesSecundarias.appendChild(picture);

        for (var color in producto.Colores) {
            var Img0 = producto.Colores[color].Img0;
            var ImgRespaldo0 = producto.Colores[color].ImgRespaldo0;
        
            var picture = document.createElement("picture");

            Imagen = document.createElement("img");
            Imagen.height = 65;
            Imagen.src = ImgRespaldo0;
            Imagen.width = 65;

            picture.appendChild(Imagen);

            Contenedor_imagenesSecundarias.appendChild(picture);

        }

        let rutasAñadidas = new Set();

        for (let key in producto.rutaImagen) {
            // Extraer el índice de la clave
            let match = key.match(/(\d+)$/);  // Busca el número al final de la clave
            if (match) {
                    let index = match[1];  
                

                if (index === '0') {
                    continue;  // Salta al siguiente índice en el bucle
                }

                let webpKey = `Img${index}`;
                let pngKey = `ImgRespaldo${index}`;

                // Acceder a las rutas usando las claves dinámicas
                let webpRuta = producto.rutaImagen[webpKey];
                let pngRuta = producto.rutaImagen[pngKey];

                var picture = document.createElement("picture");

                if ((!rutasAñadidas.has(webpRuta) || !rutasAñadidas.has(pngRuta)) && (webpRuta || pngRuta)) {
                        
                        var picture = document.createElement("picture");
            
                        if (webpRuta) {
                            var sourceWEBP = document.createElement("source");
                            sourceWEBP.type = "image/webp";  // Ajusta el tipo MIME correcto
                            sourceWEBP.srcset = webpRuta;
                            picture.appendChild(sourceWEBP);
                        }
            
                        if (pngRuta) {
                            var sourcePNG = document.createElement("source");
                            sourcePNG.type = "image/png";  // Ajusta el tipo MIME correcto
                            sourcePNG.srcset = pngRuta;
                            picture.appendChild(sourcePNG);
                        }

                        var Imagen = document.createElement("img");
                        Imagen.alt = producto.Nombre;
                        Imagen.height = 65;
                        Imagen.src = pngRuta;
                        Imagen.width = 65;

                        picture.appendChild(Imagen);

                        Contenedor_imagenesSecundarias.appendChild(picture);

                        // Añadir rutas al conjunto para evitar duplicados
                        if (webpRuta) rutasAñadidas.add(webpRuta);
                        if (pngRuta) rutasAñadidas.add(pngRuta);
                }
            }
        }

    }
    

        // Manejo de imágenes pequeñas
    let pictures = Contenedor_imagenesSecundarias.querySelectorAll("picture");

    if (pictures.length > 3) {
        // Elimina imágenes adicionales
        for (let i = 3; i < pictures.length; i++) {
            Contenedor_imagenesSecundarias.removeChild(pictures[i]);
        }

        // Crear y agregar el div con la cantidad de imágenes
        let div = document.createElement("div");
        div.id = "Pointer";
        
        let cantidadImgRespaldo = contarImgRespaldo(producto);
        div.textContent = `+${cantidadImgRespaldo}`;
    
        Contenedor_imagenesSecundarias.appendChild(div);

        div.addEventListener('click', function() {
            alert("funciona");
        });
    }

    // Manejo de eventos de clic en imágenes
    pictures.forEach(function(picture) {
        picture.addEventListener("click", function() {
            // Resetea el borde de todas las imágenes
            pictures.forEach(function(pic) {
                let img = pic.querySelector("img");
                if (img) {
                    img.style.borderColor = "#bfbfbf";
                }
            });

            // Establece el borde de la imagen seleccionada
            let imagen = picture.querySelector("img");
            if (imagen) {
                imagen.style.borderColor = "#3483fa";

                // Crea y actualiza la imagen principal
                let imagenPrincipal = document.createElement("img");
                imagenPrincipal.alt = producto.Nombre;
                imagenPrincipal.height = 310;
                imagenPrincipal.src = imagen.src;
                imagenPrincipal.width = 310;

                let Contenedor_imagenPrincipal = document.querySelector("main .Contenedor-Del-Producto .Imagen");
                Contenedor_imagenPrincipal.innerHTML = '';
                Contenedor_imagenPrincipal.appendChild(imagenPrincipal);
            }
        });
    });
}



// Inicializar la actualización de imágenes
actualizarImagenes();

// Actualizar las imágenes solo cuando cambie la URL
window.addEventListener('popstate', function() {
    actualizarImagenes();
});

// Actualizar las imágenes cuando se cambien los parámetros de la URL mediante pushState
window.addEventListener('pushState', function() {
    actualizarImagenes();
});