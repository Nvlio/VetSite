import UnidadeMod from "../Modelo/UnidadesModelo.js"

//DAO de Unidades
export default class UnidadeDB {
    async GET(conexao) {
        try {
            const sqlCode = "SELECT * FROM unidade"
            const [itens] = await conexao.query(sqlCode)
            const lista = []

            for (let item of itens) {
                let modelo = new UnidadeMod(item.nome, item.endereco, item.telefone, item.id)
                lista.push(modelo.ToJSON())
            }

            return ({ status: 200, content: lista })
        } catch (e) {
            return ({ status: 500, msg: e })
        }
    }

    async GETVAL(conexao, cidade,nome) {
        try {
            let sqlCode = "SELECT * FROM unidade "
            const values=[];
            let conector="WHERE "
            if (nome!="_") {
                sqlCode += `${conector}nome LIKE ? `
                values.push(`${nome}%`)
                conector="AND "
            } 
            if(cidade!="_") {
                sqlCode += `${conector}endereco LIKE ?`
                values.push(`%${cidade}%`)
            }
            const [itens] = await conexao.query(sqlCode, values)
            let modelo =[]

            for (let item of itens) {
                const unidade = new UnidadeMod(item.nome, item.endereco, item.telefone, item.id)
                modelo.push(unidade.ToJSON())
            }

            return ({ status: 200, content: modelo })

        } catch (e) {
            return ({ status: 500, msg: e })
        }
    }

    async POST(conexao, nome, endereco, telefone) {
        try {
            const sqlCode =     "INSERT INTO unidade VALUES (NULL,?,?,?)"
            const values = [nome, endereco, telefone]
            await conexao.query(sqlCode, values)

            return ({ status: 200, msg: "Unidade Inserida" })
        } catch (e) {
            console.log(e)
            return ({ status: 500, msg: "Erro durante a conexão com DataBase" })
        }
    }

    async PUT(conexao, nome, endereco, telefone, id) {
        try {
            let sqlCode = "UPDATE unidade SET"
            let conector = ""
            let values = []

            if (nome != "" ) {
                sqlCode += " nome=?"
                conector = ","
                values.push(nome)
            }
            if (endereco != "") {
                sqlCode += `${conector} endereco=?`
                conector = ","
                values.push(endereco)
            }
            if (telefone != "") {
                sqlCode += `${conector} telefone=?`
                values.push(telefone)
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
            const sqlCode = "DELETE FROM unidade WHERE id = ?"
            const value = [id]
            await conexao.query(sqlCode, value)

            return ({ status: 200, msg: "Unidade Excluída" })
        } catch (e) {
            console.log(e)
            return ({ status: 500, msg: "Erro durante a conexão com DataBase" })
        }
    }
}