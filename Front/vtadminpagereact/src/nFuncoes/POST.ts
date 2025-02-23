import { redirect } from "react-router-dom";
import { Autenticar } from "./auntenticar";

//VERIFICAR SE PODE JUNTAR TUDO EM UMA UNICA FUNÇÃO

//função que faz POST voltado para cadastro
export async function Login(url: string, info: { senha: string, email: string }, tipo: string) {
    alert("Login")
    tipo = tipo === "Funcionário" ? "Funcionarios" : 'Clientes'
    const x = await fetch(`${url}${tipo}/${'login'}`, {
        method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({
            senha: info.senha,
            email: info.email
        })
    }).then((resp) => {
        return resp.json();
    }).then((resposta) => {

        if (resposta.resp === true) {
            Autenticar(resposta.token);
            window.location.href = "/";
        } else {
            alert("fui2")
            return `${url}${tipo}`
        }
    });

    alert("chamou?")
    return x


}

//Função que faz POST voltado para cadastro
export async function Cadastro(
    url: string,
    info: {
        senha: string,
        email: string,
        nome: string,
        cpf: string,
        tel: string,
        funcao: string,
        unidade: number,
        especialidade: string
    },
    tipo: string
) {
    tipo = tipo === "Funcionário" ? "Funcionarios" : 'Clientes'
    alert("cadastro")
    fetch(`${url}${tipo}`, {
        method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({
            senha: info.senha,
            email: info.email,
            nome: info.nome,
            telefone: info.tel,
            cpf: info.cpf,
            funcao: info.funcao,
            unidade: info.unidade,
            especialidade: info.especialidade

        })
    }).then((resp) => {
        return resp.json();
    }).then((resposta) => {
        if (resposta.resp === 'work') {
            Autenticar(resposta.token);
            window.location.href = "/";
        } else if (resposta.msg.message === "Duplicate entry '46478910890' for key 'PRIMARY'") {
            alert("CPF já está sendo utilizado")
        }
    });


}

export async function POST(url: string, itens: any, extra: string) {
    alert("post")
    return fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: itens })
        .then((resposta) => { return resposta.json() })
        .then((resp) => {
            console.log(resp)
            if (resp.message) {
                return resp
            } else {
                    if(extra){
                        window.location.href = `/${extra}`
                    }
            }
        })

}