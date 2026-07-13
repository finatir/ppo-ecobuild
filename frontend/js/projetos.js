const API = "http://localhost:3000";

async function carregarProjetos(){

    const resposta = await fetch(`${API}/projetos`,{

        credentials:"include"

    });

    const projetos = await resposta.json();

    const lista = document.getElementById("listaProjetos");

    lista.innerHTML = "";

    projetos.forEach(projeto=>{

        lista.innerHTML += `

            <div class="projeto-card">

                <h2>${projeto.nome_projeto}</h2>

                <p>Tijolo: ${projeto.tipo}</p>

                <p>Área: ${projeto.area_parede} m²</p>

                <button onclick="removerProjeto(${projeto.id})">

                    Excluir

                </button>

            </div>

        `;

    });

}

async function cadastrarProjeto(){

    const nome_projeto =

        document.getElementById("nomeProjeto").value;

    const tijolo_id =

        document.getElementById("tijolo").value;

    const area_parede =

        document.getElementById("area").value;

    const espessura_junta =

        document.getElementById("junta").value;

    const resposta = await fetch(`${API}/projetos`,{

        method:"POST",

        credentials:"include",

        headers:{

            "Content-Type":"application/json"

        },

        body:JSON.stringify({

            nome_projeto,

            tijolo_id,

            area_parede,

            espessura_junta

        })

    });

    if(resposta.ok){

        carregarProjetos();

    }

}

async function removerProjeto(id){

    await fetch(`${API}/projetos/${id}`,{

        method:"DELETE",

        credentials:"include"

    });

    carregarProjetos();

}

carregarProjetos();