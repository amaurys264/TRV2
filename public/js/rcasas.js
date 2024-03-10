var contenedor2=document.getElementById('contenedor2');
var icon_close=document.getElementById('icon_close');
var c_detalle=document.getElementById('c_detalle');
var contenido=document.querySelector('.contenido');
//-------------detalle---------------
var nombre=document.querySelector('.c_nombre');
var imagen=document.querySelector('.casa_imagen');
var provincia=document.querySelector('#c_ubi');
var zona=document.querySelector('#c_zona');
var descripcion=document.querySelector('#c_descripcion');
var estado=document.querySelector('#c_estado');
var costo=document.querySelector('#cl_costo');
var moneda=document.querySelector('#cl_moneda');
var confort=document.querySelector('#c_confort');
var confortl=document.querySelector('#cl_confort');
var slider=document.querySelector('.c_slider');
var imagedata=document.querySelector('.c_imagedata');
var c1_imagen=document.querySelector('.c1_imagen');

//-----------filtro-----------------------
var filter_ubicacion=document.querySelector('#Ubicacion-p');
var filter_precio=document.querySelector('#Precio');

var datos;

icon_close.onclick=function()
{
   contenido.style.filter='none'
   c_detalle.style.display="none";   
}
window.onload=function(){   
   peticion();                 
      var mitime=setInterval(cargar,(2000))       
      function peticion()
      {
         const data={
            method:"POST",
            body:JSON.stringify({ubicacion_p:filter_ubicacion.value,precio:filter_precio.value}),
            headers: {
                           'Content-Type': 'application/json'
                     }
         }
         fetch('/api/casas/mostrar',data)
         .then((resp)=>{        
          return resp.json();
          })
         .then(data=>{      
            datos=data; 
            console.log(data)     
            if (data.casas.length>0)
               {
                   let imagen_path="";
                   contenedor2.innerHTML="";
                   let slider;
                   let botonera;
                   data.casas.forEach((element,index) => 
                      {  
                         slider=``;
                         botonera=``;          
                         if(element.galeria.length>0)
                         {
                                    
                                 element.galeria.forEach((foto,index)=>
                                 {
                                       slider+= index==0?`<img class="casa_imagen" src="data:${foto.buffer.mimetype};base64,${a_base64(foto.buffer.buffer.data)}">`:`<img class="casa_imagen2" src="data:${foto.buffer.mimetype};base64,${a_base64(foto.buffer.buffer.data)}">`;
                                       botonera+=index==0?`<input type="radio" id="${index}" name="cambio" class="c_imagedata" checked>`:`<input type="radio" id="${index}" name="cambio" class="c_imagedata">`;                              
                                 })                                                                
                         }
                         else
                         {
                           slider=`<img class="casa_imagen" src="./img/no_picture.jpg">`;
                           botonera=`<input type="radio" id="0" name="cambio" class="c_imagedata" checked>`
                         }
                          /*-----------------------------------------------------------------------------------------*/
                         contenedor2.innerHTML+=`
                         <div class="elemento" id='${index}'>
                                <div class='c_slider'>${slider} 
                                </div>
                                <div class='sl_menu' id="botonera">${botonera}</div> 
                                           
                               <div class="c_info">
                                  <div class=c_info1>
                                       <span><u>${element.nombre}</u></span>
                                       <div>
                                          <span  class="s1">Ubicación:</span>  
                                          <span  class="s2">${element.ubicacion_p}</span>
                                          <span class="s2">,</span>
                                          <span class="s2">${element.ubicacion_z}</span>                
                                       </div>
                                       <p><i>${element.descripcion}</i></p>
                                       <div>                
                                          ${(element.piscina || element.cocina)?'<label class="s5">Confort</label>':''  }    
                                          <ul>
                                          ${element.piscina==true?'<li>Piscina</li>':''}${element.cocina==true?'<li>Cocina</li>':''}
                                          </ul>  
                                       </div>
                                  </div>
                                  <div class="c_footer">
                                       <div>
                                             <span>Precio:</span><span class="data_precio">${element.precio_ta}.00</span>
                                             <span class="s3"><span id="c_moneda" class="s3">${element.moneda}</span>/noche</span>
                                       </div>
                                       <hr/>  
                                       <div class="c_contact">
                                             <a href="https://wa.me/5350103060"><i class="fa fa-whatsapp" style="font-size: 2.8 rem;padding: 0px 10px;"></i><span id="c_numero">Contáctame!</span></a>                                          
                                       </div>   
                                 </div>
                               </div>
                         </div>`        
                      })
                     /*---------------------------------------------------------------------------------------*/        
                }
                else
                {
                   contenedor2.innerHTML=`<h4 style="display: block;text-align: center;margin:auto;">No hay artículos para mostrar</h4>`
                }
               console.log(datos)
             })    
                .catch((error)=>
                      {
                         console.error('Error:__',error+"__")
                      })
      }                   
}


let cargar=function()
{
   var elementos=document.querySelectorAll('.elemento')
  
   elementos.forEach((tarjeta)=>
         {
            tarjeta.onclick=function()
            {
               
               nombre.innerHTML=datos.casas[tarjeta.id].nombre;
               botonera.innerHTML=``;                             
               slider.innerHTML=``;
               if(datos.casas[tarjeta.id].galeria.length>0)               
                  {
                     datos.casas[tarjeta.id].galeria.forEach((foto,index)=>
                        {
                           slider.innerHTML+= index==0?`<img class="casa_imagen" src="data:${foto.buffer.mimetype};base64,${a_base64(foto.buffer.buffer.data)}">`:`<img class="casa_imagen2" src="data:${foto.buffer.mimetype};base64,${a_base64(foto.buffer.buffer.data)}">`;
                           botonera.innerHTML+=index==0?`<input type="radio" id="${index}" name="cambio" class="c_imagedata" checked>`:`<input type="radio" id="${index}" name="cambio" class="c_imagedata">`;
                           
                        }  
                     )                     
                  }
                  else
                  {
                     slider.innerHTML=`<img class="casa_imagen" src="./img/no_picture.jpg">`;
                     botonera.innerHTML=`<input type="radio" id="0" name="cambio" class="c_imagedata" checked>`
                  }               
               
               provincia.innerHTML=datos.casas[tarjeta.id].ubicacion_p;
               zona.innerHTML=datos.casas[tarjeta.id].ubicacion_z;
               descripcion.innerHTML=datos.casas[tarjeta.id].descripcion;
               estado.innerHTML=datos.casas[tarjeta.id].estado;   
               costo.innerHTML='$'+datos.casas[tarjeta.id].precio_ta;
               confortl.style.display=(datos.casas[tarjeta.id].piscina==true||datos.casas[tarjeta.id].cocina==true)?'block':'none'
               confort.innerHTML=`${datos.casas[tarjeta.id].piscina==true?'<li>Piscina</li>':''}${datos.casas[tarjeta.id].cocina==true?'<li>Cocina</li>':''}`   
               contenido.style.filter='blur(3px)';
               c_detalle.style.display="block";
            }
         }
   )  

}
filter_ubicacion.onchange=function()
{
   peticion();   
   setTimeout(cargar,(1000));
}
filter_precio.onchange=function()
{
   peticion();   
   setTimeout(cargar,(1000)); 
}
function a_base64(arrayM)
{
    let numero=4;
    numero.valueOf
    let buffer = new Uint8Array(arrayM)
    let base64="";
    buffer.forEach(elemento=>
        {
            base64= base64+(String.fromCharCode(elemento));
        }
    )    
    let t=btoa(base64);     
    return t;
}