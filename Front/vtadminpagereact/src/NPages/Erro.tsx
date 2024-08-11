import React, { useContext } from "react";
import img from "../public/Erro-bg.png"
import LayoutMain from "./Layout";
import { Contexto } from "../Contexto";


//page que estrutura uma pagina de erro 404
export default function MainErro() {
    const {tamanhoJanela} = useContext(Contexto)
    return (
        <div className={tamanhoJanela.width >= '1509' ? "ImgBG" : "ImgBGCell"} style={{ backgroundImage: `url(${img})` }} >
            <LayoutMain>
                <div style={{ padding: "20% 20% 15% 20%",color:"white" }}>
                    <h1>Pagina Não Encontrada</h1>
                </div>
            </LayoutMain>
        </div>
    )
}