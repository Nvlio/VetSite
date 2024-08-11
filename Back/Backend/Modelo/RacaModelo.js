import RacaDB from "../Persistencia/RacaDAO.js"

///camada modelo de unidades
export default class RacaMod {
    #id
    #nome
    #especie

    constructor(nome = "",especie ="", id = "") {
        this.#id = id;
        this.#nome = nome;
        this.#especie = especie;
    }

    ToJSON() {
        return ({
            id:this.#id,
            nome: this.#nome,
            especie:this.#especie
        })
    }

    async coletar(conexao) {
        const DataBase = new RacaDB()
        const resp = await DataBase.GET(conexao)
        return resp
    }

    async coletarValor(conexao) {
        const DataBase = new RacaDB()
        const resp = await DataBase.GETVAL(conexao, this.#nome,this.#especie,this.#id)
        return resp
    }

    async adicionar(conexao) {
        const DataBase = new RacaDB()
        const resp = await DataBase.POST(conexao, this.#nome,this.#especie)
        return resp
    }

    async atualizar(conexao) {
        const DataBase = new RacaDB()
        const resp = await DataBase.PUT(conexao, this.#nome,this.#especie, this.#id)
        return resp
    }

    async deletar(conexao) {
        const DataBase = new RacaDB()
        const resp = await DataBase.DELETE(conexao, this.#id)
        return resp
    }
}