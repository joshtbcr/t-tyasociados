'use strict';
//Datos de section de cliente
let inputNombre = document.querySelector('#txtNombre');
let inputCorreo = document.querySelector('#txtCorreo');
let inputMensaje = document.querySelector('#txtMensaje');
let divCaptcha = document.querySelector('#captcha');
let fecha = new Date().toLocaleString();

let botonEnviarMensaje = document.querySelector('#btnEnviarMensaje');

botonEnviarMensaje.addEventListener('click', obtenerDatosMensaje);


function obtenerDatosMensaje(){
    let error = false;
    let nombre = inputNombre.value;
    let correo = inputCorreo.value;
    let mensaje = inputMensaje.value;
    let captcha = document.querySelector('#g-recaptcha-response').value;
    
    error = validarMensaje(nombre, correo, mensaje, captcha);

    if(error == true){
        swal.fire({
            title: 'Datos incompletos',
            text: 'No se pudo enviar el mensaje, revise los campos en rojo.',
            type: 'warning',
            confirmButtonText: 'Entendido'
          });
    }else{
        console.log("Iniciando backend");
        let respuesta = registrarMensaje (nombre, correo, mensaje, captcha);
        console.log("Terminando al backend");
        if(respuesta.success == true){
            swal.fire({
                title: respuesta.msg,
                //text: respuesta.msg,
                type: 'success'//,showConfirmButton: false
            });
            setTimeout(() => {
                location.href = URL +"/public/index.html"
            }, 3000);
        }else{
            swal.fire({
                title: 'No se pudo enviar el mensaje. Por favor intentar de nuevo.',
                text: respuesta.msg,
                type: 'error',
                confirmButtonText: 'Entendido'
            });
        }
    }
};


function validarMensaje(pnombre, pcorreo, pmensaje, pcaptcha){
    let error = false; 
    let expLetras = /^[a-z A-ZáéíóúñÑÁÉÍÓÚüÜ]+$/;
    let expCorreo = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    console.log("validando");

    if (pnombre == ''){
        error = true;
        console.log("validando nombre");
        inputNombre.classList.add('errorInput');
    }else {
        inputNombre.classList.remove('errorInput');
    }
    if (pcorreo == '' || expCorreo.test(pcorreo) == false){
        error = true;
        console.log("validando");
        inputCorreo.classList.add('errorInput');
    }else {
        inputCorreo.classList.remove('errorInput');
    }

    if (pmensaje == ''){
        error = true;
        console.log("validando mensaje");
        inputMensaje.classList.add('errorInput');
    }else {
        inputMensaje.classList.remove('errorInput');
    }

    if( pcaptcha === undefined || pcaptcha === '' || pcaptcha === null){
        error = true;
        divCaptcha.classList.add('errorInputCaptcha');
    }else{
        divCaptcha.classList.remove('errorInputCaptcha');
    }

    return error;
};
