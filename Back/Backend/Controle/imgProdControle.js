import Conectar from "../Persistencia/Conexao.js"
import ImgProdMod from "../Modelo/ImgProdModelo.js"
import salvarIMG from "../Functions/Imagem.js"


export default class ImgProdControle {

    async GETVAL(req, resp) {
        if (req.method === "GET") {
            try {
                const idProd = req.params.info
                const modelo = new ImgProdMod(null,idProd,null,null)
                const conexao = await Conectar()
                const resposta = await modelo.coletarValor(conexao)
                resp.json({content:resposta.content})
                
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
                    const modelo = new ImgProdMod(nome, valor, validade, quantidade, fornecedor)
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

    async POST(req, resp) {
        if (req.method === "POST") {
            "vai alter tudo para receber imagem esse abaixo só serve para mostrar mesmo"
            const body = req.body;
            const nome = body.nome;
            const idProd = body.idProd;
            const tipo = body.tipo
            const imagem = req.file;

            const salvo = salvarIMG(body, imagem)
            if ((nome,idProd,tipo) && salvo != -1) {
                //salvarIMG()
                const modelo = new ImgProdMod(null,idProd,tipo,nome)
                const conexao = await Conectar()
                const resposta = await modelo.adicionar(conexao)

                return resp.json({ Cmsg: resposta })
            } else {
                return resp.json({ msg: "falta dados" })
            }
        } else {
            return resp.json({ msg: "Metodo não permitido" })
        }
    }

    async DELETE(req, resp) {
        if (req.method === "DELETE") {
            try {
                const conexao = await Conectar()
                const id = req.params.id
                const modelo = new ImgProdMod(null, null, null, null, null, id)
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