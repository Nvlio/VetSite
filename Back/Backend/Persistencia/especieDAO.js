import especieMod from "../Modelo/especieModelo.js"

//DAO de especie
export default class especieDB {
    async GET(conexao) {
        try {
            const sqlCode = "SELECT * FROM especie"
            const [itens] = await conexao.query(sqlCode)
            const lista = []

            for (let item of itens) {
                let modelo = new especieMod(item.nome, item.id)
                lista.push(modelo.ToJSON())
            }

            return ({ status: 200, content: lista })
        } catch (e) {
            return ({ status: 500, msg: e })
        }
    }

    async GETVAL(conexao, nome,id) {
        try {
            let sqlCode = "SELECT * FROM especie "
            let values =    []
            let conector ="WHERE"
            if (id!="_"){
                sqlCode+=`${conector} id = ?`
                values.push(id)
                conector=" AND"
            }
            if (nome!="_"){
                sqlCode+=`${conector} nome LIKE ?`
                
                values.push(`${nome}%`)
            }
            const [itens] = await conexao.query(sqlCode, values)
            let modelo=[]

            for (let item of itens) {
                const prod = new especieMod(item.nome, item.id)
                modelo.push(prod.ToJSON())
            }

            return ({ status: 200, content: modelo })

        } catch (e) {
            return ({ status: 500, content: e })
        }
    }

    async POST(conexao, nome) {
        try {
            const sqlCode = "INSERT INTO especie VALUES (NULL,?)"
            const values = [nome]
            await conexao.query(sqlCode, values)

            return ({ status: 200, msg: "especie Inserido" })
        } catch (e) {
            console.log(e)
            return ({ status: 500, msg: "Erro durante a conexão com DataBase" })
        }
    }

    async PUT(conexao, nome, id) {
        try {
            let sqlCode = "UPDATE especie SET"
            let conector = ""
            let values = []

            if (nome != "") {
                sqlCode += " nome=?"
                values.push(nome)
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
            const sqlCode = "DELETE FROM especie WHERE id = ?"
            const value = [id]
            await conexao.query(sqlCode, value)

            return ({ status: 200, msg: "Unidade Excluída" })
        } catch (e) {
            console.log(e)
            return ({ status: 500, msg: "Erro durante a conexão com DataBase" })
        }
    }
}