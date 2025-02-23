import path from "path"
import FuncionarioDB from "../Persistencia/FuncionariosDAO.js"
import toBASE64 from "../Functions/toBase64.js"

export default class FuncionariMod {

    #cpf
    #nome
    #telefone
    #senha
    #email
    #unidade
    #especialidade
    #funcao
    #salario
    #CEP
    #endereco
    #numero
    #bairro
    #cidade
    #estado
    #caminho

    constructor(CPF = "", Nome = "", Telefone = "", Senha = "", Email = "", Especialidade = "", Funcao = "", Unidade = "", salario = "", CEP = "", endereco = "", numero = "", bairro = "", cidade = "", estado = "") {
        this.#cpf = CPF;
        this.#nome = Nome;
        this.#telefone = Telefone
        this.#senha = Senha
        this.#email = Email
        this.#especialidade = Especialidade
        this.#funcao = Funcao
        this.#unidade = Unidade
        this.#salario = salario
        this.#CEP = CEP
        this.#endereco = endereco
        this.#numero = numero
        this.#bairro = bairro
        this.#cidade = cidade
        this.#estado = estado
        this.#caminho = "C:\\Users\\jgabr\\Downloads\\trabalho\\backup\\Imagens\\Perfil"
    };

    ToJSON(nomeArquivo) {
        return ({
            cpf: this.#cpf,
            nome: this.#nome,
            telefone: this.#telefone,
            senha: this.#senha,
            email: this.#email,
            especialidade: this.#especialidade,
            funcao: this.#funcao,
            unidade: this.#unidade,
            salario: this.#salario,
            CEP: this.#CEP,
            endereco: this.#endereco,
            numero: this.#numero,
            bairro: this.#bairro,
            cidade: this.#cidade,
            estado: this.#estado,
            nomeArquivo: nomeArquivo

        })
    }


    async Pegar() {
        const dataBase = new FuncionarioDB()
        const resp = await dataBase.GET()
        return resp
    };

    async PegarValor() {
        const dataBase = new FuncionarioDB()
        const resp = await dataBase.GETVAL(this.#nome, this.#especialidade, this.#funcao, this.#unidade)
        return resp
    };

    async PegarValorcpf() {
        const dataBase = new FuncionarioDB()
        const resp = await dataBase.GETVALCPF(this.#cpf)
        const filepath = path.join(this.#caminho, resp.nomeArquivo)
        const img = toBASE64(filepath)
        resp["image"] = img
        return resp
    }



    async SignIn() {
        const dataBase = new FuncionarioDB()
        const resp = await dataBase.Login(this.#email, this.#senha)
        return resp
    }

    async Inserir(tipo) {
        const dataBase = new FuncionarioDB()
        let resp;
        let tokenAutenticacao;
        let resposta;
        if (tipo) {
            resp = await dataBase.Login(this.#email, this.#senha)
        } else {
            resp = await dataBase.POST(
                this.#cpf, this.#nome, this.#telefone, this.#senha,
                this.#email, this.#especialidade, this.#unidade,
                this.#funcao, this.#salario, this.#CEP,
                this.#endereco, this.#numero, this.#bairro,
                this.#cidade, this.#estado
            )
            const saveImg = await dataBase.SaveImg(nome + "." + file.originalname.split(".")[1], this.#cpf)
        }
        console.log(resp)
        if (resp.resp) {
            return { 'resposta': resp.resp, 'token': tokenAutenticacao }
        } else {
            return { 'resposta': resp, 'token': tokenAutenticacao }
        }

    };

    async Atualizar(nome, telefone, senha, email, especialidade, unidade, funcao, salario, cep, endereco, numero, bairro, cidade, estado, file) {
        const dataBase = new FuncionarioDB()
        const resp = await dataBase.PUT(this.#cpf, nome, telefone, senha, email, especialidade, funcao, unidade, salario, cep, endereco, numero, bairro, cidade, estado)
        const saveImg = await dataBase.UPDImg(nome + "." + file.originalname.split(".")[1], this.#cpf)
        return resp.resp
    };

    async Excluir() {
        const dataBase = new FuncionarioDB()
        const resp = await dataBase.DELETE(this.#cpf)
        return resp
    };

}