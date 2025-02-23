import CompraMod from "../Modelo/CompraModelo.js"
import Conectar from "../Persistencia/Conexao.js"
import ProdutoDB from "../Persistencia/ProdutoDAO.js"

//Camada Controle de clientes
export default class CompraControle {

    async GET(req, resp) {
        if (req.method === "GET") {
            try {
                const modelo = new CompraMod()
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
                let nome = req.params.nome?req.params.nome:"_"
                let produto = req.params.produto?req.params.produto:"_"
                const modelo = new CompraMod()
                const conexao = await Conectar()
                const resposta = await modelo.coletarValor(conexao, nome,produto)
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
                const cpf_user = body.cpf;
                const valor = body.preço
                const qntd = body.qntd<0?body.qntd*-1:body.qntd
                let produto_id = body.prodId;
                if (produto_id == undefined) {
                    const conexao = await Conectar()
                    const db = new ProdutoDB()
                    let prod = await db.GETRec(conexao)
                    produto_id = prod.content[0].id
                }
                let qntd_Total = body.qntdTotal
                let data = new Date()
                data = data.toISOString().slice(0, 10);

                
                const db = new ProdutoDB()
                let prod = db.GETRec()
                if (cpf_user, valor, qntd) {
                    const modelo = new CompraMod(data, valor, qntd, cpf_user, produto_id, null, qntd_Total)
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

}