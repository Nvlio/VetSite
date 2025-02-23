import React from "react";
import { CheckAuteticacao } from "../nFuncoes/auntenticar";
import ErroPage from "./Erro";
import NavMenuBarComp from "../NComponentes/NavMenu.jsx";
import FormNews from "../NComponentes/NoticiaForm";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";


export default function AddNotiPage(prop) {
    const auth = CheckAuteticacao()
    const navigate = useNavigate()
    const location = useLocation()
    let data;

    if(location.state!=undefined){
        data = location.state.info
    }


    //pagina para adicionar noticia (apenas funcionario pode acessar)
    if (auth.Conta === "funcionario") {
        return (
            <div style={{backgroundColor:"rgba(197,55,55,255)",height:"145vh",paddingTop:"9%"}}>
                <NavMenuBarComp position={""} margin={"-05%"} tipo={'lCA'} />
                <div style={{backgroundColor:"black",color:"white",height:"10vh"}}>
                <h1>Adicionar Notícia</h1>
                </div>
                <div style={{ border: "1px solid black",borderRadius:"10px",backgroundColor:"white", margin: "2% 10%", padding:"05%"}}>
                    <FormNews dado={data}/>
                </div>
                <Button variant="success" onClick={()=>{navigate("/Blog")}}>Voltar</Button>
            </div>
        )
    } else {
        return (
            <ErroPage />
        )
    }

}