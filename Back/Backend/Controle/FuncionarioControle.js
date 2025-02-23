import { Autenticador } from "../Functions/autenticar.js";
import salvarIMG from "../Functions/Imagem.js";
import FuncionariMod from "../Modelo/FuncionariosModelo.js";

export default class FuncionarioControle {

    //função para pegar dados
    async GET(req, resp) {
        if (req.method == "GET") {

            const modelo = new FuncionariMod();
            const resposta = await modelo.Pegar()

            return resp.json({ itens: resposta })
        }
        return resp.json({ resp: 0 })

    }

    //função para pegar dados especificos
    async GETVal(req, resp) {
        if (req.method == "GET") {
            let nome = req.params.nome
            const regex = /-(?=[^-])/g
            nome = nome.split(regex)
            console.log(nome)
            const modelo = new FuncionariMod(null, nome[0], null, null, null, nome[1], nome[2], nome[3]);
            const resposta = await modelo.PegarValor()

            return resp.json({ itens: resposta })
        }
        return resp.json({ resp: 0 })
    }

    async GETcpf(req, resp) {
        if (req.method == "GET") {
            let cpf = req.params.cpf
            const modelo = new FuncionariMod(cpf,null,null,null,null,null,null,null);
            const resposta = await modelo.PegarValorcpf()

            return resp.json({ itens: resposta })
        }
        return resp.json({ resp: 0 })
    }

    async LOGIN(req, resp) {
        if (req.method == "POST") {
            const tipo = req.params.tipo
            const body = req.body
            const email = body.email
            const senha = body.senha

            if (email, senha) {
                try {
                    const Logar = new FuncionariMod(null, null, null, senha, email, null, null, null)
                    const auntenticacao = new Autenticador()
                    let autenticar = "";
                    const conta = await Logar.SignIn()
                    if (conta.found === true) {
                        autenticar = await auntenticacao.autenticar({ Email: email, Senha: senha, Conta: 'funcionario', cpf: conta.resposta['cpf'] })
                    } else {
                        autenticar = null
                    }
                    return resp.status(200).json({ info: conta.resposta, resp: conta.found, token: autenticar })
                } catch (erro) {
                    return resp.status(502).json({ resp: false })
                }

            }
        } else {
            return resp.status(400).json({ resp: false })
        }
    }

    //função para inserir
    async POST(req, resp) {
        if (req.method == "POST" && req.is('application/json')) {

            const body = req.body;
            const imagem = req.file;
            const tipo = req.params.tipo
            const cpf = body.cpf;
            const nome = body.nome;
            const telefone = body.telefone;
            const senha = body.senha;
            const email = body.email;
            const especialidade = body.especialidade;
            const unidade = body.unidade;
            const funcao = body.funcao;
            const salario = body.salario;
            const cep = body.cep;
            const endereco = body.endereco;
            const numero = body.numero;
            const bairro = body.bairro;
            const cidade = body.cidade;
            const estado = body.estado;
            let autenticar
            const auntenticacao = new Autenticador()
            await salvarIMG({nome:body.imgNome},imagem,nome,null,3)
            if (cpf, nome, telefone, senha, email, especialidade, unidade, funcao,salario,cep,endereco,numero,bairro,cidade,estado) {
                const modelo = new FuncionariMod(cpf, nome, telefone, senha, email, especialidade, funcao, unidade,salario,cep,endereco,numero,bairro,cidade,estado);
                const resposta = await modelo.Inserir(tipo)
                if (resposta.resposta == "work") {
                    autenticar = await auntenticacao.autenticar({ Email: email, Senha: senha, Conta: 'funcionario', cpf: cpf })
                }
                if (resposta.resposta.message) {
                    return resp.json({ msg: { message: resposta.resposta.message } })
                } else if (resposta.resposta.code) {
                    return resp.json({ msg: { message: resposta.resposta.code } })
                } else {
                    return resp.json({ conta: "funcionario", resp: resposta.resposta, token: autenticar })
                }
            }
        }
        return resp.json({ msg: { message: "falta dados" } })
    }

    //função para atualizar 
    async PUT(req, resp) {
        if (req.method == "PUT" ) {

            const body = req.body;
            const imagem = req.file;
            const cpf = req.params.cpf
            const telefone = body.telefone;
            const senha = body.senha;
            const email = body.email;
            const nome = body.nome
            const especialidade = body.especialidade;
            const unidade = body.unidade;
            const funcao = body.funcao;
            const salario = body.salario;
            const cep = body.cep;
            const endereco = body.endereco;
            const numero = body.numero;
            const bairro = body.bairro;
            const cidade = body.cidade;
            const estado = body.estado;

            await salvarIMG({nome:body.imgNome},imagem,body.nome,null,3)
            if (cpf != undefined || cpf != "" || cpf != "undefined") {
                const modelo = new FuncionariMod(cpf);
                const resposta = await modelo.Atualizar(nome, telefone, senha, email, especialidade, unidade, funcao,salario,cep,endereco,numero,bairro,cidade,estado,imagem)
                console.log(resposta)
                return resp.json({ resp: resposta })
            }
        }
        return resp.json({ resp: 0 })
    }

    async DELETE(req, resp) {
        if (req.method == "DELETE") {

            const cpf = req.params.cpf
            if (cpf) {
                const modelo = new FuncionariMod(cpf);
                const resposta = await modelo.Excluir()
                return resp.json({ msg: resposta })
            }
        }
        return resp.json({ resp: 0 })
    }

}