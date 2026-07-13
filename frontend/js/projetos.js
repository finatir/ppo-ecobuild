const token =
localStorage.getItem(
"token"
);

async function salvarProjeto(){

 const nome =
 document.getElementById(
 "nome"
 ).value;

 const descricao =
 document.getElementById(
 "descricao"
 ).value;

 await fetch(
 "http://localhost:3000/projetos",
 {
   method:"POST",
   headers:{
     "Content-Type":
     "application/json",

     Authorization:
     `Bearer ${token}`
   },

   body:JSON.stringify({
      nome,
      descricao
   })
 }
 );

 carregarProjetos();

}

async function carregarProjetos(){

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

 const lista =
 document.getElementById(
 "listaProjetos"
 );

 lista.innerHTML = "";

 projetos.forEach(p=>{

   lista.innerHTML += `
   <div class="projeto-card">

      <h2>${p.nome}</h2>

      <p>${p.descricao}</p>

      <br>

      <button
      onclick="abrirProjeto(${p.id})">
      Abrir Projeto
      </button>

   </div>
   `;

 }
);
function abrirProjeto(id){

 localStorage.setItem(
   "projetoAtual",
   id
 );

 window.location.href =
 "calculadora.html";

}
}