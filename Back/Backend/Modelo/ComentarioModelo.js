import CommentDB from "../Persistencia/ComentariosDAO.js"

export default class CommentMod{
    #elogio
    #comentario
    #dono
    #id
    #data
    #DataBase

    constructor(elogio,comentario,dono,id,data){
        this.#elogio = elogio
        this.#comentario = comentario
        this.#dono = dono
        this.#id = id
        this.#data = data
        this.#DataBase = new CommentDB()
    }

    ToJSON(){
        return{
            "id":this.#id,
            "elogio":this.#elogio,
            "comentario":this.#comentario,
            "dono":this.#dono,
            "data":this.#data
        }
    }

    async coletar(conexao){
        const resp = await this.#DataBase.GET(conexao)
        return resp
    }
}