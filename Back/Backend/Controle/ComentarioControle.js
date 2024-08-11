import CommentMod from "../Modelo/ComentarioModelo.js"
import Conectar from "../Persistencia/Conexao.js"

export default class CommentsCTRL{
    async GET(req,resp){
        const conexao = await Conectar()
        const model = new CommentMod()
        const resposta = await model.coletar(conexao) 
        return resp.json({itens:resposta}).status(500)
    }

    async GETVAL(req,resp){
        return resp.json({msg:"oi? valor"})
    }

    async POST(req,resp){
        return resp.json({msg:"oi? enviar"})
    }

    async PUT(req,resp){
        return resp.json({msg:"oi? editar"})
    }

    async DELETE(req,resp){
        return resp.json({msg:"oi? deletado"})
    }
}