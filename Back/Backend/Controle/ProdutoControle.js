import Conectar from "../Persistencia/Conexao.js"
import ProdutoMod from "../Modelo/ProdutoModelo.js"
import salvarIMG from "../Functions/Imagem.js"


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

    async GetImages(req, resp) {
        if (req.method === "GET") {
            try {
                const conexao = await Conectar()
                const modelo = new ProdutoMod()
                const resposta = await modelo.coletarWimages(conexao)

                return resp.json(resposta.content).status(resposta.status)
            } catch (e) {
                return resp.json({ msg: e }).status(500)
            }
        } else {
            return resp.json({ msg: "Metdodo não permitido" }).status(405)
        }
    }


    async GETbyFilter(req, resp) {
        if (req.method === "GET") {
            try {
                const conexao = await Conectar()
                let primeiro = req.params.Primeiro
                let segundo = req.params.Segundo

                const modelo = new ProdutoMod(null, primeiro, null, null, null, null, null,segundo)
                const resposta = await modelo.coletarValorFiltrado(conexao)
                return resp.json(resposta.content).status(resposta.status)

            } catch (e) {
                console.log(e)
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
                let id = req.params.id
                const regex = /-(?=[^-])/g
                if (info) { info = info.split(regex); id = "_" } else { info = ["_", "_"] }



                const modelo = new ProdutoMod(info[0], null, null, null, info[1], id, null)
                const resposta = await modelo.coletarValor(conexao)
                console.log(resposta)
                let message;
                if (resposta.status === 500) {
                    message = resposta.content.message
                } else {
                    message = resposta.content
                }
                console.log(resposta.status)
                return resp.json({ msg: message, status: resposta.status }).status(resposta.status)

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
            console.log(req)
            try {
                const conexao = await Conectar()
                const body = req.body
                const nome = body.nome
                const valor = body.valor
                const validade = '1'
                const quantidade = body.quantidade
                const fornecedor = body.fornecedor
                const descricao = body.descricao
                const categoria = body.categoria
                const imagens = req.files

                const salvo = salvarIMG(body, imagens, "s", "multiple")
                if ((nome, valor, quantidade, validade, fornecedor, descricao,categoria) && salvo === true) {
                    const modelo = new ProdutoMod(nome, valor, validade, quantidade, fornecedor, null, descricao,categoria)
                    const resposta = await modelo.adicionar(conexao, imagens)
                    return resp.json({ msg: resposta.msg, status: resposta.status }).status(resposta.status)
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