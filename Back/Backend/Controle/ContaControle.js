import ContaMod from "../Modelo/ContaModelo.js"
import Conectar from "../Persistencia/Conexao.js"
import ProdutoDB from "../Persistencia/ProdutoDAO.js"

//Camada Controle de clientes
export default class ContaControle {

    async GET(req, resp) {
        if (req.method === "GET") {
            try {
                const modelo = new ContaMod()
                const conexao = await Conectar()
                const resposta = await modelo.coletar(conexao)
                if (resposta.status === 500) { throw resposta.msg }

                return resp.json(resposta.content).status(resposta.status)
            } catch (e) {
                console.log(e)
                return resp.json({ message: e }).status(500)
            }
        } else {
            return resp.json({ message: "Metodo não permitido" }).status(405)
        }
    }

    async GETVAL(req, resp) {
        if (req.method === "GET") {
            try {
                let tipoConta = req.params.tipoConta ? req.params.tipoConta : "_"
                let extra = req.params.extra
                const regex = /-(?=[^-])/g
                extra = extra.split(regex)
                const modelo = new ContaMod()
                const conexao = await Conectar()
                const resposta = await modelo.coletarValor(conexao, tipoConta, extra)
                if (resposta.status === 500) { throw resposta.msg }

                return resp.json(resposta.content).status(resposta.status)
            } catch (e) {
                console.log(e)
                return resp.json({ message: e.message }).status(500)
            }
        } else {
            return resp.json({ message: "Metodo não permitido" }).status(405)
        }
    }

    async GETID(req, resp) {
        if (req.method === "GET") {
            try {
                let id = req.params.id
                const modelo = new ContaMod()
                const conexao = await Conectar()
                const resposta = await modelo.coletarID(conexao, id)
                if (resposta.status === 500) { throw resposta.msg }

                return resp.json(resposta.content).status(resposta.status)
            } catch (e) {
                console.log(e)
                return resp.json({ message: e.message }).status(500)
            }
        } else {
            return resp.json({ message: "Metodo não permitido" }).status(405)
        }
    }

    async POST(req, resp) {
        if (req.method === "POST") {
            try {
                const conexao = await Conectar()
                const body = req.body;
                const nome = body.nome;
                const valor = body.preço;
                let dataI = new Date()
                const dataV = body.DataV===""?`${dataI.getFullYear()}-${dataI.getUTCMonth()+1}-28`:body.DataV
                dataI = dataI.toISOString().slice(0, 10);
                console.log(dataI,dataV)
                
                const cpfResp = body.cpfR;
                const status = "pendente";
                const tipo = body.tipo;
                const mensal = body.mensal;


                const db = new ProdutoDB()
                let prod = db.GETRec()
                if (valor, nome,dataV,tipo,mensal) {
                    const modelo = new ContaMod(nome, dataV, dataI, valor, cpfResp, status, tipo,mensal,null)
                    const resposta = await modelo.adicionar(conexao)
                    if (resposta.status === 500) { throw resposta.msg }

                    return resp.json(resposta)

                } else {
                    throw "Falta de dados"
                }

            } catch (e) {
                console.log(e)
                return resp.json({ message: e }).status(500)
            }
        } else {
            return resp.json({ message: "Metodo não permitido" }).status(405)
        }
    }

    async PUT(req, resp) {
        if (req.method === "PUT") {

            const conexao = await Conectar()
            const id = req.params.id
            const body = req.body
            const status = body.status
            const respCPF = body.respNome
            const modelo = new ContaMod(null, null, null, null, respCPF, status,null, null, id)
            const resposta = await modelo.atualizar(conexao)
            return resp.json(resposta).status(500)
        } else {
            return resp.json({ message: "Metodo não permitido" }).status(405)
        }
    }
}