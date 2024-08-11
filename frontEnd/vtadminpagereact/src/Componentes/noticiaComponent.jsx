import React, { useEffect } from "react";
import { CheckAuteticacao } from "../nFuncoes/auntenticar";
import Button from 'react-bootstrap/Button';
import { LinkContainer } from "react-router-bootstrap";

export default function NewsStruc(props) {
    const auth = CheckAuteticacao()
    console.log(`${auth.cpf}===${props.info.cpfresp},${auth.cpf === props.info.cpfresp}`)

    function Deletar() {
        console.log(`http://localhost:3002/Noticia/${props.info.id}`)
        fetch(`http://localhost:3002/Noticia/${props.info.id}/${props.info.title}.${props.info.imagem.split('.')[1]}`, { method: "DELETE", headers: { "content-type": "application/json" } })
            .then((resp) => { return resp.json() })
            .then((resp) => {
                console.log(resp)
                window.location.href = "/Blog"
            })
    }

    console.log(props.img)
    return (
        <div style={{ margin: "0% 10%", border: "1px solid black", backgroundColor: "white" }}>
            <img src={props.img} width={"50%"} style={{marginTop:"100px"}} />
            <h1>{props.info.title}</h1>
            <h3>{props.info.subtitle}</h3>
            <hr />
            <a>{props.info.article}</a><br />
            <a>Publicado por: {props.info.nome['nome']}</a>
            {auth.cpf === props.info.cpfresp ?
                <><br /><hr />
                    <LinkContainer to={"/AddNoticia"} state={{ info: props.info }}>
                        <Button style={{ width: "100px" }} variant="primary">Atualizar</Button>
                    </LinkContainer>
                    <Button onClick={(e) => { Deletar(e) }} style={{ width: "100px" }} variant="primary">Excluir</Button>
                </>
                :
                null
            }
        </div>
    )
}