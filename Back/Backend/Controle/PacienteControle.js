
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
            const cpf = body.cpf;
            const nome = body.nome;
            const especie = body.especie;
            const raca = body.raca;
            const sexo = body.sexo == "Masculino" ? 0 : 1

            if (cpf, nome, especie, sexo, raca) {
                const modelo = new PacienteMod(null, sexo, cpf, especie, raca, nome);
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
            if (id != undefined || id != "" || id != "undefined") {
                const modelo = new PacienteMod(id);
                const resposta = await modelo.Atualizar(nome, especie, raca)
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