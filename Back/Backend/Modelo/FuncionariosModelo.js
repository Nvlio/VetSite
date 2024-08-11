import FuncionarioDB from "../Persistencia/FuncionariosDAO.js"

export default class FuncionariMod{
    
    #cpf
    #nome
    #telefone
    #senha
    #email
    #unidade
    #especialidade
    #funcao

    constructor(CPF="",Nome="",Telefone="",Senha="",Email="",Especialidade="",Funcao="",Unidade=""){
        this.#cpf=CPF;
        this.#nome=Nome;
        this.#telefone=Telefone
        this.#senha=Senha
        this.#email=Email
        this.#especialidade = Especialidade
        this.#funcao = Funcao
        this.#unidade = Unidade
    };

    ToJSON(){
        return({
            cpf:this.#cpf,
            nome:this.#nome,
            telefone:this.#telefone,
            senha:this.#senha,
            email:this.#email,
            especialidade:this.#especialidade,
            funcao:this.#funcao ,
            unidade:this.#unidade 
        })
    }


    async Pegar(){
        const dataBase = new FuncionarioDB()
        const resp = await dataBase.GET()
        return resp
    };

    async PegarValor(){
        const dataBase = new FuncionarioDB()
        const resp = await dataBase.GETVAL(this.#nome,this.#especialidade,this.#funcao,this.#unidade)
        return resp
    };

    async PegarValorcpf(){
        const dataBase = new FuncionarioDB()
        const resp = await dataBase.GETVALCPF(this.#cpf)
        return resp
    }

    async SignIn(){
        const dataBase = new FuncionarioDB()
        const resp = await dataBase.Login(this.#email,this.#senha)
        return resp
    }

    async Inserir(tipo){
        const dataBase = new FuncionarioDB()
        let resp;
        let tokenAutenticacao;
        let resposta;
        if(tipo){
            resp= await dataBase.Login(this.#email,this.#senha)
        }else{
            resp = await dataBase.POST(this.#cpf,this.#nome,this.#telefone,this.#senha,this.#email,this.#especialidade,this.#funcao ,this.#unidade )
            
        }
        console.log(resp)
        if(resp.resp){
            return {'resposta':resp.resp,'token':tokenAutenticacao}
        }else{
            return {'resposta':resp,'token':tokenAutenticacao}
        }
        
    };

    async Atualizar(nome,telefone,senha,email,especialidade,unidade,funcao){
        const dataBase = new FuncionarioDB()
        const resp = await dataBase.PUT(this.#cpf,nome,telefone,senha,email,especialidade,funcao,unidade)
        return resp.resp
    };

    async Excluir(){
        const dataBase = new FuncionarioDB()
        const resp = await dataBase.DELETE(this.#cpf)
        return resp
    };

}