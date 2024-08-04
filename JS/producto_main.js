function prueba() {
    // Extraer el valor de "Nombre" de la URL
    var params = new URLSearchParams(window.location.search);
    var nombreProducto = params.get('Nombre');

    var producto = Productos.find(item => item.Nombre === nombreProducto); 

    nombreProducto = document.querySelector("main .Contenedor-Del-Producto .Ul ul .Nombre");
    nombreProducto.textContent = producto.Nombre;

    precioProducto = document.querySelector("main .Contenedor-Del-Producto .Ul ul .Precio");
    precioProducto.textContent = producto.PrecioTEXTO;

    var Imagen_Principal = document.querySelector("main .Contenedor-Del-Producto .Imagen");

    var picture = document.createElement("picture");
        
    var sourceWebP = document.createElement("source");
    sourceWebP.srcset = producto.rutaImagen.Img0; // Aquí accedes a la imagen principal
    sourceWebP.type = "image/webp";
        
    var sourcePNG = document.createElement("source");
    sourcePNG.srcset = producto.rutaImagen.ImgRespaldo0; // Aquí accedes a la imagen principal
    sourcePNG.type = "image/png";
        
    var img = document.createElement("img");
    img.alt = producto.Nombre;
    img.height = 310;
    img.src = producto.rutaImagen.ImgRespaldo0; // Aquí accedes a la imagen principal
    img.width = 310;
        
    picture.appendChild(sourceWebP);
    picture.appendChild(sourcePNG);
    picture.appendChild(img);

    Imagen_Principal.appendChild(picture);

    var colores = producto.Colores;
    let rutaImagen = producto.rutaImagen;

    var Contenedor_imagenes = document.querySelector("main .Contenedor-Del-Producto .Imagenes");

    if (colores) {

        var picture = document.createElement("picture");
        
        var sourceWebP = document.createElement("source");
        sourceWebP.srcset = producto.rutaImagen.Img0; // Aquí accedes a la imagen principal
        sourceWebP.type = "image/webp";

        var sourcePNG = document.createElement("source");
        sourcePNG.srcset = producto.rutaImagen.ImgRespaldo0; // Aquí accedes a la imagen principal
        sourcePNG.type = "image/png";

        var img = document.createElement("img");
        img.alt = producto.Nombre;
        img.height = 65;
        img.src = producto.rutaImagen.ImgRespaldo0; // Aquí accedes a la imagen principal
        img.width = 65;
        
        picture.appendChild(sourceWebP);
        picture.appendChild(sourcePNG);
        picture.appendChild(img);

        Contenedor_imagenes.appendChild(picture);

        for (let color in colores) {
            if (colores.hasOwnProperty(color)) {
                let colorData = colores[color];  // Accede a los datos del color
                let imagen = colorData.imagen;
                let imagenRespaldo = colorData.imagenRespaldo;
                let cantidad = colorData.cantidad;  // Accede a la cantidad

                var picture = document.createElement("picture");

                var sourceWEBP = document.createElement("source");
                sourceWEBP.srcset = imagen;

                var sourcePNG = document.createElement("source");
                sourceWEBP.srcset = imagenRespaldo;

                var img = document.createElement("img");
                img.alt = producto.Nombre;
                img.height = 65;
                img.src = imagenRespaldo;
                img.width = 65;

                picture.appendChild(sourceWEBP);
                picture.appendChild(sourcePNG);
                picture.appendChild(img);

                //var Contenedor_imagenes = document.querySelector("main .Contenedor-Del-Producto .Imagenes");
                Contenedor_imagenes.appendChild(picture);
              
                var Button = document.createElement("button");
                Button.textContent = `${color} (${cantidad} disponibles)`

                // Agregar evento click al botón
                Button.addEventListener("click", function() {
                    // Obtener la URL actual
                    let url = new URL(window.location.href);

                    // Modificar o agregar el parámetro 'color'
                    url.searchParams.set('color', color);

                    // Actualizar la URL sin recargar la página
                    window.history.pushState({}, '', url);
                });

                var ContenedorCantidad = document.querySelector("main .Contenedor-Del-Producto .Ul ul .Cantidad");
                ContenedorCantidad.appendChild(Button);
            }
        }
        
        // Crea un conjunto para almacenar las rutas ya añadidas y evitar duplicados
        let rutasAñadidas = new Set();

        for (let key in rutaImagen) {
                if (rutaImagen.hasOwnProperty(key)) {
                    // Extraer el índice de la clave
                    let match = key.match(/(\d+)$/);  // Busca el número al final de la clave
                    if (match) {
                        let index = match[1];  // Obtiene el número como string
            
                        // Omitir claves específicas (por ejemplo, Img0 y ImgRespaldo0)
                        if (index === '0') {
                            continue;  // Salta al siguiente índice en el bucle
                        }

                        let webpKey = `Img${index}`;
                        let pngKey = `ImgRespaldo${index}`;
                
                        // Acceder a las rutas usando las claves dinámicas
                        let webpRuta = rutaImagen[webpKey];
                        let pngRuta = rutaImagen[pngKey];
                
                        // Mostrar las rutas en la consola
                        if (webpRuta) {
                            console.log(`Clave ${webpKey}: ${webpRuta}`);
                        } else {
                            console.log(`No se encontró la ruta para ${webpKey}`);
                        }
                
                        if (pngRuta) {
                            console.log(`Clave ${pngKey}: ${pngRuta}`);
                        } else {
                            console.log(`No se encontró la ruta para ${pngKey}`);
                        }

                        // Crear una identificación única para el elemento <picture>
                        let identificador = `${webpRuta}-${pngRuta}`;
            
                        // Comprobar si ya se añadió esta combinación de rutas
                        if (!rutasAñadidas.has(identificador)) {
                        // Añadir la combinación al conjunto para evitar duplicados
                        rutasAñadidas.add(identificador);

                        // Crear y añadir el elemento <picture>
                        var picture = document.createElement("picture");

                        var sourceWEBP = document.createElement("source");
                        sourceWEBP.srcset = webpRuta;
                        sourceWEBP.type = "image/webp";

                        var sourcePNG = document.createElement("source");
                        sourcePNG.srcset = pngRuta;
                        sourcePNG.type = "image/png";

                        var img = document.createElement("img");
                        img.alt = producto.Nombre;
                        img.height = 65;
                        img.src = pngRuta;
                        img.width = 65;

                        picture.appendChild(sourceWEBP);
                        picture.appendChild(sourcePNG);
                        picture.appendChild(img);

                        Contenedor_imagenes.appendChild(picture);
                    } else {
                    console.log(`El <picture> con las rutas ${webpRuta} y ${pngRuta} ya está en el contenedor.`);
                    }
                }
            }
        }

    } else {
        console.log(`El producto ${producto.Nombre} no tiene la propiedad 'Colores'.`);

        var picture = document.createElement("picture");
        
        var sourceWebP = document.createElement("source");
        sourceWebP.srcset = producto.rutaImagen.Img0; // Aquí accedes a la imagen principal
        sourceWebP.type = "image/webp";

        var sourcePNG = document.createElement("source");
        sourcePNG.srcset = producto.rutaImagen.ImgRespaldo0; // Aquí accedes a la imagen principal
        sourcePNG.type = "image/png";

        var img = document.createElement("img");
        img.alt = producto.Nombre;
        img.height = 65;
        img.src = producto.rutaImagen.ImgRespaldo0; // Aquí accedes a la imagen principal
        img.width = 65;
        
        picture.appendChild(sourceWebP);
        picture.appendChild(sourcePNG);
        picture.appendChild(img);

        Contenedor_imagenes.appendChild(picture);

        // Crea un conjunto para almacenar las rutas ya añadidas y evitar duplicados
        let rutasAñadidas = new Set();

        for (let key in rutaImagen) {
                if (rutaImagen.hasOwnProperty(key)) {
                    // Extraer el índice de la clave
                    let match = key.match(/(\d+)$/);  // Busca el número al final de la clave
                    if (match) {
                        let index = match[1];  // Obtiene el número como string
            
                        // Omitir claves específicas (por ejemplo, Img0 y ImgRespaldo0)
                        if (index === '0') {
                            continue;  // Salta al siguiente índice en el bucle
                        }

                        let webpKey = `Img${index}`;
                        let pngKey = `ImgRespaldo${index}`;
                
                        // Acceder a las rutas usando las claves dinámicas
                        let webpRuta = rutaImagen[webpKey];
                        let pngRuta = rutaImagen[pngKey];
                
                        // Mostrar las rutas en la consola
                        if (webpRuta) {
                            console.log(`Clave ${webpKey}: ${webpRuta}`);
                        } else {
                            console.log(`No se encontró la ruta para ${webpKey}`);
                        }
                
                        if (pngRuta) {
                            console.log(`Clave ${pngKey}: ${pngRuta}`);
                        } else {
                            console.log(`No se encontró la ruta para ${pngKey}`);
                        }

                        // Crear una identificación única para el elemento <picture>
                        let identificador = `${webpRuta}-${pngRuta}`;
            
                        // Comprobar si ya se añadió esta combinación de rutas
                        if (!rutasAñadidas.has(identificador)) {
                        // Añadir la combinación al conjunto para evitar duplicados
                        rutasAñadidas.add(identificador);

                        // Crear y añadir el elemento <picture>
                        var picture = document.createElement("picture");

                        var sourceWEBP = document.createElement("source");
                        sourceWEBP.srcset = webpRuta;
                        sourceWEBP.type = "image/webp";

                        var sourcePNG = document.createElement("source");
                        sourcePNG.srcset = pngRuta;
                        sourcePNG.type = "image/png";

                        var img = document.createElement("img");
                        img.alt = producto.Nombre;
                        img.height = 65;
                        img.src = pngRuta;
                        img.width = 65;

                        picture.appendChild(sourceWEBP);
                        picture.appendChild(sourcePNG);
                        picture.appendChild(img);

                        Contenedor_imagenes.appendChild(picture);
                    } else {
                    console.log(`El <picture> con las rutas ${webpRuta} y ${pngRuta} ya está en el contenedor.`);
                    }
                }
            }
        }

        var ContenedorCantidad = document.querySelector("main .Contenedor-Del-Producto .Ul ul .Cantidad");
        ContenedorCantidad.textContent = `Cantidad (${producto.Stock} disponibles)`;
    } // aca termina el else

    var caracteristicas = producto.Caracteristicas;

    if (caracteristicas) {
        var main = document.querySelector("main");

        console.log("existe")
        var div = document.createElement("div");
        div.classList.add("Caracteristicas");

        var h2 = document.createElement("h2");
        h2.textContent = "Características";


        main.appendChild(h2);

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

            verificar.style.maxHeight = "240px"
            verificar.style.overflowY = "hidden";
        } else {
            console.log("El contenido no supera los 240px.");
        }

        var hr = document.createElement("hr");
        
        div1 = document.createElement("div");
        div1.style.display = "flex";
        div1.style.justifyContent = "center"

        var hr = document.createElement("hr");

        div1.appendChild(hr);
        main.appendChild(div1);

        /* CODIGO NUEVO*/
        var div = document.createElement("div");
        div.classList.add("Descripcion");

        var h2 = document.createElement("h2");
        h2.textContent = "Descripción";

        // Supongamos que div es el contenedor donde quieres agregar los <p>

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

        main.appendChild(h2);
        main.appendChild(div);

        var verificar = document.querySelector("main .Descripcion");
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

            verificar.style.maxHeight = "240px"
            verificar.style.overflowY = "hidden";
        } else {
            console.log("El contenido no supera los 240px.");
        }


        div1 = document.createElement("div");
        div1.style.display = "flex";
        div1.style.justifyContent = "center"

        var hr = document.createElement("hr");

        div1.appendChild(hr);
        main.appendChild(div1);

        h2 = document.createElement("h2");
        h2.textContent = "Preguntas";

        main.appendChild(h2);

        var div1 = document.createElement("div");
        div1.classList.add("inputs");
        div1.style.display = "flex";
        div1.style.justifyContent = "center";
        div1.style.alignItems = "center";

        var input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Escribe tu pregunta";
        input.style.padding = "10px";

       

        var input2 = document.createElement("input");
        input2.type = "button";
        input2.value = "Preguntar";
        input2.style.backgroundColor = "#004DFF";  // Configura el color de fondo del segundo input
        input2.style.color = "white";              // Configura el color del texto del segundo input
        input2.style.border = '0';                 // Configura el borde del segundo input
        input2.style.padding = "12px";

        div1.appendChild(input);
        div1.appendChild(input2);

        main.appendChild(div1); 

    } else {
        console.log("No existe");

        var main = document.querySelector("main");

        var div = document.createElement("div");
        div.classList.add("Descripcion");

        var h2 = document.createElement("h2");
        h2.textContent = "Descripción";

        // Supongamos que div es el contenedor donde quieres agregar los <p>

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


        main.appendChild(h2);

        main.appendChild(div);
        /* Codigo prueba*/
        var verificar = document.querySelector("main .Descripcion");
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

            verificar.style.maxHeight = "240px"
            verificar.style.overflowY = "hidden";
        } else {
            console.log("El contenido no supera los 240px.");
        }   
        
        main.appendChild(div1);

        div1 = document.createElement("div");
        div1.style.display = "flex";
        div1.style.justifyContent = "center"

        var hr = document.createElement("hr");

        div1.appendChild(hr);
        main.appendChild(div1);

        h2 = document.createElement("h2");
        h2.textContent = "Preguntas";

        main.appendChild(h2);

        var div1 = document.createElement("div");
        div1.classList.add("inputs");
        div1.style.display = "flex";
        div1.style.justifyContent = "center";
        div1.style.alignItems = "center";

        var input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Escribe tu pregunta";
        input.style.padding = "10px";

       

        var input2 = document.createElement("input");
        input2.type = "button";
        input2.value = "Preguntar";
        input2.style.backgroundColor = "#004DFF";  // Configura el color de fondo del segundo input
        input2.style.color = "white";              // Configura el color del texto del segundo input
        input2.style.border = '0';                 // Configura el borde del segundo input
        input2.style.padding = "12px";

        div1.appendChild(input);
        div1.appendChild(input2);

        main.appendChild(div1); 
    }
} 

prueba();

/* Terminado */
/*
function actualizarImagenes() {
    let lastURL = window.location.href;

    lastURL = window.location.href;

        let url = new URL(window.location.href);
        let color = url.searchParams.get('color');
        let nombreProducto = url.searchParams.get('Nombre');
        let producto = Productos.find(item => item.Nombre === nombreProducto);

        let Contenedor_imagenes = document.querySelector("main .Contenedor-Del-Producto .Imagenes");
        Contenedor_imagenes.innerHTML = ''; // Limpiar el contenedor antes de cualquier acción

        if (producto && producto.Colores && color) {
            let colorData = producto.Colores[color];

            if (colorData) {
                // Añadir la imagen principal del color seleccionado
                let imagen = colorData.imagen;
                let imagenRespaldo = colorData.imagenRespaldo;

                let picture = document.createElement("picture");

                if (imagen) {
                    let sourceWEBP = document.createElement("source");
                    sourceWEBP.srcset = imagen;
                    sourceWEBP.type = "image/webp";
                    picture.appendChild(sourceWEBP);
                }

                if (imagenRespaldo) {
                    let sourcePNG = document.createElement("source");
                    sourcePNG.srcset = imagenRespaldo;
                    sourcePNG.type = "image/png";
                    picture.appendChild(sourcePNG);
                }

                let img = document.createElement("img");
                img.alt = producto.Nombre;
                img.height = 65;
                img.width = 65;
                img.src = imagenRespaldo || imagen;

                picture.appendChild(img);
                Contenedor_imagenes.appendChild(picture);
            }
        } else {
            var picture = document.createElement("picture");
        
            var sourceWebP = document.createElement("source");
            sourceWebP.srcset = producto.rutaImagen.Img0; // Aquí accedes a la imagen principal
            sourceWebP.type = "image/webp";
        
            var sourcePNG = document.createElement("source");
            sourcePNG.srcset = producto.rutaImagen.ImgRespaldo0; // Aquí accedes a la imagen principal
            sourcePNG.type = "image/png";
        
            var img = document.createElement("img");
            img.alt = producto.Nombre;
            img.height = 65;
            img.src = producto.rutaImagen.ImgRespaldo0; // Aquí accedes a la imagen principal
            img.width = 65;
        
            picture.appendChild(sourceWebP);
            picture.appendChild(sourcePNG);
            picture.appendChild(img);

            Contenedor_imagenes.appendChild(picture);
            // Mostrar las primeras imágenes de color si no se especifica un color en la URL
            if (producto && producto.Colores) {
                let colores = producto.Colores;
                let rutasAñadidas = new Set();

                for (let key in colores) {
                    if (colores.hasOwnProperty(key)) {
                        let colorData = colores[key];
                        let imagen = colorData.imagen;
                        let imagenRespaldo = colorData.imagenRespaldo;

                        if (imagen || imagenRespaldo) {
                            let picture = document.createElement("picture");

                            if (imagen) {
                                let sourceWEBP = document.createElement("source");
                                sourceWEBP.srcset = imagen;
                                sourceWEBP.type = "image/webp";
                                picture.appendChild(sourceWEBP);
                            }

                            if (imagenRespaldo) {
                                let sourcePNG = document.createElement("source");
                                sourcePNG.srcset = imagenRespaldo;
                                sourcePNG.type = "image/png";
                                picture.appendChild(sourcePNG);
                            }

                            let img = document.createElement("img");
                            img.alt = producto.Nombre;
                            img.height = 65;
                            img.width = 65;
                            img.src = imagenRespaldo || imagen;

                            picture.appendChild(img);
                            Contenedor_imagenes.appendChild(picture);
                        }
                    }
                }
            }
            let rutaImagen = producto.rutaImagen;
            let rutasAñadidas = new Set();

            // Iterar sobre todas las imágenes, excluyendo Img0 y ImgRespaldo0
            for (let key in rutaImagen) {
                if (rutaImagen.hasOwnProperty(key)) {
                let match = key.match(/(\d+)$/);
                if (match) {
                    let index = match[1];

                    // Omitir Img0 y ImgRespaldo0
                    if (index === '0') {
                        continue;
                    }

                    let webpKey = `Img${index}`;
                    let pngKey = `ImgRespaldo${index}`;

                    let webpRuta = rutaImagen[webpKey];
                    let pngRuta = rutaImagen[pngKey];

                    let identificador = `${webpRuta}-${pngRuta}`;

                    if (!rutasAñadidas.has(identificador)) {
                        rutasAñadidas.add(identificador);

                        let picture = document.createElement("picture");

                        if (webpRuta) {
                            let sourceWEBP = document.createElement("source");
                            sourceWEBP.srcset = webpRuta;
                            sourceWEBP.type = "image/webp";
                        picture.appendChild(sourceWEBP);
                        }   

                        if (pngRuta) {
                            let sourcePNG = document.createElement("source");
                            sourcePNG.srcset = pngRuta;
                            sourcePNG.type = "image/png";
                        picture.appendChild(sourcePNG);
                        }

                        let img = document.createElement("img");
                        img.alt = producto.Nombre;
                        img.height = 65;
                        img.width = 65;
                        img.src = pngRuta;

                        picture.appendChild(img);

                        Contenedor_imagenes.appendChild(picture);
                    }
                }
            }
            }
        }
    };*/
















/*
    function actualizarImagenes() {
        let lastURL = window.location.href;
    
        lastURL = window.location.href;
    
            let url = new URL(window.location.href);
            let color = url.searchParams.get('color');
            let nombreProducto = url.searchParams.get('Nombre');
            let producto = Productos.find(item => item.Nombre === nombreProducto);
    
            let Contenedor_imagenes = document.querySelector("main .Contenedor-Del-Producto .Imagenes");
            Contenedor_imagenes.innerHTML = ''; // Limpiar el contenedor antes de cualquier acción
    
            if (producto && producto.Colores && color) {
                let colorData = producto.Colores[color];
            
                if (colorData) {
                    let rutasAñadidas = new Set();
            
                    // Añadir la imagen principal del color seleccionado primero
                    let imagen = colorData.imagen;
                    let imagenRespaldo = colorData.imagenRespaldo;
            
                    if (imagen || imagenRespaldo) {
                        let picture = document.createElement("picture");
            
                        if (imagen) {
                            let sourceWEBP = document.createElement("source");
                            sourceWEBP.srcset = imagen;
                            sourceWEBP.type = "image/webp";
                            picture.appendChild(sourceWEBP);
                        }
            
                        if (imagenRespaldo) {
                            let sourcePNG = document.createElement("source");
                            sourcePNG.srcset = imagenRespaldo;
                            sourcePNG.type = "image/png";
                            picture.appendChild(sourcePNG);
                        }
            
                        let img = document.createElement("img");
                        img.alt = producto.Nombre;
                        img.height = 65;
                        img.width = 65;
                        img.src = imagenRespaldo || imagen;
            
                        picture.appendChild(img);
                        Contenedor_imagenes.appendChild(picture);
            
                        // Agregar la ruta de la imagen principal a rutasAñadidas para evitar duplicados
                        rutasAñadidas.add(`${imagen}-${imagenRespaldo}`);
                    }
            
                    // Ahora procesamos las imágenes adicionales (Img1, ImgRespaldo1, etc.)
                    for (let key in colorData) {
                        if (colorData.hasOwnProperty(key) && key.startsWith("Img")) {
                            let match = key.match(/(\d+)$/);
                            if (match) {
                                let index = match[1];
            
                                let webpKey = `Img${index}`;
                                let pngKey = `ImgRespaldo${index}`;
            
                                let webpRuta = colorData[webpKey];
                                let pngRuta = colorData[pngKey];
            
                                let identificador = `${webpRuta}-${pngRuta}`;
            
                                // Evitar duplicados con rutasAñadidas
                                if (!rutasAñadidas.has(identificador)) {
                                    rutasAñadidas.add(identificador);
            
                                    let picture = document.createElement("picture");
            
                                    if (webpRuta) {
                                        let sourceWEBP = document.createElement("source");
                                        sourceWEBP.srcset = webpRuta;
                                        sourceWEBP.type = "image/webp";
                                        picture.appendChild(sourceWEBP);
                                    }
            
                                    if (pngRuta) {
                                        let sourcePNG = document.createElement("source");
                                        sourcePNG.srcset = pngRuta;
                                        sourcePNG.type = "image/png";
                                        picture.appendChild(sourcePNG);
                                    }
            
                                    let img = document.createElement("img");
                                    img.alt = producto.Nombre;
                                    img.height = 65;
                                    img.width = 65;
                                    img.src = pngRuta;
            
                                    picture.appendChild(img);
                                    Contenedor_imagenes.appendChild(picture);
                                }
                            }
                        }
                    }
                }
            }
            
             else {
                var picture = document.createElement("picture");
            
                var sourceWebP = document.createElement("source");
                sourceWebP.srcset = producto.rutaImagen.Img0; // Aquí accedes a la imagen principal
                sourceWebP.type = "image/webp";
            
                var sourcePNG = document.createElement("source");
                sourcePNG.srcset = producto.rutaImagen.ImgRespaldo0; // Aquí accedes a la imagen principal
                sourcePNG.type = "image/png";
            
                var img = document.createElement("img");
                img.alt = producto.Nombre;
                img.height = 65;
                img.src = producto.rutaImagen.ImgRespaldo0; // Aquí accedes a la imagen principal
                img.width = 65;
            
                picture.appendChild(sourceWebP);
                picture.appendChild(sourcePNG);
                picture.appendChild(img);
    
                Contenedor_imagenes.appendChild(picture);
                // Mostrar las primeras imágenes de color si no se especifica un color en la URL
                if (producto && producto.Colores) {
                    let colores = producto.Colores;
                    let rutasAñadidas = new Set();
    
                    for (let key in colores) {
                        if (colores.hasOwnProperty(key)) {
                            let colorData = colores[key];
                            let imagen = colorData.imagen;
                            let imagenRespaldo = colorData.imagenRespaldo;
    
                            if (imagen || imagenRespaldo) {
                                let picture = document.createElement("picture");
    
                                if (imagen) {
                                    let sourceWEBP = document.createElement("source");
                                    sourceWEBP.srcset = imagen;
                                    sourceWEBP.type = "image/webp";
                                    picture.appendChild(sourceWEBP);
                                }
    
                                if (imagenRespaldo) {
                                    let sourcePNG = document.createElement("source");
                                    sourcePNG.srcset = imagenRespaldo;
                                    sourcePNG.type = "image/png";
                                    picture.appendChild(sourcePNG);
                                }
    
                                let img = document.createElement("img");
                                img.alt = producto.Nombre;
                                img.height = 65;
                                img.width = 65;
                                img.src = imagenRespaldo || imagen;
    
                                picture.appendChild(img);
                                Contenedor_imagenes.appendChild(picture);
                            }
                        }
                    }
                }
                let rutaImagen = producto.rutaImagen;
                let rutasAñadidas = new Set();
    
                // Iterar sobre todas las imágenes, excluyendo Img0 y ImgRespaldo0
                for (let key in rutaImagen) {
                    if (rutaImagen.hasOwnProperty(key)) {
                    let match = key.match(/(\d+)$/);
                    if (match) {
                        let index = match[1];
    
                        // Omitir Img0 y ImgRespaldo0
                        if (index === '0') {
                            continue;
                        }
    
                        let webpKey = `Img${index}`;
                        let pngKey = `ImgRespaldo${index}`;
    
                        let webpRuta = rutaImagen[webpKey];
                        let pngRuta = rutaImagen[pngKey];
    
                        let identificador = `${webpRuta}-${pngRuta}`;
    
                        if (!rutasAñadidas.has(identificador)) {
                            rutasAñadidas.add(identificador);
    
                            let picture = document.createElement("picture");
    
                            if (webpRuta) {
                                let sourceWEBP = document.createElement("source");
                                sourceWEBP.srcset = webpRuta;
                                sourceWEBP.type = "image/webp";
                            picture.appendChild(sourceWEBP);
                            }   
    
                            if (pngRuta) {
                                let sourcePNG = document.createElement("source");
                                sourcePNG.srcset = pngRuta;
                                sourcePNG.type = "image/png";
                            picture.appendChild(sourcePNG);
                            }
    
                            let img = document.createElement("img");
                            img.alt = producto.Nombre;
                            img.height = 65;
                            img.width = 65;
                            img.src = pngRuta;
    
                            picture.appendChild(img);
    
                            Contenedor_imagenes.appendChild(picture);
                        }
                    }
                }
                }
            }
        };*/

        function actualizarImagenes() {
            let lastURL = window.location.href;
        
            lastURL = window.location.href;
        
                let url = new URL(window.location.href);
                let color = url.searchParams.get('color');
                let nombreProducto = url.searchParams.get('Nombre');
                let producto = Productos.find(item => item.Nombre === nombreProducto);
        
                let Contenedor_imagenes = document.querySelector("main .Contenedor-Del-Producto .Imagenes");
                Contenedor_imagenes.innerHTML = ''; // Limpiar el contenedor antes de cualquier acción
        
                if (producto && producto.Colores && color) {
                    let colorData = producto.Colores[color];
                
                    if (colorData) {
                        let rutasAñadidas = new Set();
                
                        // Añadir la imagen principal del color seleccionado primero
                        let imagen = colorData.imagen;
                        let imagenRespaldo = colorData.imagenRespaldo;
                
                        if (imagen || imagenRespaldo) {
                            let picture = document.createElement("picture");
                
                            if (imagen) {
                                let sourceWEBP = document.createElement("source");
                                sourceWEBP.srcset = imagen;
                                sourceWEBP.type = "image/webp";
                                picture.appendChild(sourceWEBP);
                            }
                
                            if (imagenRespaldo) {
                                let sourcePNG = document.createElement("source");
                                sourcePNG.srcset = imagenRespaldo;
                                sourcePNG.type = "image/png";
                                picture.appendChild(sourcePNG);
                            }
                
                            let img = document.createElement("img");
                            img.alt = producto.Nombre;
                            img.height = 65;
                            img.width = 65;
                            img.src = imagenRespaldo || imagen;
                
                            picture.appendChild(img);
                            Contenedor_imagenes.appendChild(picture);
                
                            rutasAñadidas.add(`${imagen}-${imagenRespaldo}`);
                        }
                
                        // Procesar imágenes adicionales Img1, ImgRespaldo1, etc.
                        for (let i = 1; i <= 5; i++) {  // Asumiendo que hay hasta 5 imágenes adicionales, puedes ajustar este número según necesites
                            let webpRuta = colorData[`Img${i}`];
                            let pngRuta = colorData[`ImgRespaldo${i}`];
                
                            if (webpRuta || pngRuta) {
                                let identificador = `${webpRuta}-${pngRuta}`;
                
                                if (!rutasAñadidas.has(identificador)) {
                                    rutasAñadidas.add(identificador);
                
                                    let picture = document.createElement("picture");
                
                                    if (webpRuta) {
                                        let sourceWEBP = document.createElement("source");
                                        sourceWEBP.srcset = webpRuta;
                                        sourceWEBP.type = "image/webp";
                                        picture.appendChild(sourceWEBP);
                                    }
                
                                    if (pngRuta) {
                                        let sourcePNG = document.createElement("source");
                                        sourcePNG.srcset = pngRuta;
                                        sourcePNG.type = "image/png";
                                        picture.appendChild(sourcePNG);
                                    }
                
                                    let img = document.createElement("img");
                                    img.alt = producto.Nombre;
                                    img.height = 65;
                                    img.width = 65;
                                    img.src = pngRuta || webpRuta;
                
                                    picture.appendChild(img);
                                    Contenedor_imagenes.appendChild(picture);
                                }
                            }
                        }
                    }
                    }
                
                 else {
                    var picture = document.createElement("picture");
                
                    var sourceWebP = document.createElement("source");
                    sourceWebP.srcset = producto.rutaImagen.Img0; // Aquí accedes a la imagen principal
                    sourceWebP.type = "image/webp";
                
                    var sourcePNG = document.createElement("source");
                    sourcePNG.srcset = producto.rutaImagen.ImgRespaldo0; // Aquí accedes a la imagen principal
                    sourcePNG.type = "image/png";
                
                    var img = document.createElement("img");
                    img.alt = producto.Nombre;
                    img.height = 65;
                    img.src = producto.rutaImagen.ImgRespaldo0; // Aquí accedes a la imagen principal
                    img.width = 65;
                
                    picture.appendChild(sourceWebP);
                    picture.appendChild(sourcePNG);
                    picture.appendChild(img);
        
                    Contenedor_imagenes.appendChild(picture);
                    // Mostrar las primeras imágenes de color si no se especifica un color en la URL
                    if (producto && producto.Colores) {
                        let colores = producto.Colores;
                        let rutasAñadidas = new Set();
        
                        for (let key in colores) {
                            if (colores.hasOwnProperty(key)) {
                                let colorData = colores[key];
                                let imagen = colorData.imagen;
                                let imagenRespaldo = colorData.imagenRespaldo;
        
                                if (imagen || imagenRespaldo) {
                                    let picture = document.createElement("picture");
        
                                    if (imagen) {
                                        let sourceWEBP = document.createElement("source");
                                        sourceWEBP.srcset = imagen;
                                        sourceWEBP.type = "image/webp";
                                        picture.appendChild(sourceWEBP);
                                    }
        
                                    if (imagenRespaldo) {
                                        let sourcePNG = document.createElement("source");
                                        sourcePNG.srcset = imagenRespaldo;
                                        sourcePNG.type = "image/png";
                                        picture.appendChild(sourcePNG);
                                    }
        
                                    let img = document.createElement("img");
                                    img.alt = producto.Nombre;
                                    img.height = 65;
                                    img.width = 65;
                                    img.src = imagenRespaldo || imagen;
        
                                    picture.appendChild(img);
                                    Contenedor_imagenes.appendChild(picture);
                                }
                            }
                        }
                    }
                    let rutaImagen = producto.rutaImagen;
                    let rutasAñadidas = new Set();
        
                    // Iterar sobre todas las imágenes, excluyendo Img0 y ImgRespaldo0
                    for (let key in rutaImagen) {
                        if (rutaImagen.hasOwnProperty(key)) {
                        let match = key.match(/(\d+)$/);
                        if (match) {
                            let index = match[1];
        
                            // Omitir Img0 y ImgRespaldo0
                            if (index === '0') {
                                continue;
                            }
        
                            let webpKey = `Img${index}`;
                            let pngKey = `ImgRespaldo${index}`;
        
                            let webpRuta = rutaImagen[webpKey];
                            let pngRuta = rutaImagen[pngKey];
        
                            let identificador = `${webpRuta}-${pngRuta}`;
        
                            if (!rutasAñadidas.has(identificador)) {
                                rutasAñadidas.add(identificador);
        
                                let picture = document.createElement("picture");
        
                                if (webpRuta) {
                                    let sourceWEBP = document.createElement("source");
                                    sourceWEBP.srcset = webpRuta;
                                    sourceWEBP.type = "image/webp";
                                picture.appendChild(sourceWEBP);
                                }   
        
                                if (pngRuta) {
                                    let sourcePNG = document.createElement("source");
                                    sourcePNG.srcset = pngRuta;
                                    sourcePNG.type = "image/png";
                                picture.appendChild(sourcePNG);
                                }
        
                                let img = document.createElement("img");
                                img.alt = producto.Nombre;
                                img.height = 65;
                                img.width = 65;
                                img.src = pngRuta;
        
                                picture.appendChild(img);
        
                                Contenedor_imagenes.appendChild(picture);
                            }
                        }
                    }
                    }
                }
            };

actualizarImagenes();

setInterval(actualizarImagenes, 1000); // Se ejecuta cada 1000 ms