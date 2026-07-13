const token =
localStorage.getItem("token");

async function carregarDashboard(){

 const response =
 await fetch(
 "http://localhost:3000/projetos",
 {
   headers:{
     Authorization:
     `Bearer ${token}`
   }
 }
 );

 const projetos =
 await response.json();

 document.getElementById(
 "totalProjetos"
 ).innerText =
 projetos.length;

}

carregarDashboard();