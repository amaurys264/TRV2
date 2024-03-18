var contenedor2=document.getElementById('contenedor2');
var icon_close=document.getElementById('icon_close');
var c_detalle=document.getElementById('c_detalle');
var contenido=document.querySelector('.contenido');
//-------------detalle---------------
var nombre=document.querySelector('.c_nombre');
var imagen=document.querySelector('.casa_imagen');
var provincia=document.querySelector('#c_ubi');
var zona=document.querySelector('#c_zona');
var local=document.querySelector('#c_local');
var descripcion=document.querySelector('#c_descripcion');
var horario=document.querySelector('#c_horario');
var costo=document.querySelector('#cl_costo');
var confort=document.querySelector('#c_confort');
var contacto=document.querySelector('#c_contacto');
var slider=document.querySelector('.c_slider');
//-----------filtro-----------------------
var filter_ubicacion=document.querySelector('#Ubicacion-p');
var filter_precio=document.querySelector('#Precio');


var datos;

icon_close.onclick=function()
{
   contenido.style.filter='none'
   c_detalle.style.display="none";   
}
window.onload=function()
{      
   peticion()               
} 


function peticion()
{
   const data={
      method:"POST",
      body:JSON.stringify({ubicacion_p:filter_ubicacion.value,precio:filter_precio.value}),
      headers: {
                     'Content-Type': 'application/json'
               }
   }
   fetch('/api/fiesta/mostrar',data)
   .then((resp)=>{        
    return resp.json();
    })

   .then(data=>{            
      datos=data;
      console.log(data) 
      if (data.fiesta.length>0)
         {
            contenedor2.innerHTML='';
               let imagen_path="";
               data.fiesta.forEach((element,index) => 
                  {     
                     function generar_horario()
                        {
                           if(element.horario_d==false && element.horario_n==false){return 'Horario a convenir.'}
                           if(element.horario_d==false && element.horario_n==true){return 'Disponible en horario nocturno.'}
                           if(element.horario_d==true && element.horario_n==false){return 'Disponible en horario diurno.'}
                           if(element.horario_d==true && element.horario_n==true){return 'Disponible en horario diurnas y nocturnas.'}
                        }
                     
                         slider=``;
                         botonera=``;          
                         if(element.galeria.length>0)
                         {
                                    
                                 element.galeria.forEach((foto,index)=>
                                 {
                                       slider+= index==0?`<img class="casa_imagen" src="data:${foto.buffer.mimetype};base64,${a_base64(foto.buffer.buffer.data)}">`:`<img class="casa_imagen" src="data:${foto.buffer.mimetype};base64,${a_base64(foto.buffer.buffer.data)}">`;                                      
                                 })                                                                
                         }
                         else
                         {
                           slider=`<img class="casa_imagen" src="./img/no_picture.jpg">`;                           
                         }
                       
                        contenedor2.innerHTML+=`
                         <div class="elemento" id='${index}'>
                                <div class='c_slider'>${slider} 
                                </div>
                                <div class='sl_menu'><i class="fa fa-image"></i><span>${element.galeria.length}</span></div> 
                                           
                               <div class="c_info">
                                  <div class=c_info1>
                                       <span><u>${element.nombre}</u></span>
                                       <div>
                                          <span  class="s1">Ubicación:</span>  
                                          <span  class="s2">${element.ubicacion_p}</span>
                                          <span class="s2">,</span>
                                          <span class="s2">${element.ubicacion_z}</span>                
                                       </div>
                                       <div>
                                          <span class="s4">Capacidad para ${element.capacidad} personas 
                                          </span>
                                       </div>
                                       <p><i>${element.nota}</i></p>
                                       <div>                
                                          <span class="s1">${generar_horario()}                                            
                                          </span>
                                       </div>
                                       <div>                
                                          ${(element.decoracion || element.e_audio || element.entretenimiento || element.gastronomia || element.piscina)?'<label class="s5">Confort</label>':''  }    
                                          <ul>
                                          ${element.decoracion==true?'<li>Piscina</li>':''}
                                          ${element.e_audio==true?'<li>Habitaciones</li>':''}
                                          ${element.entretenimiento==true?'<li>Entretenimiento</li>':''}
                                          ${element.gastronomia==true?'<li>Gastronomía</li>':''}                                         
                                          ${element.piscina==true?'<li>Piscina</li>':''} 
                                          </ul>  
                                       </div>
                                  </div>
                                  <div class="c_footer">
                                       <div>
                                             <span>Precio:</span><span class="data_precio">${element.precio}.00</span>
                                             <span class="s3"><span id="c_moneda" class="s3">${element.moneda}</span>/noche</span>
                                       </div>
                                       <hr/>  
                                       <div class="c_contact">
                                             <a href="https://wa.me/5350103060?text=from_Website"><i class="fa fa-whatsapp" style="font-size: 2.8 rem;padding: 0px 10px;"></i><span id="c_numero">Contáctame!</span></a>                                          
                                       </div>   
                                 </div>
                               </div>
                         </div>`                
                  })
          }
          else
          {
             contenedor2.innerHTML=`<h4 style="display: block;text-align: center;margin:auto;">No hay artículos para mostrar</h4>`
          }
         
       })    
          .catch((error)=>
                {
                   console.error('Error:__',error+"__")
                })
}
filter_ubicacion.onchange=function()
{
   peticion();  
   
}
filter_precio.onchange=function()
{
   peticion();  
 
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