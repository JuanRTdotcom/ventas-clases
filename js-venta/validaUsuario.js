
const aver=name=>{
    return document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + name.replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1") || null;
}   


let cook = aver('user')

if(cook){   
    // const nombre=aver('nombreCompleto')
    // console.log(nombre);

}else{
    window.location="/index.html"
}
