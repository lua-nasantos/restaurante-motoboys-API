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
}
module.exports = motobDAO