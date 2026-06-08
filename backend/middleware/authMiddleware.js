const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      erro: "Token não informado"
    });
  }

  const token = authHeader.split(" ")[1];

  try {

    const decoded = jwt.verify(
      token,
      "SEGREDO_ECOBUILD"
    );

    req.usuario = decoded;

    next();

  } catch {

    return res.status(401).json({
      erro: "Token inválido"
    });

  }
};