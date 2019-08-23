


// Se exporta http dentro de la arquitectura, this is not needed actually (I think)
//const http = require('http');



// Se exporta la conexión de nodejs (trash currently)
// const connect = require('connect');
// const connect1 = connect();

// Establecemos un puerto en el que el servidor se va a levantar
const port = 80;
// Se exporta serveStatic que crea un servidor estático
const serveStatic = require('serve-static');

// se exporta nodemon, cuya tarea es recargar cambios automaticos del backend
const nodemon = require('nodemon'),
    express = require('express'), 
    app = express(),
    path = require('path');


// Se establece la conexión y el puerto en el que la aplicación va a correr
//app.use(serveStatic(__dirname));

app.get('/', (req, res) => {
  //This method will send the file, but the other files like CSS and JS will fail because the directory is in public
  //Actually this now works because of express static method next
  res.sendFile(path.join(__dirname,  '/public/index.html'));
  console.log("GET received: " + req.ip+ " ---> " + req.hostname +req.url);
  //res.redirect(301, 'http://127.0.0.1/public/index.html');
});

app.use(express.static('public'));

app.use((req, res, next) => {
    console.log("GET received: " + req.ip+ " ---> " + req.hostname +req.url);
    //console.log(req.rawHeaders);
    res.sendFile(path.join(__dirname,  '/public/404.html'));
});

//0.0.0.0 not making a difference yet
app.listen(port, "0.0.0.0");
console.log('El servidor front-end esta levantado dentro del puerto ' + port);













/*Back end******/
nodemon({
  script: 'api/index.js',
  ext: 'js'
});

