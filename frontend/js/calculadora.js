// ========================================
// PEGAR ID DO PROJETO
// ========================================

const parametros =
    new URLSearchParams(
        window.location.search
    );


const projetoId =
    parametros.get(
        "projeto_id"
    );


// ========================================
// ELEMENTOS
// ========================================

const nomeUsuario =
    document.getElementById(
        "nomeUsuario"
    );

const projetoInfo =
    document.getElementById(
        "projetoInfo"
    );

const calculadoraForm =
    document.getElementById(
        "calculadoraForm"
    );

const mensagem =
    document.getElementById(
        "mensagem"
    );

const resultados =
    document.getElementById(
        "resultados"
    );

const historico =
    document.getElementById(
        "historico"
    );

const logout =
    document.getElementById(
        "logout"
    );


// ========================================
// VERIFICAR USUÁRIO
// ========================================

async function carregarUsuario() {

    try {

        const resposta =
            await fetch(

                `${API_URL}/auth/me`,

                {

                    credentials:
                        "include"

                }

            );


        if (!resposta.ok) {

            window.location.href =
                "login.html";

            return false;

        }


        const usuario =
            await resposta.json();


        nomeUsuario.textContent =
            usuario.nome;


        return true;


    } catch (erro) {

        console.error(
            erro
        );


        window.location.href =
            "login.html";

        return false;

    }

}


// ========================================
// CARREGAR PROJETO
// ========================================

async function carregarProjeto() {

    if (!projetoId) {

        projetoInfo.innerHTML = `

            <div class="error">

                <p>
                    Nenhum projeto foi selecionado.
                </p>

                <br>

                <a
                    href="projetos.html"
                    class="button"
                >
                    Voltar para projetos
                </a>

            </div>

        `;


        calculadoraForm.style.display =
            "none";


        return;

    }


    try {

        const resposta =
            await fetch(

                `${API_URL}/projetos/${projetoId}`,

                {

                    credentials:
                        "include"

                }

            );


        if (
            resposta.status === 401
        ) {

            window.location.href =
                "login.html";

            return;

        }


        if (!resposta.ok) {

            throw new Error(
                "Projeto não encontrado."
            );

        }


        const projeto =
            await resposta.json();


        if (!projeto) {

            throw new Error(
                "Projeto não encontrado."
            );

        }


        projetoInfo.innerHTML = `

            <div>

                <h3>
                    ${projeto.nome_projeto}
                </h3>

                <p>

                    <strong>
                        Tipo de tijolo:
                    </strong>

                    ${
                        projeto.tipo ||
                        "Não informado"
                    }

                </p>

                <p>

                    <strong>
                        Área cadastrada:
                    </strong>

                    ${
                        projeto.area_parede
                    }
                    m²

                </p>

                <p>

                    <strong>
                        Junta cadastrada:
                    </strong>

                    ${
                        projeto.espessura_junta
                    }
                    cm

                </p>

            </div>

        `;


        // Preenche a área automaticamente
        document
            .getElementById(
                "area_total"
            )
            .value =
                projeto.area_parede;


        // Preenche a junta automaticamente
        document
            .getElementById(
                "espessura_junta"
            )
            .value =
                projeto.espessura_junta;


        // Preenche dimensões conhecidas
        if (
            projeto.tipo ===
            "Tijolo 9 Furos"
        ) {

            document
                .getElementById(
                    "comprimento_tijolo"
                )
                .value =
                    projeto.comprimento ||
                    19;


            document
                .getElementById(
                    "altura_tijolo"
                )
                .value =
                    projeto.altura ||
                    14;

        }


        await carregarHistorico();


    } catch (erro) {

        console.error(
            "Erro ao carregar projeto:",
            erro
        );


        projetoInfo.innerHTML = `

            <div class="error">

                ${erro.message}

            </div>

        `;

    }

}


// ========================================
// REALIZAR CÁLCULO
// ========================================

calculadoraForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        if (!projetoId) {

            mensagem.textContent =
                "Selecione um projeto primeiro.";

            mensagem.className =
                "mensagem erro";

            return;

        }


        const area =
            Number(

                document
                    .getElementById(
                        "area_total"
                    )
                    .value

            );


        const altura =
            Number(

                document
                    .getElementById(
                        "altura_tijolo"
                    )
                    .value

            );


        const comprimento =
            Number(

                document
                    .getElementById(
                        "comprimento_tijolo"
                    )
                    .value

            );


        const junta =
            Number(

                document
                    .getElementById(
                        "espessura_junta"
                    )
                    .value

            );


        if (
            area <= 0 ||
            altura <= 0 ||
            comprimento <= 0
        ) {

            mensagem.textContent =
                "Informe valores válidos.";

            mensagem.className =
                "mensagem erro";

            return;

        }


        // ========================================
        // CÁLCULO DA ÁREA DO TIJOLO
        // ========================================

        const alturaComJunta =
            (
                altura +
                junta
            ) / 100;


        const comprimentoComJunta =
            (
                comprimento +
                junta
            ) / 100;


        const areaTijolo =
            alturaComJunta *
            comprimentoComJunta;


        // ========================================
        // QUANTIDADE DE TIJOLOS
        // ========================================

        const qtdTijolos =
            Math.ceil(

                area /
                areaTijolo

            );


        // ========================================
        // VOLUME DE ARGAMASSA
        // ========================================

        const volumeArgamassa =
            Number(

                (
                    area *
                    0.02
                ).toFixed(3)

            );


        // ========================================
        // MOSTRAR RESULTADO
        // ========================================

        document
            .getElementById(
                "resultadoTijolos"
            )
            .textContent =
                qtdTijolos;


        document
            .getElementById(
                "resultadoArgamassa"
            )
            .textContent =
                volumeArgamassa;


        document
            .getElementById(
                "resultadoArea"
            )
            .textContent =
                area;


        resultados.style.display =
            "grid";


        mensagem.textContent =
            "Cálculo realizado com sucesso!";

        mensagem.className =
            "mensagem sucesso";


        // ========================================
        // SALVAR NO BANCO
        // ========================================

        try {

            const resposta =
                await fetch(

                    `${API_URL}/calculos`,

                    {

                        method:
                            "POST",

                        headers: {

                            "Content-Type":
                                "application/json"

                        },

                        credentials:
                            "include",

                        body:
                            JSON.stringify({

                                projeto_id:
                                    Number(
                                        projetoId
                                    ),

                                qtd_tijolos:
                                    qtdTijolos,

                                volume_argamassa:
                                    volumeArgamassa,

                                area_total:
                                    area

                            })

                    }

                );


            const dados =
                await resposta.json();


            console.log(
                "Cálculo salvo:",
                dados
            );


            if (!resposta.ok) {

                throw new Error(

                    dados.erro ||
                    "Erro ao salvar cálculo."

                );

            }


            await carregarHistorico();


        } catch (erro) {

            console.error(
                "Erro ao salvar cálculo:",
                erro
            );


            mensagem.textContent =
                "Cálculo realizado, mas não foi possível salvar no banco.";

            mensagem.className =
                "mensagem erro";

        }

    }

);


// ========================================
// HISTÓRICO
// ========================================

async function carregarHistorico() {

    try {

        const resposta =
            await fetch(

                `${API_URL}/calculos/historico/${projetoId}`,

                {

                    credentials:
                        "include"

                }

            );


        if (!resposta.ok) {

            throw new Error(
                "Erro ao buscar histórico."
            );

        }


        const calculos =
            await resposta.json();


        if (
            !calculos ||
            calculos.length === 0
        ) {

            historico.innerHTML = `

                <p>
                    Nenhum cálculo realizado.
                </p>

            `;

            return;

        }


        historico.innerHTML = calculos
            .map(

                calculo => `

                    <div
                        class="projeto-card"
                    >

                        <h3>

                            Cálculo realizado

                        </h3>


                        <p>

                            <strong>
                                Tijolos:
                            </strong>

                            ${
                                calculo.qtd_tijolos
                            }

                            unidades

                        </p>


                        <p>

                            <strong>
                                Argamassa:
                            </strong>

                            ${
                                calculo.volume_argamassa
                            }

                            m³

                        </p>


                        <p>

                            <strong>
                                Área:
                            </strong>

                            ${
                                calculo.area_total
                            }

                            m²

                        </p>


                        <p>

                            <strong>
                                Data:
                            </strong>

                            ${
                                new Date(
                                    calculo.data_calculo
                                ).toLocaleString(
                                    "pt-BR"
                                )
                            }

                        </p>

                    </div>

                `

            )
            .join("");


    } catch (erro) {

        console.error(
            "Erro no histórico:",
            erro
        );


        historico.innerHTML = `

            <p class="error">

                Não foi possível carregar
                o histórico.

            </p>

        `;

    }

}


// ========================================
// LOGOUT
// ========================================

logout.addEventListener(
    "click",
    async (event) => {

        event.preventDefault();


        try {

            await fetch(

                `${API_URL}/auth/logout`,

                {

                    method:
                        "POST",

                    credentials:
                        "include"

                }

            );


            window.location.href =
                "login.html";


        } catch (erro) {

            console.error(
                erro
            );

        }

    }

);


// ========================================
// INICIAR
// ========================================

async function iniciar() {

    const autenticado =
        await carregarUsuario();


    if (!autenticado) {

        return;

    }


    await carregarProjeto();

}


iniciar();