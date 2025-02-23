import ClienteDB from "../Persistencia/ClienteDAO.js"

export default class ClienteMod {

    #cpf
    #nome
    #telefone
    #senha
    #email
    #recado
    #rg
    #profissao
    #rua
    #CEP
    #numero
    #bairro
    #cidade
    #estado
    #observacao

    constructor(CPF = "", Nome = "", Telefone = "", Senha = "", Email = "", recado = "", rg = "", profissao = "", rua = "", CEP = "", numero = "", bairro = "", cidade = "", estado = "", observacao = "") {
        this.#cpf = CPF;
        this.#nome = Nome;
        this.#telefone = Telefone
        this.#senha = Senha
        this.#email = Email
        this.#recado = recado
        this.#rg = rg
        this.#profissao = profissao
        this.#rua = rua
        this.#CEP = CEP
        this.#numero = numero
        this.#bairro = bairro
        this.#cidade = cidade
        this.#estado = estado
        this.#observacao = observacao
    };

    ToJSON() {
        return ({
            cpf: this.#cpf,
            nome: this.#nome,
            telefone: this.#telefone,
            senha: this.#senha,
            email: this.#email,
            recado: this.#recado,
            rg: this.#rg,
            profissao: this.#profissao,
            rua: this.#rua,
            CEP: this.#CEP,
            numero: this.#numero,
            bairro: this.#bairro,
            cidade: this.#cidade,
            estado: this.#estado,
            observacao: this.#observacao
        })
    }

    async Pegar() {
        const dataBase = new ClienteDB()
        const resp = await dataBase.GET()
        return resp
    };

    async PegarValor(cpf) {
        const dataBase = new ClienteDB()
        const resp = await dataBase.GETVAL(this.#nome, cpf)
        return resp
    };

    async SignIn() {
        const dataBase = new ClienteDB()
        const resp = await dataBase.Login(this.#email, this.#senha)
        return resp
    }

    async Inserir(tipo) {
        const dataBase = new ClienteDB()
        let resp;
        let tokenAutenticacao;
        let resposta;
        if (tipo) {
            resp = await dataBase.Login(this.#email, this.#senha)
        } else {
            resp = await dataBase.POST(
                this.#cpf, this.#nome, this.#telefone, this.#senha, this.#email, this.#recado,
                this.#rg, this.#profissao, this.#rua, this.#CEP, this.#numero,
                this.#bairro, this.#cidade, this.#estado, this.#observacao
            )

        }
        console.log(resp)
        if (resp.resp) {
            if(resp.error){
                const errorStart = resp.resp.substring(0,10)
                console.log(resp.resp)
                return {'resposta':errorStart==="Duplicate "?"CPF já cadastrado":"erro do servidor",status:400}
            }else{
                return { 'resposta': resp.resp, 'token': tokenAutenticacao }
            }
        } else {
            return { 'resposta': resp, 'token': tokenAutenticacao }
        }

    };

    async Atualizar(nome, telefone, senha, email, recado, rg, profissao, rua, CEP, numero, bairro, cidade, estado, observacao) {
        const dataBase = new ClienteDB()
        const resp = await dataBase.PUT(this.#cpf, nome, telefone, senha, email, recado, rg, profissao, rua, CEP, numero, bairro, cidade, estado, observacao)
        return resp.resp
    };

    async Excluir() {
        const dataBase = new ClienteDB()
        const resp = await dataBase.DELETE(this.#cpf)
        return resp
    };

}