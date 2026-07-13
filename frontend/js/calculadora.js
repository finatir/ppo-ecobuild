const API = "http://localhost:3000";

async function calcular(){

    const projeto_id =

        document.getElementById("projeto").value;

    const modelo_id =

        document.getElementById("modelo").value;

    const resposta = await fetch(`${API}/calculos`,{

        method:"POST",

        credentials:"include",

        headers:{

            "Content-Type":"application/json"

        },

        body:JSON.stringify({

            projeto_id,

            modelo_id

        })

    });

    const resultado = await resposta.json();

    document.getElementById("tijolos").innerHTML =

        resultado.qtd_tijolos;

    document.getElementById("argamassa").innerHTML =

        resultado.volume_argamassa;

}