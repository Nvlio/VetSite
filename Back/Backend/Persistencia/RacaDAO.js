import RacaMod from "../Modelo/RacaModelo.js"

//DAO de Raca
export default class RacaDB {
    async GET(conexao) {
        try {
            const sqlCode = "SELECT * FROM racas"
            const [itens] = await conexao.query(sqlCode)
            const lista = []

            for (let item of itens) {
                let modelo = new RacaMod(item.nome,item.id_especie, item.id)
                lista.push(modelo.ToJSON())
            }

            return ({ status: 200, content: lista })
        } catch (e) {
            return ({ status: 500, msg: e })
        }
    }

    async GETVAL(conexao, nome,especie,id) {
        try {
            let sqlCode = "SELECT * FROM racas "
            let values =    []
            let conector ="WHERE"
            if (especie!=""){
                sqlCode+=`${conector} id_especie = ?`
                values.push(especie)
                conector=" AND"
            }
            if (nome!=""){
                sqlCode+=`${conector} nome LIKE ?`
                
                values.push(`${nome}%`)
            }
            const [itens] = await conexao.query(sqlCode, values)
            let modelo=[]

            for (let item of itens) {
                const prod = new RacaMod(item.nome,item.id_especie, item.id)
                modelo.push(prod.ToJSON())
            }

            return ({ status: 200, content: modelo })

        } catch (e) {
            return ({ status: 500, content: e })
        }
    }

    async POST(conexao, nome) {
        try {
            const sqlCode = "INSERT INTO racas VALUES (NULL,?,?)"
            const values = [nome]
            await conexao.query(sqlCode, values)

            return ({ status: 200, msg: "raca Inserido" })
        } catch (e) {
            console.log(e)
            return ({ status: 500, msg: "Erro durante a conexão com DataBase" })
        }
    }

    async PUT(conexao, nome,especie, id) {
        try {
            let sqlCode = "UPDATE racas SET"
            let conector = ""
            let values = []

            if (nome != "") {
                sqlCode += " nome=?"
                values.push(nome)
                conector="AND "
            }
            if (especie != "") {
                sqlCode += `${conector}especie=?`
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
            const sqlCode = "DELETE FROM racas WHERE id = ?"
            const value = [id]
            await conexao.query(sqlCode, value)

            return ({ status: 200, msg: "Unidade Excluída" })
        } catch (e) {
            console.log(e)
            return ({ status: 500, msg: "Erro durante a conexão com DataBase" })
        }
    }
}