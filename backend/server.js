const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const projetosRoutes = require("./routes/projetos");
const calculosRoutes = require("./routes/calculos");
const relatoriosRoutes = require("./routes/relatorios");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/projetos", projetosRoutes);
app.use("/calculos", calculosRoutes);
app.use("/relatorios",relatoriosRoutes);

app.get("/", (req, res) => {
  res.json({
    sistema: "EcoBuild API",
    status: "online"
  });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
}); 