import ImgProdMod from "../Modelo/ImgProdModelo.js"

//DAO de produto
export default class ImgProdDB {

    async GETVAL(conexao, idProd) {
        try {
            let sqlCode = "SELECT * FROM imageprod "
            let values =    []
            let conector ="WHERE"
            
            if (idProd!="_"){
                sqlCode+=`${conector} idProd = ?`
                values.push(idProd)
            }
            const [itens] = await conexao.query(sqlCode, values)
            let modelo=[]

            for (let item of itens) {
                const prod = new ImgProdMod(item.id,item.idProd,item.imagem,item.nome)
                modelo.push(prod.ToJSON())
            }

            return ({ status: 200, content: modelo })

        } catch (e) {
            return ({ status: 500, content: e })
        }
    }

    async POST(conexao, nome,idProd,tipo,) {
        try {
            const sqlCode = "INSERT INTO imageprod (id,nome,idProd,imagem) VALUES (NULL,?,?,?)"
            const values = [nome, idProd,tipo]
            await conexao.query(sqlCode, values)

            return ({ status: 200, msg: "produto Inserido" })
        } catch (e) {
            console.log(e)
            return ({ status: 500, msg: "Erro durante a conexão com DataBase" })
        }
    }

    

    async DELETE(conexao, id) {
        try {
            const sqlCode = "DELETE FROM imageprod WHERE id = ?"
            const value = [id]
            await conexao.query(sqlCode, value)

            return ({ status: 200, msg: "Unidade Excluída" })
        } catch (e) {
            console.log(e)
            return ({ status: 500, msg: "Erro durante a conexão com DataBase" })
        }
    }
}