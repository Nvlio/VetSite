import ContaMod from "../Modelo/ContaModelo.js"

//DAO de Unidades
export default class ContaDB {
    async GET(conexao) {
        try {
            const sqlCode = "SELECT contas.id AS id,contas.Nome AS nome,contas.valor,contas.data_vencimento,contas.data_inicio,contas.status,contas.tipo,contas.mensal FROM contas "
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

    async GETID(conexao,id) {
        try {
            const sqlCode = "SELECT contas.id AS id,contas.Nome AS nome,contas.valor,contas.data_vencimento,contas.data_inicio,contas.status,contas.tipo,contas.mensal FROM contas  WHERE contas.id=?"
            const value = [id]
            const [itens] = await conexao.query(sqlCode,value)
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
            let sqlCode = "SELECT contas.id AS id,contas.Nome AS nome,contas.valor,contas.data_vencimento,contas.data_inicio,contas.status,contas.tipo,contas.mensal FROM contas "
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
            
            if (extra[2] != "_" && extra[3] != "_") {
                sqlCode += "ORDER BY "
                sqlCode += extra[2] === "caro" ? `contas.valor DESC` : `contas.valor ASC`
                sqlCode +=", "
                sqlCode += extra[3] === "Perto" ? `contas.data_vencimento ASC` : `contas.data_vencimento DESC`
            } else {
                if (extra[2] != "_") {
                    sqlCode += extra[2] === "caro" ? ` ORDER BY contas.valor DESC ` : ` ORDER BY contas.valor ASC `
                }
                if (extra[3] != "_") {
                    sqlCode += extra[3] === "Perto" ? ` ORDER BY contas.data_vencimento ASC` : ` ORDER BY contas.data_vencimento DESC`
                }
            }


            const [itens] = await conexao.query(sqlCode, values)
            let modelo = []

            for (let item of itens) {
                const unidade = new ContaMod(item.nome, item.data_vencimento, item.data_inicio, item.valor, item.responsavel, item.status,item.tipo,item.mensal, item.id)
                modelo.push(unidade.ToJSON(item.nomeResp))
            }

            return ({ status: 200, content: modelo })

        } catch (e) {
            return ({ status: 500, msg: e })
        }
    }

    async POST(conexao, dataV, dataI, valor, nome, cpfresp, status,tipo,mensal) {
        try {
            const sqlCode = "INSERT INTO contas (id,nome,data_vencimento,data_inicio,valor,responsavel,status,tipo,mensal) VALUES (NULL,?,?,?,?,?,?,?,?)"
            const values = [nome, dataV, dataI, valor, cpfresp, status,tipo,mensal]
            await conexao.query(sqlCode, values)
            return ({ status: 200, msg: "conta Inserida" })
        } catch (e) {
            console.log(e)
            return ({ status: 500, msg: "Erro durante a conexão com DataBase" })
        }
    }

    async PUT(conexao,status,cpfResp,id){
        try{
            const sqlCode = "UPDATE contas SET status = ?,responsavel=? WHERE id = ?"
        const values = [status,cpfResp,id]
        await conexao.query(sqlCode,values)
        return ({status:200,msg:"Conta atualizada"})
        }catch(e){
            return {status:500,msg:"erro durante a atualização"}
        }
    }

}