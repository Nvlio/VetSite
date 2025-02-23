import React, { useEffect } from "react";
import BlogController from "./blogController.js";
import NavMenuBarComp from "../../NComponentes/NavMenu.jsx";
import PageLista from "../../Componentes/Blog/MainNewsList.tsx";
import { CheckAuteticacao } from "../../nFuncoes/auntenticar.js";
import { Button } from "react-bootstrap";

export default function PageBlog() {
    const { news,topnews,navigate, fillBlogList } = BlogController()
    const auth = CheckAuteticacao()
    useEffect(() => {
        fillBlogList()
    }, [])



    if (news) {
        return (
            <div >
                <NavMenuBarComp />
                <div style={{ display: "flex", backgroundColor: "#f0f0f0", marginTop: "9%", position: "relative", zIndex: "3" }}>
                    <div style={{ width: "20%", height: "100vh", paddingTop: "10px" }}>
                        <div style={{ backgroundColor: "rgba(197,55,55,255)", color: "white", height: "9vh", marginTop: "-4%", paddingTop: "4%" }}>
                            <h2>Principais noticias</h2>
                        </div>
                        <ul style={{ justifyItems: "start" }}>
                            {topnews.map((noticia) => {
                                return (
                                    <li id="clicavel" className="EmCima" style={{ borderBottom: "1px solid gray", padding: "2%", width: "100%", textAlign: "start", margin: "30px -20px" }}>
                                        <p>{noticia.title}</p>
                                        <p>{noticia.article}</p>
                                    </li>

                                )
                            })}
                        </ul>
                    </div>
                    <div style={{ height: "100vh", border: "1px solid red" }} />
                    <div id="hideScrollbar" style={{ width: "70%", height: "100vh", color: "black", overflowY: "auto" }}>
                        <h1>Noticias</h1>
                        <hr />
                        <div style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-around",flexWrap:"wrap" }}>
                            {news.map((noticia: any) => {
                                return (
                                    <>
                                        <PageLista  title={noticia.title} article={noticia.article} file={noticia.file} imagem={noticia.imagem.split(".")[1]} id={noticia.id} />
                                    </>
                                )
                            })}
                        </div>
                    </div>
                    <div style={{ width: "15%", height: "100vh", backgroundColor: "rgba(197,55,55,255)", color: "white" }}>
                        <br />
                        {auth.Conta === "funcionario" ?
                            <div>
                                <h5>Adicionar Noticia</h5>
                                <hr />
                                <br />
                                <Button onClick={()=>{navigate("/AddNoticia")}} style={{ width: "80%", height: "10vh" }} variant="success">Adicionar</Button>
                            </div>
                            :
                            null}
                        <p>
                            Todas as noticias aqui forão publicadas pelo nosso time de funcionários especializados
                        </p>
                    </div>
                    <div style={{ backgroundColor: "black", marginTop: "33%",marginLeft:"85.7%", height: "15vh", width: "14.5%",color:"white", position: "fixed" }}>
                        <h4>Contato</h4>

                    </div>
                </div>
            </div >
        )
    }
}