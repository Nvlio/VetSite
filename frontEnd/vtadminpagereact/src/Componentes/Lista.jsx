import React, { useEffect, useRef, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import "../CSS/Crescer.css"


import Button from 'react-bootstrap/Button';
import { CheckAuteticacao } from "../nFuncoes/auntenticar";


export default function ListaItens(props) {
    let [userList, setUserList] = useState([])
    let [userChaves, setUserChaves] = useState()
    let [status, setStatus] = useState("ocioso")
    const [filtro, setFiltro] = useState({ nome: "_", especialidade: "_", funcao: "_", unidade: "_" })
    let url = 'http://localhost:3002/' + props.user
    let title = { textAlign: "center" }
    let pieces = [{ overflowX: "auto" }, { width: "100%" }, { border: "1px solid black", width: "10000px", textAlign: "center" }, { textAlign: "center" }]
    let tdStyle = { border: "1px solid black", width: "1000px", paddingRight: "-10%", textAlign: "center" }
    let flexStyle = { display: 'flex', border: "1px solid black", width: "100%", paddingRight: "-10%", textAlign: "center" }
    let button = { width: "100%", height: "50px", textAlign: "center" }
    const filtros = useRef(null)
    const warn = useRef(null)
    const auth = CheckAuteticacao()


    //função que realiza a coleta de todos os dados de uma tabela especifica
    async function Coletar() {
        /*Se der bosta adicionar props.user depois do `${url}/${props.user} e apagar o props.user da url lá em cima`*/
        if (props.user && props.cpf) {
            if (auth.Conta !== 'funcionario') {
                console.log(`${url}/${props.cpf}`)
                await fetch(`${url}/${props.cpf}`, { method: 'GET', headers: { "content-type": "application/json" } }).then((resposta) => {
                    return resposta.json()
                }).then((respJson) => {
                    console.log(respJson['itensd'])
                    setUserList(respJson['itens'])
                })
            } else {
                await fetch(`${url}`, { method: 'GET', headers: { "content-type": "application/json" } }).then((resposta) => {
                    return resposta.json()
                }).then((respJson) => {
                    console.log(respJson)
                    setUserList(respJson['itens'])
                })
            }

        } else {
            await fetch(`${url}`, { method: 'GET', headers: { "content-type": "application/json" } }).then((resposta) => {
                return resposta.json()
            }).then((respJson) => {
                console.log(respJson['itensd'])
                setUserList(respJson['itens'])
            })
        }
    }

    //realiza a busca dos dados ao renderizar pagina, tbm define se a pag esta carregando ou finalizada
    useEffect(() => {
        setStatus("Executando")
        Coletar()
        setStatus("Finalizado")
    }, [props])

    //função para filtragem de dados e retorna apenas o dado com o nome especifico alterar depois para que só faça o fetch mesmo
    async function FiltrarDados(e, info = "") {
        warn.current.style.opacity = '0%'
        warn.current.focus()
        if (props.user === 'Pacientes') {
            url += `/${props.cpf}`
        }
        if (e.key === "Enter") {

            fetch(url + `/${filtro.nome === "" ? "_" : filtro.nome}-${filtro.especialidade === "" ? "_" : filtro.especialidade}-${filtro.funcao === "" ? "_" : filtro.funcao}-${filtro.unidade === "" ? "_" : filtro.unidade}`, { method: 'GET', headers: { "content-type": "application/json" } }).then((resposta) => {
                return resposta.json()
            }).then((resp) => {
                setUserList(resp['itens'])
            })
        }
        else if (info === "") {
            console.log(url)
            fetch(url + `/${filtro.nome === "" ? "_" : filtro.nome}-${filtro.especialidade === "" ? "_" : filtro.especialidade}-${filtro.funcao === "" ? "_" : filtro.funcao}-${filtro.unidade === "" ? "_" : filtro.unidade}`, { method: 'GET', headers: { "content-type": "application/json" } }).then((resposta) => {
                return resposta.json()
            }).then((resp) => {
                setUserList(resp['itens'])
                if (resp.itens.length === 0) {
                    setStatus('Erro')
                }
            })

        }

    }

    //função que exclui o dado 
    async function Excluir(cpf, ind) {

        warn.current.style.opacity = '0%'
        console.log(url + `/${userList[ind].id}}`)
        let resp = window.confirm("realmente deseja excluir?")

        if (resp) {
            fetch(url + `/${userList[ind].cpf !== undefined ? userList[ind].cpf : userList[ind].id}`, { method: "DELETE" })
                .then((resposta) => { return resposta.json() })
                .then((resp) => {
                    console.log(resp)
                    if (resp.msg.resp.message) {
                        alert("oi")
                        warn.current.style.opacity = '100%'
                        warn.current.style.backgroundColor = 'red'
                        warn.current.style.color = "white"
                        warn.current.style.border = "1px solid gray"
                        warn.current.innerHTML = "Cliente possui um animal atrelado"
                        warn.current.focus()

                    }
                })
            Coletar()
        }
    }



    //serve apenas para confirmar se tudo foi pode apagar se quiser
    useEffect(() => {
        //alert("corrigir o carregando infinito quando coloca valor errado no filtro")

        let list;
        if (userList[0] !== undefined) {
            list = Object.keys(userList[0]).filter((chave) => { return chave !== "senha" })
            list = list.filter((chave) => { return chave !== "id_dono" })
            setUserChaves(list)
        }
    }, [userList, filtro])

    //função que transforma cpf no formato esperado.
    function transformCPF(value) {
        if (props.user === "Clientes" || props.user === "Funcionarios") {
            let cpfnum = value
            if (value[3] !== ".") {
                cpfnum = `${value.substring(0, 3)}.${value.substring(3, 6)}.${value.substring(6, 9)}/${value.substring(9, 11)}`
            }
            return cpfnum
        } else { return }
    }

    //serve para abrir filtro
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

    //retorna a lista coletada dos itens
    //esse if verifica se há conteudo nos dados se não esquece
    if (userChaves !== undefined && userList.length !== 0) {
        return (
            <div style={{ backgroundColor: "white", opacity: "80%" }}>
                <div ref={warn}></div>
                {/*aqui faz a pesquisa de nome */}
                <div style={title}><h1>Lista {props.user}</h1></div>
                {auth.Conta === "funcionario" && props.user === "Pacientes" ?
                    null :
                    <>
                        <Form.Label htmlFor="Search"></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Pesquisar por nome"
                            className="custom-input"
                            onChange={(e) => { setFiltro((prevState) => ({ ...prevState, nome: e.target.value })) }}
                            onKeyDown={(e) => { FiltrarDados(e, 'nome') }} />
                    </>
                }


                {/*Botão que filtra mais especifico */}
                {props.user === "Funcionarios" ? <Button onClick={() => { open() }} variant="outline-dark">Filtros</Button> : null}
                <div style={{}} ref={filtros}>
                    {status === "OpenedF" ? <>
                        <Filtro setFill={setFiltro} />
                        <Button style={{ width: "100px" }} onClick={(e) => { FiltrarDados(e) }} variant="primary">pesquisar</Button>
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
                            {auth.Conta === "funcionario" && props.user === 'Pacientes' ? null : <th style={tdStyle}>Funções</th>}
                        </thead>
                        {userList.map((user, index) => {
                            return (
                                <>
                                    <tbody>
                                        {/*Fazer um componente aqui em baixo*/}
                                        {props.user !== "Pacientes" ?
                                            <>
                                                {user.cpf === undefined ? null : <td style={tdStyle}>{transformCPF(user.cpf)}</td>}
                                                <td style={tdStyle}>{user.nome}</td>
                                                <td style={tdStyle}>{user.telefone}</td>
                                                <td style={tdStyle}>{user.email}</td>
                                                {user.especialidade !== undefined ? <>
                                                    <td style={tdStyle}>{user.especialidade}</td>
                                                    <td style={tdStyle}>{user.funcao}</td>
                                                    <td style={tdStyle}>{user.unidade}</td>
                                                </>
                                                    : null}
                                            </> :
                                            <>
                                                <td style={tdStyle}>{user.id}</td>
                                                <td style={tdStyle}>{user.sexo === 1 ? "Feminino" : "masculino"}</td>
                                                <td style={tdStyle}>{user.especie}</td>
                                                <td style={tdStyle}>{user.raca}</td>
                                                <td style={tdStyle}>{user.nome}</td>
                                                {auth.Conta==="funcionario"?<td style={tdStyle}>{user.dono}</td>:null}
                                            </>
                                        }
                                        <td style={flexStyle}>
                                            {auth.Conta === 'funcionario' && props.user === "Pacientes" ?
                                                null :
                                                <>
                                                    {props.user !== "Pacientes" ?
                                                        <LinkContainer to={`/Form`} state={{ userInfo: user, tipo: props.user }}>
                                                            <Button style={button} variant="primary">Atualizar</Button>
                                                        </LinkContainer> :
                                                        <LinkContainer to={`/Animal`} state={{ userInfo: user, tipo: props.user }}>
                                                            <Button style={button} variant="primary">Atualizar</Button>
                                                        </LinkContainer>

                                                    }
                                                    <Button onClick={(e) => { /*mudar o user.cpf*/Excluir(user.cpf, index) }} style={button} variant="danger">Deletar</Button>
                                                </>
                                            }
                                        </td>
                                    </tbody>
                                </>
                            )
                        })}

                    </table>
                </div>
            </div >
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

{/*Função que adiciona os campos de filtro  função interna*/ }
function Filtro(props) {

    return (
        <>
            <div style={{ display: 'flex', justifyContent: "center", textAlign: "left", gap: "2%", padding: "1%" }}>
                <div>
                    <Form.Label>Especialidade</Form.Label>
                    <Form.Control type="text" placeholder="Especialidade"
                        onChange={(e) => { props.setFill((prevState) => ({ ...prevState, especialidade: e.target.value })) }}
                    />
                </div>
                <div>
                    <Form.Label>função</Form.Label>
                    <Form.Control type="text" placeholder="função"
                        onChange={(e) => { props.setFill((prevState) => ({ ...prevState, funcao: e.target.value })) }}
                    />
                </div>
                <div>
                    <Form.Label>unidade</Form.Label>
                    <Form.Control type="text" placeholder="unidade"
                        onChange={(e) => { props.setFill((prevState) => ({ ...prevState, unidade: e.target.value })) }}
                    />
                </div>
            </div>
        </>
    )
}