import React, { useEffect, useState } from "react";
import { CheckAuteticacao } from "../nFuncoes/auntenticar";
import Button from 'react-bootstrap/Button';
import { LinkContainer } from "react-router-bootstrap";
import ConfirmTable from "../NComponentes/Confirmation.tsx";

export default function NewsStruc(props) {
    const auth = CheckAuteticacao()
    const [exclusao, setExclusao] = useState({ aberto: false, excluir: false, id: "" })

    console.log(`${auth.cpf}===${props.info.cpfresp},${auth.cpf === props.info.cpfresp}`)

    async function Deletar() {
        if (exclusao.excluir) {
        await fetch(`http://localhost:3002/Noticia/${props.info.id}/${props.info.title}.${props.info.imagem.split('.')[1]}`, { method: "DELETE", headers: { "content-type": "application/json" } })
            .then((resp) => { return resp.json() })
            .then((resp) => {
                console.log(resp)
                window.location.href = "/Blog"
            })
        setExclusao(() => ({ aberto: false, excluir: false, id: "" }))
        }
    }

    useEffect(() => {
        Deletar()
    }, [exclusao.aberto])

    console.log(props.info)
    return (
        //pagina para noticia especifica
        <>
            <div style={exclusao.aberto ? { display: "block",marginLeft:"17%",marginTop:"17.16%" } : { display: "none" }}><ConfirmTable text="Quer realmente excluir?" Excluir={setExclusao} /></div>
            <div style={{ margin: "2% 05%", border: "1px solid black", backgroundColor: "white", borderRadius: "10px", paddingBottom: "1%" }}>
                <div style={{ color: "white", backgroundColor: "black" }}>
                    <h1>{props.info.title}</h1>
                    <h4>{props.info.subtitle}</h4>
                    <hr />
                </div>

                <br />
                <div style={{ display: "flex", padding: "2%" }}>
                    <img src={props.img} width={"50%"} />
                    <a style={{ marginLeft: "3%" }}>{props.info.article}</a><br />
                </div>
                <a>Publicado por: {props.info.nome['nome']}</a><br />
                <h6>as {props.info.data.split("T")[0].replace(/-/g, "/")}</h6>
                <LinkContainer to={"/Blog"}>
                    <Button style={{ width: "100px" }} variant="primary">voltar</Button>
                </LinkContainer>
                {auth.cpf === props.info.cpfresp ?
                    <><br /><hr />
                        <LinkContainer to={"/AddNoticia"} state={{ info: props.info }}>
                            <Button style={{ width: "100px" }} variant="primary">Atualizar</Button>
                        </LinkContainer>
                        <Button onClick={(e) => { setExclusao((prevState) => ({ ...prevState, aberto: true, id: 1 })) }} style={{ width: "100px" }} variant="primary">Excluir</Button>
                    </>
                    :
                    null
                }
            </div>
        </>
    )
}