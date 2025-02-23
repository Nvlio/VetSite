import Conectar from "./Conexao.js";
import FuncionariMod from "../Modelo/FuncionariosModelo.js";

export default class FuncionarioDB {

    async GET() {

        try {
            const conexao = await Conectar();
            const sqlCode = "SELECT funcionario.cpf, funcionario.nome, funcionario.telefone,funcionario.email,funcionario.especialidade,funcionario.funcao,funcionario.salario,funcionario.CEP,funcionario.endereco,funcionario.numero,funcionario.bairro,funcionario.cidade,funcionario.estado,unidade.nome AS unidade FROM `funcionario` INNER JOIN `unidade` ON funcionario.unidade=unidade.id"
            const [list] = await conexao.query(sqlCode)
            const listaFim = []

            for (let item of list) {
                const modelo = new FuncionariMod(item.cpf, item.nome, item.telefone, item.senha, item.email, item.especialidade, item.funcao, item.unidade, item.salario, item.CEP, item.endereco, item.numero, item.bairro, item.cidade, item.estado)
                listaFim.push(modelo.ToJSON())
            }

            return listaFim
        } catch (e) {
            return ({ resp: e })
        }
    }

    async GETVAL(nome, especialidade, funcao, unidade) {

        try {
            const conexao = await Conectar();
            let precisa = " WHERE"
            let sqlCode = "SELECT * FROM `funcionario`";
            let itens = []
            if (nome != "_") {
                sqlCode += precisa + " nome LIKE ?";
                precisa = " AND"
                itens.push(`${nome}%`)
            }
            if (especialidade != "_") {
                sqlCode += precisa + " especialidade LIKE ?";
                precisa = " AND"
                itens.push(`${especialidade}%`)
            }
            if (funcao != "_") {
                sqlCode += precisa + " funcao LIKE ?",
                    precisa = " AND"
                itens.push(`${funcao}%`)
            }
            if (unidade != "_") {
                sqlCode += precisa + " unidade=?"
                itens.push(unidade)
            }

            const [list] = await conexao.query(sqlCode, itens)
            //unidade não retorna numero
            const listaFim = []

            for (let item of list) {
                const modelo = new FuncionariMod(item.CPF, item.Nome, item.Telefone, item.Senha, item.Email, item.Especialidade, item.Funcao, item.Unidade, item.salario, item.CEP, item.endereco, item.numero, item.bairro, item.cidade, item.estado)
                listaFim.push(modelo.ToJSON())
            }

            return listaFim
        } catch (e) {
            return ({ resp: e })
        }
    }

    async GETVALCPF(cpf) {
        try {
            const conexao = await Conectar();
            let sqlCode = "SELECT CPF,Nome,Telefone,Senha,Email,Especialidade,Funcao,Unidade,Salario,CEP,Endereco,Numero,Bairro,Cidade,Estado,nomeArquivo FROM `funcionario` JOIN fotoperfil ON CPF=idFuncionario WHERE cpf=?";
            let itens = [cpf]
            const [list] = await conexao.query(sqlCode, itens)
            //unidade não retorna numero
            const listaFim = []

            for (let item of list) {
                const modelo = new FuncionariMod(item.CPF, item.Nome, item.Telefone, item.Senha, item.Email, item.Especialidade, item.Funcao, item.Unidade, item.Salario, item.CEP, item.Endereco, item.Numero, item.Bairro, item.Cidade, item.Estado)
                listaFim.push(modelo.ToJSON(item.nomeArquivo))
            }

            return listaFim[0]
        } catch (e) {
            return ({ resp: e })
        }
    }

    async Login(email, senha) {

        try {
            const conexao = await Conectar();
            const sqlCode = "SELECT * FROM `funcionario` WHERE email = ? AND senha=?";
            const itens = [email, senha]
            const [list] = await conexao.query(sqlCode, itens)
            const listaFim = []

            if (list.length > 0) {
                for (let item of list) {
                    const modelo = new FuncionariMod(item.CPF, item.Nome, item.Telefone, item.Senha, item.Email, item.Especialidade, item.Funcao, item.Unidade)
                    listaFim.push(modelo.ToJSON())
                }

                return { resposta: listaFim[0], found: true }
            } else {
                throw new Error('Conta não existe ou dados incorretos')
            }
        } catch (e) {
            return ({ resp: e })
        }
    }

    async CheckEmailTel(valor) {
        const connect = await Conectar()

        let sqlCode;
        const lista = []
        if (valor.email && valor.telefone) {
            lista.push(valor.email)
            lista.push(valor.telefone)
            sqlCode = "SELECT * FROM `funcionario` WHERE email = ? AND telefone = ?"
        } else if (valor.email) {
            lista.push(valor.email)
            sqlCode = "SELECT * FROM `funcionario` WHERE email = ?"
        } else {
            lista.push(valor.telefone)
            sqlCode = "SELECT * FROM `funcionario` WHERE telefone =?"
        }
        const [list] = await connect.query(sqlCode, lista)
        if (list.length > 0) {
            return -1
        } else {
            return 0
        }



    }

    async POST(cpf, nome, telefone, senha, email, especialidade, unidade, funcao, salario, cep, endereco, numero, bairro, cidade, estado) {
        try {
            const conexao = await Conectar();
            const Fail = await this.CheckEmailTel({ 'email': email, 'telefone': telefone })
            if (Fail) {
                throw new Error("Email ou Telefone ja existem");
            }
            const sqlCode = "INSERT INTO funcionario (cpf, nome, telefone, senha, email,especialidade,unidade,funcao,salario,CEP,endereco,numero,bairro,cidade,estado) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
            const valores = [cpf, nome, telefone, senha, email, especialidade, unidade, funcao, salario, cep, endereco, numero, bairro, cidade, estado]
            await conexao.query(sqlCode, valores)

            return ({ "resp": 'work' })
        } catch (e) {
            return ({ "resp": e })
        }
    }

    async PUT(cpf, nome, telefone, senha, email, especialidade, funcao, unidade, salario, cep, endereco, numero, bairro, cidade, estado) {
        try {
            const conexao = await Conectar();
            let conector = ""
            let sqlCode = "UPDATE funcionario SET "
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
            if (email != "" && email) {
                sqlCode += `${conector}email=?`
                conector = ", "
                valores.push(email)
            }
            if (especialidade != "" && especialidade) {
                sqlCode += `${conector}especialidade=?`
                conector = ", "
                valores.push(especialidade)
            }
            if (funcao != "" && funcao) {
                sqlCode += `${conector}funcao=?`
                conector = ", "
                valores.push(funcao)
            }
            if (unidade != "" && unidade) {
                sqlCode += `${conector}unidade=?`
                valores.push(unidade)
            }
            if (salario != "" && salario) {
                sqlCode += `${conector}salario=?`
                valores.push(salario)
            }
            if (cep != "" && cep) {
                sqlCode += `${conector}CEP=?`
                valores.push(cep)
            }
            if (endereco != "" && endereco) {
                sqlCode += `${conector}endereco=?`
                valores.push(endereco)
            }
            if (numero != "" && numero) {
                sqlCode += `${conector}numero=?`
                valores.push(numero)
            }
            if (bairro != "" && bairro) {
                sqlCode += `${conector}bairro=?`
                valores.push(bairro)
            }
            if (cidade != "" && cidade) {
                sqlCode += `${conector}cidade=?`
                valores.push(cidade)
            }
            if (estado != "" && estado) {
                sqlCode += `${conector}estado=?`
                valores.push(estado)
            }
            sqlCode += " WHERE cpf = ?"

            valores.push(cpf)

            await conexao.query(sqlCode, valores)

            return ({ resp: 'work' })
        } catch (e) {
            return ({ resp: e })
        }
    }

    async SaveImg(nome, cpf) {
        try {
            const conexao = await Conectar()
            const sqlCode = "INSERT INTO fotoperfil (nomeArquivo,idFuncionario) VALUES (?,?)"
            const values = [nome, cpf]
            conexao.query(sqlCode, values)
            return ({ "resp": 'work' })
        } catch (e) {
            return ({ "resp": e })
        }
    }

    async UPDImg(nome, cpf) {
        try {
            const conexao = await Conectar()
            const sqlCode = "UPDATE fotoperfil SET nomeArquivo=? WHERE idFuncionario=?"
            const values = [nome, cpf]
            conexao.query(sqlCode, values)
            return ({ "resp": 'work' })
        } catch (e) {
            return ({ "resp": e })
        }
    }

    async DELETE(cpf) {
        try {
            const conexao = await Conectar();
            const sqlCode = "DELETE FROM funcionario WHERE cpf = ?"
            const valores = [cpf]
            await conexao.query(sqlCode, valores)

            return ({ resp: 'work' })
        } catch (e) {
            return ({ resp: e })
        }
    }
}
