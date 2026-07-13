const API = "http://localhost:3000";

async function verificarLogin() {

    try {

        const resposta = await fetch(

            `${API}/auth/me`,

            {

                credentials: "include"

            }

        );

        if (!resposta.ok) {

            window.location = "login.html";
            return;

        }

        const usuario = await resposta.json();

        const nomeUsuario =
            document.getElementById("nomeUsuario");

        if (nomeUsuario) {

            nomeUsuario.innerHTML =
                usuario.nome;

        }

    }

    catch (erro) {

        console.error(erro);

        window.location = "login.html";

    }

}

async function carregarProjetos() {

    try {

        const resposta = await fetch(

            `${API}/projetos`,

            {

                credentials: "include"

            }

        );

        if (!resposta.ok) {

            throw new Error("Erro ao carregar projetos.");

        }

        const projetos = await resposta.json();

        const total =
            document.getElementById("totalProjetos");

        if (total) {

            total.innerHTML =
                projetos.length;

        }

        const lista =
            document.getElementById("listaProjetos");

        if (!lista) return;

        lista.innerHTML = "";

        if (projetos.length === 0) {

            lista.innerHTML = `

                <div class="projeto-card">

                    <h3>Nenhum projeto cadastrado.</h3>

                    <p>Cadastre seu primeiro projeto.</p>

                </div>

            `;

            return;

        }

        projetos.forEach(projeto => {

            lista.innerHTML += `

                <div class="projeto-card">

                    <h2>${projeto.nome_projeto}</h2>

                    <p><strong>Tijolo:</strong> ${projeto.tipo}</p>

                    <p><strong>Área:</strong> ${projeto.area_parede} m²</p>

                    <p><strong>Junta:</strong> ${projeto.espessura_junta} cm</p>

                    <p><strong>Data:</strong> ${projeto.data_criacao}</p>

                </div>

            `;

        });

    }

    catch (erro) {

        console.error(erro);

    }

}

async function logout() {

    await fetch(

        `${API}/auth/logout`,

        {

            method: "POST",

            credentials: "include"

        }

    );

    window.location = "login.html";

}

verificarLogin();

carregarProjetos();