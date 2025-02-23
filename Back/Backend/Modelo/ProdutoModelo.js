import { error } from "console"
import ProdutoDB from "../Persistencia/ProdutoDAO.js"
import ImgProdMod from "./ImgProdModelo.js"

///camada modelo de unidades
export default class ProdutoMod {
    #id
    #nome
    #valor
    #validade
    #quantidade
    #fornecedor
    #descricao
    #categoria

    constructor(nome = "", valor = "", validade = "", quantidade = "", fornecedor = "", id = "", descricao = "", categoria = "") {
        this.#id = id;
        this.#nome = nome;
        this.#valor = valor;
        this.#validade = validade;
        this.#quantidade = quantidade;
        this.#fornecedor = fornecedor;
        this.#descricao = descricao
        this.#categoria = categoria
    }

    ToJSON() {
        return ({
            nome: this.#nome,
            valor: this.#valor,
            validade: this.#validade,
            quantidade: this.#quantidade,
            fornecedor: this.#fornecedor,
            id: this.#id,
            descricao: this.#descricao,
            categoria: this.#categoria,
            img: []
        })
    }

    async coletar(conexao) {
        const DataBase = new ProdutoDB()
        const resp = await DataBase.GET(conexao)
        return resp
    }

    async coletarWimages(conexao) {
        try {
            const DataBase = new ProdutoDB()
            const resp = await DataBase.GET(conexao)
            for (let prod of resp.content) {
                const prodImg = new ImgProdMod(null, prod.id, null, null)
                const resposta = await prodImg.coletarValor(conexao)
                prod.img.push(resposta.content)
            }
            return resp
        } catch (e) {
            console.log(e)
            return e
        }
    }

    async coletarValor(conexao) {
        const DataBase = new ProdutoDB()
        const resp = await DataBase.GETVAL(conexao, this.#nome, this.#fornecedor, this.#id)
        const prodImg = new ImgProdMod(null, resp.content[0].id, null, null)
        const resposta = await prodImg.coletarValor(conexao)
        resp.content[0].img = resposta.content
        return resp
    }

    async coletarValorFiltrado(conexao) {
        try {
            const DataBase = new ProdutoDB()
            const resp = await DataBase.GETVALFilter(conexao,this.#valor,this.#categoria)
            for (let prod of resp.content) {
                const prodImg = new ImgProdMod(null, prod.id, null, null)
                const resposta = await prodImg.coletarValor(conexao)
                prod.img.push(resposta.content)
            }
            return resp
        } catch (e) {
            console.log(e)
            return e
        }
    }

    async coletarecente(conexao, img) {
        const DataBase = new ProdutoDB()
        const resp = await DataBase.GETRec(conexao)

        let ind = 0
        for (let item of Object.keys(img)) {
            const modelo = new ImgProdMod(null, resp.content[0].id, img[item][0].originalname.split(".")[1], `${resp.content[0].nome}[${ind}]`)
            await modelo.adicionar(conexao)
            ind += 1

        }
        return resp
    }

    async adicionar(conexao, img) {
        const DataBase = new ProdutoDB()
        const resp = await DataBase.POST(conexao, this.#nome, this.#valor, this.#validade, this.#quantidade, this.#fornecedor, this.#descricao,this.#categoria)
        this.coletarecente(conexao, img)
        return resp
    }

    async atualizar(conexao) {
        const DataBase = new ProdutoDB()
        const resp = await DataBase.PUT(conexao, this.#nome, this.#valor, this.#validade, this.#quantidade, this.#fornecedor, this.#id, this.#descricao)
        return resp
    }

    async deletar(conexao) {
        const DataBase = new ProdutoDB()
        const resp = await DataBase.DELETE(conexao, this.#id)
        return resp
    }
}