import UnidadeDB from "../Persistencia/UnidadeDAO.js";

///camada modelo de unidades
export default class UnidadeMod {
    #nome
    #endereco
    #telefone
    #id

    constructor(nome = "", endereco = "", telefone = "",id="") {
        this.#nome = nome;
        this.#endereco = endereco;
        this.#telefone = telefone;
        this.#id = id;
    }

    ToJSON() {
        return ({
            unidade:this.#id,
            id:this.#id,
            nome: this.#nome,
            endereco: this.#endereco,
            telefone: this.#telefone
        })
    }

    async coletar(conexao) {
        const DataBase = new UnidadeDB()
        const resp = await DataBase.GET(conexao)
        return resp
    }

    async coletarValor(conexao,cidade,nome) {
        const DataBase = new UnidadeDB()
        const resp = await DataBase.GETVAL(conexao,cidade,nome)
        return resp
    }

    async adicionar(conexao) {
        const DataBase = new UnidadeDB()
        const resp = await DataBase.POST(conexao,this.#nome,this.#endereco,this.#telefone)
        return resp
    }

    async atualizar(conexao) {
        const DataBase = new UnidadeDB()
        const resp = await DataBase.PUT(conexao,this.#nome,this.#endereco,this.#telefone,this.#id)
        return resp
    }

    async deletar(conexao) {
        const DataBase = new UnidadeDB()
        const resp = await DataBase.DELETE(conexao,this.#id)
        return resp
    }
}