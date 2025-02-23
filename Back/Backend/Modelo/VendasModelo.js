import VendasDB from "../Persistencia/VendasDAO.js"

///camada modelo de unidades
export default class VendaseMod {
    #id
    #data
    #cpf_User
    #valor
    #formPagar
    #parcelas
    #prods
    #qntdTotal

    constructor(data="",valor="",formPagar="",parcelas="",cpf="",prods="",id="",qntdTotal="") {
        this.#cpf_User = cpf;
        this.#data = data;
        this.#valor = valor;
        this.#id = id;
        this.#prods = prods
        this.#formPagar = formPagar,
        this.#parcelas = parcelas
        this.#qntdTotal = qntdTotal
    }

    ToJSON(nome,prodNome,prodValor,prodQntd) {
        return ({
            cpf:nome,
            data:this.#data,
            valor:this.#valor,
            formaPagamento:this.#formPagar,
            parcelas:this.#parcelas,
            quantidade:this.#qntdTotal,
            id:this.#id,
            prodNome:prodNome,
            prodValor:prodValor,
            prodqntd:prodQntd
        })
    }

    async coletar(conexao) {
        const DataBase = new VendasDB()
        const resp = await DataBase.GET(conexao)
        return resp
    }

    async coletarValor(conexao,nome) {
        const DataBase = new VendasDB()
        const resp = await DataBase.GETVAL(conexao,nome)
        return resp
    }

    async coletarValorEspecifico(conexao,id) {
        const DataBase = new VendasDB()
        const resp = await DataBase.GETVALSpecific(conexao,id)
        return resp
    }

    async adicionar(conexao) {
        const DataBase = new VendasDB()
        const resp = await DataBase.POST(conexao,this.#cpf_User,this.#valor,this.#data,this.#formPagar,this.#parcelas,this.#qntdTotal)
        const resp1 = await DataBase.POSTvendaProd(conexao,this.#prods) 
        
        return resp
    }

}