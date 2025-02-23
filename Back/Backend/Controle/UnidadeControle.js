import UnidadeMod from "../Modelo/UnidadesModelo.js"
import Conectar from "../Persistencia/Conexao.js"

//Camada Controle de clientes
export default class UnidadeControle {

    async GET(req, resp) {
        if (req.method === "GET") {
            try {
                const modelo = new UnidadeMod()
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
                let info = req.params.info
                const regex = /-(?=[^-])/g
                info = info.split(regex)
                const modelo = new UnidadeMod()
                const conexao = await Conectar()
                const resposta = await modelo.coletarValor(conexao, info[1], info[0])
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
                const nome = body.nome;
                const endereco = `${body.bairro}, ${body.rua} n:${body.numero}; ${body.estado} ${body.cidade} CEP:${body.cep}`;
                const telefone = body.telefone;

                const conexao = await Conectar()
                if (nome, endereco, telefone) {
                    const modelo = new UnidadeMod(nome, endereco, telefone)
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
            try {
                const id = req.params.id
                const body = req.body
                const nome = body.nome
                const endereco = body.endereco
                const telefone = body.telefone

                const conexao = await Conectar()
                const modelo = new UnidadeMod(nome, endereco, telefone, id)
                const resposta = await modelo.atualizar(conexao)
                if (resposta.status === 500) { throw resposta.msg }

                return resp.json(resposta)
            } catch (e) {
                console.log(e)
                return resp.json({ message: e }).status(500)
            }
        } else {
            return resp.json({ message: "Metodo não permitido" }).status(405)
        }
    }

    async DELETE(req, resp) {
        if (req.method === "DELETE") {
            try {
                const id = req.params.id
                const modelo = new UnidadeMod(null, null, null, id)
                const conexao = await Conectar()
                const resposta = await modelo.deletar(conexao)
                if (resposta.status === 500) { throw resposta.msg }
                return resp.json(resposta.msg).status(resposta.status)
            } catch (e) {
                console.log(e)
                return resp.json({ message: e }).status(500)
            }
        } else {
            return resp.json({ message: "Metodo não permitido" }).status(405)
        }
    }
}