const API = "http://localhost:3000";

const form = document.getElementById("formLogin");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value;

    const senha = document.getElementById("senha").value;

    try {

        const resposta = await fetch(`${API}/auth/login`, {

            method: "POST",

            credentials: "include",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                email,

                senha

            })

        });

        const dados = await resposta.json();

        if (!resposta.ok) {

            alert(dados.erro);

            return;

        }

        window.location.href = "dashboard.html";

    }

    catch (erro) {

        console.log(erro);

        alert("Erro ao conectar ao servidor.");

    }

});