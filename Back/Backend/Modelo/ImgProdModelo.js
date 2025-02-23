import path  from "path"
import ImgProdDB from "../Persistencia/ImgProdDAO.js"
import toBASE64 from "../Functions/toBase64.js"

///camada modelo de unidades
export default class ImgProdMod {
    #id
    #idprod
    #imagem
    #caminho
    #nome

    constructor(id = "", idProd = "", imagem = "", nome = "") {
        this.#id = id;
        this.#idprod = idProd;
        this.#imagem = imagem;
        this.#nome = nome
        this.#caminho = "C:\\Users\\jgabr\\Downloads\\trabalho\\backup\\Imagens\\produtos"
    }

    ToJSON() {
        return ({
            id: this.#id,
            idProd: this.#idprod,
            nome: this.#nome,
            imagem: this.#imagem
        })
    }



    async coletarValor(conexao) {
        try {
            const DataBase = new ImgProdDB()
            const resp = await DataBase.GETVAL(conexao, this.#idprod)
            for (let img of resp.content) {
                const filepath = path.join(this.#caminho, img.nome + "." + img.imagem)
                const respImg = toBASE64(filepath)
                img["file"] = respImg;
            }
            return resp
        } catch (e) {
            console.log("eu", e)
        }
    }



    async adicionar(conexao) {
        const DataBase = new ImgProdDB()
        const resp = await DataBase.POST(conexao,this.#nome,this.#idprod,this.#imagem)
        return resp
    }



    async deletar(conexao) {
        const DataBase = new ImgProdDB()
        const resp = await DataBase.DELETE(conexao, this.#id)
        return resp
    }
}