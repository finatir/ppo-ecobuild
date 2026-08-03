const express = require("express");
const bcrypt = require("bcryptjs");

const db =
    require("../database");

const router =
    express.Router();


// ==========================================
// CADASTRO
// ==========================================

router.post(
    "/cadastro",
    async (req, res) => {

        const {
            nome,
            email,
            senha
        } = req.body;


        if (
            !nome ||
            !email ||
            !senha
        ) {

            return res
                .status(400)
                .json({

                    erro:
                        "Preencha todos os campos."

                });

        }


        try {

            const hash =
                await bcrypt.hash(
                    senha,
                    10
                );


            db.run(
                `
                INSERT INTO usuarios
                (
                    nome,
                    email,
                    senha
                )
                VALUES
                (
                    ?,
                    ?,
                    ?
                )
                `,
                [
                    nome,
                    email,
                    hash
                ],
                function (err) {

                    if (err) {

                        console.error(
                            "Erro ao cadastrar:",
                            err.message
                        );


                        return res
                            .status(400)
                            .json({

                                erro:
                                    "E-mail já cadastrado."

                            });

                    }


                    console.log(
                        "Usuário criado com ID:",
                        this.lastID
                    );


                    res
                        .status(201)
                        .json({

                            mensagem:
                                "Usuário criado com sucesso.",

                            id:
                                this.lastID

                        });

                }
            );


        } catch (err) {

            console.error(err);


            res
                .status(500)
                .json({

                    erro:
                        "Erro interno do servidor."

                });

        }

    }
);


// ==========================================
// LOGIN
// ==========================================

router.post(
    "/login",
    (req, res) => {

        const {
            email,
            senha
        } = req.body;


        db.get(
            `
            SELECT *
            FROM usuarios
            WHERE email = ?
            `,
            [
                email
            ],
            async (
                err,
                usuario
            ) => {

                if (err) {

                    return res
                        .status(500)
                        .json({

                            erro:
                                err.message

                        });

                }


                if (!usuario) {

                    return res
                        .status(404)
                        .json({

                            erro:
                                "Usuário não encontrado."

                        });

                }


                const senhaValida =
                    await bcrypt.compare(
                        senha,
                        usuario.senha
                    );


                if (!senhaValida) {

                    return res
                        .status(401)
                        .json({

                            erro:
                                "Senha inválida."

                        });

                }


                req.session.usuario = {

                    id:
                        usuario.id,

                    nome:
                        usuario.nome,

                    email:
                        usuario.email

                };


                console.log(
                    "Login realizado:",
                    req.session.usuario
                );


                res.json({

                    mensagem:
                        "Login realizado com sucesso.",

                    usuario:
                        req.session.usuario

                });

            }
        );

    }
);


// ==========================================
// USUÁRIO LOGADO
// ==========================================

router.get(
    "/me",
    (req, res) => {

        if (
            !req.session ||
            !req.session.usuario
        ) {

            return res
                .status(401)
                .json({

                    erro:
                        "Não autenticado."

                });

        }


        res.json(
            req.session.usuario
        );

    }
);


// ==========================================
// LOGOUT
// ==========================================

router.post(
    "/logout",
    (req, res) => {

        req.session.destroy(
            (err) => {

                if (err) {

                    return res
                        .status(500)
                        .json({

                            erro:
                                "Erro ao sair."

                        });

                }


                res.json({

                    mensagem:
                        "Logout realizado."

                });

            }
        );

    }
);


module.exports =
    router;