import Conectar from "../Persistencia/Conexao.js"
import ProdutoMod from "../Modelo/ProdutoModelo.js"


export default class ProdutoControle {
    async GET(req, resp) {
        if (req.method === "GET") {
            try {
                const conexao = await Conectar()
                const modelo = new ProdutoMod()
                const resposta = await modelo.coletar(conexao)

                return resp.json(resposta.content).status(resposta.status)
            } catch (e) {
                return resp.json({ msg: e }).status(500)
            }
        } else {
            return resp.json({ msg: "Metdod não permitido" }).status(405)
        }
    }

    async GETVAL(req, resp) {
        if (req.method === "GET") {
            try {
                const conexao = await Conectar()
                let info = req.params.info
                const regex = /-(?=[^-])/g
                info = info.split(regex)
                
                
                    const modelo = new ProdutoMod(info[0], null, null, null, info[1], null)
                    const resposta = await modelo.coletarValor(conexao)
                    let message;
                    if(resposta.status===500){
                        message=resposta.content.message
                    }else{
                        message=resposta.content
                    }
                    console.log(resposta.status)
                    return resp.json({msg:message,status:resposta.status}).status(resposta.status)
                
            } catch (e) {
                console.log(e)
                return resp.json({ msg: e }).status(500)
            }
        } else {
            return resp.json({ msg: "Metdod não permitido" }).status(405)
        }
    }

    async POST(req, resp) {
        if (req.method === "POST") {
            try {
                const conexao = await Conectar()
                const body = req.body
                const nome = body.nome
                const valor = body.valor
                const validade = body.validade
                const quantidade = body.quantidade
                const fornecedor = body.fornecedor

                if (nome, valor, validade, quantidade, fornecedor) {
                    const modelo = new ProdutoMod(nome, valor, validade, quantidade, fornecedor)
                    const resposta = await modelo.adicionar(conexao)
                    return resp.json({ msg: resposta.msg,status:resposta.status }).status(resposta.status)
                } else { throw "Falta de dados!" }


            } catch (e) {
                console.log(e)
                return resp.json({ msg: e }).status(500)
            }
        } else {
            return resp.json({ msg: "Metdod não permitido" }).status(405)
        }
    }

    async PUT(req, resp) {
        if (req.method === "PUT") {
            try {
                const conexao = await Conectar()
                const id = req.params.id;
                const body = req.body;
                const nome = body.nome
                const valor = body.valor
                const validade = body.validade
                const quantidade = body.quantidade
                const fornecedor = body.fornecedor
                const modelo = new ProdutoMod(nome, valor, validade, quantidade, fornecedor, id)
                const resposta = await modelo.atualizar(conexao)

                return resp.json({ msg: resposta.msg }).status(resposta.status)
            } catch (e) {
                return resp.json({ msg: e }).status(500)
            }
        } else {
            return resp.json({ msg: "Metdod não permitido" }).status(405)
        }
    }

    async DELETE(req, resp) {
        if (req.method === "DELETE") {
            try {
                const conexao = await Conectar()
                const id = req.params.id
                const modelo = new ProdutoMod(null, null, null, null, null, id)
                const resposta = await modelo.deletar(conexao)

                return resp.json({ msg: resposta.msg }).status(resposta.status)
            } catch (e) {
                return resp.json({ msg: e }).status(500)
            }
        } else {
            return resp.json({ msg: "Metdod não permitido" }).status(405)
        }
    }
}