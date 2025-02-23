import React, { useEffect } from "react";
import BlogController from "../blogController";
import { Link, useParams } from "react-router-dom";
import NavMenuBarComp from "../../../NComponentes/NavMenu";
import { Button, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NoticiaPage() {
    const { GetNews, GetLink, navigate, news, link,heart,CurtirDescurtir,auth } = BlogController()
    const id = useParams().id

    useEffect(() => {
        GetNews(id)
    }, [])

    useEffect(() => {
        console.log(news)
        if (news) {
            GetLink(news.file, news.imagem.split(".")[1])
        }
    }, [news])

    if (news) {
        return (
            <div style={{ backgroundColor: "rgb(129, 47, 51)", width: "100%", height: "100vh", paddingTop: "10%", paddingLeft: "2%" }}>
                <NavMenuBarComp />
                <Button variant="success" style={{ position: "fixed", margin: "33% 0% 0% -45%", zIndex: "3" }} onClick={() => { navigate("/Blog") }}>Voltar</Button>
                <div style={{ borderRadius: "10px", width: "99%", height: "77vh", backgroundColor: "white", display: "flex", gap: "3%" }}>
                    <div style={{ width: "40%", height: "100%" }}>
                        <Image src={link} style={{ objectFit: "cover", width: "100%", height: "100%", borderRadius: "10px 0px 0px 10px", border: "1px solid gray", maxHeight: "100%", maxWidth: "100%" }} />
                    </div>
                    <div style={{ textAlign: "start", width: "55%" }}>
                        <h1>{news.title}</h1>
                        <h5>{news.subtitle}</h5>
                        <hr />
                        <div style={{ height: "51.6%" }}>
                            <p>{news.article}</p>
                        </div>
                        <div style={{display:"flex", justifyContent:"space-between",width:"100%"}}>
                            <p>Gostou da noticia curta para ajudar ela a se destacar</p>
                            <FontAwesomeIcon id="clicavel"  style={{height:"20px"}} icon={heart} onClick={CurtirDescurtir}/>
                        </div>
                        <div style={{ backgroundColor: "black", width: "109.2%", borderRadius: "0px 0px 10px 0px", marginLeft: "-5.5%", padding: "5% 0px 0px 2%", color: "white", height: "15.7vh" }}>
                            <p style={{ marginBottom: "-1%" }}>Publicado por: {news.nome.nome}</p>
                            <p>em {new Date(news.data).toISOString().split("T")[0].replaceAll("-", "/")}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}