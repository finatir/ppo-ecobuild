const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const path = require("path");

const db = new sqlite3.Database(
  "./database/ecobuild.db"
);

const schema = fs.readFileSync(
  path.join(
    __dirname,
    "database",
    "schema.sql"
  ),
  "utf8"
);

db.exec(schema, (err) => {

  if (err) {

    console.error(
      "Erro ao criar banco:",
      err.message
    );

  } else {

    console.log(
      "Banco inicializado."
    );

  }

});

module.exports = db;