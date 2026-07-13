const express = require("express");
const bcrypt = require("bcryptjs");

const db = require("../database");

const router = express.Router();

router.post("/cadastro", async (req,res)=>{

    const {nome,email,senha}=req.body;

    const hash=await bcrypt.hash(senha,10);

    db.run(

        `INSERT INTO usuarios(nome,email,senha)
        VALUES(?,?,?)`,

        [nome,email,hash],

        function(err){

            if(err){

                return res.status(400).json({

                    erro:"Email já cadastrado"

                });

            }

            res.json({

                mensagem:"Usuário criado"

            });

        }

    );

});

router.post("/login",(req,res)=>{

    const {email,senha}=req.body;

    db.get(

        `SELECT * FROM usuarios
        WHERE email=?`,

        [email],

        async(err,usuario)=>{

            if(!usuario){

                return res.status(404).json({

                    erro:"Usuário não encontrado"

                });

            }

            const valida=

            await bcrypt.compare(

                senha,

                usuario.senha

            );

            if(!valida){

                return res.status(401).json({

                    erro:"Senha inválida"

                });

            }

            req.session.usuario={

                id:usuario.id,

                nome:usuario.nome,

                email:usuario.email

            };

            res.json({

                mensagem:"Login realizado",

                usuario:req.session.usuario

            });

        }

    );

});

router.get("/me",(req,res)=>{

    if(!req.session.usuario){

        return res.status(401).json({

            erro:"Não autenticado"

        });

    }

    res.json(req.session.usuario);

});

router.post("/logout",(req,res)=>{

    req.session.destroy(()=>{

        res.json({

            mensagem:"Logout realizado"

        });

    });

});

module.exports=router;