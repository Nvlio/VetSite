import Exclude from "../Functions/excluirImg.js"
import salvarIMG from "../Functions/Imagem.js"
import NoticiaModelo from "../Modelo/NoticiasModelo.js"
import Conectar from "../Persistencia/Conexao.js"

export default class Noticiacontrole {
    async GET(req, resp) {
        if (req.method === "GET") {
            const modelo = new NoticiaModelo(null, null, null, null, null, null, null)
            const conexao = await Conectar()
            const resposta = await modelo.coletar(conexao)


            return resp.json({ resposta })
        }
    }

    async GETVal(req, resp) {
        if (req.method === "GET") {
            const tipo = req.params.tipo
            const valor = req.params.valor
            const cpf = req.params.cpf

            const modelo = new NoticiaModelo(tipo === "title" ? valor : null, null, null, null, null, null, tipo === "id" ? valor : null)
            const conexao = await Conectar()
            const resposta = await modelo.coletarNome(conexao, cpf)

            return resp.json({ resposta })
        }
    }

    async GETTOP(req, resp) {
        if (req.method === "GET") {
            const modelo = new NoticiaModelo(null, null, null, null, null, null)
            const conexao = await Conectar()
            const resposta = await modelo.coletarTOP(conexao)

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
            let dataP = body.dataP ? body.dataP : new Date().toISOString();
            const dataE = body.dataE;



            const salvo = salvarIMG(body, imagem)
            if ((title, subtitle, article, imagemNome, cpfResp) && salvo != -1) {
                //salvarIMG()
                const modelo = new NoticiaModelo(title, subtitle, article, imagemNome, cpfResp, dataP, null, dataE)
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
            const dataP = body.dataP;
            const dataE = body.dataE;
            const title = body.title;
            const subtitle = body.subtitle;
            const article = body.article;
            const imagem = body.imagemnome;
            const cpfResp = body.cpf;

            if (id) {
                const modelo = new NoticiaModelo(title, subtitle, article, imagem, cpfResp, null, id)
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

    async Curtir(req, resp) {
        try {
            const id = req.params.id;
            const body = req.body;
            const userID = body.userID;

            const conexao = await Conectar()

            const modelo = new NoticiaModelo(null, null, null, null, null, null, id)
            const resposta = await modelo.curtirNoticia(conexao, userID)
            if (resposta) {
                return resp.json({ msg: "noticia curtida" })
            } else {
                return resp.json({ msg: "erro do servidor" })
            }
        } catch (e) {
            return resp.json({ msg: "erro detectado" })
        }
    }

    async DELETE(req, resp) {
        if (req.method === "DELETE") {
            const id = req.params.id
            const img = req.params.img
            if (id) {
                const excluid = await Exclude(img)
                const modelo = new NoticiaModelo(null, null, null, null, null, null, id)
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