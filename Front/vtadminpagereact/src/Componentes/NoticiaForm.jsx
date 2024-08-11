import Button from 'react-bootstrap/Button';
import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import { CheckAuteticacao } from '../nFuncoes/auntenticar.js';

export default function FormNews(props) {
    const [dado, setDado] = useState({ titulo: "", subtitulo: "", artigo: "", imagemNome: "", imagem: "" })
    const url = "http://localhost:3002/Noticia"
    const auth = CheckAuteticacao()
    //aqui vai conter o corpo que vai enviar o dado
    const formData = new FormData()
    const [userInfo, setUserInfo] = useState({})



    async function EnviarDados() {
        /* 
                Trabalhar para funcionar melhor
                1- ou comprimir
                2- dividir os envios
        
                codigo para enviar dados:
        */
        formData.append("title", dado.titulo)
        formData.append("subtitle", dado.subtitulo)
        formData.append("article", dado.artigo)
        formData.append("imagemnome", dado.imagemNome)
        formData.append("noticia", dado.imagem)
        formData.append("cpf", auth.cpf)
        console.log(dado)
        fetch(`${url}`, {
            method: "POST", body: formData
        })
            .then((resp) => { return resp.json() })
            .then((resp) => {
                window.location.href = "/Blog"
                return resp
            })


        /*
                fetch(`${url}`, {
                    method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({
                        title: dado.titulo,
                        subtitle: dado.subtitulo,
                        article: dado.artigo,
                        imagemnome: dado.imagem,
                        cpf: auth.cpf
                    })
                })
                    .then((resp) => { return resp.json() })
                    .then((resp) => {
                        window.location.href = "/Blog"
                        return resp
                    })*/
    }

    async function AtualizarDados() {
        fetch(`${url}/${props.dado.id}`, {
            method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify({
                title: dado.titulo,
                subtitle: dado.subtitulo,
                article: dado.artigo,
                imagemnome: dado.imagem,
                cpf: auth.cpf
            })
        })
            .then((resp) => { return resp.json() })
            .then((resp) => {
                window.location.href = "/Blog"
                return resp
            })
    }

    function toBlob(file, tipo) {
        console.log('função blob', file, tipo)
        const byteC = atob(file)
        const byteN = new Array(byteC.length)
        for (let i = 0; i < byteC.length; i++) {
            byteN[i] = byteC.charCodeAt(i);
        }
        const byteA = new Uint8Array(byteN)
        const blob = new Blob([byteA], { type: `image${tipo}` })

        console.log('arquivo blob', blob)
        return blob
    }

    //função que traduz a foto para algo que o servidor possa coletar
    async function ConfigurarFoto(event) {

        const file = event.target.files[0];
        const fName = file.name
        setDado((prevState) => ({ ...prevState, imagemNome: fName }))
        setDado((prevState) => ({ ...prevState, imagem: file }))


        console.log(dado)


    }

    if (props.dado !== undefined) {
        return (
            <form onSubmit={(e) => { e.preventDefault(); AtualizarDados() }}>
                <Form.Label>Titulo</Form.Label>
                <Form.Control onChange={(e) => { setDado((prevState) => ({ ...prevState, titulo: e.target.value })) }} type="text" id="titulo" placeholder={props.dado.title} />
                <br></br>
                <Form.Label>Sub Titulo</Form.Label>
                <Form.Control onChange={(e) => { setDado((prevState) => ({ ...prevState, subtitulo: e.target.value })) }} type="text" id="subtitulo" placeholder={props.dado.subtitle} />
                <br></br>
                <Form.Label>Artigo</Form.Label>
                <textarea onChange={(e) => { setDado((prevState) => ({ ...prevState, artigo: e.target.value })) }} style={{ width: "100%" }} type="text" id="artigo" placeholder={props.dado.article} />
                {/*Arquivo*/}
                <Button type='submit' style={{ width: "100px" }} variant="primary">Atualizar</Button>
            </form>
        )
    } else {
        return (
            <form onSubmit={(e) => { e.preventDefault(); EnviarDados() }}>
                <Form.Label>Titulo</Form.Label>
                <Form.Control onChange={(e) => { setDado((prevState) => ({ ...prevState, titulo: e.target.value })) }} type="text" id="titulo" placeholder="titulo" />
                <br></br>
                <Form.Label>Sub Titulo</Form.Label>
                <Form.Control onChange={(e) => { setDado((prevState) => ({ ...prevState, subtitulo: e.target.value })) }} type="text" id="subtitulo" placeholder="subtitulo" />
                <br></br>
                <input type="file" name="foto" onChange={ConfigurarFoto} />
                <hr></hr>
                <Form.Label>Artigo</Form.Label>
                <textarea onChange={(e) => { setDado((prevState) => ({ ...prevState, artigo: e.target.value })) }} style={{ width: "100%" }} type="text" id="artigo" placeholder="artigo" />
                <Button type='submit' style={{ width: "100px" }} variant="primary">Adicionar</Button>
            </form>
        )
    }
}