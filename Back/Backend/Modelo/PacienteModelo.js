import PacienteDB from "../Persistencia/PacienteDAO.js"

export default class PacienteMod {

    #id
    #nome
    #sexo
    #id_dono
    #especie
    #raca
    #data_nascimento
    #comportamento
    #pedigree
    #raca_predominante
    #raca_secundaria
    #porte
    #pelo
    #cor_predominante
    #cor_secundaria
    #alergias
    #reacao
    #observacao

    constructor(id = "", sexo = "", id_dono = "", especie = "", raca = "", nome = "", data_nascimento = "", comportamento = "", pedigree = "", raca_predominante = "", raca_secundaria = "", porte = "", pelo = "", cor_predominante = "", cor_secundaria = "", alergias = "", reacao = "", observacao) {
        this.#id = id;
        this.#nome = nome;
        this.#sexo = sexo
        this.#id_dono = id_dono
        this.#especie = especie
        this.#raca = raca
        this.#data_nascimento = data_nascimento
        this.#comportamento = comportamento
        this.#pedigree = pedigree
        this.#raca_predominante = raca_predominante
        this.#raca_secundaria = raca_secundaria
        this.#porte = porte
        this.#pelo = pelo
        this.#cor_predominante = cor_predominante
        this.#cor_secundaria = cor_secundaria
        this.#alergias = alergias
        this.#reacao = reacao
        this.#observacao = observacao
    };

    //item.id, item.sexo, item.id_dono, item.especie, item.raca,item.nome
    ToJSON(dono) {
        return ({
            id: this.#id,
            sexo: this.#sexo,
            id_dono: this.#id_dono,
            especie: this.#especie,
            raca: this.#raca,
            nome: this.#nome,
            dono: dono,
            data_nascimento:this.#data_nascimento,
            comportamento:this.#comportamento,
            pedigree:this.#pedigree,
            raca_predominante:this.#raca_predominante,
            raca_secundaria:this.#raca_secundaria,
            porte:this.#porte,
            pelo:this.#pelo,
            cor_predominante:this.#cor_predominante,
            cor_secundaria:this.#cor_secundaria,
            alergias:this.#alergias,
            reacao:this.#reacao,
            observacao:this.#observacao
        })
    }

    async PegarTudo() {
        const dataBase = new PacienteDB()
        const resp = await dataBase.GETALL()
        return resp
    }

    async Pegar(cpf) {
        const dataBase = new PacienteDB()
        const resp = await dataBase.GET(cpf)
        return resp
    };

    async PegarValor(dono) {
        const dataBase = new PacienteDB()
        const resp = await dataBase.GETVAL(this.#nome, this.#id_dono, dono)
        return resp
    };


    async Inserir() {
        const dataBase = new PacienteDB()
        let resp; 
        resp = await dataBase.POST(
            this.#nome,          this.#especie,  this.#raca,              this.#sexo,           this.#id_dono, this.#data_nascimento,
            this.#comportamento, this.#pedigree, this.#raca_predominante, this.#raca_secundaria,
            this.#porte,         this.#pelo,     this.#cor_predominante,  this.#cor_secundaria, this.#alergias,
            this.#reacao,        this.#observacao
        )
        return { 'resposta': resp.resp }

    };

    async Atualizar(nome, especie, raca, data_nascimento, comportamento, pedigree, raca_predominante, raca_secundaria, porte, pelo, cor_predominante, cor_secundaria, alergias, reacao, observacao) {
        const dataBase = new PacienteDB()
        const resp = await dataBase.PUT(nome, especie, raca, this.#id, data_nascimento, comportamento, pedigree, raca_predominante, raca_secundaria, porte, pelo, cor_predominante, cor_secundaria, alergias, reacao, observacao)
        return resp.resp
    };

    async Excluir() {
        const dataBase = new PacienteDB()
        const resp = await dataBase.DELETE(this.#id)
        return resp
    };

}