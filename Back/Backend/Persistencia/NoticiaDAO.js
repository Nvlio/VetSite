import NoticiaModelo from "../Modelo/NoticiasModelo.js";
import FuncionarioDB from "./FuncionariosDAO.js";

export default class NoticiaDB {
    async GET(conexao) {
        try {
            const sqlcode = "SELECT * FROM noticia"
            const [itens] = await conexao.query(sqlcode)
            const lista = []
            const listanome = []

            for (let item of itens) {
                const Funcionario = new FuncionarioDB()
                const nome = await Funcionario.GETVALCPF(item.responsavelcpf)
                const mod = new NoticiaModelo(item.titulo, item.subtitulo, item.artigo, item.imagem, item.responsavelcpf,item.id)
                lista.push(mod.ToJSON(nome))
            }


            return (lista)
        } catch (e) {
            return e
        }
    }

    async GETTitle(conexao, title) {
        try {
            const sqlcode = "SELECT * FROM noticia WHERE titulo LIKE ?"
            const value = [`%${title}%`]
            const [itens] = await conexao.query(sqlcode, value)
            
            const lista = []

            for (let item of itens) {
                const Funcionario = new FuncionarioDB()
                const nome = await Funcionario.GETVALCPF(item.responsavelcpf)
                const mod = new NoticiaModelo(item.titulo, item.subtitulo, item.artigo, item.imagem, item.responsavelcpf,item.id)
                lista.push(mod.ToJSON(nome))
            }


            return (lista)
        } catch (e) {
            return e
        }
    }

    async POST(conexao, title, subtitle, article, img, cpf) {
        try {
            const sqlcode = "INSERT INTO noticia (titulo,subtitulo,artigo,imagem,responsavelcpf) VALUES(?,?,?,?,?)"
            const value = [title, subtitle, article, img, cpf]
            await conexao.query(sqlcode, value)

            return "Objeto adicionado"
        } catch (e) {
            return e
        }
    }

    async PUT(conexao, title, subtitle, article, img, cpf, id) {
        try {
            let sqlcode = "UPDATE noticia SET"
            const value = []
            let conector = ""
            if (title != "") {
                sqlcode += " titulo=?"
                value.push(title)
                conector = ","
            }
            if (subtitle != "") {
                sqlcode += `${conector} subtitulo=?`
                value.push(subtitle)
                conector = ","
            }
            if (article != "") {
                sqlcode += `${conector} artigo=?`
                value.push(article)
                conector = ","
            }
            if (img != "") {
                sqlcode += `${conector} imagem=?`
                value.push(img)
                conector = ","
            }
            if (cpf != "") {
                sqlcode += `${conector} responsavelcpf=?`
                value.push(cpf)
            }
            sqlcode += " WHERE id=?"
            value.push(id)

            await conexao.query(sqlcode, value)

            return "Objeto atualizado"
        } catch (e) {
            return e
        }
    }

    async DELETE(conexao, id) {
        try {
            const sqlCode = "DELETE FROM noticia WHERE id=?"
            const value = [id]
            await conexao.query(sqlCode, value)

            return "Objeto excluido"
        } catch (e) {
            return e
        }
    }
}