import React from "react";
import { Tabela } from "../Componentes/Tabela";

export function Corpo(props) {
    return (
        <>
            {/* Conteúdo */}
            <div>
                <div style={{ marginTop: "40%", marginLeft: "10%" }}><Tabela/></div>
            </div>
        </>
    )
}