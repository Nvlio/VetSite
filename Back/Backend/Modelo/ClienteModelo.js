import ClienteDB from "../Persistencia/ClienteDAO.js"

export default class ClienteMod{
    
    #cpf
    #nome
    #telefone
    #senha
    #email

    constructor(CPF="",Nome="",Telefone="",Senha="",Email=""){
        this.#cpf=CPF;
        this.#nome=Nome;
        this.#telefone=Telefone
        this.#senha=Senha
        this.#email=Email
    };

        ToJSON(){
        return({
            cpf:this.#cpf,
            nome:this.#nome,
            telefone:this.#telefone,
            senha:this.#senha,
            email:this.#email
        })
    }

    async Pegar(){
        const dataBase = new ClienteDB()
        const resp = await dataBase.GET()
        return resp
    };

    async PegarValor(cpf){
        const dataBase = new ClienteDB()
        const resp = await dataBase.GETVAL(this.#nome,cpf)
        return resp
    };

    async SignIn(){
        const dataBase = new ClienteDB()
        const resp = await dataBase.Login(this.#email,this.#senha)
        return resp
    }

    async Inserir(tipo){
        const dataBase = new ClienteDB()
        let resp;
        let tokenAutenticacao;
        let resposta;
        if(tipo){
            resp= await dataBase.Login(this.#email,this.#senha)
        }else{
            resp = await dataBase.POST(this.#cpf,this.#nome,this.#telefone,this.#senha,this.#email)
            
        }
        console.log(resp)
        if(resp.resp){
            return {'resposta':resp.resp,'token':tokenAutenticacao}
        }else{
            return {'resposta':resp,'token':tokenAutenticacao}
        }
        
    };

    async Atualizar(nome,telefone,senha,email){
        const dataBase = new ClienteDB()
        const resp = await dataBase.PUT(this.#cpf,nome,telefone,senha,email)
        return resp.resp
    };

    async Excluir(){
        const dataBase = new ClienteDB()
        const resp = await dataBase.DELETE(this.#cpf)
        return resp
    };

}