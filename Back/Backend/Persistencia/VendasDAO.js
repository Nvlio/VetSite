import VendaseMod from "../Modelo/VendasModelo.js"
import ProdutoDB from "./ProdutoDAO.js"

//DAO de Unidades
export default class VendasDB {
    async GET(conexao) {
        try {
            const sqlCode = "SELECT venda.data,id,venda.valor,venda.formaPagamento,usuario.Nome AS nome FROM venda INNER JOIN usuario ON usuario.CPF = venda.usuario"
            const [itens] = await conexao.query(sqlCode)
            const lista = []

            for (let item of itens) {
                let modelo = new VendaseMod(item.data, item.valor, item.formaPagamento, item.parcelas, item.usuario, item.prods, item.id, item.qntdTotal)
                lista.push(modelo.ToJSON(item.nome))
            }

            return ({ status: 200, content: lista })
        } catch (e) {
            return ({ status: 500, msg: e })
        }
    }

    async GETRecente(conexao) {
        try {
            const sqlCode = "SELECT * FROM venda ORDER BY id DESC LIMIT 1"
            const [itens] = await conexao.query(sqlCode)
            const lista = []

            for (let item of itens) {
                let prodID = item.id
                lista.push(prodID)
            }

            return lista
        } catch (e) {
            return ({ status: 500, msg: e })
        }
    }

    async GETVAL(conexao, nome) {
        try {
            let sqlCode = "SELECT venda.data,venda.valor,venda.formaPagamento,usuario.Nome as nome FROM venda INNER JOIN usuario ON usuario.CPF = venda.usuario "
            const values = [];
            let conector = "WHERE "
            if (nome != "_") {
                sqlCode += `${conector}usuario.Nome LIKE ? `
                values.push(`%${nome}%`)
            }
            const [itens] = await conexao.query(sqlCode, values)
            let modelo = []

            for (let item of itens) {
                const unidade = new VendaseMod(item.data, item.valor, item.formaPagamento, item.parcelas, item.usuario, item.prods, item.id, item.qntdTotal)
                modelo.push(unidade.ToJSON(item.nome))
            }

            return ({ status: 200, content: modelo })

        } catch (e) {
            return ({ status: 500, msg: e })
        }
    }

    async GETVALSpecific(conexao, id) {
        try {
            let sqlCode = "SELECT venda.id AS ID,produtos.nome AS Nome,produtos.Valor AS Valor,produtovenda.quantidade AS Qntd  FROM produtovenda INNER JOIN venda ON produtovenda.id_compra=venda.id INNER JOIN produtos ON produtovenda.id_produtos = produtos.id WHERE venda.id = ?"
            const values = [id];
            const [itens] = await conexao.query(sqlCode, values)
            let modelo = []
            for (let item of itens) {
                const unidade = new VendaseMod(null,null,null,null,null,null,item.ID,null)
                modelo.push(unidade.ToJSON(null,item.Nome,item.Valor,item.Qntd))
            }

            return ({ status: 200, content: modelo })

        } catch (e) {
            return ({ status: 500, msg: e })
        }
    }

    async POSTvendaProd(conexao, produtos) {
        const venda = await this.GETRecente(conexao)
        console.log(produtos)
        const sqlCode = "INSERT INTO produtovenda (id,id_produtos,id_compra,quantidade) VALUES (null,?,?,?)"
        for (let produto of produtos) {
            const values = [produto[0], venda[0], produto[1]]
            const prod = new ProdutoDB()
            const resposta = await prod.PUT(conexao, "", "", "", produto.totaldisp, "", produto.idProd, "")
            if (resposta.status === 200) {
                await conexao.query(sqlCode, values)
            }

        }
    }

    async POST(conexao, cpf, valor, data, formPagar, parcelas, qntdTotal) {
        try {
            const sqlCode = "INSERT INTO venda (id,usuario,valor,data,formaPagamento,parcelas,qntdTotal) VALUES (NULL,?,?,?,?,?,?)"
            const values = [cpf, valor, data, formPagar, parcelas, qntdTotal]
            await conexao.query(sqlCode, values)

            return ({ status: 200, msg: "venda completa Inserida" })
        } catch (e) {
            console.log(e)
            return ({ status: 500, msg: "Erro durante a conexão com DataBase" })
        }
    }

}