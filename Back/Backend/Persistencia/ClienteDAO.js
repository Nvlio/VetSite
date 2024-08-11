import Conectar from "./Conexao.js";
import ClienteMod from "../Modelo/ClienteModelo.js";

export default class ClienteDB {

    async GET() {

        try {
            const conexao = await Conectar();
            const sqlCode = "SELECT * FROM usuario"
            const [list] = await conexao.query(sqlCode)
            const listaFim = []

            for (let item of list) {
                const modelo = new ClienteMod(item.cpf, item.nome, item.telefone, item.senha, item.email)
                listaFim.push(modelo.ToJSON())
            }

            return listaFim
        } catch (e) {
            return ({ resp: e })
        }
    }

    async GETVAL(nome, cpf) {

        try {
            const conexao = await Conectar();
            let sqlCode;
            let itens;
            if (cpf) {
                sqlCode = "SELECT * WHERE cpf =?";
                itens = [cpf]
            } else {
                sqlCode = "SELECT * FROM `usuario` WHERE nome LIKE ?";
                itens = [`${nome}%`]
            }
            const [list] = await conexao.query(sqlCode, itens)
            const listaFim = []

            for (let item of list) {
                const modelo = new ClienteMod(item.cpf, item.nome, item.telefone, item.senha, item.email)
                listaFim.push(modelo.ToJSON())
            }

            return listaFim
        } catch (e) {
            return ({ resp: e })
        }
    }

    async Login(email, senha) {

        try {
            const conexao = await Conectar();
            const sqlCode = "SELECT * FROM `usuario` WHERE email = ? AND senha=?";
            const itens = [email, senha]
            const [list] = await conexao.query(sqlCode, itens)
            const listaFim = []

            if (list.length > 0) {
                for (let item of list) {
                    const modelo = new ClienteMod(item.cpf, item.nome, item.telefone, item.senha, item.email)
                    listaFim.push(modelo.ToJSON())
                }

                return { conta: listaFim[0], resp: true }
            } else {
                throw new Error('Conta não existe ou dados incorretos')
            }
        } catch (e) {
            return ({ resp: false })
        }
    }

    async CheckEmailTel(valor) {
        const connect = await Conectar()

        let sqlCode;
        const lista = []
        if (valor.email && valor.telefone) {
            lista.push(valor.email)
            lista.push(valor.telefone)
            sqlCode = "SELECT * FROM `usuario` WHERE email = ? AND telefone = ?"
        } else if (valor.email) {
            lista.push(valor.email)
            sqlCode = "SELECT * FROM `usuario` WHERE email = ?"
        } else {
            lista.push(valor.telefone)
            sqlCode = "SELECT * FROM `usuario` WHERE telefone =?"
        }
        const [list] = await connect.query(sqlCode, lista)
        if (list.length > 0) {
            return -1
        } else {
            return 0
        }



    }

    async POST(cpf, nome, telefone, senha, email) {
        try {
            const conexao = await Conectar();
            const Fail = await this.CheckEmailTel({ 'email': email, 'telefone': telefone })
            if (Fail) {
                throw new Error("Email ou Telefone ja existem");
            }
            const sqlCode = "INSERT INTO usuario (cpf, nome, telefone, senha, email) VALUES (?,?,?,?,?)"
            const valores = [cpf, nome, telefone, senha, email]
            await conexao.query(sqlCode, valores)

            return ({ "resp": 'work' })
        } catch (e) {
            return ({ "resp": e })
        }
    }

    async PUT(cpf, nome, telefone, senha, email) {
        try {
            const conexao = await Conectar();
            let sqlCode = "UPDATE usuario SET "
            let conector=" "
            let valores = []

            if(nome!=""){
                sqlCode += "nome=?"
                conector=", "
                valores.push(nome)
            }

            if(telefone!=""){
                sqlCode +=`${conector}telefone=?`
                conector=", "
                valores.push(telefone)
            }

            if(senha!=""){
                sqlCode +=`${conector}senha=?`
                conector=", "
                valores.push(senha)
            }

            if (email!=""){
                sqlCode += `${conector}email=? `
                valores.push(email)
            }

            sqlCode += " WHERE cpf = ?"
            valores.push(cpf)

            await conexao.query(sqlCode, valores)

            return ({ resp: 'work' })
        } catch (e) {
            return ({ resp: e })
        }
    }

    async DELETE(cpf) {
        try {
            const conexao = await Conectar();
            const sqlCode = "DELETE FROM usuario WHERE cpf = ?"
            const valores = [cpf]
            await conexao.query(sqlCode, valores)

            return ({ resp: 'work' })
        } catch (e) {
            return ({ resp: e })
        }
    }
}
