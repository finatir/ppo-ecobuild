const API = "http://localhost:3000";

const form = document.getElementById("formCadastro");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const nome = document.getElementById("nome").value;

    const email = document.getElementById("email").value;

    const senha = document.getElementById("senha").value;

    try {

        const resposta = await fetch(`${API}/auth/cadastro`, {

            method: "POST",

            credentials: "include",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                nome,

                email,

                senha

            })

        });

        const dados = await resposta.json();

        if (!resposta.ok) {

            alert(dados.erro);

            return;

        }

        alert("Cadastro realizado com sucesso!");

        window.location.href = "login.html";

    }

    catch (erro) {

        console.log(erro);

    }

});