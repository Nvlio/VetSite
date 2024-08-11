import React, { useState, useEffect, useRef } from "react"


export default function ProdApi(props) {
    const [item, setItem] = useState("")
    const [produto,setProduto] = useState({nome:"",valor:"",validade:"",quantidade:"",fornecedor:"",id:""})
    const url = "http://localhost:3002/" + "Produtos"
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
        if (produto.nome, produto.valor, produto.validade, produto.quantidade, produto.fornecedor) {
            fetch(url, {
                method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({
                    nome: produto.nome,
                    valor:produto.valor,
                    validade:produto.validade,
                    quantidade:produto.quantidade,
                    fornecedor:produto.fornecedor
                })
            })
        }
    }

    async function atualizar() {
        if (produto.id) {
            fetch(url + "/" + produto.id, {
                method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify({
                    nome: produto.nome,
                    valor:produto.valor,
                    validade:produto.validade,
                    quantidade:produto.quantidade,
                    fornecedor:produto.fornecedor
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
            <h1>Teste de Produtos</h1>
            {item ? <>
                {item.map((it) => {
                    return (
                        <div key={it.id} style={{ margin: "10%", border: "1px solid black" }}>
                            <h2>{it.id}</h2>
                            <a>{it.nome}</a>
                            <a>{it.valor}</a>
                            <a>{it.validade}</a>
                            <a>{it.quantidade}</a>
                            <a>{it.fornecedor}</a>
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
                    <input type="text" placeholder="id" onChange={(e) => { setProduto((prevState) => ({ ...prevState, id: e.target.value })) }} />
                    <hr></hr>
                    <input type="text" placeholder="nome" onChange={(e) => { setProduto((prevState) => ({ ...prevState, nome: e.target.value })) }} />
                    <input type="number" placeholder="valor" onChange={(e) => { setProduto((prevState) => ({ ...prevState, valor: e.target.value })) }} />
                    <input type="date" placeholder="validade" onChange={(e) => { setProduto((prevState) => ({ ...prevState, validade: e.target.value })) }} />
                    <input type="text" placeholder="quantidade" onChange={(e) => { setProduto((prevState) => ({ ...prevState, quantidade: e.target.value })) }} />
                    <input type="text" placeholder="fornecedor" onChange={(e) => { setProduto((prevState) => ({ ...prevState, fornecedor: e.target.value })) }} />
                    <br></br>
                    <button onClick={() => { enviar() }}>Enviar</button>
                    <button onClick={() => { atualizar() }}>Atualizar</button>
                </form>
            </div>
        </>
    )
}

/*

{item ? <>
                {item.map((it) => {
                    return (
                        <div key={it.id} style={{ margin: "10%", border: "1px solid black" }}>
                            <h2>{it.id}</h2>
                            <a>{it.nome}</a>
                            <a>{it.valor}</a>
                            <a>{it.validade}</a>
                            <a>{it.quantidade}</a>
                            <a>{it.fornecedor}</a>
                        </div>
                    )
                })}
            </> : null}

*/