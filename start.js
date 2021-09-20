const path = require('path');
const express = require('express');
const cookieSession = require('cookie-session');

const PORT = process.env.PORT || 3000;
const config = require('./config');

let app = express();
//Cuando se hace una peticion al servidor, renvia los fichero en public con el html CSS Javascript
app.use(express.static(path.join(__dirname, 'public')));
//Creamos parametro de session con 1 dia de validez
app.use(cookieSession({
    name: 'forge_session',
    keys: ['forge_secure_key'],
    maxAge: 24 * 60 * 60 * 1000 
}));

app.use(express.json({ limit: '50mb' }));
app.use('/', require('./routes/oauth'));

//app.use('/', require('./routes/datamanagement'));
//app.use('/', require('./routes/user'));


//ruta que toma todos los errores en ultima instancia y los devuelve como un json.
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode).json(err);
});
app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`); });
