//Essa lista só serve para realizar o trabalho rapido para entregar 
//depois devo corrigir para que tudo fique em um componente, porem 
//não tenho muito tempo para fazer isso.


import React, { useEffect, useRef, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';


import Button from 'react-bootstrap/Button';
import { CheckAuteticacao } from "../nFuncoes/auntenticar";

export default function ListaProdUnit(props) {
    let [userList, setUserList] = useState([])
    let [userChaves, setUserChaves] = useState()
    let [status, setStatus] = useState("ocioso")
    const [filtro, setFiltro] = useState({ nome: "_", fornecedor: "_" })
    const [nome, setNome] = useState("_")
    let url = 'http://localhost:3002/' + props.user
    let title = { textAlign: "center" }
    let pieces = [{ overflowX: "auto" }, { width: "100%" }, { border: "1px solid black", width: "10000px", textAlign: "center" }, { textAlign: "center" }]
    let tdStyle = { border: "1px solid black", width: "1000px", paddingRight: "-10%", textAlign: "center" }
    let flexStyle = { display: 'flex', border: "1px solid black", width: "100%", paddingRight: "-10%", textAlign: "center" }
    let button = { width: "100%", height: "50px", textAlign: "center" }
    const filtros = useRef(null)
    const auth = CheckAuteticacao()
    const s = "ola"

    async function Coletar() {

        fetch(url, { method: "GET", headers: { 'content-type': "application/json" } }).then((resp) => {
            return resp.json()
        }).then((resposta) => {
            setUserList(resposta)

        })
    }



    //função para filtragem de dados e retorna apenas o dado com o nome especifico alterar depois para que só faça o fetch mesmo
    async function FiltrarDados(e, info = "") {
        if (e.key === "Enter" || info !== "") {

            console.log(nome !== "_")
            console.log(`${url}/${filtro.nome}/${filtro.fornecedor}`)

            if (props.user === "Unidades") {
                if (filtro.nome === "_" && nome === "_") { Coletar() }
                else if (nome !== "_") {
                    console.log("oi")
                    fetch(`${url}/${nome}/filtro`, { method: "GET", headers: { "content-type": "application/json" } })
                        .then((resposta) => { return resposta.json() })
                        .then((resp) => {
                            if (resp.message) {
                                console.log(resp)
                            } else {
                                setUserList([resp])
                            }
                        })
                }
                else {

                    fetch(`${url}/${filtro.nome}`, { method: "GET", headers: { "content-type": "application/json" } })
                        .then((resposta) => { return resposta.json() })
                        .then((resp) => {
                            if (resp.message) {
                                console.log(resp)
                            } else {
                                setUserList([resp])
                            }
                        })
                }
            } else {
                if (filtro.nome === "_" && filtro.fornecedor === "_") {
                    Coletar()
                } else {
                    fetch(`${url}/${filtro.nome}/${filtro.fornecedor}`, { method: "GET", headers: { "content-type": "application/json" } })
                        .then((resposta) => { return resposta.json() })
                        .then((resp) => {
                            if (resp.status === 500) {
                                console.log(resp.msg)
                            } else {
                                setUserList([resp.msg])
                            }
                        })
                }
            }
        }

    }
    function open() {
        filtros.current.focus()
        if (filtros.current.style.opacity !== "1") {
            filtros.current.style.opacity = "100%"
            filtros.current.style.height = "100%"
            filtros.current.style.padding = "01% 0%"
            filtros.current.style.margin = "0%"
            setStatus("OpenedF")
        } else {
            filtros.current.style.opacity = "0%"
            filtros.current.style.height = "0%"
            filtros.current.style.padding = "0%"
            filtros.current.style.margin = "-01%"
            setStatus("Ocioso")
        }

    }

    //função que exclui o dado 
    async function Excluir(cpf, ind) {
        let resp = window.confirm("realmente deseja excluir?")
        let id = props.user === "Produtos" ? userList[ind].id : userList[ind].unidade
        if (resp) {
            fetch(`${url}/${id}`, { method: "DELETE", headers: { "content-type": "application/json" } })
                .then((resposta) => { return resposta.json() })
                .then((resp) => { console.log(resp) })
            Coletar()
        }
    }

    //realiza a busca dos dados ao renderizar pagina, tbm define se a pag esta carregando ou finalizada
    useEffect(() => {
        setStatus("Executando")
        Coletar()
        setStatus("Finalizado")
    }, [props.user])

    useEffect(() => {
        let list;
        if (userList[0] !== undefined) {
            list = Object.keys(userList[0]).filter((chave) => { return chave !== "senha" })
            list = list.filter((chave) => { return chave !== "id_dono" })
            setUserChaves(list)
        }
    }, [userList])

    function trasnformDate(time) {
        let data = new Date(time)
        let dia = data.getDay()
        let mes = data.getMonth()
        let ano = data.getFullYear()

        return (`${dia}/${mes === 0 ? mes + 1 : mes}/${ano}`)

    }


    if (userChaves !== undefined && userList.length !== 0) {
        return (
            <div style={{ backgroundColor: "white", opacity: "80%" }}>
                {/*aqui faz a pesquisa de nome */}
                <div style={title}><h1>Lista {props.user}</h1></div>
                <Form.Label htmlFor="Search">
                    <Form.Control
                        type="text"
                        placeholder={`Pesquisar por ${props.user === "Unidades" ? "Cidade" : "Nome do produto"}`}
                        onChange={(e) => {
                            console.log(e.target.value);
                            if (e.target.value === "") {
                                setFiltro((prevState) => ({ ...prevState, nome: "_" }))
                            } else {
                                setFiltro((prevState) => ({ ...prevState, nome: e.target.value }))
                            }
                        }}
                        onKeyDown={(e) => { FiltrarDados(e) }}
                    /></Form.Label>

                {/*Botão que filtra mais especifico */}
                {props.user === "Produtos" ? <Button onClick={() => { open() }} variant="outline-dark">Filtros</Button> : null}
                <div style={{}} ref={filtros}>
                    {status === "OpenedF" ? <>
                        <Filtro setFill={setFiltro} />
                    </> :
                        null}

                    {props.user === "Unidades" ?
                        <>

                            <Form.Label htmlFor="Search">
                                <Form.Control
                                    type="text"
                                    placeholder={`nome da clinica`}
                                    onChange={(e) => {
                                        console.log(e.target.value);
                                        if (e.target.value === "") {
                                            setNome("_")
                                        } else {
                                            setNome(e.target.value)
                                        }
                                    }}
                                    onKeyDown={(e) => { FiltrarDados(e) }}
                                /></Form.Label>

                        </> : null}
                </div>

                <div style={{}} ref={filtros}>
                    {status === "OpenedF" ? <>
                        <Button style={{ width: "100px" }} onClick={(e) => { FiltrarDados(e, "n") }} variant="primary">pesquisar</Button>
                    </> : null}
                </div>
                <hr />
                {/*Corpo da lista */}
                <div style={pieces[0]}>
                    <table>
                        <thead style={pieces[1]}>
                            {userChaves.map((chave) => {
                                return (
                                    <th style={pieces[2]}>{chave}</th>
                                )
                            })}
                            <th style={tdStyle}>Funções</th>
                        </thead>
                        {userList.map((user, index) => {
                            return (
                                <>
                                    <tbody>
                                        {/*Fazer um componente aqui em baixo*/}
                                        {props.user !== "Unidades" ?
                                            <>
                                                <td style={tdStyle}>{user.nome}</td>
                                                <td style={tdStyle}>{user.valor}</td>
                                                <td style={tdStyle}>{trasnformDate(user.validade)}</td>
                                                <td style={tdStyle}>{user.quantidade}</td>
                                                <td style={tdStyle}>{user.fornecedor}</td>
                                                <td style={tdStyle}>{user.id}</td>
                                            </> :
                                            <>
                                                <td style={tdStyle}>{user.unidade}</td>
                                                <td style={tdStyle}>{user.nome}</td>
                                                <td style={tdStyle}>{user.endereco}</td>
                                                <td style={tdStyle}>{user.telefone}</td>
                                            </>
                                        }
                                        <td style={flexStyle}>
                                            <LinkContainer to={`/AddForm`} state={{ userInfo: user, tipo: props.user }}>
                                                <Button style={button} variant="primary">Atualizar</Button>
                                            </LinkContainer>

                                            <Button onClick={(e) => { /*mudar o user.cpf*/Excluir(user.cpf, index) }} style={button} variant="danger">Deletar</Button>
                                        </td>
                                    </tbody>
                                </>
                            )
                        })}

                    </table>
                </div>
            </div>
        )
    } else {
        //caso a lista esteja carregando ou de algum erro
        return (
            <>
                {status !== 'Finalizado' && status !== "Erro" ?
                    <>
                        <div style={title}><h1>Lista {props.user}</h1></div>
                        <Form.Label htmlFor="Search"></Form.Label>
                        <hr />
                        {/*aqui fica o codigo abaixo */}
                        <div style={pieces[3]}>
                            <h1>Carregando!</h1>
                            <Spinner animation="grow" variant="dark" />
                        </div>
                    </> :
                    <>
                        <div style={title}><h1>Lista {props.user}</h1></div>
                        <Form.Label htmlFor="Search"></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Pesquisar por nome"
                            onKeyDown={(e) => { FiltrarDados(e) }}
                            onClick={() => { setFiltro({ nome: "_", especialidade: "_", funcao: "_", unidade: "_" }); Coletar() }}
                        />
                        <hr />
                        {/*aqui fica o codigo abaixo */}
                        <h1 style={pieces[3]}>Nenhum dado encontrado!</h1>
                    </>
                }

            </>
        )
    }

}

function Filtro(props) {

    return (
        <>
            <div style={{ display: 'flex', justifyContent: "center", textAlign: "left", gap: "2%", padding: "1%" }}>
                <div>
                    <Form.Label>Especialidade</Form.Label>
                    <Form.Control type="text" placeholder="fornecedor"
                        onChange={(e) => {
                            if (e.target.value === "") {
                                props.setFill((prevState) => ({ ...prevState, fornecedor: "_" }))
                            } else {
                                props.setFill((prevState) => ({ ...prevState, fornecedor: e.target.value }))
                            }
                        }}
                    />
                </div>
            </div>
        </>
    )
}