const token =
localStorage.getItem("token");

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

    const select =
    document.getElementById(
        "projeto"
    );

    select.innerHTML = "";

    projetos.forEach(p=>{

        select.innerHTML += `
        <option value="${p.id}">
            ${p.nome}
        </option>
        `;

    });

}

carregarProjetos();
    const projetoAtual =
    localStorage.getItem(
    "projetoAtual"
    );

if(projetoAtual){

 document.getElementById(
 "projeto"
 ).value =
 projetoAtual;

}

function alterarModelo(){

    const modelo =
    document.getElementById(
        "modelo"
    ).value;

    const div =
    document.getElementById(
        "custom"
    );

    if(modelo === "custom"){

        div.innerHTML = `

        <label>Altura (cm)</label>

        <input
            id="altura"
            type="number"
        >

        <label>Largura (cm)</label>

        <input
            id="largura"
            type="number"
        >

        <label>Comprimento (cm)</label>

        <input
            id="comprimento"
            type="number"
        >
        `;

    }else{

        div.innerHTML = "";

    }

}

async function calcular(){

    const area =
    Number(
        document.getElementById(
            "area"
        ).value
    );

    const projeto_id =
    document.getElementById(
        "projeto"
    ).value;

    let altura;
    let largura;
    let comprimento;

    const modelo =
    document.getElementById(
        "modelo"
    ).value;

    if(modelo === "9x14x19"){

        altura = 14;
        largura = 9;
        comprimento = 19;

    }
    else if(modelo === "14x19x29"){

        altura = 19;
        largura = 14;
        comprimento = 29;

    }
    else{

        altura =
        Number(
            document.getElementById(
                "altura"
            ).value
        );

        largura =
        Number(
            document.getElementById(
                "largura"
            ).value
        );

        comprimento =
        Number(
            document.getElementById(
                "comprimento"
            ).value
        );

    }

    const response =
    await fetch(
        "http://localhost:3000/calculos",
        {
            method:"POST",

            headers:{
                "Content-Type":
                "application/json",

                Authorization:
                `Bearer ${token}`
            },

            body:JSON.stringify({

                projeto_id,
                area,
                altura,
                largura,
                comprimento

            })

        }
    );

    const dados =
    await response.json();

    document.getElementById(
"resultado"
).innerHTML = `

<div class="resultado-card">

<h3>Tijolos</h3>

<div class="valor">
${dados.quantidade}
</div>

</div>

<div class="resultado-card">

<h3>Argamassa</h3>

<div class="valor">
${dados.volumeArgamassa.toFixed(2)} m³
</div>

</div>

<div class="resultado-card">

<h3>Cimento</h3>

<div class="valor">
${dados.sacosCimento}
</div>

</div>

`;}