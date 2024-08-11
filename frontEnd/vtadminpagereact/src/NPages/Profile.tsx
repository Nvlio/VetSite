import React, { useContext, useEffect, useState } from "react";
import img from "../public/Profile.jpg"
import { Contexto } from "../Contexto";
import LayoutMain from "./Layout";
import ProfileMiniPage from "../NMiniPages/ProfilePage.jsx";
import { CheckAuteticacao } from "../nFuncoes/auntenticar.js";

//pagina que estrutura a pagina de profile do usuario
export default function ProfileMain() {
    const { tamanhoJanela } = useContext(Contexto)
    const auth = CheckAuteticacao()

    useEffect(() => {
        if (!auth) {
            window.location.href = "/Login"
        }
    }, [])

    return (
        <div>
            <div className={tamanhoJanela.width >= '1509' ? "ImgBG" : "ImgBGCell"} style={{ backgroundImage: `url(${img})` }} >
                <LayoutMain>
                    <ProfileMiniPage />
                </LayoutMain>
            </div>

        </div>
    )
}