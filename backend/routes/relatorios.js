const express = require("express");
const PDFDocument = require("pdfkit");

const router =
express.Router();

router.get(
"/pdf",
(req,res)=>{

 const doc =
 new PDFDocument();

 res.setHeader(
 "Content-Type",
 "application/pdf"
 );

 doc.pipe(res);

 doc.fontSize(20);

 doc.text(
 "Relatório EcoBuild"
 );

 doc.moveDown();

 doc.text(
 "Projeto de Construção"
 );

 doc.end();

});

module.exports =
router;