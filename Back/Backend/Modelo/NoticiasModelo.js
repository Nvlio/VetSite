//depois fazer isso se focar na parte de imagem primeiro
import toBASE64 from "../Functions/toBase64.js";
import NoticiaDB from "../Persistencia/NoticiaDAO.js";
import path from 'path'

export default class NoticiaModelo {
    #title;
    #subtitle;
    #article
    #imagemnome
    #cpfresp
    #id
    #caminho
    #dataE
    #data
    #Curtido

    constructor(title = "", subtitle = "", article = "", imagemNome = "", cpfresponsavel = "", data = "", id = "", dataE = "") {
        this.#title = title;
        this.#subtitle = subtitle;
        this.#article = article;
        this.#imagemnome = imagemNome;
        this.#cpfresp = cpfresponsavel
        this.#id = id
        this.#data = data
        this.#dataE = dataE
        this.#caminho = "C:\\Users\\jgabr\\Downloads\\trabalho\\backup\\Imagens\\posts"
    }

    ToJSON(nome = "",isLiked=false) {
        return ({
            title: this.#title,
            subtitle: this.#subtitle,
            article: this.#article,
            imagem: this.#imagemnome,
            cpfresp: this.#cpfresp,
            id: this.#id,
            data: this.#data,
            datE: this.#dataE,
            curtido:isLiked,
            nome: nome
        })
    }

    async coletar(conexao) {
        const DataBase = new NoticiaDB()
        const resp = await DataBase.GET(conexao)
        for (let img of resp) {
            const filepath = path.join(this.#caminho, img.imagem)
            const respImg = toBASE64(filepath)
            img["file"] = respImg;
        }
        return resp
    }

    async coletarNome(conexao,cpf) {
        const DataBase = new NoticiaDB()
        const likedAlready = await DataBase.CheckLIKE(conexao,this.#id,cpf)
        const resp = await DataBase.GETTitle(conexao, this.#title, this.#id,likedAlready)
        for (let img of resp) {
            const filepath = path.join(this.#caminho, img.imagem)
            const respImg = toBASE64(filepath)
            img["file"] = respImg;
        }

        return resp
    }

    async coletarTOP(conexao) {
        const DataBase = new NoticiaDB()
        const resp = await DataBase.GETTOP(conexao, this.#id)
        return resp
    }

    async adiciona(conexao) {
        const DataBase = new NoticiaDB()
        const resp = await DataBase.POST(conexao, this.#title, this.#subtitle, this.#article, this.#imagemnome, this.#cpfresp, this.#data, this.#dataE)

        return resp
    }

    async editar(conexao) {
        const DataBase = new NoticiaDB()
        const resp = await DataBase.PUT(conexao, this.#title, this.#subtitle, this.#article, this.#imagemnome, this.#cpfresp, this.#id)

        return resp
    }

    async curtirNoticia(conexao,userID){
        const Database = new NoticiaDB();
        const likedAlready = await Database.CheckLIKE(conexao,this.#id,userID)
        let resposta = false
        console.log("ssss")
        if(!likedAlready){
            resposta = await Database.LIKE(conexao,this.#id,userID)
        }else{
            resposta = await Database.DISLIKE(conexao,this.#id,userID)
        }
        return resposta
    }

    async deletar(conexao) {
        const DataBase = new NoticiaDB()
        const resp = await DataBase.DELETE(conexao, this.#id)


    }

}