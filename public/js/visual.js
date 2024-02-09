var galeria=document.querySelectorAll('img');
var botonera=document.getElementById('botonera');
/*botonera.addEventListener('input',(e)=>
    {
        console.log(e.target.id);   
        console.log(galeria);
        galeria.forEach((element,index) => {
            if(index==e.target.id)
                {
                    element.className="img1";
                }
                else
                {
                    element.className="img2";
                }
        });
    }
)*/
botonera.addEventListener('input',(e)=>
    {
        let galeria=document.querySelectorAll('.c_slider > img');
    
        
        galeria.forEach((element,index) => {
            if(index==e.target.id)
                {
                    element.className="casa_imagen";
                }
                else
                {
                    element.className="casa_imagen2";
                }
        });
    }
)