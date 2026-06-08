CREATE TABLE IF NOT EXISTS usuarios(
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 nome TEXT NOT NULL,
 email TEXT UNIQUE NOT NULL,
 senha TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS projetos(
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 usuario_id INTEGER NOT NULL,
 nome TEXT NOT NULL,
 descricao TEXT,

 FOREIGN KEY(usuario_id)
 REFERENCES usuarios(id)
);

CREATE TABLE IF NOT EXISTS calculos(
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

 FOREIGN KEY(projeto_id)
 REFERENCES projetos(id)
); 