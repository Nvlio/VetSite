import React, { useEffect, useRef, useState } from "react";
import { CheckAuteticacao } from "../nFuncoes/auntenticar.js"
import GET from "../nFuncoes/GET.ts"
import DELETE from "../nFuncoes/DELETE.ts";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";
import ConfirmTable from "../NComponentes/Confirmation.tsx";
import { Prev } from "react-bootstrap/esm/PageItem";


export default function ListaPage(props: { Lista: string }) {
    const [datas, setDatas] = useState()
    const [chave, setChave] = useState()
    const FiltroPlus = useRef("")
    const [exclusao, setExclusao] = useState({ aberto: false, excluir: false, id:"" })
    const [erro, setErro] = useState("")
    const [filtro, setFiltro] = useState({ nomeItem: "_", Cara1: "_", Cara2: "_", Cara3: "_" })
    const auth = CheckAuteticacao()

    //função que faz a coleta de todos os dados da lista especifica pedida
    const Coletar = async () => {
        const dados = await GET(`http://localhost:3002/${props.Lista}/${props.Lista === "Pacientes" && auth.Conta === "cliente" ? auth.cpf : ""}`)
        
        if (dados && !dados.resp && !dados.message && !dados.msg) {
            setDatas(dados)
            if (dados.length > 0) {
                setChave(Object.keys(dados[0]))
            }

        }
    }

    //pagina que faz a coleta de dados após uma filtragem da tabela especifica
    const Filtrar = async () => {
        let dados: any
        if (props.Lista === "Pacientes") {
            dados = await GET(`http://localhost:3002/${props.Lista}/${props.Lista === "Pacientes" && auth.Conta === "cliente" ? auth.cpf : "_"}/${filtro.nomeItem}${auth.Conta === "funcionario" ? `/${filtro.Cara1}` : ""}`)
        } else {
            dados = await GET(`http://localhost:3002/${props.Lista}/${props.Lista === "Funcionarios" ? `${filtro.nomeItem}-${filtro.Cara1}-${filtro.Cara2}-${filtro.Cara3}` : `${filtro.nomeItem}-${filtro.Cara1}`}`)
        }
        setDatas(dados.msg ? dados.msg : dados)

    }

    const Deletar = async () => {
        if (exclusao.excluir) {
            const dados = await DELETE(`http://localhost:3002/${props.Lista}/${exclusao.id}`)
            if (dados && (dados.resp || dados.message || dados.msg)) {
                setErro("Erro na conexão com o servidor")
            }
            setExclusao(()=>({aberto:false,excluir:false,id:""}))
            Coletar()
        }
    }

    useEffect(()=>{
        Deletar()
    },[exclusao.aberto])

    //função que apenas seta a tag filter para se abrir
    const OpenFilter = (e) => {

        if (e.target.innerText === "Mais") {
            e.target.innerText = "Menos"
            FiltroPlus.current.focus()
            FiltroPlus.current.style.display = "block"
        } else {
            e.target.innerText = "Mais"
            FiltroPlus.current.focus()
            FiltroPlus.current.style.display = "none"
            setFiltro((prevState) => ({ ...prevState, Cara1: "_", Cara2: "_", Cara3: "_" }))
        }

    }

    //caso a url for alterada, ele chama o metodo coleta
    useEffect(() => {
        setErro("")
        Coletar()
    }, [props.Lista])

    //se após a coleta resultar em datas não undefined, ele forma a lista da pagina lista
    if (datas) {
        return (
            <>
                <div style={exclusao.aberto ? { display: "block" } : { display: "none" }}><ConfirmTable text="Quer realmente excluir?" Excluir={setExclusao} /></div>
                <div style={{ backgroundColor: "white", border: "1px solid black" }}>


                    <h1>{props.Lista}</h1>
                    {(props.Lista !== "Clientes" && props.Lista !== "Funcionarios" && props.Lista !== "Pacientes") || (props.Lista === "Pacientes" && auth.Conta === "cliente") ?
                        <>
                            <LinkContainer style={{ marginBottom: "01%" }} to="/Adicionar" state={{ lista: props.Lista }}>
                                <Button >Adicionar</Button>
                            </LinkContainer></> : null
                    }

                    <div>
                        <input type="text" placeholder="nome" onChange={(e) => { setFiltro((prevState) => ({ ...prevState, nomeItem: e.target.value === "" ? "_" : e.target.value })) }} />

                    </div>
                    <br />
                    {(auth.Conta === "funcionario") && props.Lista !== "Clientes" ?
                        <>
                            <button style={{ marginRight: "2%" }} onClick={(e) => { OpenFilter(e) }}>Mais</button>
                            <div ref={FiltroPlus} style={{ display: "none" }}>
                                <div style={{ display: 'flex', justifyContent: "center", width: "100%", marginTop: "10px", gap: '10px' }}>
                                    {props.Lista !== "Funcionarios" && props.Lista !== "Pacientes" ?
                                        <input type="text" style={{ width: "30%" }} placeholder={props.Lista === "Produtos" ? "fornecedor" : "endereço"} onChange={(e) => { setFiltro((prevState) => ({ ...prevState, Cara1: e.target.value === "" ? "_" : e.target.value })) }} />
                                        :
                                        <>{props.Lista === 'Pacientes' ? <input type="text" style={{ width: "30%" }} placeholder={"Dono"} onChange={(e) => { setFiltro((prevState) => ({ ...prevState, Cara1: e.target.value === "" ? "_" : e.target.value })) }} /> : null}</>
                                    }
                                    {props.Lista === "Funcionarios" ?
                                        <>
                                            <input type="text" style={{ width: "30%" }} placeholder="especialidade" onChange={(e) => { setFiltro((prevState) => ({ ...prevState, Cara1: e.target.value === "" ? "_" : e.target.value })) }} />
                                            <input type="text" style={{ width: "30%" }} placeholder="função" onChange={(e) => { setFiltro((prevState) => ({ ...prevState, Cara2: e.target.value === "" ? "_" : e.target.value })) }} />
                                            <input type="text" style={{ width: "30%" }} placeholder="Unidade" onChange={(e) => { setFiltro((prevState) => ({ ...prevState, Cara3: e.target.value === "" ? "_" : e.target.value })) }} />
                                        </>
                                        : null}
                                </div>
                                <br />
                            </div>
                        </>
                        : null}

                    <button onClick={(e) => { Filtrar() }}>Pesquisar</button>
                    <hr />
                    <div className='ErroBlock' style={{ display: erro !== "" ? 'block' : "none" }}><p>{erro}</p></div>
                    {datas.length >= 1 ?
                        <div style={{ overflowX: "auto", overflowY: "auto", height: "450px" }}>
                            <table>
                                <thead>
                                    <tr>
                                        {chave?.map((item) => {
                                            if (item !== "id" && item !== "id_dono" && item !== "senha" && item !== "validade") {
                                                return (
                                                    <th style={{ border: "1px solid black", padding: "1px", width: "30%" }}>
                                                        {item}
                                                    </th>
                                                )
                                            } else { return (<></>) }
                                        })}
                                        <th style={{ border: "1px solid black", padding: "1px", width: "100%" }}>
                                            Funções
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {datas.map((data) => {
                                        if (props.Lista === "Pacientes") {
                                            return (
                                                <tr >
                                                    <td style={{ border: "1px solid black" }}>
                                                        {data.sexo === 0 ? "Feminino" : "masculino"}
                                                    </td>
                                                    <td style={{ border: "1px solid black" }}>
                                                        {data.especie}
                                                    </td>
                                                    <td style={{ border: "1px solid black" }}>
                                                        {data.raca}
                                                    </td>
                                                    <td style={{ border: "1px solid black" }}>
                                                        {data.nome}
                                                    </td>
                                                    {auth.Conta === "funcionario" ?
                                                        <td style={{ border: "1px solid black" }}>
                                                            {data.dono}
                                                        </td>
                                                        : null
                                                    }
                                                    <td style={{ border: "1px solid black" }}>
                                                        <LinkContainer style={{ width: "100%", backgroundColor: "blue", color: "white" }} to="/Editar" state={{ dados: data, lista: props.Lista }}><button >Editar</button></LinkContainer>
                                                        <button style={{ width: "100%", backgroundColor: "red", color: "white" }} onClick={() => { setExclusao((prevState)=>({...prevState,aberto:true,id:data.id})) }}>Excluir</button>
                                                    </td>
                                                </tr>
                                            )
                                        } else if (props.Lista === "Clientes" || props.Lista === "Funcionarios") {
                                            return (
                                                <tr >


                                                    <td style={{ border: "1px solid black" }}>
                                                        {data.cpf}
                                                    </td>
                                                    <td style={{ border: "1px solid black" }}>
                                                        {data.nome}
                                                    </td>
                                                    <td style={{ border: "1px solid black" }}>
                                                        {data.telefone}
                                                    </td>
                                                    <td style={{ border: "1px solid black" }}>
                                                        {data.email}
                                                    </td>
                                                    {props.Lista === "Funcionarios" ?
                                                        <>
                                                            <td style={{ border: "1px solid black" }}>
                                                                {data.especialidade}
                                                            </td>
                                                            <td style={{ border: "1px solid black" }}>
                                                                {data.funcao}
                                                            </td>
                                                            <td style={{ border: "1px solid black" }}>
                                                                {data.unidade}
                                                            </td>
                                                        </>
                                                        : null}
                                                    <div style={{ border: "1px solid black" }}>
                                                        <LinkContainer style={{ width: "100%", backgroundColor: "blue", color: "white" }} to="/Editar" state={{ dados: data, lista: props.Lista }}><button >Editar</button></LinkContainer>
                                                        <button style={{ width: "100%", backgroundColor: "red", color: "white" }} onClick={() => { setExclusao((prevState)=>({...prevState,aberto:true,id:data.data.cpf})) }} >Excluir</button>
                                                    </div>
                                                </tr>
                                            )
                                        } else if (props.Lista === "Unidades") {
                                            return (
                                                <tr >
                                                    <td style={{ border: "1px solid black" }}>
                                                        {data.unidade}
                                                    </td>
                                                    <td style={{ border: "1px solid black" }}>
                                                        {data.nome}
                                                    </td>
                                                    <td style={{ border: "1px solid black" }}>
                                                        {data.endereco}
                                                    </td>
                                                    <td style={{ border: "1px solid black" }}>
                                                        {data.telefone}
                                                    </td>
                                                    <td style={{ border: "1px solid black" }}>
                                                        <LinkContainer style={{ width: "100%", backgroundColor: "blue", color: "white" }} to="/Editar" state={{ dados: data, lista: props.Lista }}><button >Editar</button></LinkContainer>
                                                        <button style={{ width: "100%", backgroundColor: "red", color: "white" }} onClick={() => { setExclusao((prevState)=>({...prevState,aberto:true,id:data.data.unidade})) }}>Excluir</button>
                                                    </td>
                                                </tr>
                                            )
                                        } else {
                                            return (
                                                <tr >
                                                    <td style={{ border: "1px solid black" }}>
                                                        {data.nome}
                                                    </td>
                                                    <td style={{ border: "1px solid black" }}>
                                                        {data.valor}
                                                    </td>
                                                    <td style={{ border: "1px solid black" }}>
                                                        {data.quantidade}
                                                    </td>
                                                    <td style={{ border: "1px solid black" }}>
                                                        {data.fornecedor}
                                                    </td>
                                                    <td style={{ border: "1px solid black" }}>
                                                        <LinkContainer style={{ width: "100%", backgroundColor: "blue", color: "white" }} to="/Editar" state={{ dados: data, lista: props.Lista }}><button >Editar</button></LinkContainer>
                                                        <button style={{ width: "100%", backgroundColor: "red", color: "white" }} onClick={() => { setExclusao((prevState)=>({...prevState,aberto:true,id:data.id})) }}>Excluir</button>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    })}
                                </tbody>
                            </table>
                        </div>
                        : <h1>Dados não encontrados</h1>}
                </div>
            </>
        )
    } else {
        return (
            <>

                <div style={{ backgroundColor: "white", border: "1px solid black" }}>
                    <h1>{props.Lista}</h1>
                    <hr />
                    <h1>Erro ao conectar com servidor</h1>
                </div>
            </>
        )
    }
}