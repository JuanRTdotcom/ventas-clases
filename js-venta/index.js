

firebase.initializeApp({
    apiKey: "AIzaSyC0cgSXHhbT6jJhIDGlBxaWgWkXprS9tAk",
    authDomain: "clases-venta.firebaseapp.com",
    projectId: "clases-venta",
});
var db = firebase.firestore();
const loader = document.getElementById('miLoader')
const ingre = document.getElementById('miIngreso')

const validarConincidenciaUsuario = () =>{
    
    const misUsuariosArray = []
    let usuario = document.getElementById('idUsuario')
    let contra = document.getElementById('idContra')

    db.collection("usuario").where("usuario", "==", usuario.value.trim()).where("contrasenia","==",contra.value.trim())
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            misUsuariosArray.push(doc.data())
        });
        // const coincidencia = misUsuariosArray.filter(x=>x.usuario == usuario.value.trim() && x.contrasenia == contra.value.trim())
        if(misUsuariosArray.length!=0){
            document.cookie = "user =" + misUsuariosArray[0].usuario
            document.cookie = "nombreCompleto =" + misUsuariosArray[0].nombreCompleto
            document.cookie = "imagen =" + misUsuariosArray[0].imagen
            window.location='dashboard.html'
        }else{
            loader.style.display='none'
            ingre.style.display='block'
            swal('ERROR','Credenciales incorrectas','error')
        }
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });



}

document.getElementById('idForm').addEventListener('submit',(e)=>{
    ingre.style.display='none'
    loader.style.display='block'
    
    e.preventDefault()
    validarConincidenciaUsuario()

})



































































































