import React, { useContext } from "react";
import LayoutMain from "./Layout.jsx";
import FormuloginMini from "../NMiniPages/Login.tsx";
import FormucadastroMini from "../NMiniPages/Cadastro.tsx";
import { useLocation } from "react-router-dom";
import { Contexto } from "../Contexto.jsx";

import image from "../public/estiloBasico.jpg"
import AddPage from "../NMiniPages/AddItem.tsx";

//Page que vai organizar as chamadas e estruturar o formulario
export default function FormPage(props: { tipo: number }) {
    const location = useLocation()
    const { tamanhoJanela } = useContext(Contexto)
    let dados:any;
    let lista:any;
    if (location.state !== null) {
            dados=location.state.dados
            lista = location.state.lista

        }
    

    //se o page for do tipo 1 então estrutura uma pagina de login.
    if (props.tipo === 1) {
        return (

            <LayoutMain>
                <div className={tamanhoJanela.width >= '1509' ? "ImgBG" : "ImgBGCell"} style={{ backgroundImage: `url(${image})` }} >
                    <FormuloginMini />
                </div>
            </LayoutMain>


        )
    } 
    //caso seja do tipo 2 então estrutura uma pagina de cadastro.
    else if (props.tipo === 2) {
        return (
            <LayoutMain>
                <FormucadastroMini info={""} />
            </LayoutMain>
        )
    } 
    else if (props.tipo === 3){
        return <AddPage lista={lista}/>
    }
    //caso não seja nenhum dos 2 tipos então estrutura uma pagina de atualização.
    else {
        return (
            <LayoutMain>
                <FormucadastroMini info={dados} lista={lista} />
            </LayoutMain>
        )
    }
}