import ContaDB from "../Persistencia/ContaDAO.js"

///camada modelo de unidades
export default class ContaMod {
    #id
    #nome
    #data_V
    #data_I
    #valor
    #cpfResp
    #status
    #tipo
    #mensal

    constructor(nome="",dataV="",dataI="",valor="",cpfResp="",status="",tipo="",mensal="",id="") {
        this.#nome=nome;
        this.#data_V=dataV;
        this.#data_I=dataI;
        this.#valor=valor;
        this.#cpfResp=cpfResp;
        this.#status=status;
        this.#tipo=tipo;
        this.#mensal=mensal;
        this.#id=id;
    }

    ToJSON(usuario) {
        return ({
            RespNome:usuario,
            dataV:this.#data_V,
            dataI:this.#data_I,
            valor:this.#valor,
            nome:this.#nome,
            cpfResp:this.#cpfResp,
            status:this.#status,
            mensal:this.#mensal,
            tipo:this.#tipo,
            id:this.#id
        })
    }

    async coletar(conexao) {
        const DataBase = new ContaDB()
        const resp = await DataBase.GET(conexao)
        return resp
    }

    async coletarValor(conexao,tipoConta,extra) {
        const DataBase = new ContaDB()
        const resp = await DataBase.GETVAL(conexao,tipoConta,extra)
        return resp
    }

    async coletarID(conexao,id) {
        const DataBase = new ContaDB()
        const resp = await DataBase.GETID(conexao,id)
        return resp
    }


    async adicionar(conexao) {
        const DataBase = new ContaDB()
        const resp = await DataBase.POST(conexao,this.#data_V,this.#data_I,this.#valor,this.#nome,this.#cpfResp,this.#status,this.#tipo,this.#mensal)
        return resp
    }

    async atualizar(conexao){
        const DataBase = new ContaDB()
        const resp = await DataBase.PUT(conexao,this.#status,this.#cpfResp,this.#id)
        return resp
    }
}