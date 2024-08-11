import React, { useEffect, useRef, useState } from "react";
import GET from "../nFuncoes/GET.ts";
import { CheckAuteticacao } from "../nFuncoes/auntenticar.js";
import Button from 'react-bootstrap/Button';
import DELETE from "../nFuncoes/DELETE.ts";
import LinkContainer from "react-router-bootstrap/LinkContainer.js";

//mini pagina de perfil
export default function ProfileMiniPage() {
    const [user, setUser] = useState({})
    const auth = CheckAuteticacao()
    const war = useRef()

    //função focada na coleta de dados do usuario
    const Coletar = async () => {
        const resposta = await GET(`http://localhost:3002/${auth.Conta}s/${auth.cpf}/null`)
        setUser(resposta[0]?resposta[0]:resposta)
    }

    //função focada na deleta de dados
    const Deletar = async () => {
        const resp = await DELETE(`http://localhost:3002/${auth.Conta}s/${auth.cpf}`)
        if (resp.msg.resp.message) {
            if (war !== null) {
                war.current.focus()
                war.current.innerHTML = "Cliente possui um animal atrelado"
                war.current.style.backgroundColor = "rgba(255, 0, 0, 0.49)"
                war.current.style.color = "white"
                war.current.style.border = "1px solid red"
            }

        }
    }

    //ao renderizar ele faz a coleta de dados
    useEffect(() => {
        Coletar()
    }, [])


    useEffect(() => {
    }, [user])

    //se tiver dados em user ele mostra o perfil d usuario
    if (user) {
        return (
            <div style={{ padding: "17% 5% 5% 05%" }}>
                <div style={{ border: "1px solid black", backgroundColor: "white", borderRadius: "01%", padding: "02%" }}>
                    <div ref={war} />
                    <h1>Informações da Conta</h1>
                    <hr />
                    <h4>{user.nome}</h4>
                    <h4>{user.email}</h4>
                    <h4>{user.telefone}</h4>
                    <LinkContainer to={"/Editar"} state={{dados:user,lista:"Profile"}}>
                        <Button variant="outline-primary">Editar</Button>
                    </LinkContainer>
                    <Button onClick={() => { Deletar() }} variant="outline-danger">Excluir</Button>
                </div>
            </div>
        )
    } else {
        return (<h1>Foi mal</h1>)
    }
}