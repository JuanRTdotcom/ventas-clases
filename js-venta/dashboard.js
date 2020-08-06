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
            <div class="col-12">
                <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800">Productos</h1>
                <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i class="fas fa-download fa-sm text-white-50"></i> Generate Report</a>
                </div>
            </div>
            <div class="col-xl-6 col-lg-6">
              <div class="card shadow mb-4">
                <!-- Card Header - Dropdown -->
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary"><i class="fas fa-fw fa-plus-circle"></i> Agregar Producto </h6>
                  
                </div>
                <!-- Card Body -->
                <div class="card-body">
                  

                </div>
              </div>
            </div>
            `;

document.getElementById("_nuevoProducto").addEventListener("click", () => {
  document.getElementById("_contenidoCambiante").innerHTML = "";
  document.getElementById("_contenidoCambiante").innerHTML = _addProducto;
});
