import Button from 'react-bootstrap/Button';
import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import { CheckAuteticacao } from '../nFuncoes/auntenticar.js';

export default function FormNews(props) {
    const [dado, setDado] = useState({ titulo: "", subtitulo: "", artigo: "", imagemNome: "", imagem: "", dataPostagem: "", dataExclusao: "" })
    const url = "http://localhost:3002/Noticia"
    const auth = CheckAuteticacao()
    //aqui vai conter o corpo que vai enviar o dado
    const formData = new FormData()



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
        formData.append("dataP", dado.dataPostagem)
        formData.append("dataE", dado.dataExclusao)
        formData.append("cpf", auth.cpf)

        fetch(`${url}`, {
            method: "POST", body: formData
        })
            .then((resp) => { return resp.json() })
            .then((resp) => {
                window.location.href = "/Blog"
                return resp
            })


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
        //pagina para editar noticias
        return (
            <form onSubmit={(e) => { e.preventDefault(); AtualizarDados() }}>
                <Form.Label>Titulo</Form.Label>
                <Form.Control onClick={(e) => { e.target.value = props.dado.title }} onChange={(e) => { setDado((prevState) => ({ ...prevState, titulo: e.target.value })) }} type="text" id="titulo" placeholder={props.dado.title} />
                <br></br>
                <Form.Label>Sub Titulo</Form.Label>
                <Form.Control onClick={(e) => { e.target.value = props.dado.subtitle }} onChange={(e) => { setDado((prevState) => ({ ...prevState, subtitulo: e.target.value })) }} type="text" id="subtitulo" placeholder={props.dado.subtitle} />
                <br></br>
                <Form.Label>Artigo</Form.Label>
                <textarea onClick={(e) => { e.target.value = props.dado.article }} onChange={(e) => { setDado((prevState) => ({ ...prevState, artigo: e.target.value })) }} style={{ width: "100%" }} type="text" id="artigo" placeholder={props.dado.article} />
                {/*Arquivo*/}
                <Button type='submit' style={{ width: "100px" }} variant="primary">Atualizar</Button>
            </form>
        )
    } else {
        //pagina para adicionar noticias
        return (
            <form onSubmit={(e) => { e.preventDefault(); EnviarDados() }}>
                <Form.Label>Titulo</Form.Label>
                <Form.Control required onChange={(e) => { setDado((prevState) => ({ ...prevState, titulo: e.target.value })) }} type="text" id="titulo" placeholder="titulo" />
                <br></br>
                <Form.Label>Sub Titulo</Form.Label>
                <Form.Control required onChange={(e) => { setDado((prevState) => ({ ...prevState, subtitulo: e.target.value })) }} type="text" id="subtitulo" placeholder="subtitulo" />
                <br></br>
                <input required type="file" name="foto" onChange={ConfigurarFoto} />
                <hr></hr>
                <Form.Label>Artigo</Form.Label>
                <textarea required onChange={(e) => { setDado((prevState) => ({ ...prevState, artigo: e.target.value })) }} style={{ width: "100%" }} type="text" id="artigo" placeholder="artigo" />
                <div style={{ display: "flex" ,justifyContent:"center",margin:"3% 0%"}}>
                    <div style={{borderRight:"2px  solid black",marginRight:"7%",paddingRight:"7%"}}>
                        <Form.Label>Adicionar data que vai ser postado</Form.Label>
                        <Form.Control onChange={(e) => { setDado((prevState) => ({ ...prevState, dataPostagem: e.target.value })) }} type="date" id="titulo" placeholder="ao deixar vazio será agora " />
                    </div>
                    <div>
                        <Form.Label>Adicionar data que vai ser excluido</Form.Label>
                        <Form.Control onChange={(e) => { setDado((prevState) => ({ ...prevState, dataExclusao: e.target.value })) }} type="date" id="titulo" placeholder="ao deixar vazio não sera excluido " />
                    </div>
                </div>
                <Button type='submit' style={{ width: "100px" }} variant="primary">Adicionar</Button>
            </form>
        )
    }
}