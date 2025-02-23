import { query } from "express";
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
                const mod = new NoticiaModelo(item.titulo, item.subtitulo, item.artigo, item.imagem, item.responsavelcpf, item.data, item.id, item.dataSaida)
                lista.push(mod.ToJSON(nome))
            }


            return (lista)
        } catch (e) {
            return e
        }
    }

    async GETTitle(conexao, title, id,isLiked) {
        try {
            let sqlcode
            let value
            if (title) {
                sqlcode = "SELECT * FROM noticia WHERE titulo LIKE ?"
                value = [`%${title}%`]
            } else {
                sqlcode = "SELECT * FROM noticia WHERE ID = ?"
                value = [id]
            }
            const [itens] = await conexao.query(sqlcode, value)

            const lista = []

            for (let item of itens) {
                const Funcionario = new FuncionarioDB()
                const nome = await Funcionario.GETVALCPF(item.responsavelcpf)
                const mod = new NoticiaModelo(item.titulo, item.subtitulo, item.artigo, item.imagem, item.responsavelcpf, item.data, item.id, item.dataSaida)
                lista.push(mod.ToJSON(nome,isLiked))
            }


            return (lista)
        } catch (e) {
            return e
        }
    }

    async GETTOP(conexao, id) {
        try {
            const sqlCode = "SELECT * FROM noticia ORDER BY curtidas DESC LIMIT 5;"
            const value = [id]
            const lista = await conexao.query(sqlCode, value)
            const listaFinal = []
            for (let item of lista[0]) {
                const dado = new NoticiaModelo(item.titulo, item.subtitulo, item.artigo, item.imagem, item.responsavelcpf, item.data, item.id, item.dataSaida)
                listaFinal.push(dado.ToJSON())
            }
            return listaFinal
        } catch (e) {
            return e
        }
    }

    async POST(conexao, title, subtitle, article, img, cpf, data, dataE) {
        try {
            const sqlcode = "INSERT INTO noticia (titulo,subtitulo,artigo,imagem,responsavelcpf,data,dataSaida) VALUES(?,?,?,?,?,?,?)"
            const value = [title, subtitle, article, img, cpf, data, dataE]
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

    async CheckLIKE(conexao,id,userId){
        try{
            const sqlCode = "SELECT * FROM userCurtida WHERE noticiaID = ? AND userID = ?"
            const values = [id,userId]
            const [list] = await conexao.query(sqlCode,values)
            console.log(list)
            if(list.length>0){
                return true
            }else{
                return false
            }
        }catch(e){
            return false
        }
    }

    async LIKE(conexao,id,userId){
        try{
            let sqlCode = "UPDATE noticia SET curtidas = curtidas + 1 WHERE id = ? "
            const values = [id,userId]
            await conexao.query(sqlCode,[values[0]])
            sqlCode = "INSERT INTO userCurtida (id,noticiaID,userID) VALUES (null,?,?)"
            await conexao.query(sqlCode,values)

            return true
        }catch(e){
            return false
        }
    }

    async DISLIKE(conexao,id,userId){
        try{
            let sqlCode = "UPDATE noticia SET curtidas = curtidas - 1 WHERE id = ? "
            const values = [id,userId]
            await conexao.query(sqlCode,[values[0]])
            sqlCode = "DELETE FROM userCurtida WHERE noticiaID = ? AND userID = ?"
            await conexao.query(sqlCode,values)

            return true
        }catch(e){
            return false
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