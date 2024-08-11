import especieDB from "../Persistencia/especieDAO.js"

///camada modelo de unidades
export default class especieMod {
    #id
    #nome

    constructor(nome = "", id = "") {
        this.#id = id;
        this.#nome = nome;
    }

    ToJSON() {
        return ({
            id:this.#id,
            nome: this.#nome
        })
    }

    async coletar(conexao) {
        const DataBase = new especieDB()
        const resp = await DataBase.GET(conexao)
        return resp
    }

    async coletarValor(conexao) {
        const DataBase = new especieDB()
        const resp = await DataBase.GETVAL(conexao, this.#nome,this.#id)
        return resp
    }

    async adicionar(conexao) {
        const DataBase = new especieDB()
        const resp = await DataBase.POST(conexao, this.#nome)
        return resp
    }

    async atualizar(conexao) {
        const DataBase = new especieDB()
        const resp = await DataBase.PUT(conexao, this.#nome, this.#id)
        return resp
    }

    async deletar(conexao) {
        const DataBase = new especieDB()
        const resp = await DataBase.DELETE(conexao, this.#id)
        return resp
    }
}