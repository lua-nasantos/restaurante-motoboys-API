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
        const novoMotoboy = new mt(body.nome,body.filial,body.telefone,body.cidade,body.placa)
        const resposta = await novoMotoboyDAO.cadastroMotoboys(novoMotoboy)
        res.status(200).json(resposta)
     } catch (error) {
          res.status(400).json({
            "message": error.message,
            "error": true
          })
     }   
    })
    app.delete('/motoboys/:id', async (req, res) => {
      try {
        const id = req.params.id
        const resposta = await novoMotoboyDAO.deletaMotoboys(id)
        res.status(200).json(resposta)
      } catch (error) {
        res.status(404).json({
  
          "mensagem": error.message,
          "erro": true
        })
      }
    })
    app.patch('/motoboys/:id', async(req, res) => {

      try {
        const id = req.params.id
        const body = req.body
        const respostaGet = await novoMotoboyDAO.retornaMotoboysDesejados(id,body)
        const motoboyAntigo = respostaGet.requisicao[0]
  
  
        if (motoboyAntigo) {
          const motoboyAtualizado = [
      
            body.nome || motoboyAntigo.NOME,
            body.telefone || motoboyAntigo.TELEFONE,
            body.filial ||  motoboyAntigo.FILIAL,
            body.cidade || motoboyAntigo.CIDADE,
            body.placa || motoboyAntigo.PLACA
          ]
          const resposta = await novoMotoboyDAO.atualizaMotoboy(id, motoboyAtualizado)
          res.status(200).json(resposta)
        } else {
          res.json({
            "mensagem": `Motoboy com id "${id} não encontrado`,
            "error": true
          })
        }
      } catch (error) {
        res.json({
          "mensagem": error.message,
          "error": true
        })
      }
    })
    app.get('/Motoboys/:id', async (req, res) => {
      const id = req.params.id
      try {
        const resposta = await novoMotoboyDAO.retornaMotoboysDesejados(id)
        res.status(200).json(resposta)
      } catch (error){
        res.status(400).json({
          "message": error.message,
          "error": true
        })
  
      }
  
    })
}

module.exports = motoboys


