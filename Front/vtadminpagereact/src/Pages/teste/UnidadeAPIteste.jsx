import React, { useState, useEffect, useRef } from "react"


export default function UnidApi(props) {
    const [item, setItem] = useState("")
    const [unidade, setUnidade] = useState({ nome: "", endereco: "", telefone: "", unidade: "" })
    const url = "http://localhost:3002/" + "Unidades"
    const pesquisa = useRef(null)

    async function coletar() {
        fetch(url, { method: "GET", headers: { 'content-type': "application/json" } }).then((resp) => {
            return resp.json()
        }).then((resposta) => {
            setItem(resposta)
        })
    }

    async function pesquisar() {
        pesquisa.current.focus()
        const id = pesquisa.current.value
        fetch(url + "/" + id, { method: "GET", headers: { 'content-type': "application/json" } }).then((resp) => {
            return resp.json()
        }).then((resposta) => {
            console.log(resposta)
            setItem([resposta])
        })
    }

    async function excluir() {
        pesquisa.current.focus()
        const id = pesquisa.current.value
        fetch(url + "/" + id, { method: "DELETE", headers: { 'content-type': "application/json" } }).then((resp) => {
            return resp.json()
        }).then((resposta) => {
            console.log(resposta)
            coletar()
        })
    }

    async function enviar() {
        if (unidade.nome, unidade.endereco, unidade.telefone) {
            fetch(url, {
                method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({
                    nome: unidade.nome,
                    endereco: unidade.endereco,
                    telefone: unidade.telefone
                })
            })
        }
    }

    async function atualizar() {
        if (unidade.unidade) {
            fetch(url + "/" + unidade.unidade, {
                method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify({
                    nome: unidade.nome,
                    endereco: unidade.endereco,
                    telefone: unidade.telefone
                })
            })
        }
    }

    useEffect(() => {
        coletar()
    }, [])

    useEffect(() => {
        console.log("testando")
        console.log(item)
    }
        , [item])

    return (
        <>
            <h1>Teste de Unidades</h1>
            {item ? <>
                {item.map((it) => {
                    return (
                        <div key={it.unidade} style={{ margin: "10%", border: "1px solid black" }}>
                            <h2>{it.unidade}</h2>
                            <a>{it.nome}</a>
                            <a>{it.endereco}</a>
                            <a>{it.telefone}</a>
                        </div>
                    )
                })}
            </> : null}
            <div>
                <input ref={pesquisa} type="text" placeholder="escreve o id ai pra eu testar um negocio" />
                <button onClick={() => { excluir() }}>Excluir</button>
                <button onClick={() => { pesquisar() }}>Pesquisar</button>
            </div>
            <div style={{ border: "1px solid black" }}>
                <form>
                    <input type="text" placeholder="unidade" onChange={(e) => { setUnidade((prevState) => ({ ...prevState, unidade: e.target.value })) }} />
                    <hr></hr>
                    <input type="text" placeholder="nome" onChange={(e) => { setUnidade((prevState) => ({ ...prevState, nome: e.target.value })) }} />
                    <input type="text" placeholder="endereço" onChange={(e) => { setUnidade((prevState) => ({ ...prevState, endereco: e.target.value })) }} />
                    <input type="text" placeholder="telefone" onChange={(e) => { setUnidade((prevState) => ({ ...prevState, telefone: e.target.value })) }} />
                    <br></br>
                    <button onClick={() => { enviar() }}>Enviar</button>
                    <button onClick={() => { atualizar() }}>Atualizar</button>
                </form>
            </div>
        </>
    )
}

