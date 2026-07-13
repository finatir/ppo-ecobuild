const express = require("express");

const db = require("../database");

const auth =
require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", auth, (req,res)=>{

  const { nome, descricao } =
  req.body;

  db.run(
    `
    INSERT INTO projetos(
      usuario_id,
      nome,
      descricao
    )
    VALUES(?,?,?)
    `,
    [
      req.usuario.id,
      nome,
      descricao
    ],
    function(err){

      if(err){

        return res
        .status(500)
        .json(err);

      }

      res.json({
        id:this.lastID
      });

    }
  );

});

router.get("/", auth, (req,res)=>{

  db.all(
    `
    SELECT *
    FROM projetos
    WHERE usuario_id = ?
    `,
    [req.usuario.id],
    (err,rows)=>{

      res.json(rows);

    }
  );

});

router.delete("/:id", auth, (req,res)=>{

  db.run(
    `
    DELETE FROM projetos
    WHERE id = ?
    `,
    [req.params.id],
    ()=>{

      res.json({
        mensagem:
        "Projeto removido"
      });

    }
  );

});

module.exports = router;