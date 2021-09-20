async const getToken = () => {
    const data = await fetch('http://127.0.0.1:3000/oauth/token');


}
//Hay que hacer el fetch y colocar el token en la tarjeta con el id SEGUIR POR AQUI!!!

document.addEventListener("DOMContentLoaded", getToken())