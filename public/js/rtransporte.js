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
   var time= setTimeout(()=>{cargar()},(4000))      
   peticion();  
                         
}
let cargar=function()
{
   var elementos=document.querySelectorAll('.elemento')   
   elementos.forEach((tarjeta)=>
         {
            tarjeta.onclick=function()
            {
               console.log("evento..")
               nombre.innerHTML=datos.transporte[tarjeta.id].nombre;
               botonera.innerHTML=``;                             
               slider.innerHTML=``;
               if(datos.transporte[tarjeta.id].galeria[0])
                  {                     
                     datos.transporte[tarjeta.id].galeria.forEach((foto,index)=>
                     {
                        slider.innerHTML+= index==0?`<img class="casa_imagen" src="data:${foto.buffer.mimetype};base64,${a_base64(foto.buffer.buffer.data)}">`:`<img class="casa_imagen2" src="data:${foto.buffer.mimetype};base64,${a_base64(foto.buffer.buffer.data)}">`;
                        botonera.innerHTML+=index==0?`<input type="radio" id="${index}" name="cambio" class="c_imagedata" checked>`:`<input type="radio" id="${index}" name="cambio" class="c_imagedata">`;
                        //`
                     }  
                   )     
                  }
                  else
                  {
                     //imagen.src='./img/no_picture.jpg'
                     
                     slider.innerHTML=`<img class="casa_imagen" src="./img/no_picture.jpg">`;
                     botonera.innerHTML=`<input type="radio" id="0" name="cambio" class="c_imagedata" checked>`
                  }   
               embrague.innerHTML= datos.transporte[tarjeta.id].embrage;  
               capacidad.innerHTML=datos.transporte[tarjeta.id].capacidad;
               descripcion.innerHTML=datos.transporte[tarjeta.id].nota;              
               autonomia.innerHTML= datos.transporte[tarjeta.id].autonomia;           
               contenido.style.filter='blur(3px)';
               c_detalle.style.display="block";
            }
         }
   )  

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
        //console.log(data);
        datos=data;
        if (data.transporte.length>0)
           {
               let imagen_path="";
               contenedor2.innerHTML="";
               data.transporte.forEach((element,index) => 
                  {         
                     if(element.galeria[0])
                     {
                        imagen_path=`data:${element.galeria[0].buffer.mimetype};base64,${a_base64(element.galeria[0].buffer.buffer.data)}`
                     }
                     else
                     {
                        imagen_path='./img/no_picture.jpg';
                     }
                     contenedor2.innerHTML+=`
                     <div class="elemento" id='${index}'>
                        <img src="${imagen_path}"> 
                           <div class="c_info">
                              <div class=c_info1>
                                 <span><u>${element.nombre}</u></span>
                                 <p><i>${element.nota}</i></p>
                              </div>
                              <div>
                                    <span>Autonomía(Km):</span><span class="data_precio">${element.autonomia}</span>
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
    console.log(base64);
    let t=btoa(base64);
    console.log("Nuevo: "+t)   
    return t;
}