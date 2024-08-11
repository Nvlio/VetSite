import React from "react";
import { Inicio } from "./MiniPages/Inicial.jsx";
import { Default } from "./MiniPages/Sobre.jsx";
import TopMenu from "../Componentes/MenuTop.jsx";
import NavMenu from "../Componentes/nav.jsx";

export default function Main(props) {
    return (
        <>
            <div style={{ position: "fixed",zIndex:"1" }}>
                <TopMenu />
                <NavMenu position={"fixed"} margin={""} />
            </div>
            <div>
                <Inicio />
                <Default />
            </div>
            <div style={{ backgroundColor: "black", width: "100%", height: '100px', color: "white", textAlign: "center" }}>
                <p>© Copyright da pagina, e todos os direitos do design por RafaFernAndrw</p>
            </div>
        </>
    );
}