import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Spinner from 'react-bootstrap/Spinner';
import { LinkContainer } from "react-router-bootstrap";
import Button from 'react-bootstrap/Button';
import { CheckAuteticacao } from "../nFuncoes/auntenticar.js";


export default function BlogList(props) {
    const url = "http://localhost:3002/Noticia"
    const [noticias, setNoticias] = useState()
    const [imgs, setImgs] = useState()
    const [nome, setNome] = useState()
    const [estado, setEstado] = useState("Ocioso")
    const [title, setTitle] = useState("")
    const auth = CheckAuteticacao()

    async function Coletar() {

        setEstado("Carregando")
        fetch(url, { method: "GET", headers: { "content-type": "application/json" } })
            .then((resposta) => { return resposta.json() })
            .then((resp) => {
                setNoticias(resp.resposta)
                setEstado("Finalizado")
            })
        return
    }

    //função que transforrma os file em blob
    function toBlob(file, tipo) {
        const byteC = atob(file)
        const byteN = new Array(byteC.length)
        for (let i = 0; i < byteC.length; i++) {
            byteN[i] = byteC.charCodeAt(i);
        }
        const byteA = new Uint8Array(byteN)
        const blob = new Blob([byteA], { type: `image/${tipo}` })
        return blob
    }

    function GetImgs() {
        if (noticias !== undefined) {
            const link = []
            noticias.map((noticia) => {
                const blob = toBlob(noticia.file, noticia.imagem.split(".")[1])
                link.push(URL.createObjectURL(blob))
            })
            console.log(link)
            setImgs(link)
        }
    }

    async function Pesquisar(e) {
        if (e.key === "Enter") {
            console.log('Oi')
            setEstado("Carregando")
            fetch(`${url}/${e.target.value}`, { method: "GET", headers: { "content-type": "application/json" } })
                .then((resposta) => { return resposta.json() })
                .then((resp) => {
                    console.log(resp.resposta)
                    setNoticias(resp.resposta)
                    setEstado("Finalizado")
                })
            return
        }
    }

    useEffect(() => {
        Coletar()
    }, [])

    useEffect(() => {
        GetImgs()
        console.log(noticias)
    }, [noticias])

    try {
        if (estado === "Finalizado" && noticias !== undefined) {
            return (
                <>
                    <header><h1>Blog CãoXonado</h1></header>
                    <Form.Label htmlFor="Search" style={{ width: "100%", padding: "0% 10%" }}>
                        <Form.Control
                            type="text"
                            placeholder={`Pesquisar por titulos`}
                            onChange={(e) => { setTitle(e.target.value) }}
                            onKeyDown={(e) => { Pesquisar(e) }}
                        />
                    </Form.Label>
                    {auth.Conta == "funcionario" ?
                        <LinkContainer to={"/AddNoticia"}>
                            <Button style={{ width: "100px" }} variant="primary">Adicionar</Button>
                        </LinkContainer> :
                        null
                    }
                    <hr />
                    <div style={{ border: "1px solid black", height:"100vh",margin: "-01.3% 06% 0%",overflowY:'auto'}}>
                        {noticias.map((noticia, ind) => {
                            return (
                                <>
                                    {imgs !== undefined ?
                                        <LinkContainer key={ind} to={"/News"} state={{ InfoNew: noticia, index: ind, img: imgs[ind] }} style={{ border: "1px solid black", margin: "02%", display: 'flex', cursor: "pointer" }}>
                                            <div >
                                                <div style={{}}>
                                                    <img src={imgs[ind]} height={"100%"} width={"350px"} />
                                                </div>
                                                <div style={{ width: "100%", margin: "02% 01%", display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: "justify" }}>
                                                    <div>
                                                        <h3>{noticia.title}</h3>
                                                        <h6>{noticia.subtitle}</h6>
                                                        <hr />
                                                        <a>{noticia.article}</a>
                                                        <br />
                                                    </div>
                                                    
                                                    <div style={{ width: "100%" }}>
                                                        <a>autor: {noticia.nome['nome']}</a>
                                                    </div>

                                                </div>
                                            </div>
                                        </LinkContainer> : null
                                    }
                                </>
                            )
                        })}
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <header><h1>Blog CãoXonado</h1></header>
                    <Form.Label htmlFor="Search" style={{ width: "100%", padding: "0% 10%" }}>
                        <Form.Control
                            type="text"
                            placeholder={`Pesquisar por titulos`}
                        />
                    </Form.Label>
                    <hr />
                    {estado === "Carregando" ?
                        <Spinner /> :
                        <h1>Nenhum dado encontrado</h1>
                    }
                </>
            )
        }
    } catch (e) {
        return <h1>Erro</h1>
    }
}