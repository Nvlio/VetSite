import ProdutoDB from "../Persistencia/ProdutoDAO.js"

///camada modelo de unidades
export default class ProdutoMod {
    #id    
    #nome
    #valor
    #validade
    #quantidade
    #fornecedor

    constructor(nome="", valor="",validade="",quantidade="",fornecedor="",id="") {
        this.#id=id;
        this.#nome=nome;
        this.#valor=valor;
        this.#validade=validade;
        this.#quantidade=quantidade;
        this.#fornecedor=fornecedor
    }

    ToJSON() {
        return ({
            nome:this.#nome,
            valor:this.#valor,
            validade:this.#validade,
            quantidade:this.#quantidade,
            fornecedor:this.#fornecedor,
            id:this.#id
        })
    }

    async coletar(conexao) {
        const DataBase = new ProdutoDB()
        const resp = await DataBase.GET(conexao)
        return resp
    }

    async coletarValor(conexao) {
        const DataBase = new ProdutoDB()
        const resp = await DataBase.GETVAL(conexao,this.#nome,this.#fornecedor)
        return resp
    }

    async adicionar(conexao) {
        const DataBase = new ProdutoDB()
        const resp = await DataBase.POST(conexao,this.#nome,this.#valor,this.#validade,this.#quantidade,this.#fornecedor)
        return resp
    }

    async atualizar(conexao) {
        const DataBase = new ProdutoDB()
        const resp = await DataBase.PUT(conexao,this.#nome,this.#valor,this.#validade,this.#quantidade,this.#fornecedor,this.#id)
        return resp
    }

    async deletar(conexao) {
        const DataBase = new ProdutoDB()
        const resp = await DataBase.DELETE(conexao,this.#id)
        return resp
    }
}