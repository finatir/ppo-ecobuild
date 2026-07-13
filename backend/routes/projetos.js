const express = require("express");

const db = require("../database");

const auth = require("../middleware/auth");

const router = express.Router();

/* CADASTRAR PROJETO */

router.post("/", auth, (req, res) => {

    const {

        nome_projeto,

        tijolo_id,

        area_parede,

        espessura_junta

    } = req.body;

    db.run(

        `
        INSERT INTO projetos(

            usuario_id,
            tijolo_id,
            nome_projeto,
            area_parede,
            espessura_junta

        )

        VALUES(?,?,?,?,?)
        `,

        [

            req.session.usuario.id,
            tijolo_id,
            nome_projeto,
            area_parede,
            espessura_junta

        ],

        function(err){

            if(err){

                return res.status(500).json({

                    erro:err.message

                });

            }

            res.json({

                mensagem:"Projeto criado",

                id:this.lastID

            });

        }

    );

});

/* LISTAR PROJETOS */

router.get("/", auth, (req,res)=>{

    db.all(

        `
        SELECT

            projetos.*,
            tijolos.tipo

        FROM projetos

        INNER JOIN tijolos

        ON projetos.tijolo_id=tijolos.id

        WHERE usuario_id=?

        ORDER BY data_criacao DESC
        `,

        [

            req.session.usuario.id

        ],

        (err,rows)=>{

            if(err){

                return res.status(500).json({

                    erro:err.message

                });

            }

            res.json(rows);

        }

    );

});

/* BUSCAR PROJETO */

router.get("/:id", auth, (req,res)=>{

    db.get(

        `
        SELECT *

        FROM projetos

        WHERE id=? AND usuario_id=?
        `,

        [

            req.params.id,
            req.session.usuario.id

        ],

        (err,row)=>{

            if(err){

                return res.status(500).json({

                    erro:err.message

                });

            }

            res.json(row);

        }

    );

});

/* ATUALIZAR */

router.put("/:id", auth, (req,res)=>{

    const {

        nome_projeto,
        tijolo_id,
        area_parede,
        espessura_junta

    } = req.body;

    db.run(

        `
        UPDATE projetos

        SET

            nome_projeto=?,
            tijolo_id=?,
            area_parede=?,
            espessura_junta=?

        WHERE id=?
        `,

        [

            nome_projeto,
            tijolo_id,
            area_parede,
            espessura_junta,
            req.params.id

        ],

        function(err){

            if(err){

                return res.status(500).json({

                    erro:err.message

                });

            }

            res.json({

                mensagem:"Projeto atualizado"

            });

        }

    );

});

/* EXCLUIR */

router.delete("/:id", auth, (req,res)=>{

    db.run(

        `
        DELETE FROM projetos

        WHERE id=?
        `,

        [

            req.params.id

        ],

        function(err){

            if(err){

                return res.status(500).json({

                    erro:err.message

                });

            }

            res.json({

                mensagem:"Projeto removido"

            });

        }

    );

});

module.exports = router;