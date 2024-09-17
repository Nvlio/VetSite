import ProdutoMod from "../Modelo/ProdutoModelo.js"

//DAO de produto
export default class ProdutoDB {
    async GET(conexao) {
        try {
            const sqlCode = "SELECT * FROM produtos"
            const [itens] = await conexao.query(sqlCode)
            const lista = []

            for (let item of itens) {
                let modelo = new ProdutoMod(item.nome, item.valor, item.validade, item.quantidade, item.fornecedor, item.id)
                lista.push(modelo.ToJSON())
            }

            return ({ status: 200, content: lista })
        } catch (e) {
            return ({ status: 500, msg: e })
        }
    }

    async GETVAL(conexao, nome,fornecedor) {
        try {
            let sqlCode = "SELECT * FROM produtos "
            let values =    []
            let conector ="WHERE"
            if (nome!="_"){
                sqlCode+=`${conector} nome LIKE ?`
                conector=" AND"
                values.push(`${nome}%`)
            }
            if (fornecedor!="_"){
                sqlCode+=`${conector} fornecedor LIKE ?`
                values.push(`${fornecedor}%`)
            }
            const [itens] = await conexao.query(sqlCode, values)
            let modelo=[]

            for (let item of itens) {
                const prod = new ProdutoMod(item.nome, item.valor, item.validade, item.quantidade, item.fornecedor, item.id)
                modelo.push(prod.ToJSON())
            }

            return ({ status: 200, content: modelo })

        } catch (e) {
            return ({ status: 500, content: e })
        }
    }

    async POST(conexao, nome, valor, validade, quantidade, fornecedor) {
        try {
            const sqlCode = "INSERT INTO produtos VALUES (NULL,?,?,?,?,?)"
            const values = [nome, valor, validade, quantidade, fornecedor]
            await conexao.query(sqlCode, values)

            return ({ status: 200, msg: "produto Inserido" })
        } catch (e) {
            console.log(e)
            return ({ status: 500, msg: "Erro durante a conexão com DataBase" })
        }
    }

    async PUT(conexao, nome, valor, validade, quantidade, fornecedor, id) {
        try {
            let sqlCode = "UPDATE produtos "
            let conector = "SET "
            let values = []

            if (nome != "") {
                sqlCode += `${conector}nome=?`
                conector = ","
                values.push(nome)
            }
            if (valor != "") {
                sqlCode += `${conector} valor=?`
                conector = ","
                values.push(valor)
            }
            if (validade != "") {
                sqlCode += `${conector} validade=?`
                conector = ","
                values.push(validade)
            }
            if (quantidade != "") {
                sqlCode += `${conector} quantidade=?`
                conector = ","
                values.push(quantidade)
            }
            if (fornecedor != "") {
                sqlCode += `${conector} fornecedor=?`
                values.push(fornecedor)
            }
            sqlCode += " WHERE id=?"
            values.push(id)

            await conexao.query(sqlCode, values)
            return ({ status: 200, msg: "Unidade Atualizada" })
        } catch (e) {
            console.log(e)
            return ({ status: 500, mag: "Erro conexão com DataBase" })
        }
    }

    async DELETE(conexao, id) {
        try {
            const sqlCode = "DELETE FROM produtos WHERE id = ?"
            const value = [id]
            await conexao.query(sqlCode, value)

            return ({ status: 200, msg: "Unidade Excluída" })
        } catch (e) {
            console.log(e)
            return ({ status: 500, msg: "Erro durante a conexão com DataBase" })
        }
    }
}