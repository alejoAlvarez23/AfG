//variables que mantiene el estado visible del carrito

var carritoVisible = false;

if(document.readyState =='loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else{
    ready();
}

function ready(){

    //ELIMINAR ITEM DE CARRITO
    var botonesEliminarItem = document.getElementsByClassName('btn_eliminar');
    for(var i=0; i < botonesEliminarItem. length; i++){
        var button = botonesEliminarItem[i];
        button.addEventListener('click', eliminarItemCarrito);
    }

    //BOTON SUMAR
    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for (var i=0; i <botonesSumarCantidad.length; i++){
        var button = botonesSumarCantidad[i];
        button.addEventListener('click', sumarCantidad);
    }

    //BOTON RESTAR
    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for (var i=0; i <botonesRestarCantidad.length; i++){
        var button = botonesRestarCantidad[i];
        button.addEventListener('click', restarCantidad);

    }
    
    //"AGREGAR AL CARRITO"
    var botonesAgregarAlAcarrito = document.getElementsByClassName('boton_item');
    for(var i=0; i<botonesAgregarAlAcarrito.length ; i++){
        var button = botonesAgregarAlAcarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
    }

    //BOTON PAGAR
    document.getElementsByClassName('btn_pagar')[0].addEventListener('click', pagarClicked);

}
//----------------------------^------------------------------------------
//---------------------FUNCION-READY---------------------------------------------------

//eliminar item de carrito
function eliminarItemCarrito(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.parentElement.remove();
    
//actualizar precio
    actualizarTotalCarrito();   

    // controlar si hay elementos en el carrito una vez que se elimino sinp se elimina   
    ocultarCarrito();

}

//acutualiza el total
function actualizarTotalCarrito(){
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0

    //recoremos cada elemento del carrito para actualizar el total
    for ( var i=0; i < carritoItems.length; i++){
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito_item_precio')[0];
        console.log(precioElemento);
    
        var precio = parseFloat(precioElemento.innerText.replace('$','').replace('.',''));
        console.log(precio);
        var cantidadItem = item.getElementsByClassName('carrito_item_cantidad')[0];
        var cantidad = cantidadItem.value;
        console.log(cantidad);
        
        total = total + (precio * cantidad)
    }
    total= Math.round(total*100)/100;
    document.getElementsByClassName('carrito_precio_total')[0].innerText = '$' + total.toLocaleString("es") + ',00';
}

function ocultarCarrito(){
    var carritoItems = document.getElementsByClassName('carrito_items')[0];
    if(carritoItems.childElementCount==0 ){
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;
  
        var items = document.getElementsByClassName('contenedor_items')[0];
        items.style.width = '100%'; 
    }
}

//AUMENTO DE CANTIDAD   
function sumarCantidad (event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito_item_cantidad')[0].value;
    console.log(cantidadActual);
    cantidadActual++;
    selector.getElementsByClassName('carrito_item_cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();

}

//DIMINUCION DE CANTIDAD   
function restarCantidad (event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito_item_cantidad')[0].value;
    console.log(cantidadActual);
    cantidadActual--;
    selector.getElementsByClassName('carrito_item_cantidad')[0].value = cantidadActual;
    if ( cantidadActual >= 1){
        actualizarTotalCarrito();
    }else{
        buttonClicked.parentElement.parentElement.parentElement.parentElement.remove();
        actualizarTotalCarrito();
        ocultarCarrito();
        return;
    
    }
}

function agregarAlCarritoClicked (event){
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo_item')[0].innerText;
    var precio = item.getElementsByClassName('precio_item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img_item')[0].src;
    console.log(imagenSrc);

    //agregar item al carrito
    agregarItemAlCarrito(titulo, precio, imagenSrc);
    //carrito visible
    hacerVisibleCarrito();
    
}

function agregarItemAlCarrito(titulo, precio, imagenSrc){
    var item = document.createElement('div');
    item.classList.add = ('item');
    var itemsCarrito = document.getElementsByClassName('carrito_items')[0];

    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito_item_titulo');
    for ( var i=0; i < nombresItemsCarrito.length; i++){
        if(nombresItemsCarrito[i].innerText==titulo){
            alert("el item ya se encuentra en el carrito");
        }
    }

    var itemCarritoContenido = `
    <div class="carrito-item">
        <img src="${imagenSrc}" alt="" width="80px">
        <div class="carrito_item_detalles">
            <span class="carrito_item_titulo">${titulo}</span>
            <div class="selector_cantidad">
                <img src="./imagenes/minus.svg" class="fa-solid fa-minus restar-cantidad">
                <input type="text" value="1" class="carrito_item_cantidad" disabled>
                <img src="./imagenes/plus.svg" class="fa-solid fa-plus sumar-cantidad">
             </div>
             <span class="carrito_item_precio">${precio}</span>
        </div>
        <span class="btn_eliminar">
            <img src="./imagenes/trash.svg" alt="" class="fa-solid fa-trash">
        </span>
    </div> `

    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    // funcionalidad de eliminar nuevo item
    item.getElementsByClassName('btn_eliminar')[0].addEventListener('click',eliminarItemCarrito);

    //sumar nuevo item
    var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click', sumarCantidad);

    //restar nuevo item
    var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click', restarCantidad);

    actualizarTotalCarrito();


}

function pagarClicked(event){
    alert("Gracias por su compra");    
    var carritoItems = document.getElementsByClassName('carrito_items')[0];
    while ( carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild)
    }
    actualizarTotalCarrito();
    
    ocultarCarrito();
}

function hacerVisibleCarrito (){
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    var items = document.getElementsByClassName('contenedor_items')[0];
    items.style.width = '100%'
}


//XD