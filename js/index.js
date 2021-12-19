function ajax(url, metodo="get") {
    let httpMetodo = metodo; // get
    let xhr = new XMLHttpRequest;
    xhr.open(httpMetodo, url);
    xhr.send()

    return xhr;
}

/* Carga la barra de navegación */
let nav = document.querySelector('nav');
let xhr = ajax('navbar.html');
xhr.addEventListener('load', () => {
    if(xhr.status == 200) {
        nav.innerHTML = xhr.response;
        getPlantillasConHistoryHash();
    }
});


/* Navegación SPA sin historial */
function getPlantillasSinHistory() {
    let main = document.querySelector('main');

    /* Cargar la home */ 
    let archivo = 'home.html';
    let xhr = ajax(archivo);
    xhr.addEventListener('load', () => {
        if(xhr.status = 200) {
            main.innerHTML = xhr.response;
        } 
    })

    /* Carga de las páginas restantes */
    let links = document.querySelectorAll('a');

    links.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();

            let id = link.id;
            
            let archivo = id + '.html';
            console.log(archivo); // perfil.html
            let xhr = ajax(archivo);
            xhr.addEventListener('load', () => {
                if(xhr.status == 200) {
                    main.innerHTML = xhr.response;
                }
            })
        })
    })
}

/* Navegación SPA con historial HASH  */

function getPlantillasConHistoryHash() {

    let main = document.querySelector('main');
    /* Cargar la home */ 
    let hash = location.hash;
    console.log(hash);
    let archivo = (hash) ? hash.slice(1)+'.html': 'home.html';
    console.log(archivo);
    let xhr = ajax(archivo);
    xhr.addEventListener('load', () => {
        if(xhr.status == 200) {
            main.innerHTML = xhr.response;
        }
    })

    /* Carga de las páginas restantes */
    let links = document.querySelectorAll('a');

    links.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();

            let id = link.id;
            location.hash = id;
        })
    })

    /* Registro de evento de cambio de URL */
    window.addEventListener('hashchange', () => {
        console.log('Cambió la URL');

        let hash = location.hash;
        //console.log(hash);

        let archivo = hash ? hash.slice(1)+'.html':'home.html'; // (condicion) ? true : false;
        console.log(archivo);

        let xhr = ajax(archivo);
        xhr.addEventListener('load', () => {
            if(xhr.status == 200) {
                main.innerHTML = xhr.response;
            }
        })
    })
}

