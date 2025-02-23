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
                const modelo = new ClienteMod(item.CPF, item.Nome, item.Telefone, item.Senha, item.Email,item.Recado,item.RG,item.Profissao,item.Rua,item.CEP,item.Numero,item.Bairro,item.Cidade,item.Estado,item.Observacao)
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
                sqlCode = "SELECT * FROM `usuario` WHERE cpf =?";
                itens = [cpf]
            } else {
                sqlCode = "SELECT * FROM `usuario` WHERE nome LIKE ?";
                itens = [`${nome}%`]
            }
            const [list] = await conexao.query(sqlCode, itens)
            const listaFim = []

            for (let item of list) {
                const modelo = new ClienteMod(item.CPF, item.Nome, item.Telefone, item.Senha, item.Email)
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
                    const modelo = new ClienteMod(item.CPF, item.Nome, item.Telefone, item.Senha, item.Email)
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

    async POST(cpf, nome, telefone, senha, email,recado,rg,profissao,rua,CEP,numero,bairro,cidade,observacao) {
        try {
            const Fail = await this.CheckEmailTel({ 'email': email, 'telefone': telefone })
            if (Fail) {
                throw new Error("Email ou Telefone ja existem");
            }
            const sqlCode = "INSERT INTO usuario (cpf, nome, telefone, senha, email,recado,rg,profissao,rua,CEP,numero,bairro,cidade,observacao) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
            const valores = [cpf, nome, telefone, senha, email,recado,rg,profissao,rua,CEP,numero,bairro,cidade,observacao]
            await conexao.query(sqlCode, valores)

            return ({ "resp": 'work' })
        } catch (e) {
            return ({ "resp": e.message,"error":true })
        }
    }

    async PUT(cpf, nome, telefone, senha, email, recado, rg, profissao, rua, CEP, numero, bairro, cidade, estado, observacao) {
        try {
            const conexao = await Conectar();
            let sqlCode = "UPDATE usuario SET "
            let conector = " "
            let valores = []

            if (nome != "" && nome) {
                sqlCode += "nome=?"
                conector = ", "
                valores.push(nome)
            }

            if (telefone != "" && telefone) {
                sqlCode += `${conector}telefone=?`
                conector = ", "
                valores.push(telefone)
            }

            if (senha != "" && senha) {
                sqlCode += `${conector}senha=?`
                conector = ", "
                valores.push(senha)
            }

            if (recado != "" && recado) {
                sqlCode += `${conector}recado=?`
                conector = ", "
                valores.push(recado)
            }
            if (rg != "" && rg) {
                sqlCode += `${conector}rg=?`
                conector = ", "
                valores.push(rg)
            }
            if (profissao != "" && profissao) {
                sqlCode += `${conector}profissao=?`
                conector = ", "
                valores.push(profissao)
            }
            if (rua != "" && rua) {
                sqlCode += `${conector}rua=?`
                conector = ", "
                valores.push(rua)
            }
            if (CEP != "" && CEP) {
                sqlCode += `${conector}CEP=?`
                conector = ", "
                valores.push(CEP)
            }
            if (numero != "" && numero) {
                sqlCode += `${conector}numero=?`
                conector = ", "
                valores.push(numero)
            }
            if (bairro != "" && bairro) {
                sqlCode += `${conector}bairro=?`
                conector = ", "
                valores.push(bairro)
            }
            if (cidade != "" && cidade) {
                sqlCode += `${conector}cidade=?`
                conector = ", "
                valores.push(cidade)
            }
            if (estado != "" && estado) {
                sqlCode += `${conector}estado=?`
                conector = ", "
                valores.push(estado)
            }
            if (observacao != "" && observacao) {
                sqlCode += `${conector}observacao=?`
                conector = ", "
                valores.push(observacao)
            }

            if (email != "" && email) {
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
