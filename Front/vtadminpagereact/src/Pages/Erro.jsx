import React from "react";
import NavMenuBarComp from "../NComponentes/NavMenu.jsx";
import { ErroBG } from "./MiniPages/Erro";
import "../CSS/Crescer.css";

export default function ErroPage() {
    return (
        <>
            <div className="fixed-top">
                <NavMenuBarComp position="fixed" margin="" />
            </div>
            <div>
                <ErroBG />
            </div>
        </>
    );
}
