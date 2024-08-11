import Conectar from "./Conexao.js";
import PacienteMod from "../Modelo/PacienteModelo.js";

export default class PacienteDB {

    async GETALL() {
        try {
            const conexao = await Conectar();
            const sqlCode = "SELECT  paciente.id AS numero, paciente.nome AS nome, paciente.sexo, especie.nome AS especie, racas.nome AS raca, usuario.nome AS dono FROM paciente INNER JOIN usuario ON paciente.cpf_dono = usuario.cpf INNER JOIN especie ON paciente.id_especie = especie.id INNER JOIN racas ON paciente.id_raca = racas.id;"
            const [list] = await conexao.query(sqlCode)
            const listaFim = []

            for (let item of list) {
                const modelo = new PacienteMod(item.numero, item.sexo, item.cpf_dono, item.especie, item.raca, item.nome)
                listaFim.push(modelo.ToJSON(item.dono))
            }

            return listaFim
        } catch (e) {
            return ({ resp: e })
        }
    }
    /*SELECT * FROM paciente where cpf_dono = ?*/
    async   GET(cpf) {

        try {
            const conexao = await Conectar();
            const sqlCode = "SELECT paciente.id AS numero, paciente.nome AS nome, paciente.sexo, especie.nome AS especie, racas.nome AS raca, usuario.nome AS dono FROM paciente INNER JOIN usuario ON paciente.cpf_dono = usuario.cpf INNER JOIN especie ON paciente.id_especie = especie.id INNER JOIN racas ON paciente.id_raca = racas.id WHERE cpf_dono=?;"
            const itens = [cpf]
            const [list] = await conexao.query(sqlCode, itens)
            const listaFim = []

            for (let item of list) {
                const modelo = new PacienteMod(item.id, item.sexo, item.cpf_dono, item.especie, item.raca, item.nome)
                listaFim.push(modelo.ToJSON())
            }

            return listaFim
        } catch (e) {
            return ({ resp: e })
        }
    }

    async GETVAL(nome, cpf,dono) {

        try {
            const conexao = await Conectar();
            let sqlCode;
            let itens = []
            const listaFim = []
            let conector="WHERE"

            if (cpf != "_") {
                sqlCode = "SELECT paciente.id AS numero, paciente.nome AS nome, paciente.sexo, especie.nome AS especie, racas.nome AS raca, usuario.nome AS dono FROM paciente INNER JOIN usuario ON paciente.cpf_dono = usuario.cpf INNER JOIN especie ON paciente.id_especie = especie.id INNER JOIN racas ON paciente.id_raca = racas.id WHERE cpf_dono=? ";
                itens.push(cpf)
                sqlCode+=nome!="_"?"AND paciente.nome LIKE ?":"";
                itens.push(nome!="_"?`${nome}%`:null)
                const [list] = await conexao.query(sqlCode, itens)

                for (let item of list) {
                    const modelo = new PacienteMod(item.id, item.sexo, item.cpf_dono, item.especie, item.raca, item.nome)
                    listaFim.push(modelo.ToJSON())
                }
            } else {
                sqlCode = "SELECT paciente.id AS numero, paciente.nome AS nome, paciente.sexo, especie.nome AS especie, racas.nome AS raca, usuario.nome AS dono FROM paciente INNER JOIN usuario ON paciente.cpf_dono = usuario.cpf INNER JOIN especie ON paciente.id_especie = especie.id INNER JOIN racas ON paciente.id_raca = racas.id "
                if(nome!="_"){
                    sqlCode+=` ${conector} paciente.nome LIKE ?`
                    conector="AND "
                    itens.push(`${nome}%`)
                }
                if(dono!="_"){
                    sqlCode+=`${conector} usuario.nome LIKE ?`
                    itens.push(`${dono}%`)
                }
                const [list] = await conexao.query(sqlCode, itens)

                for (let item of list) {
                    const modelo = new PacienteMod(item.id, item.sexo, item.cpf_dono, item.especie, item.raca, item.nome,item)
                    listaFim.push(modelo.ToJSON(item.dono))
                }
            }




            return listaFim
        } catch (e) {
            return ({ resp: e })
        }
    }

    async POST(nome, especie, raca, sexo, cpf_dono) {
        try {
            const conexao = await Conectar();
            const sqlCode = "INSERT INTO paciente (nome,especie,raca,sexo,cpf_dono) VALUES (?,?,?,?,?)"
            const valores = [nome, especie, raca, sexo, cpf_dono]
            await conexao.query(sqlCode, valores)

            return ({ "resp": 'work' })
        } catch (e) {
            return ({ "resp": e })
        }
    }

    async PUT(nome, especie, raca, id) {
        try {
            const conexao = await Conectar();
            let conector = ""
            let sqlCode = "UPDATE paciente SET"
            let valores = []
            if (nome != "") {
                sqlCode += ` nome=?`
                valores.push(nome)
                conector = ","
            }
            if (especie != "") {
                sqlCode += `${conector} especie=?`
                valores.push(especie)
                conector = ","
            }
            if (raca != "") {
                sqlCode += `${conector} raca=?`
                valores.push(raca)
            }
            sqlCode += " WHERE id = ?"
            valores.push(id)

            await conexao.query(sqlCode, valores)

            return ({ resp: 'work' })
        } catch (e) {
            return ({ resp: e })
        }
    }

    async DELETE(id) {
        try {
            const conexao = await Conectar();
            const sqlCode = "DELETE FROM paciente WHERE id = ?"
            const valores = [id]
            await conexao.query(sqlCode, valores)

            return ({ resp: 'work' })
        } catch (e) {
            return ({ resp: e })
        }
    }
}
