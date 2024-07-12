/*
const imagenes = document.getElementsByClassName('Imagen-Del-Producto');

// Iterar sobre cada imagen y asignar un ID único
for (let i = 0; i < imagenes.length; i++) {
    imagenes[i].id = `imagen-${i + 1}`;

    const src = imagenes[i].src;

    // Mostrar el ID y SRC utilizando un alert
    alert(`Imagen ${i + 1}:\nID: ${imagenes[i].id}\nSRC: ${src}`);
}*/


// Obtener el elemento <div> donde se mostrará el resultado
const resultadoDiv = document.querySelector('.resultado');

// Obtener todas las imágenes con la clase "Imagen-Del-Producto"
const imagenes = document.getElementsByClassName('Imagen-Del-Producto');

// Iterar sobre cada imagen y asignar un ID único
for (let i = 0; i < imagenes.length; i++) {
    imagenes[i].id = `imagen-${i + 1}`;

    // Obtener el SRC de la imagen utilizando getAttribute
    const src = imagenes[i].getAttribute('src');

    // Crear un párrafo para mostrar el ID y SRC de la imagen
    const parrafo = document.createElement('p');
    parrafo.textContent = `Imagen ${i + 1}: ID - ${imagenes[i].id}, SRC - ${src}`;

    // Agregar el párrafo al elemento <div> resultado
    resultadoDiv.appendChild(parrafo);
}

