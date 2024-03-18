var contenedor2=document.getElementById('contenedor2');
var icon_close=document.getElementById('icon_close');
var c_detalle=document.getElementById('c_detalle');
var contenido=document.querySelector('.contenido');
//-------------detalle---------------
var nombre=document.querySelector('.c_nombre');
var imagen=document.querySelector('.casa_imagen');
var descripcion=document.querySelector('#c_descripcion');
var embrague=document.querySelector('#c_embrague');
var autonomia=document.querySelector('#c_autonomia');
var capacidad=document.querySelector('#c_capacidad');
var slider=document.querySelector('.c_slider');
//-----------filtro-----------------------
var filter_autonomia=document.querySelector('#Precio');


var datos;

icon_close.onclick=function()
{
   contenido.style.filter='none'
   c_detalle.style.display="none";   
}
window.onload=function(){        
   peticion();  
                         
}

function peticion()
{
   const data={
      method:"POST",
      body:JSON.stringify({autonomia:filter_autonomia.value}),
      headers: {
                     'Content-Type': 'application/json'
               }
   }
fetch('/api/transporte/mostrar',data)
     .then((resp)=>{        
      return resp.json();
      })

     .then(data=>{             
        console.log(data);
        datos=data;
        if (data.transporte.length>0)
           {
            contenedor2.innerHTML='';
            let imagen_path="";
            data.transporte.forEach((element,index) => 
               {     
                                    
                      slider=``;                               
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
                       /*-----------------------------------------------------------------------------------------*/
                      contenedor2.innerHTML+=`
                      <div class="elemento" id='${index}'>
                             <div class='c_slider'>${slider} 
                             </div>
                             <div class='sl_menu'><i class="fa fa-image"></i><span>${element.galeria.length}</span></div> 
                                        
                            <div class="c_info">
                               <div class=c_info1>
                                    <span><u>${element.nombre}</u></span>
                                    <div > 
                                          <label class="s1">Modelo</label>               
                                          <span class="s1">${element.modelo}                                            
                                          </span>
                                    </div>
                                    <div>
                                       <span class="s4">Capacidad para ${element.capacidad} personas 
                                       </span>
                                    </div>
                                    <p><i>${element.nota}</i></p>
                                   
                                    <div>                
                                       <label class="s5">Tipo de embrague</label>
                                       <ul>
                                       ${element.embrage}                                       
                                       </ul>  
                                    </div>
                               </div>
                               <div class="c_footer">
                                    <div>
                                          <span>Autonomía:</span><span class="data_precio">${element.autonomia}.00</span>
                                          <span class="s3"><span id="c_moneda" class="s3"></span>km</span>
                                    </div>
                                    <hr/>  
                                    <div class="c_contact">
                                          <a href="https://wa.me/5350103060"><i class="fa fa-whatsapp" style="font-size: 2.8 rem;padding: 0px 10px;"></i><span id="c_numero">Contáctame!</span></a>                                          
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
                     console.error('Error:__',error+"__");
                  })
}
filter_autonomia.onchange=function()
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