import VendaseMod from "../Modelo/VendasModelo.js"
import Conectar from "../Persistencia/Conexao.js"

//Camada Controle de clientes
export default class VendasControle {

    async GET(req, resp) {
        if (req.method === "GET") {
            try {
                const modelo = new VendaseMod()
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
                // let info = req.params.info
                // const regex = /-(?=[^-])/g
                // info = info.split(regex)
                let nome = req.params.nome
                const modelo = new VendaseMod()
                const conexao = await Conectar()
                const resposta = await modelo.coletarValor(conexao, nome)
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

    async GETSpecificVal(req, resp) {
        if (req.method === "GET") {
            try {
                let id = req.params.id;
                const modelo = new VendaseMod()
                const conexao = await Conectar()
                const resposta = await modelo.coletarValorEspecifico(conexao, id)
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
                const body = req.body;
                const cpf_user = body.cpf;
                const formPagar = body.formPagar
                const parcelas = body.parcelas
                const produtos = body.prods[0]
                let prods = []
                produtos.map((produto)=>{
                    console.log(produto)
                    prods.push([produto.prodID,produto.quantidade])

                })
                const valorTotal = body.valorTotal;
                const qntdTotal = body.qntTotal;
                let data = new Date()
                data = data.toISOString().slice(0, 10);

                const conexao = await Conectar()
                if (cpf_user, valorTotal, formPagar, parcelas, prods,qntdTotal) {
                    const modelo = new VendaseMod(data, valorTotal, formPagar, parcelas, cpf_user, prods, null,qntdTotal)
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