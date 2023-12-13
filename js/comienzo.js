(function(){
    const botonScroll = document.querySelector("#comienzo");
    const seccionDestino = document.querySelector("#presentacion");


        botonScroll.addEventListener('click', ()=>{
            seccionDestino.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });

})();