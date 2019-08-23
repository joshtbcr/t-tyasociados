'use strict';
const mensajeModel = require('./mensajes.model');
let nodemailer = require('nodemailer');
// Para el captcha
const request = require('request'); 

module.exports.registrar = function(req, res) {
    let nuevoMensaje = new mensajeModel({
        fecha : new Date().toLocaleString(),
        nombre : req.body.nombre,
        correo  : req.body.correo,
        mensaje : req.body.mensaje,
    });
    

    //Inicia codigo de correo
    const htmlCorreo = `
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
    
    // <img src="http://192.168.0.24/public/imgs/imgCorreo.jpg" style="display: block; float: right;margin-top: -30px;" width="200" height="200">
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'andromedacenfotec@gmail.com',
          pass: 'Pass123.'
        }
    });
    let mailOptions = {
        from: '"Equipo T-T y Asociados" <jtorresb@ucenfotec.ac.cr>',
        to: req.body.correo,
        subject: 'Gracias por contactarnos.',
        html: htmlCorreo
    };
    //Finaliza codigo de correo




    nuevoMensaje.save(
        function(error){
            if(error == true){
                res.json(
                    {
                        success : false, 
                        msg: 'No se pudo registrar el mensaje, ocurrió el siguiente error ' + error
                    }
                );
            }else{
                //Inicia codigo de correo
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log('No se pudo enviar correo por el siguiente error: ' + error);
                    } else {
                      //Mensaje a mostrar en cmder
                      console.log('Correo enviado al nuevo cliente registrado: ' + req.body.correo);
                    }
                });
                //Finaliza codigo de correo
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
