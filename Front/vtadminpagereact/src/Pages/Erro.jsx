import React from "react";
import NavMenu from "../Componentes/nav";
import { ErroBG } from "./MiniPages/Erro";
import "../CSS/Crescer.css";

export default function ErroPage() {
    return (
        <>
            <div className="fixed-top">
                <NavMenu position="fixed" margin="" />
            </div>
            <div>
                <ErroBG />
            </div>
        </>
    );
}
