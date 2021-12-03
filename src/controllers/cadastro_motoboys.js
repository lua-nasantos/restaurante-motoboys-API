const { post } = require("../app")
const mt = require("../models/Motoboys")
const motobDAO = require("../DAO/motobDAO")
const motoboys = (app,bd) => {
    const novoMotoboyDAO = new motobDAO (bd) 
    app.get('/motoboys', async (req, res) =>{
       try {const resposta = await novoMotoboyDAO.retornaTodosMotoboys()
         res.status(200).json(resposta) 
       } catch (error) {
          console.log (error)
         res.status(400).json({
            "message": error.message,
            "error": true
          }) 
           
       } })
    app.post('/motoboys', async(req,res) =>{
     try {const body = req.body
        const novoMotoboy = new mt(body.nome,body.filial,body.telefone,body.cidade,body.placa_da_moto)
        const resposta = await novoMotoboyDAO.cadastroMotoboys(novoMotoboy)
        res.status(200).json(resposta)
     } catch (error) {
          res.status(400).json({
            "message": error.message,
            "error": true
          })
     }   
    })
}

module.exports = motoboys


