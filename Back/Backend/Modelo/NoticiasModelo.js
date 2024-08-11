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

    constructor(title = "", subtitle = "", article = "", imagemNome = "", cpfresponsavel = "", id = "") {
        this.#title = title;
        this.#subtitle = subtitle;
        this.#article = article;
        this.#imagemnome = imagemNome;
        this.#cpfresp = cpfresponsavel
        this.#id = id
        this.#caminho = "C:\\Users\\jgabr\\Downloads\\trabalho\\backup\\Imagens\\posts"
    }

    ToJSON(nome = "") {
        return ({
            title: this.#title,
            subtitle: this.#subtitle,
            article: this.#article,
            imagem: this.#imagemnome,
            cpfresp: this.#cpfresp,
            id: this.#id,
            nome: nome
        })
    }

    async coletar(conexao) {
        const DataBase = new NoticiaDB()
        const resp = await DataBase.GET(conexao)
        for (let img of resp) {
            const filepath = path.join(this.#caminho, img.title + "." + img.imagem.split('.')[1])
            const respImg = toBASE64(filepath)
            img["file"] = respImg;
        }
        return resp
    }

    async coletarNome(conexao) {
        const DataBase = new NoticiaDB()
        const resp = await DataBase.GETTitle(conexao, this.#title)
        for (let img of resp) {
            const filepath = path.join(this.#caminho, img.title + "." + img.imagem.split('.')[1])
            const respImg = toBASE64(filepath)
            img["file"] = respImg;
        }

        return resp
    }

    async adiciona(conexao) {
        const DataBase = new NoticiaDB()
        const resp = await DataBase.POST(conexao, this.#title, this.#subtitle, this.#article, this.#imagemnome, this.#cpfresp)

        return resp
    }

    async editar(conexao) {
        const DataBase = new NoticiaDB()
        const resp = await DataBase.PUT(conexao, this.#title, this.#subtitle, this.#article, this.#imagemnome, this.#cpfresp, this.#id)

        return resp
    }

    async deletar(conexao) {
        const DataBase = new NoticiaDB()
        const resp = await DataBase.DELETE(conexao, this.#id)

        
    }

}