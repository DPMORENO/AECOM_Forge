const config = require('../../config');

class OAuth {
//Crea un objeto nuevo que almacena en el servidor. Este objeto lleva asociado como elemnto constructor la session enviada.
    constructor(session) {
        this._session = session;
    }

// Recoge el codigo de autodesk y pide los token y almacena en la session el token, el token de referesco y la fecha de expiración

    async setCode(code) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("client_id", config.credentials.client_id);
        urlencoded.append("client_secret", config.credentials.client_secret);
        urlencoded.append("grant_type", "authorization_code");
        urlencoded.append("code", code);
        urlencoded.append("redirect_uri", config.credentials.callback_url);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        const credentials = await fetch("https://developer.api.autodesk.com/authentication/v1/gettoken", requestOptions)

        const now = new Date();
        this._session.token = credentials.json().access_token;
        this._session.refresh_token = credentials.json().refresh_token;
        this._session.expires_at = (now.setSeconds(now.getSeconds() + credentials.json().expires_in));
    }

    //Devuelve true si existe un token en la session
    isAuthorized() {
        return this._session.token;
    }

    //Devuelve el token. Si el token ha caducado, refresca el token antes de devolverlo.
    async getToken() {
        if (this._isExpired()) {
            await this._refreshTokens();
        }
        return {
            access_token: this._session.token
        };
    }

//Estas funciones llevan una _ delante porque solo pueden ser llamadas desde dentro de otra funcion en esta clase. No pueden ser llamadas directamente.

//Devuelve true si la fecha alamcenada en la sesion ya ha pasado y falso si todavia no ha pasado.
    _isExpired() {
        return (new Date() > new Date(this._session.expires_at));
    }


//Refresca el Token y lo devuelve
    async _refreshTokens() {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("client_id", config.credentials.client_id);
        urlencoded.append("client_secret", config.credentials.client_secret);
        urlencoded.append("grant_type", "refresh_token");
        urlencoded.append("refresh_token", this._session.refresh_token);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        const credentials = await fetch("https://developer.api.autodesk.com/authentication/v1/refreshtoken", requestOptions)

        const now = new Date();
        this._session.internal_token = credentials.json().access_token;
        this._session.public_token = credentials.json().access_token;
        this._session.refresh_token = credentials.json().refresh_token;
        this._session.expires_at = (now.setSeconds(now.getSeconds() + credentials.json().expires_in));
    }
}

module.exports = { OAuth };
