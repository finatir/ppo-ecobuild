const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database/ecobuild.db", (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco:", err.message);
  } else {
    console.log("Banco SQLite conectado.");

    db.serialize(() => {

      db.run(`
        CREATE TABLE IF NOT EXISTS usuarios (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nome TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          senha TEXT NOT NULL
        )
      `);

      db.run(`
        CREATE TABLE IF NOT EXISTS projetos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          usuario_id INTEGER NOT NULL,
          nome TEXT NOT NULL,
          descricao TEXT,
          FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
        )
      `);

      db.run(`
        CREATE TABLE IF NOT EXISTS calculos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          projeto_id INTEGER,
          area REAL,
          altura REAL,
          largura REAL,
          comprimento REAL,
          quantidade_tijolos INTEGER,
          volume_argamassa REAL,
          sacos_cimento INTEGER,
          data_calculo DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY(projeto_id) REFERENCES projetos(id)
        )
      `);

      console.log("Tabelas verificadas/criadas.");
    });
  }
});

module.exports = db;