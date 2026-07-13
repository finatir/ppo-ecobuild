const token =
localStorage.getItem("token");

const projetoAtual =
localStorage.getItem(
"projetoAtual"
);

async function carregarHistorico(){

 const response =
 await fetch(
 `http://localhost:3000/calculos/historico/${projetoAtual}`,
 {
   headers:{
     Authorization:
     `Bearer ${token}`
   }
 }
 );

 const historico =
 await response.json();

 let html = `
 <tr>
 <th>Data</th>
 <th>Tijolos</th>
 <th>Argamassa</th>
 <th>Cimento</th>
 </tr>
 `;

 historico.forEach(c=>{

   html += `
   <tr>

   <td>
   ${c.data_calculo}
   </td>

   <td>
   ${c.quantidade_tijolos}
   </td>

   <td>
   ${c.volume_argamassa}
   </td>

   <td>
   ${c.sacos_cimento}
   </td>

   </tr>
   `;

 });

 document.getElementById(
 "tabelaHistorico"
 ).innerHTML = html;

}

carregarHistorico();