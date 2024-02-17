var hideshow=document.getElementById('hideshow');
var navegacion=document.getElementById('navegacion');
navegacion.className="navegacion_class1";
var vista=1;

var botonera=document.getElementById('#botonera');

hideshow.onclick=function()
{
   
    vista=3-vista;
    if(vista===1)
        {
            navegacion.className="navegacion_class1";
        }
     else
        {
            navegacion.className="navegacion_class2";   
        }  
}


