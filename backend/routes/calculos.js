const express = require("express");

const db = require("../database");

const auth =
require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", auth, (req,res)=>{

  const {
    projeto_id,
    area,
    altura,
    largura,
    comprimento
  } = req.body;

  const areaTijolo =
  (altura/100) *
  (comprimento/100);

  const quantidade =
  Math.ceil(area / areaTijolo);

  const volumeArgamassa =
  area * 0.02;

  const sacosCimento =
  Math.ceil(volumeArgamassa * 7);

  db.run(
    `
    INSERT INTO calculos(
      projeto_id,
      area,
      altura,
      largura,
      comprimento,
      quantidade_tijolos,
      volume_argamassa,
      sacos_cimento
    )
    VALUES(?,?,?,?,?,?,?,?)
    `,
    [
      projeto_id,
      area,
      altura,
      largura,
      comprimento,
      quantidade,
      volumeArgamassa,
      sacosCimento
    ],
    function(err){

      if(err){

        return res
        .status(500)
        .json(err);

      }

      res.json({
        quantidade,
        volumeArgamassa,
        sacosCimento
      });

    }
  );

});

router.get(
"/historico/:projetoId",
auth,
(req,res)=>{

  db.all(
    `
    SELECT *
    FROM calculos
    WHERE projeto_id = ?
    ORDER BY id DESC
    `,
    [req.params.projetoId],
    (err,rows)=>{

      res.json(rows);

    }
  );

});

module.exports = router;