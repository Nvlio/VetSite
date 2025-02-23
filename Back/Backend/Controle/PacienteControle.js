
import PacienteMod from "../Modelo/PacienteModelo.js";

export default class PacienteControle {

    //função para pegar dados
    async GETALL(req, resp) {
        if (req.method == "GET") {
            const modelo = new PacienteMod();
            const resposta = await modelo.PegarTudo()

            return resp.json({ itens: resposta })


        } return resp.json({ resp: 0 })
    }

    async GET(req, resp) {
        if (req.method == "GET") {
            const cpf = req.params.cpf
            const nome = req.params.nome
            if (nome) { this.GETVal(req, resp) } else {
                const modelo = new PacienteMod();
                const resposta = await modelo.Pegar(cpf)

                return resp.json({ itens: resposta })
            }
            return resp.json({ resp: 0 })
        }
    }

    //função para pegar dados especificos
    async GETVal(req, resp) {
        if (req.method == "GET") {
            const cpf = req.params.cpf
            let nome = req.params.nome
            let dono = req.params.dono
            const regex = /-(?=[^-])/g
            nome = nome.split(regex)[0]
            const modelo = new PacienteMod(null, null, cpf, null, null, nome);
            const resposta = await modelo.PegarValor(dono)
            console.log(resposta)
            return resp.json({ itens: resposta })
        }
        return resp.json({ resp: 0 })
    }


    //função para inserir
    async POST(req, resp) {
        if (req.method == "POST" && req.is('application/json')) {

            const body = req.body;
            const cpf = body.dono;
            const nome = body.nome;
            const especie = body.especie;
            const raca = body.raca;
            const sexo = body.sexo == "Masculino" ? 0 : 1
            const data_nascimento = body.data
            const comportamento = body.comportamento
            const pedigree = body.pedigree
            const raca_predominante = "None"
            const raca_secundaria = "None"
            const porte = body.porte
            const pelo = body.pelo
            const cor_predominante = body.cor1
            const cor_secundaria = body.cor2
            const alergias = body.alergia
            const reacao = body.reacao
            const observacao = body.observacao

            if (cpf, nome, especie, sexo, raca, data_nascimento, comportamento, pedigree, raca_predominante, raca_secundaria, porte, pelo, cor_predominante, cor_secundaria, alergias, reacao, observacao) {
                const modelo = new PacienteMod(null, sexo, cpf, especie, raca, nome, data_nascimento, comportamento, pedigree, raca_predominante, raca_secundaria, porte, pelo, cor_predominante, cor_secundaria, alergias, reacao, observacao);
                const resposta = await modelo.Inserir()
                if (resposta.resposta == "work") {
                    return resp.json({ conta: "cliente", resp: resposta.resposta })
                }
                if (resposta.resposta.message) {
                    return resp.json({ msg: { message: resposta.resposta.message } })
                } else if (resposta.resposta.code) {
                    return resp.json({ msg: { message: resposta.resposta.code } })
                }
            }
            return resp.json({ msg: { message: "falta dados" } })
        }
    }

    //função para atualizar 
    async PUT(req, resp) {
        if (req.method == "PUT" && req.is('application/json')) {

            const body = req.body;
            const id = req.params.id
            const nome = body.nome;
            const especie = body.especie;
            const sexo = body.sexo;
            const raca = body.raca;
            const data_nascimento = body.data_nascimento
            const comportamento = body.comportamento
            const pedigree = body.pedigree
            const raca_predominante = body.raca_predominante
            const raca_secundaria = body.raca_secundaria
            const porte = body.porte
            const pelo = body.pelo
            const cor_predominante = body.cor_predominante
            const cor_secundaria = body.cor_secundaria
            const alergias = body.alergias
            const reacao = body.reacao
            const observacao = body.observacao

            if (id != undefined || id != "" || id != "undefined") {
                const modelo = new PacienteMod(id);
                const resposta = await modelo.Atualizar(nome, especie, raca, data_nascimento, comportamento, pedigree, raca_predominante, raca_secundaria, porte, pelo, cor_predominante, cor_secundaria, alergias, reacao, observacao)
                console.log(resposta)
                return resp.json({ resp: resposta })
            }
        }
        return resp.json({ resp: 0 })
    }

    async DELETE(req, resp) {
        if (req.method == "DELETE") {

            const id = req.params.id
            if (id) {
                const modelo = new PacienteMod(id);
                const resposta = await modelo.Excluir()
                return resp.json({ msg: resposta })
            }
        }
        return resp.json({ resp: 0 })
    }

}