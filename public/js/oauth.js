async function getToken () {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
//Hacemos peticion de token al servidor.
    const promise = await fetch("http://localhost:3000/oauth/token",requestOptions);
    const estado = await promise.status;
//Si ya hemos entrado previamente y nos tiene guardados en la sesion nos devuelve el token. 
//Pero si la respuesta del servidor es el status 401 nos redirige a la url de autodesk
    if (estado === 401){
        const url_prom = await fetch("http://localhost:3000/oauth/url",requestOptions);
        const url_txt = await url_prom.text();
        window.location.replace(url_txt);
        }else{
            //Token de acceso publico viewables:read, en caso de querer cambiar al internal modificar el fetch a /oauth/intoken o modificar el fichero conf
            const token = await promise.json();
            console.log(token.access_token);
        }
    };

document.addEventListener("DOMContentLoaded", getToken())