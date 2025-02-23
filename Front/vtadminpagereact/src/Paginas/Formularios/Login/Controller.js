import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginServices from "./Service";
import { Autenticar } from "../../../nFuncoes/auntenticar";


//controle da pagina de login
export default function LoginController() {
    const servico = new LoginServices()
    const [emaillogin, setEmail] = useState("")
    const [error, setError] = useState("")
    const [password, setPassword] = useState("")
    const [isFuncionario, setFuncionario] = useState(false)
    const navigate = useNavigate()

    //caso ocorra um erro ele define uma mensagem de erro por 5 segs
    useEffect(() => {
        setTimeout(() => {
            setError("")
        }, 5000)
    }, [error])

    //funcionalidade para enviar os dados do login, ao confirmar ele define o 
    // locastorage de username e pega os daods caso contrario chama um erro
    const handleSubmit = async e => {
        try {
            e.preventDefault()
            const respose = await servico.Logar(isFuncionario, { email: emaillogin, senha: password })
            if (respose.status === 200 && respose.resposta.token !== null) {
                console.log(respose)
                localStorage.setItem("userName",respose.resposta.info.nome)
                Autenticar(respose.resposta.token)
                redirect("")
            } else {
                throw new Error("Conta não encontrada")
            }
        } catch (e) {
            setError(e.message)
        }
    }

    //funcionalidade de navigate
    const redirect = (destino) => {
        navigate(`/${destino}`)
    }

    return {
        emaillogin, error, password, isFuncionario,
        setEmail, setPassword, setFuncionario,
        handleSubmit, redirect,
    }
}