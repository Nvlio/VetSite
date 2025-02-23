import ProdutoMod from "../Modelo/ProdutoModelo.js"

//DAO de produto
export default class ProdutoDB {
    async GET(conexao) {
        try {
            const sqlCode = "SELECT * FROM produtos"
            const [itens] = await conexao.query(sqlCode)
            const lista = []

            for (let item of itens) {
                let modelo = new ProdutoMod(item.nome, item.valor, item.validade, item.quantidade, item.fornecedor, item.id, item.descricao, item.categoria)
                lista.push(modelo.ToJSON())
            }

            return ({ status: 200, content: lista })
        } catch (e) {
            return ({ status: 500, msg: e })
        }
    }

    async GETVAL(conexao, nome, fornecedor, id) {
        try {
            let sqlCode = "SELECT * FROM produtos "
            let values = []
            let conector = "WHERE"
            if (nome != "_") {
                sqlCode += `${conector} nome LIKE ?`
                conector = " AND"
                values.push(`%${nome}%`)
            }
            if (id != "_") {
                sqlCode += `${conector} id = ?`
                conector = " AND"
                values.push(id)
            }
            if (fornecedor != "_") {
                sqlCode += `${conector} fornecedor LIKE ?`
                values.push(`%${fornecedor}%`)
            }
            const [itens] = await conexao.query(sqlCode, values)
            let modelo = []

            for (let item of itens) {
                const prod = new ProdutoMod(item.nome, item.valor, item.validade, item.quantidade, item.fornecedor, item.id, item.descricao, item.categoria)
                modelo.push(prod.ToJSON())
            }

            return ({ status: 200, content: modelo })

        } catch (e) {
            return ({ status: 500, content: e })
        }
    }

    async GETVALFilter(conexao, primeiro, segundo) {
        try {
            let sqlCode = "SELECT * FROM produtos "
            let values = []
            let conector = "WHERE"
            if (segundo != "_") {
                sqlCode += `${conector} categoria = ?`
                values.push(segundo)
            }
            if (primeiro != "_") {
                sqlCode += ` ORDER BY valor ${primeiro === "maior" ? "DESC" : "ASC"}`
            }
            const [itens] = await conexao.query(sqlCode, values)
            let modelo = []

            for (let item of itens) {
                const prod = new ProdutoMod(item.nome, item.valor, item.validade, item.quantidade, item.fornecedor, item.id, item.descricao, item.categoria)
                modelo.push(prod.ToJSON())
            }

            return ({ status: 200, content: modelo })

        } catch (e) {
            return ({ status: 500, content: e })
        }
    }

    async GETRec(conexao) {
        try {
            const sqlCode = "SELECT * FROM produtos ORDER BY id DESC"
            const [itens] = await conexao.query(sqlCode)
            const lista = []

            for (let item of itens) {
                let modelo = new ProdutoMod(item.nome, item.valor, item.validade, item.quantidade, item.fornecedor, item.id, item.descricao, item.categoria)
                lista.push(modelo.ToJSON())
            }

            return ({ status: 200, content: lista })
        } catch (e) {
            return ({ status: 500, msg: e })
        }
    }

    async POST(conexao, nome, valor, validade, quantidade, fornecedor, descricao,categoria) {
        try {
            const sqlCode = "INSERT INTO produtos VALUES (NULL,?,?,?,?,?,?,?)"
            const values = [nome, valor, validade, quantidade, fornecedor, descricao,categoria]
            await conexao.query(sqlCode, values)

            return ({ status: 200, msg: "produto Inserido" })
        } catch (e) {
            console.log(e)
            return ({ status: 500, msg: "Erro durante a conexão com DataBase" })
        }
    }

    async PUT(conexao, nome, valor, validade, quantidade, fornecedor, id, descricao) {
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
            if (quantidade !== "") {
                sqlCode += `${conector} quantidade=?`
                conector = ","
                values.push(quantidade)
            }
            if (fornecedor != "") {
                sqlCode += `${conector} fornecedor=?`
                conector = ","
                values.push(fornecedor)
            }
            if (descricao != "") {
                sqlCode += `${conector} descricao=?`
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