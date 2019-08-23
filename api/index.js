'use strict';

/**
 * Exportamos todas las dependencias necesarias para establecer la conexión
 */
const express = require('express'),
      app = express(),
      path = require('path'),
      bodyParser = require('body-parser'),
      morgan =  require('morgan'),
      mongoose = require('mongoose'),
      router = express.Router();
      
mongoose.set('useCreateIndex', true);

//No funca
router.get('/', function (req, res) {
  res.send('Wiki home page');
})
/**
 * Se definen las variables necesarias para la conexión con MongoDB
 */
let db = mongoose.connection,
    dburl = 'mongodb://jtorresb:Cenfo1.josh@ds113866.mlab.com:13866/t-tyasociados',
    port = 4000;


/**
 * Se le indica que cree un servidor extra dentro del puerto 4000 y escuche los cambios que se le hagan a esos archivos
 */
function _server(){
  console.log('Conexión api establecida en el puerto ' + port);
};
let server = app.listen(port,_server());

/**
 * Se define la conexión con Mongoose, enviándole como parámetro la url de la base de datos
 */
mongoose.connect(dburl, {useNewUrlParser: true });

/**
 * Si la conexión falla, imprime en consola el error
 */
db.on('error', console.error.bind(console, 'Error de conexión: '));

/**
 * Si la conexión es exitosa nos imprime en la consola que se ha establecido conexión con Mongo
 */
db.once('open', () => {
  console.log('Base de datos conectada correctamente');
});


var myLogger = (req, res, next) => {
    
    console.log();
    console.log('This logs only with posts(no so true)');
    next()
}
app.use(myLogger)



/**This is not useful any more
 * Le indicamos a express que envíe las respuestas a la carpeta "public"
*/ 

/* app.use(express.static(
  path.join(
    __dirname,
    'public'
    )
  )
); */

/**
 * Le indicamos a la aplicación que el formato de los datos va a ser JSON
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));




//Veo que solo sirve con posts
app.use( (req, res, next) => {
  console.log('LOGGED con mas cosas');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


/**
 * Exportamos todas las rutas dentro del index.js
 */
const mensajes = require('./components/mensajes/mensajes.route');

/**
 * Le indicamos que le de acceso externo a las rutas inicializadas
 */
app.use('/api', mensajes);


/**
 * Error 404
 */
app.use((req, res, next) => {
  res.status(404).send("Recurso no encontrado.");
})


console.error('This only runs when starting the server!');


// Se guarda todo lo que se ha realizado

//module.exports = router;
//module.exports = app;

