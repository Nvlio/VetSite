import ContaMod from "../Modelo/ContaModelo.js"

//DAO de Unidades
export default class ContaDB {
    async GET(conexao) {
        try {
            const sqlCode = "SELECT contas.id AS id,contas.Nome AS nome,funcionario.nome AS nomeResp,contas.valor,contas.data_vencimento,contas.data_inicio,contas.status,contas.tipo,contas.mensal FROM contas INNER JOIN funcionario ON funcionario.CPF=contas.responsavel"
            const [itens] = await conexao.query(sqlCode)
            const lista = []

            for (let item of itens) {
                let modelo = new ContaMod(item.nome, item.data_vencimento, item.data_inicio, item.valor, item.responsavel, item.status, item.tipo, item.mensal, item.id)
                lista.push(modelo.ToJSON(item.nomeResp))
            }

            return ({ status: 200, content: lista })
        } catch (e) {
            return ({ status: 500, msg: e })
        }
    }

    async GETVAL(conexao, tipoConta, extra) {
        try {
            let sqlCode = "SELECT contas.id AS id,contas.Nome AS nome,funcionario.nome AS nomeResp,contas.valor,contas.data_vencimento,contas.data_inicio,contas.status FROM contas INNER JOIN funcionario ON funcionario.CPF=contas.responsavel"
            const values = [];
            let conector = " WHERE "
            if (tipoConta != "_") {
                sqlCode += `${conector}contas.tipo LIKE ? `
                values.push(`${tipoConta}%`)
                conector = "AND "
            }
            if (extra[0] != "_") {
                sqlCode += `${conector}contas.nome LIKE ? `
                values.push(`${extra[0]}%`)
                conector = "AND "
            }
            if (extra[1] != "_") {
                sqlCode += `${conector}contas.status = ? `
                values.push(extra[1])
                conector = "AND "
            }
            if (extra[2] != "_") {
                sqlCode += `${conector}funcionario.Nome LIKE ? `
                values.push(extra[2])
                conector = "AND "
            }
            if (extra[3] != "_" && extra[4] != "_") {
                sqlCode += "ORDER BY "
                sqlCode += extra[3] === "caro" ? `contas.valor DESC` : `contas.valor ASC`
                sqlCode +=", "
                sqlCode += extra[4] === "Perto" ? `contas.data_vencimento ASC` : `contas.data_vencimento DESC`
            } else {
                if (extra[3] != "_") {
                    sqlCode += extra[3] === "caro" ? ` ORDER BY contas.valor DESC ` : ` ORDER BY contas.valor ASC `
                }
                if (extra[4] != "_") {
                    sqlCode += extra[4] === "Perto" ? ` ORDER BY contas.data_vencimento ASC` : ` ORDER BY contas.data_vencimento DESC`
                }
            }


            const [itens] = await conexao.query(sqlCode, values)
            let modelo = []

            for (let item of itens) {
                const unidade = new ContaMod(item.nome, item.data_vencimento, item.data_inicio, item.valor, item.responsavel, item.status, item.id)
                modelo.push(unidade.ToJSON(item.nomeResp))
            }

            return ({ status: 200, content: modelo })

        } catch (e) {
            return ({ status: 500, msg: e })
        }
    }

    async POST(conexao, dataV, dataI, valor, nome, cpfresp, status) {
        try {
            const sqlCode = "INSERT INTO contas (id,nome,data_vencimento,data_inicio,valor,responsavel,status) VALUES (NULL,?,?,?,?,?,?)"
            const values = [nome, dataV, dataI, valor, cpfresp, status]
            await conexao.query(sqlCode, values)
            return ({ status: 200, msg: "conta Inserida" })
        } catch (e) {
            console.log(e)
            return ({ status: 500, msg: "Erro durante a conexão com DataBase" })
        }
    }

}