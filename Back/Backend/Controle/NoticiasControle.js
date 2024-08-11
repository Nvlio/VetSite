import Exclude from "../Functions/excluirImg.js"
import salvarIMG from "../Functions/Imagem.js"
import NoticiaModelo from "../Modelo/NoticiasModelo.js"
import Conectar from "../Persistencia/Conexao.js"

export default class Noticiacontrole {
    async GET(req, resp) {
        if (req.    method === "GET") {
            const modelo = new NoticiaModelo(null, null, null, null, null, null)
            const conexao = await Conectar()
            const resposta = await modelo.coletar(conexao)
            

            return resp.json({ resposta })
        }
    }

    async GETVal(req, resp) {
        if (req.method === "GET") {
            const title = req.params.title
            const modelo = new NoticiaModelo(title, null, null, null, null, null)
            const conexao = await Conectar()
            const resposta = await modelo.coletarNome(conexao)

            return resp.json({ resposta })
        }
    }

    async POST(req, resp) {
        if (req.method === "POST") {
            "vai alter tudo para receber imagem esse abaixo só serve para mostrar mesmo"
            const body = req.body;
            const title = body.title;
            const subtitle = body.subtitle;
            const article = body.article;
            const imagem = req.file;
            const imagemNome = body.imagemnome;
            const cpfResp = body.cpf;

            const salvo = salvarIMG(body,imagem)
            if ((title, subtitle, article,imagemNome, cpfResp) && salvo!=-1) {
                //salvarIMG()
                const modelo = new NoticiaModelo(title, subtitle, article, imagemNome, cpfResp, null)
                const conexao = await Conectar()
                const resposta = await modelo.adiciona(conexao)

                return resp.json({ Cmsg: resposta })
            } else {
                return resp.json({ msg: "falta dados" })
            }
        } else {
            return resp.json({ msg: "Metodo não permitido" })
        }
    }

    async PUT(req, resp) {
        if (req.method === "PUT") {
            const id = req.params.id
            const body = req.body;
            const title = body.title;
            const subtitle = body.subtitle;
            const article = body.article;
            const imagem = body.imagemnome;
            const cpfResp = body.cpf;

            if (id) {
                const modelo = new NoticiaModelo(title, subtitle, article, imagem, cpfResp, id)
                const conexao = await Conectar()
                const resposta = await modelo.editar(conexao)

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
            const id = req.params.id
            const img = req.params.img
            if (id) {
                await Exclude(img)
                const modelo = new NoticiaModelo(null,null,null,null,null,id)
                const conexao = await Conectar()
                const resposta = await modelo.deletar(conexao)
                

                return resp.json({ Cmsg: resposta })
            } else {
                return resp.json({ msg: "falta dados" })
            }

        } else {
            return resp.json({ msg: "Metodo não permitido" })
        }
    }
}