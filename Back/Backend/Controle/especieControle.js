import Conectar from "../Persistencia/Conexao.js"
import especieMod from "../Modelo/especieModelo.js"


export default class especieControle {
    async GET(req, resp) {
        if (req.method === "GET") {
            try {
                const conexao = await Conectar()
                const modelo = new especieMod()
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
                
                
                    const modelo = new especieMod(info[0], info[1])
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

                if (nome) {
                    const modelo = new especieMod(nome)
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
                
                const modelo = new especieMod(nome, id)
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
                const modelo = new especieMod(null, id)
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