const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../database");

const router = express.Router();

router.post("/cadastro", async (req, res) => {

  const { nome, email, senha } = req.body;

  const senhaHash = await bcrypt.hash(
    senha,
    10
  );

  db.run(
    `
    INSERT INTO usuarios(
      nome,
      email,
      senha
    )
    VALUES(?,?,?)
    `,
    [nome, email, senhaHash],
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

  const { email, senha } = req.body;

  db.get(
    `
    SELECT *
    FROM usuarios
    WHERE email = ?
    `,
    [email],
    async (err, usuario)=>{

      if(!usuario){

        return res.status(404).json({
          erro:"Usuário não encontrado"
        });

      }

      const senhaValida =
      await bcrypt.compare(
        senha,
        usuario.senha
      );

      if(!senhaValida){

        return res.status(401).json({
          erro:"Senha inválida"
        });

      }

      const token = jwt.sign(
        {
          id:usuario.id,
          email:usuario.email
        },
        "SEGREDO_ECOBUILD",
        {
          expiresIn:"1d"
        }
      );

      res.json({ token });

    }
  );

});

module.exports = router;