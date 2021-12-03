const express = require ('express')

const app = express()
const bd = require('./infra/sqlite-db')
const motoboys = require ("./controllers/cadastro_motoboys")
app.use(express.json())
app.use((req, res, next) => {
    console.log("Luana");

    next()
})
motoboys(app,bd)
app.listen(3000, () => console.log('servidor rodando na porta 3000'))

module.exports = app
