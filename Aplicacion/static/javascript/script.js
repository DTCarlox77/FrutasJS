document.addEventListener('DOMContentLoaded', () => {

    const url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;

    const boton = document.querySelector('#subir_fruta');

    boton.addEventListener('click', agregarFruta);

    const actualizar = document.querySelector('#nuevo_subir_fruta');
    actualizar.addEventListener('click', () => {
        solicitarCambioFruta();
    });


    function actualizarFruta(fruta) {
        const nombre = document.querySelector('#nuevo_nombre_fruta');
        const precio = document.querySelector('#nuevo_precio_fruta');
        const id_fruta = document.querySelector('#id_fruta');
        id_fruta.textContent = fruta.id;
        nombre.value = fruta.nombre;
        precio.value = fruta.precio;
    }

    function solicitarCambioFruta() {
        const nombre = document.querySelector('#nuevo_nombre_fruta');
        const precio = document.querySelector('#nuevo_precio_fruta');
        const id = document.querySelector('#id_fruta');

        const data = JSON.stringify({
            nombre : nombre.value,
            precio : parseFloat(precio.value)
        });

        fetch(`${url}/frutas/${id.textContent}/`, {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : data
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al consultar la API.');
            }
            return response.json();
        })
        .then(data => {
            cargarFrutas();
        })
        .catch(error => {
            console.error(error);
        })
    }

    function agregarFruta() {
        const nombre = document.querySelector('#nombre_fruta');
        const precio = document.querySelector('#precio_fruta');

        const data = JSON.stringify({
            nombre : nombre.value,
            precio : precio.value
        });

        fetch(`${url}/frutas/`, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : data
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al consultar la API.');
            }
            return response.json();
        })
        .then(data => {
            cargarFrutas();
            nombre.value = '';
            precio.value = '';
        })
        .catch(error => {
            console.error(error);
        })
    }


    function indexarFrutas(frutas) {
        const tbody = document.querySelector('#cuerpo_tabla');
        tbody.innerHTML = ''
        frutas.forEach(fruta => {
            const tr = document.createElement('tr');
            const td_nombre = document.createElement('td');
            const td_precio = document.createElement('td');

            td_nombre.textContent = fruta.nombre;
            td_precio.textContent = fruta.precio;
            
            tr.appendChild(td_nombre);
            tr.appendChild(td_precio);
            
            tr.addEventListener('click', () => {
                actualizarFruta(fruta);
            });

            tbody.appendChild(tr);
        });
    }

    function cargarFrutas() {
        fetch(`${url}/frutas/`, {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al consultar la API.');
            }
            return response.json();
        })
        .then(data => {
            indexarFrutas(data.frutas);
        })
        .catch(error => {
            console.error(error);
        })
    }

    cargarFrutas();
});