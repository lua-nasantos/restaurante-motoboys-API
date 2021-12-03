const sqlite3 = require('sqlite3').verbose()
const path = require('path')
const caminhoArq = path.resolve(__dirname, 'database.db')

const db = new sqlite3.Database(caminhoArq)

const MOTOBOYS_SCHEMA = 
`CREATE TABLE IF NOT EXISTS "MOTOBOYS"(
    "ID" INTEGER PRIMARY KEY AUTOINCREMENT, 
    
    "NOME" varchar(64),
    "TELEFONE" INTEGER,
    "FILIAL" varchar(64),
    "CIDADE" varchar(64),
    "PLACA" varchar(64))`
    ;



function criaTableMotoboys() {
    db.run(MOTOBOYS_SCHEMA, (error) => {
        if (error) console.log("Erro ao criar tabela de motoboys");
    });
}

db.serialize( ()=> {
    criaTableMotoboys();
})