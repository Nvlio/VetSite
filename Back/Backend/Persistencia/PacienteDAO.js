import Conectar from "./Conexao.js";
import PacienteMod from "../Modelo/PacienteModelo.js";

export default class PacienteDB {

    async GETALL() {
        try {
            const conexao = await Conectar();
            const sqlCode = "SELECT  paciente.id AS numero, paciente.nome AS nome, paciente.sexo, paciente.data_nascimento, paciente.comportamento, paciente.pedigree, paciente.raca_predominante, paciente.raca_secundaria, paciente.porte, paciente.pelo, paciente.cor_predominante, paciente.cor_secundaria, paciente.alergias, paciente.reacao, paciente.observacao, especie.nome AS especie, racas.nome AS raca, usuario.nome AS dono FROM paciente INNER JOIN usuario ON paciente.cpf_dono = usuario.cpf INNER JOIN especie ON paciente.id_especie = especie.id INNER JOIN racas ON paciente.id_raca = racas.id;"
            const [list] = await conexao.query(sqlCode)
            const listaFim = []

            for (let item of list) {
                const modelo = new PacienteMod(item.numero, item.sexo, item.cpf_dono, item.especie, item.raca, item.nome, item.data_nascimento, item.comportamento, item.pedigree, item.raca_predominante, item.raca_secundaria, item.porte, item.pelo, item.cor_predominante, item.cor_secundaria, item.alergias, item.reacao, item.observacao)
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
            const sqlCode = "SELECT paciente.id AS numero, paciente.nome AS nome, paciente.sexo, paciente.data_nascimento, paciente.comportamento, paciente.pedigree, paciente.raca_predominante, paciente.raca_secundaria, paciente.porte, paciente.pelo, paciente.cor_predominante, paciente.cor_secundaria, paciente.alergias, paciente.reacao, paciente.observacao, especie.nome AS especie, racas.nome AS raca, usuario.nome AS dono FROM paciente INNER JOIN usuario ON paciente.cpf_dono = usuario.cpf INNER JOIN especie ON paciente.id_especie = especie.id INNER JOIN racas ON paciente.id_raca = racas.id WHERE cpf_dono=?;"
            const itens = [cpf]
            const [list] = await conexao.query(sqlCode, itens)
            const listaFim = []

            for (let item of list) {
                const modelo = new PacienteMod(item.numero, item.sexo, item.cpf_dono, item.especie, item.raca, item.nome, item.data_nascimento, item.comportamento, item.pedigree, item.raca_predominante, item.raca_secundaria, item.porte, item.pelo, item.cor_predominante, item.cor_secundaria, item.alergias, item.reacao, item.observacao)
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
                sqlCode = "SELECT paciente.id AS numero, paciente.nome AS nome, paciente.sexo, paciente.data_nascimento, paciente.comportamento, paciente.pedigree, paciente.raca_predominante, paciente.raca_secundaria, paciente.porte, paciente.pelo, paciente.cor_predominante, paciente.cor_secundaria, paciente.alergias, paciente.reacao, paciente.observacao, especie.nome AS especie, racas.nome AS raca, usuario.nome AS dono FROM paciente INNER JOIN usuario ON paciente.cpf_dono = usuario.cpf INNER JOIN especie ON paciente.id_especie = especie.id INNER JOIN racas ON paciente.id_raca = racas.id WHERE cpf_dono=? ";
                itens.push(cpf)
                sqlCode+=nome!="_"?"AND paciente.nome LIKE ?":"";
                itens.push(nome!="_"?`${nome}%`:null)
                const [list] = await conexao.query(sqlCode, itens)

                for (let item of list) {
                    const modelo = new PacienteMod(item.id, item.sexo, item.cpf_dono, item.especie, item.raca, item.nome, item.data_nascimento, item.comportamento, item.pedigree, item.raca_predominante, item.raca_secundaria, item.porte, item.pelo, item.cor_predominante, item.cor_secundaria, item.alergias, item.reacao, item.observacao)
                    listaFim.push(modelo.ToJSON())
                }
            } else {
                sqlCode = "SELECT paciente.id AS numero, paciente.nome AS nome, paciente.sexo, paciente.data_nascimento, paciente.comportamento, paciente.pedigree, paciente.raca_predominante, paciente.raca_secundaria, paciente.porte, paciente.pelo, paciente.cor_predominante, paciente.cor_secundaria, paciente.alergias, paciente.reacao, paciente.observacao, especie.nome AS especie, racas.nome AS raca, usuario.nome AS dono FROM paciente INNER JOIN usuario ON paciente.cpf_dono = usuario.cpf INNER JOIN especie ON paciente.id_especie = especie.id INNER JOIN racas ON paciente.id_raca = racas.id "
                if(nome!="_"){
                    sqlCode+=` ${conector} paciente.nome LIKE ?`
                    conector="AND "
                    itens.push(`%${nome}%`)
                }
                if(dono!="_"){
                    sqlCode+=`${conector} usuario.nome LIKE ?`
                    itens.push(`%${dono}%`)
                }
                const [list] = await conexao.query(sqlCode, itens)

                for (let item of list) {
                    const modelo = new PacienteMod(item.id, item.sexo, item.cpf_dono, item.especie, item.raca, item.nome, item.data_nascimento, item.comportamento, item.pedigree, item.raca_predominante, item.raca_secundaria, item.porte, item.pelo, item.cor_predominante, item.cor_secundaria, item.alergias, item.reacao, item.observacao)
                    listaFim.push(modelo.ToJSON(item.dono))
                }
            }




            return listaFim
        } catch (e) {
            return ({ resp: e })
        }
    }

    async POST(nome, especie, raca, sexo, cpf_dono, data_nascimento, comportamento, pedigree, raca_predominante, raca_secundaria, porte, pelo, cor_predominante, cor_secundaria, alergias, reacao, observacao) {
        try {
            const conexao = await Conectar();
            const sqlCode = "INSERT INTO paciente (nome,id_especie,id_raca,sexo,cpf_dono, data_nascimento, comportamento, pedigree, raca_predominante, raca_secundaria, porte, pelo, cor_predominante, cor_secundaria, alergias, reacao, observacao) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
            const valores = [nome, especie, raca, sexo, cpf_dono, data_nascimento, comportamento, pedigree, raca_predominante, raca_secundaria, porte, pelo, cor_predominante, cor_secundaria, alergias, reacao, observacao]
            await conexao.query(sqlCode, valores)

            return ({ "resp": 'work' })
        } catch (e) {
            return ({ "resp": e })
        }
    }

    async PUT(nome, especie, raca, id, data_nascimento, comportamento, pedigree, raca_predominante, raca_secundaria, porte, pelo, cor_predominante, cor_secundaria, alergias, reacao, observacao) {
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
                sqlCode += `${conector} id_especie=?`
                valores.push(especie)
                conector = ","
            }
            if (raca != "") {
                sqlCode += `${conector} id_raca=?`
                valores.push(raca)
                conector = ","
            }
            if (data_nascimento != "") {
                sqlCode += `${conector} data_nascimento=?`
                valores.push(data_nascimento)
                conector = ","
            }
            if (comportamento != "") {
                sqlCode += `${conector} comportamento=?`
                valores.push(comportamento)
                conector = ","
            }
            if (pedigree != "") {
                sqlCode += `${conector} pedigree=?`
                valores.push(pedigree)
                conector = ","
            }
            if (raca_predominante != "") {
                sqlCode += `${conector} raca_predominante=?`
                valores.push(raca_predominante)
                conector = ","
            }
            if (raca_secundaria != "") {
                sqlCode += `${conector} raca_secundaria=?`
                valores.push(raca_secundaria)
                conector = ","
            }
            if (porte != "") {
                sqlCode += `${conector} porte=?`
                valores.push(porte)
                conector = ","
            }
            if (pelo != "") {
                sqlCode += `${conector} pelo=?`
                valores.push(pelo)
                conector = ","
            }
            if (cor_predominante != "") {
                sqlCode += `${conector} cor_predominante=?`
                valores.push(cor_predominante)
                conector = ","
            }
            if (cor_secundaria != "") {
                sqlCode += `${conector} cor_secundaria=?`
                valores.push(cor_secundaria)
                conector = ","
            }
            if (alergias != "") {
                sqlCode += `${conector} alergias=?`
                valores.push(alergias)
                conector = ","
            }
            if (reacao != "") {
                sqlCode += `${conector} reacao=?`
                valores.push(reacao)
                conector = ","
            }
            if (observacao != "") {
                sqlCode += `${conector} observacao=?`
                valores.push(observacao)
                conector = ","
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
