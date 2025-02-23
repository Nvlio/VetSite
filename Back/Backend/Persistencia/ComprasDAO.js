import CompraMod from "../Modelo/CompraModelo.js"
import ProdutoDB from "./ProdutoDAO.js"

//DAO de Unidades
export default class ComprasDB {
    async GET(conexao) {
        try {
            const sqlCode = "SELECT compras.id AS id,funcionario.Nome AS nome,produtos.nome AS nomeProd,compras.valor,data,compras.quantidade FROM compras INNER JOIN funcionario ON funcionario.CPF=compras.cpf INNER JOIN produtos ON produtos.id = compras.produtoId"
            const [itens] = await conexao.query(sqlCode)
            const lista = []

            for (let item of itens) {
                let modelo = new CompraMod(item.data,item.valor,item.quantidade,null,null,item.id,100)
                lista.push(modelo.ToJSON(item.nome,item.nomeProd))
            }

            return ({ status: 200, content: lista })
        } catch (e) {
            return ({ status: 500, msg: e })
        }
    }

    async GETVAL(conexao, nome,produto) {
        try {
            let sqlCode = "SELECT compras.id AS id,funcionario.Nome AS nome,produtos.nome AS nomeProd,compras.valor,data,compras.quantidade FROM compras INNER JOIN funcionario ON funcionario.CPF=compras.cpf  INNER JOIN produtos ON produtos.id = compras.produtoId "
            const values = [];
            let conector = "WHERE "
            if (nome != "_") {
                sqlCode += `${conector}funcionario.Nome LIKE ? `
                values.push(`%${nome}%`)
                conector = "AND "
            }
            if (produto != "_") {
                sqlCode += `${conector}produtos.nome LIKE ? `
                values.push(`%${produto}%`  )
            }
            const [itens] = await conexao.query(sqlCode, values)
            let modelo = []

            for (let item of itens) {
                const unidade = new CompraMod(item.data,item.valor,item.quantidade,item.cpf,item.produtoId,item.id,100)
                modelo.push(unidade.ToJSON(item.nome,item.nomeProd))
            }

            return ({ status: 200, content: modelo })

        } catch (e) {
            console.log(e.message)
            return ({ status: 500, msg: e })
        }
    }

    async POST(conexao, cpf, valor, data, qntd, prodId, qntdTotal) {
        try {
            const sqlCode = "INSERT INTO compras (id,cpf,valor,data,quantidade,produtoId) VALUES (NULL,?,?,?,?,?)"
            const values = [cpf, valor, data, qntd, prodId]
            //fazer uma trigger
            const DBprod = new ProdutoDB()
            await DBprod.PUT(conexao,"","","",qntd,"",prodId,"")
            await conexao.query(sqlCode, values)
            return ({ status: 200, msg: "compra completa Inserida" })
        } catch (e) {
            console.log(e)
            return ({ status: 500, msg: "Erro durante a conexão com DataBase" })
        }
    }

}