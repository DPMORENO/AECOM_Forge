const express = require('express');
const config = require('../config');
const { OAuth } = require('./common/oauth');

let router = express.Router();

// Verifica que existen token almacenados en la session. Si no existen redirecciona haci la pagina de autodesk y si existen te devuelve el token.
router.get('/oauth/token', async (req, res, next) => {
    const oauth = new OAuth(req.session);
    if (!oauth.isAuthorized()) {
        res.redirect('/oauth/url')
    }
    try {
        const accessToken = await oauth.getToken();
        res.json(accessToken);
    } catch (err) {
        next(err);
    }
});

// Recupera el codigo que llega desde autodesk. Para luego almacenar el token en la session y devolver al usuario a la pagina inicial.
router.get('/callback/oauth', async (req, res, next) => {
    const { code } = req.query;
    const oauth = new OAuth(req.session);
    try {
        await oauth.setCode(code);
        res.redirect('/');
    } catch (err) {
        next(err);
    }
});

// Redirige hacia la pagina de autodesk donde meter usuario y contraseña
router.get('/oauth/url', (req, res) => {
    const url =
        'https://developer.api.autodesk.com' +
        '/authentication/v1/authorize?response_type=code' +
        '&client_id=' + config.credentials.client_id +
        '&redirect_uri=' + config.credentials.callback_url +
        '&scope=' + config.scopes.internal.join(' ');
    res.end(url);
});

//Permite salir de tu cuenta y eliminar la session para que no se rediriga automaticamente a tu cuenta.
router.get('/oauth/signout', (req, res) => {
    req.session = null;
    res.redirect('/');
});

module.exports = router;
