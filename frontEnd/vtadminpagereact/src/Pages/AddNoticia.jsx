import React from "react";
import { CheckAuteticacao } from "../nFuncoes/auntenticar";
import ErroPage from "./Erro";
import NavMenu from "../Componentes/nav";
import FormNews from "../Componentes/NoticiaForm";
import { useLocation } from "react-router-dom";


export default function AddNotiPage(prop) {
    const auth = CheckAuteticacao()
    const location = useLocation()
    let data;

    if(location.state!=undefined){
        data = location.state.info
    }


    if (auth.Conta === "funcionario") {
        return (
            <div>
                <NavMenu position={""} margin={"-05%"} tipo={'lCA'} />
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