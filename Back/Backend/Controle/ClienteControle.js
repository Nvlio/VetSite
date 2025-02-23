import { Autenticador } from "../Functions/autenticar.js";
import ClienteMod from "../Modelo/ClienteModelo.js";

export default class ClienteControle {

    //função para pegar dados
    async GET(req, resp) {
        if (req.method == "GET") {

            const modelo = new ClienteMod();
            const resposta = await modelo.Pegar()

            return resp.json({ itens: resposta })
        }
        return resp.json({ resp: 0 })

    }

    //função para pegar dados especificos
    async GETVal(req, resp) {
        if (req.method == "GET") {
            let nome = req.params.nome
            const cpf = req.params.cpf
            if (nome) {
                const regex = /-(?=[^-])/g
                nome = nome.split(regex)[0]
            }
            const modelo = new ClienteMod(null, nome, null, null, null);
            const resposta = await modelo.PegarValor(cpf)
            console.log(resposta)
            return resp.json({ itens: resposta })
        }
        return resp.json({ resp: 0 })
    }

    async LOGIN(req, resp) {
        if (req.method == "POST") {
            const body = req.body
            const email = body.email
            const senha = body.senha

            if (email, senha) {
                try {
                    const Logar = new ClienteMod(null, null, null, senha, email)
                    const auntenticacao = new Autenticador()
                    let autenticar = "";
                    const conta = await Logar.SignIn()
                    console.log(conta.conta['cpf'])
                    if (conta.resp === true) {
                        autenticar = await auntenticacao.autenticar({ Email: email, Senha: senha, Conta: 'cliente', cpf: conta.conta['cpf'] })
                    } else {
                        autenticar = null
                    }
                    return resp.status(200).json({ info: conta.conta, resp: conta.resp, token: autenticar })
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
            console.log(req)
            const body = req.body;
            const tipo = req.params.tipo
            const cpf = body.cpf;
            const nome = body.nome;
            const telefone = body.telefone;
            const senha = body.senha;
            const email = body.email;
            const recado = body.recado;
            const rg = body.rg;
            const profissao = body.profissao;
            const rua = body.rua;
            const CEP = body.cep;
            const numero = body.numero;
            const bairro = body.bairro;
            const cidade = body.cidade;
            const estado = body.estado;
            const observacao = body.observacao;
            let autenticar
            const auntenticacao = new Autenticador()

            if (cpf, nome, telefone, senha, email,recado,rg,profissao,rua,CEP,numero,bairro,cidade,estado || (email, senha) && tipo === "Login") {
                const modelo = new ClienteMod(cpf, nome, telefone, senha, email,recado,rg,profissao,rua,CEP,numero,bairro,cidade,estado,observacao);
                const resposta = await modelo.Inserir(tipo)
                if (resposta.resposta == "work") {
                    autenticar = await auntenticacao.autenticar({ Email: email, Senha: senha, Conta: 'cliente', cpf: cpf,nome:nome })
                }
                if (resposta.resposta.message) {
                    return resp.json({ msg: { message: resposta.resposta.message } })
                } else if (resposta.resposta.code || resposta.status===400) {
                    return resp.json({ msg: { message: resposta.status===400?resposta.resposta:resposta.resposta.code} })
                } else {
                    return resp.json({ conta: "cliente", resp: resposta.resposta, token: autenticar })
                }
            }
        }
        return resp.json({ msg: { message: "falta dados" } }).status(400)
    }

    //função para atualizar 
    async PUT(req, resp) {
        if (req.method == "PUT" && req.is('application/json')) {

            const body = req.body;
            const cpf = req.params.cpf
            const nome = body.nome;
            const telefone = body.telefone;
            const senha = body.senha;
            const email = body.email;
            const recado = body.recado;
            const rg = body.rg;
            const profissao = body.profissao;
            const rua = body.rua;
            const CEP = body.cep;
            const numero = body.numero;
            const bairro = body.bairro;
            const cidade = body.cidade;
            const estado = body.estado;
            const observacao = body.observacao;

            if (cpf != undefined || cpf != "" || cpf != "undefined") {
                const modelo = new ClienteMod(cpf);
                const resposta = await modelo.Atualizar(nome, telefone, senha, email,recado,rg,profissao,rua,CEP,numero,bairro,cidade,estado,observacao)
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
                const modelo = new ClienteMod(cpf);
                const resposta = await modelo.Excluir()
                return resp.json({ msg: resposta })
            }
        }
        return resp.json({ resp: 0 })
    }

}