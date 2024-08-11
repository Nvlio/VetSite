import PacienteDB from "../Persistencia/PacienteDAO.js"

export default class PacienteMod {

    #id
    #nome
    #sexo
    #id_dono
    #especie
    #raca

    constructor(id = "", sexo = "", id_dono = "", especie = "", raca = "", nome = "") {
        this.#id = id;
        this.#nome = nome;
        this.#sexo = sexo
        this.#id_dono = id_dono
        this.#especie = especie
        this.#raca = raca
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
            dono: dono
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
        const resp = await dataBase.GETVAL(this.#nome, this.#id_dono,dono)
        return resp
    };


    async Inserir() {
        const dataBase = new PacienteDB()
        let resp;
        resp = await dataBase.POST(this.#nome, this.#especie, this.#raca, this.#sexo, this.#id_dono)
        return { 'resposta': resp.resp }

    };

    async Atualizar(nome, especie, raca) {
        const dataBase = new PacienteDB()
        const resp = await dataBase.PUT(nome, especie, raca, this.#id)
        return resp.resp
    };

    async Excluir() {
        const dataBase = new PacienteDB()
        const resp = await dataBase.DELETE(this.#id)
        return resp
    };

}