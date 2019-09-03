'use strict';
const mensajeModel = require('./mensajes.model');
let nodemailer = require('nodemailer');
// Para el captcha
const request = require('request'); 

module.exports.registrar = (req, res) => {
    let nuevoMensaje = new mensajeModel({
        fecha : new Date().toLocaleString(),
        nombre : req.body.nombre,
        correo  : req.body.correo,
        mensaje : req.body.mensaje,
    });

    const formatoCorreo = `
        <section style="font-family: 'Montserrat', sans-serif; font-size: 16px; color: black; padding: 25px; max-width: 600px;">
            <h2 style=" font-family: 'Montserrat'; color: #729702;
                color:#729702;
                background-color:white;
                font-size: 40px;
                text-align:center;
                top:0;
                padding-top: 1px;
                padding-bottom: 0px;
                border-bottom:#729702;
                box-shadow: 0px 1px;
                border-bottom-style:solid;
                border-bottom-width:2px;
            ">
                Torres-Torres y Asociados
            </h2>
            
            <p style="font-size: 28px; text-align: center;">Hola ${req.body.nombre}, Gracias por contactarnos!</p> 
            <p style="margin-top: 100px;">Su mensaje ha sido recibido y un asesor le contactará de vuelta pronto.</p>
        </section>
    `;
    
    const htmlCorreoConfirmacion = `
        <section style="font-family: 'Montserrat', sans-serif; font-size: 16px; color: black; padding: 25px; max-width: 600px;">
            <h2 style=" font-family: 'Montserrat'; color: #729702;
                color:#729702;
                background-color:white;
                font-size: 40px;
                text-align:center;
                top:0;
                padding-top: 1px;
                padding-bottom: 0px;
                border-bottom:#729702;
                box-shadow: 0px 1px;
                border-bottom-style:solid;
                border-bottom-width:2px;
            ">
                Torres-Torres y Asociados
            </h2>
            
            <p style="font-size: 28px; text-align: center;">Hola ${req.body.nombre}, Gracias por contactarnos!</p> 
            <p style="margin-top: 100px;">Su mensaje ha sido recibido y un asesor le contactará de vuelta pronto.</p>
        </section>
    `;


    const htmlCorreoInterno = `
    <section style="font-family: 'Montserrat', sans-serif; font-size: 16px; color: black; padding: 25px; max-width: 600px;">
        <h2 style=" font-family: 'Montserrat'; color: #729702;
            color:#729702;
            background-color:white;
            font-size: 40px;
            text-align:center;
            top:0;
            padding-top: 1px;
            padding-bottom: 0px;
            border-bottom:#729702;
            box-shadow: 0px 1px;
            border-bottom-style:solid;
            border-bottom-width:2px;
        ">
            Torres-Torres y Asociados
        </h2>
        
        <p style="font-size: 28px; text-align: center;">(Este es un mensaje generado por el sistema) </p> 
        <p style="margin-top: 100px;">Nuevo cliente ${req.body.nombre}, ha dejado un mensaje en la página web:</p>
        <p style="margin-top: 100px;">" ${req.body.mensaje} "</p>
    </section>
`;
    
    // <img src="http://192.168.0.24/public/imgs/imgCorreo.jpg" style="display: block; float: right;margin-top: -30px;" width="200" height="200">

    let correoInterno = 'albertorres63@hotmail.com';

    var transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        secureConnection: false,
        port: 587,
        tls: {
            ciphers: 'SSLv3',
            requireTLS: true  //This means it's secure, even though up there says false
        },
        auth: {
            user: correoInterno,
            pass: 'torrito123'
        }
    });



    let msgCorreoConfirmacion = {
        from: '"Equipo T-T y Asociados" '+ correoInterno,
        to: req.body.correo,
        subject: 'Gracias por contactarnos.',
        html: htmlCorreoConfirmacion
    };
    
    let msgCorreoInterno = {
        from: '"Equipo T-T y Asociados" '+ correoInterno,
        to: correoInterno,
        subject: 'Gracias por contactarnos.',
        html: htmlCorreoInterno
    };
    
    




    nuevoMensaje.save(error => {
            if(error == true){
                res.json({
                        success : false, 
                        msg: 'No se pudo registrar el mensaje, ocurrió el siguiente error ' + error
                    }
                );
            }else{
                transporter.sendMail(msgCorreoConfirmacion, (error, info) => {
                    if (error) {
                      console.log('No se pudo enviar correo por el siguiente error: ' + error);
                    } else {
                      console.log('Correo de confirmacion enviado al nuevo cliente registrado: '+
                       req.body.nombre +',  '+ req.body.correo+'.');
                    }
                });
                transporter.sendMail(msgCorreoInterno, (error, info) => {
                    if (error) {
                      console.log('No se pudo enviar correo interno por el siguiente error: ' + error);
                    } else {
                      console.log('Correo de cliente enviado internamente.: '+
                       req.body.nombre +',  '+ req.body.correo+'.');
                    }
                });
                res.json(
                    {
                        success : true, 
                        msg: 'Mensaje enviado.'
                    }
                ); 
            }
        }
    );
};
/* 
module.exports.listar_mensajes = function(req, res){
    clienteModel.find().sort({nombre: 'asc'}).then(
        function(clientes){
            res.send(clientes);
        }
    );
};
 */
