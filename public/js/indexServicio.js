'use strict';

function registrarMensaje(pnombre, pcorreo, pmensaje, pcaptcha){
    
    let respuesta = '';
    let peticion = $.ajax({
        url: URLApi + '/api/registrar_mensaje',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false,
        data:{
            nombre : pnombre,
            correo : pcorreo,
            mensaje : pmensaje, 
            captcha : pcaptcha
        }
    });
    peticion.done(response =>{
        respuesta = response;
    });
    
    peticion.fail(response => {
        respuesta = response;
    });

    console.log('respuesta:', respuesta);

    return respuesta; 
};


