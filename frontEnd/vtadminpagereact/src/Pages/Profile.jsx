import React, { useEffect, useRef, useState } from "react";
import { CheckAuteticacao } from "../nFuncoes/auntenticar.js";
import { Button, Spinner } from "react-bootstrap";
import NavMenu from "../Componentes/nav";
import { LinkContainer } from "react-router-bootstrap";

export default function ProfilePage(props) {
    const [user, setUser] = useState("")
    const auth = CheckAuteticacao()
    const url = 'http://localhost:3002/Clientes'
    const warn = useRef()

    async function Coletar() {
        fetch(`${url}/${auth.cpf}/profile`, { method: "GET", headers: { "content-type": "application/json" } })
            .then((resposta) => {
                return resposta.json()
            })
            .then((resp) => {
                setUser(resp.itens[0])
            })
    }

    async function Excluir() {
        warn.current.style.opacity = "0%"
        const resp = window.confirm("deseja realmente excluir sua conta?")
        if (resp) {
            fetch(`${url}/${auth.cpf}`, { method: "DELETE", headers: { "content-type": "application/json" } })
                .then((resp) => { return resp.json() })
                .then((resp) => {
                    if (resp.msg.resp.message) {
                        warn.current.style.opacity = '100%'
                        warn.current.style.backgroundColor = 'red'
                        warn.current.style.color = "white"
                        warn.current.style.border = "1px solid gray"
                        warn.current.innerHTML = "Cliente possui um animal atrelado"
                        warn.current.focus()
                    }
                })
        }
    }


    useEffect(() => {
        Coletar()
    }, [])

    if (user !== "") {
        return (
            <>
                <NavMenu position={""} margin={"-05%"} tipo={'lCA'} />
                <h1>Informação sobre o perfil</h1>
                <div ref={warn}></div>
                <div style={{ margin: "10%", border: "1px solid black", borderRadius: "2%" }}>
                    <h4>Nome: {user.nome}</h4>
                    <hr></hr>
                    <h6>Telefone: {user.email}</h6>
                    <h6>Telefone: {user.telefone}</h6>
                    <h6>Telefone: {user.cpf}</h6>
                </div>
                <LinkContainer to={`/Form`} state={{ userInfo: user, tipo: "Clientes" }}>
                    <Button variant="primary">Atualizar</Button>
                </LinkContainer>
                <Button onClick={(e) => { /*mudar o user.cpf*/Excluir(user.cpf) }} variant="danger">Deletar</Button>
            </>
        )
    } else {
        return (
            <>
                <NavMenu position={""} margin={"-05%"} tipo={'lCA'} />
                <Spinner />
            </>
        )
    }
}