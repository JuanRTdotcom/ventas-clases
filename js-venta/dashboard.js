
firebase.initializeApp({
    apiKey: "AIzaSyC0cgSXHhbT6jJhIDGlBxaWgWkXprS9tAk",
    authDomain: "clases-venta.firebaseapp.com",
    projectId: "clases-venta",
});
var db = firebase.firestore();



let miUsuario = aver("nombreCompleto");
document.getElementById("miNombreUsuario").innerHTML = miUsuario;
let miImagen = aver("imagen");
document.getElementById("_miImagenSesion").setAttribute("src", miImagen);

// cerrar sesion
document.getElementById("_closeSession").addEventListener("click", () => {
  document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  // document.cookie="user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
  document.cookie =
    "nombreCompleto=; expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
  window.location = "/index.html";
});
const _addProducto = `
<div class="alert alert-success" data-autohide="true" role="alert"
style="display:none;position:fixed;top:20px;right:20px;z-index:9;float:right;width:250px"
id="_productoCreadoAlerta">
<i class="fa fa-check" aria-hidden="true"></i> Producto Creado!
</div>

<div class="col-12">
<div class="d-sm-flex align-items-center justify-content-between
  mb-4">
  <h1 class="h3 mb-0 text-gray-800">Productos</h1>
  <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary
    shadow-sm"><i class="fas fa-download fa-sm text-white-50"></i>
    Generate Report</a>
</div>
</div>
<div class="row">
<div class="col-xl-4 col-lg-4">
  <div class="card shadow mb-4">
    <!-- Card Header - Dropdown -->
    <div class="card-header py-3 d-flex flex-row align-items-center
      justify-content-between">
      <h6 class="m-0 font-weight-bold text-primary"><i class="fas fa-fw
          fa-plus-circle"></i> Agregar Producto </h6>

    </div>
    <!-- Card Body -->
    <div class="card-body">
      <div class="row">
        <div class="col-12 col-sm-12">
          <div class="form-group">
            <label for="_codigo">Cod.</label>
            <input type="text" class="form-control" id="_codigo"
              required placeholder="#" disabled>

          </div>
        </div>
        <div class="col-12 col-sm-12">
          <div class="form-group">
            <label for="">Producto</label>
            <input type="text" class="form-control" id="_nombreProducto"
              onkeyup="__validaCampo('nombreProducto')" required
              placeholder="Aquí el nombre de tu producto">
            <span style="color:red;font-size:12px;display:none"
              id="_errorNombre">No puedes exceder los 50 caract.</span>
          </div>
        </div>
        <div class="col-12 col-sm-12">
          <div class="form-group">
            <label for="">Precio</label>
            <input type="number" class="form-control" id="_precio"
              onkeyup="__validaCampo('precio')" required
              placeholder="$">
            <span style="color:red;font-size:12px;display:none"
              id="_errorPrecio">No puedes exceder los 10 000 $.</span>
          </div>
        </div>
        <div class="col-12 col-sm-12">
          <div class="form-group">
            <label for="">Stock</label>
            <input type="number" class="form-control" id="_stock"
              onkeyup="__validaCampo('cantidad')" required
              placeholder="Cant.">
            <span style="color:red;font-size:12px;display:none"
              id="_errorCantidad">No puedes exceder las 1 000 und.</span>
          </div>
        </div>
        <div class="col-12 col-sm-12">
          <div class="form-group">
            <label for="_categoria">Categoría</label>
            <select class="form-control" id="_categoria">
              <option selected disabled>Seleccionar Cat.</option>
              <option>Alcohol</option>
              <option>Jabón</option>
              <option>Papel</option>
              <option>Limpieza</option>
              <option>Abarrotes</option>
            </select>
          </div>
        </div>
        <div class="col-12">
          <div class="form-group mt-2">



            <button id="_miBotonGuardarProductos" class="btn btn-primary
              col-12 d-flex justify-content-center align-items-center"
              onclick="_guardarProducto()" style="height:38px"
              type="button">
              <span class="spinner-grow spinner-grow-sm" role="status"
                style="display:none" id="_miLoaderGuardarProducto"
                aria-hidden="true"></span>
              <e id="_btnGuardaProductos">Guardar</e>
            </button>
          </div>
        </div>


      </div>



    </div>
  </div>
</div>
<div class="col-xl-8 col-lg-8">
  <div class="card shadow mb-4">
    <!-- Card Header - Dropdown -->
    <div class="card-header py-3 d-flex flex-row align-items-center
      justify-content-between">
      <h6 class="m-0 font-weight-bold text-primary"><i class="fas fa-fw
          fa-plus-circle"></i> Lista de productos </h6>

    </div>
    <!-- Card Body -->
    <div class="card-body">
      <div class="row">
          <div class="col-12">
          <table class="table">
          <thead>
             <tr>
               <th>#</th>
               <th>NombreProducto</th>
               <th>Categoría</th>
               <th>Stock</th>
               <th>Precio</th>
             </tr>
          </thead>
          <tbody id="_miCuerpoTabla">
            
          </tbody>
        </table>
          </div>

      </div>



    </div>
  </div>
</div>
</div>


            `;

// <button type="button"  class="btn btn-primary col-12" ><span class="spinner-border spinner-border-sm" id="miLoader" style="display: none;margin: auto;" role="status" aria-hidden="true"></span> <e id="miIngreso"> Ingresar</e></button>

document.getElementById("_nuevoProducto").addEventListener("click", () => {
    let _autoincreent = 0
    db.collection('producto').orderBy('codigo').onSnapshot((querySnapshot)=>{
        _autoincreent = querySnapshot.size + 1

        document.getElementById("_contenidoCambiante").innerHTML = "";
        document.getElementById("_contenidoCambiante").innerHTML = _addProducto;
        document.getElementById('_codigo').value = _autoincreent
        let _tablaBody = document.getElementById('_miCuerpoTabla')
        _tablaBody.innerHTML = ``
        let _incrcement = 1
        querySnapshot.forEach(x=>{
          __llenarTablaTiempoReal(x.data(),_tablaBody,_incrcement)
          _incrcement++
        })
       
    });

  
});

const __llenarTablaTiempoReal = (_data,tabla,_incrementar) => {
  

    let _tr = document.createElement('tr')
      let _td = document.createElement('td')
      _td.textContent = _incrementar
      let _td2 = document.createElement('td')
      _td2.textContent = _data.nombre
      let _td3 = document.createElement('td')
      _td3.textContent = _data.categoria
      let _td4 = document.createElement('td')
      _td4.textContent = _data.stock
      let _td5 = document.createElement('td')
      _td5.textContent = _data.precioVenta

      _tr.appendChild(_td)
      _tr.appendChild(_td2)
      _tr.appendChild(_td3)
      _tr.appendChild(_td4)
      _tr.appendChild(_td5)
  
      tabla.appendChild(_tr)

      
      
}

let _limpiarCampos = () =>{

}


let _guardarProducto = ()=>{
  const codigo = document.getElementById('_codigo').value
  const nombreProducto = document.getElementById('_nombreProducto').value
  const precio = document.getElementById('_precio').value
  const stock = document.getElementById('_stock').value
  const categoria = document.getElementById('_categoria').value

if(codigo == '' || nombreProducto == '' || precio == '' || stock == '' || categoria == 'Seleccionar Cat.' || precio<0 || stock<0){
   if(codigo==''){ 
    document.getElementById('_codigo').setAttribute('class','form-control border-danger')
    

    setTimeout(()=>{
      document.getElementById('_codigo').setAttribute('class','form-control')}
    ,2000) 
    }
    
    
   if(nombreProducto==''){ 
    document.getElementById('_nombreProducto').setAttribute('class','form-control border-danger baile')
    setTimeout(()=>{
      document.getElementById('_nombreProducto').setAttribute('class','form-control')}
    ,2000) 
    }
    
    
   if(precio=='' || precio<0){ 
    document.getElementById('_precio').setAttribute('class','form-control border-danger')
    setTimeout(()=>{
      document.getElementById('_precio').setAttribute('class','form-control')}
    ,2000)
   } 
    
    
    
   if(stock=='' || stock<0){ 
    document.getElementById('_stock').setAttribute('class','form-control border-danger')
    setTimeout(()=>{
      document.getElementById('_stock').setAttribute('class','form-control')}
    ,2000) 
   }
    
    
   if(categoria=='Seleccionar Cat.' || categoria==''){ 
    document.getElementById('_categoria').setAttribute('class','form-control border-danger')
    setTimeout(()=>{
      document.getElementById('_categoria').setAttribute('class','form-control')}
    ,2000) 
   }
    
   
    
   
}else{
  document.getElementById('_btnGuardaProductos').style.display = 'none'
document.getElementById('_miLoaderGuardarProducto').style.display = 'block'



  db.collection("producto").doc(codigo).set({
      codigo: Number(codigo),
      nombre: nombreProducto,
      precioVenta: parseFloat(precio),
      stock: Number(stock),
      categoria:categoria
  }).then(()=>{
    // db.collection("producto").get().then(function(querySnapshot) {
      // let _autoincreent = querySnapshot.size + 1
      // document.getElementById('_codigo').value = _autoincreent
      document.getElementById('_nombreProducto').value = ''
      document.getElementById('_precio').value = ''
      document.getElementById('_stock').value = ''
      document.getElementById('_categoria').value = 'Seleccionar Cat.'
      document.getElementById('_miLoaderGuardarProducto').style.display = 'none'
      document.getElementById('_btnGuardaProductos').style.display = 'block'
      document.getElementById('_productoCreadoAlerta').style.display = 'block'
      setTimeout(()=>{document.getElementById('_productoCreadoAlerta').style.display = 'none'},2000) 
      // setTimeout(()=>{$('#_productoCreadoAlerta').tab('show')},2500)
    // });



      
  })
}


  }

 
  //  document.getElementById('_productoCreadoAlerta').style.display = 'none'

const __validaCampo = _nombre =>{

  switch(_nombre){
    
    case 'nombreProducto':
      let _miProducto = document.getElementById('_nombreProducto')
      let _miError = document.getElementById('_errorNombre')
      if(_miProducto.value.length > 50){
        _miError.style.display='block'
        _miProducto.setAttribute('class','form-control border-danger')

        // _miProducto.value=_miProducto.value.substr(0,5)
      } else{
        _miError.style.display='none'
        _miProducto.setAttribute('class','form-control')
      } 
    break;
    case 'precio':
      let _miPrecio = document.getElementById('_precio')
      let _miErrorP = document.getElementById('_errorPrecio')
      
      if(_miPrecio.value > 10000 || _miPrecio.value <0){
        _miErrorP.style.display='block'
        _miPrecio.setAttribute('class','form-control border-danger')
      } else{
        _miErrorP.style.display='none'
        _miPrecio.setAttribute('class','form-control')
      } 
      break;
    case 'cantidad':
      let _miStock = document.getElementById('_stock')
      let _miErrorS = document.getElementById('_errorCantidad')
      if(_miStock.value > 1000 || _miStock.value < 0){
        _miErrorS.style.display='block'
        _miStock.setAttribute('class','form-control border-danger')
      } else{
        _miErrorS.style.display='none'
        _miStock.setAttribute('class','form-control')
      } 
      break;
  }
}



