import ComprasDB from "../Persistencia/ComprasDAO.js"

///camada modelo de unidades
export default class CompraMod {
    #id
    #data
    #cpf_User
    #valor
    #prodId
    #qntd
    #qntdTotal

    constructor(data="",valor="",qntd="",cpf="",prodId="",id="",qntdTtotal="") {
        this.#cpf_User = cpf;
        this.#data = data;
        this.#valor = valor;
        this.#qntd = qntd
        this.#id = id;
        this.#qntdTotal=qntdTtotal
        this.#prodId = prodId
    }

    ToJSON(usuario,produto) {
        return ({
            cpf:usuario,
            prodId:produto,
            data:this.#data,
            qntd:this.#qntd,
            valor:this.#valor,
            id:this.#id,
        })
    }

    async coletar(conexao) {
        const DataBase = new ComprasDB()
        const resp = await DataBase.GET(conexao)
        return resp
    }

    async coletarValor(conexao,nome,produto) {
        const DataBase = new ComprasDB()
        const resp = await DataBase.GETVAL(conexao,nome,produto)
        return resp
    }

    async adicionar(conexao) {
        const DataBase = new ComprasDB()
        const resp = await DataBase.POST(conexao,this.#cpf_User,this.#valor,this.#data,this.#qntd,this.#prodId,this.#qntdTotal)
        return resp
    }

}