import React from "react";
import { CheckAuteticacao } from "../nFuncoes/auntenticar";
import ErroPage from "./Erro";
import NavMenuBarComp from "../NComponentes/NavMenu.jsx";
import FormNews from "../Componentes/NoticiaForm";
import { useLocation } from "react-router-dom";


export default function AddNotiPage(prop) {
    const auth = CheckAuteticacao()
    const location = useLocation()
    let data;

    if(location.state!=undefined){
        data = location.state.info
    }


    //pagina para adicionar noticia (apenas funcionario pode acessar)
    if (auth.Conta === "funcionario") {
        return (
            <div>
                <NavMenuBarComp position={""} margin={"-05%"} tipo={'lCA'} />
                <h1>Adicionar Notícia</h1>
                <div style={{ border: "1px solid black", margin: "2% 10%", padding:"05%"}}>
                    <FormNews dado={data}/>
                </div>
            </div>
        )
    } else {
        return (
            <ErroPage />
        )
    }

}