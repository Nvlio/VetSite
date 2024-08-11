import Conectar from "../Persistencia/Conexao.js"
import RacaMod from "../Modelo/RacaModelo.js"


export default class RacaControle {
    async GET(req, resp) {
        if (req.method === "GET") {
            try {
                const conexao = await Conectar()
                const modelo = new RacaMod()
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
                let especie = req.params.especie
                const regex = /-(?=[^-])/g
                
                
                    const modelo = new RacaMod("",especie,"")
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
                const especie = body.especie

                if (nome,especie) {
                    const modelo = new RacaMod(nome,especie)
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
                const especie = body.especie
                
                const modelo = new RacaMod(nome,especie, id)
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
                const modelo = new RacaMod(null,null, id)
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