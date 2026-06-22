document.querySelector('.btn-login-ingresar').addEventListener('click', function(event){
event.preventDefault();
 
const email = document.getElementById('email').value.trim();
const password = document.getElementById('password').value.trim();
 
 
if(email === "" || password ===""){
 
    Swal.fire({
        icon:"warning",
        title: "Campos Vacios",
        text: "Por favor complete los campos",
        confirmButtonColor:'#DD403A'
    }) ;
    return;
 
}
 
if(email === 'admin@maskot.com' && password === '12345'){
    Swal.fire({
        icon:'success',
        title:'Inicio Exitoso',
        text: 'Bienvenido Administrador',
        confirmButtonColor: '#DD403A'
    }).then(() =>{
        window.location.href='Administrador/dashboard.html';
    });
 
 
}else{
      Swal.fire({
        icon:"error",
        title: "Credenciales incorrectas",
        text: "Correo o contraseña invalidos",
        confirmButtonColor:'#DD403A'
      });
 
    }
 
});