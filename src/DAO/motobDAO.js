class motobDAO{
    constructor (bd){
        this.bd = bd

    }
    cadastroMotoboys(motoboy){
        return new Promise ((resolve,reject)=> {
            this.bd.run('INSERT INTO MOTOBOYS ( NOME, TELEFONE, FILIAL, CIDADE, PLACA ) VALUES (?,?,?,?,?);',
            [motoboy.nome, motoboy.telefone, motoboy.filial, motoboy.cidade, motoboy.placa],
            (error) => {
                if (error) {
                    reject({
                        "mensagem": error.message,
                        "erro": true
                    })
                } else {
                    resolve({
                        "requisicao": motoboy,
                        "erro": false
                    })
                }
            })
        })
    }
    retornaTodosMotoboys(){
        return new Promise((resolve, reject) => {
            this.bd.all('SELECT * FROM MOTOBOYS;', (error, rows) => {

                if (error) {
                    reject({
                        "mensagem": error.message,
                        "error": true
                    })
                } else {
                    resolve({
                        "motoboys": rows,
                        "error": false
                    })
                }
            })
        })
    }
    deletaMotoboys(id) {
        return new Promise((resolve, reject) => {
            const deletar = ("DELETE FROM MOTOBOYS WHERE ID = ?")
            this.bd.run(deletar, id, (erro) => {
                if (erro) {
                    reject({
                        "mensagem": erro.message
                    })
                } else {
                    resolve({
                        "mensagem": (`Motoboy de id ${id} excluído com sucesso!`),
                        "erro": false
                    })
                }
            })
        })
    }
    atualizaMotoboy(id, motoboy) {

        return new Promise((resolve, reject) => {
            const UPDATE = 
               'UPDATE MOTOBOYS SET NOME = ?, TELEFONE = ?, FILIAL = ?, CIDADE = ?, PLACA = ? WHERE ID = ?'
                const array = [...motoboy, id]
            this.bd.run(UPDATE,
                array,
                (error) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve({
                            "mensagem": `Motoboy de id ${id} atualizado com sucesso.`,
                            "motoboy": motoboy,
                            "erro": false
                        })
                    }
                })
        })

    }
    retornaMotoboysDesejados(id) {
        const SELECT_BY_ID = "SELECT * FROM MOTOBOYS WHERE ID = ?"
        return new Promise((resolve, reject) => {
            this.bd.all(SELECT_BY_ID, id, (error, rows) => {
                if (error) {
                    reject({
                        "mensagem": error.message,
                        "erro": true
                    })
                } else {
                    resolve({
                        "requisicao": rows,
                        "erro": false
                    })
                }
            })
        })
    }
}


module.exports = motobDAO