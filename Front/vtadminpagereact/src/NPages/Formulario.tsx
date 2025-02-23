import React, { useContext } from "react";
import LayoutMain from "./Layout.jsx";
import FormuloginMini from "../Paginas/Formularios/Login/Login.tsx";
import FormucadastroMini from "../NMiniPages/Cadastro.tsx";
import { useLocation } from "react-router-dom";
import { Contexto } from "../Contexto.jsx";

import image from "../public/estiloBasico.jpg"
import AddPage from "../NMiniPages/AddItem.tsx";
import FormuCadastro from "../Paginas/Formularios/Cadastro/Cadastro.tsx";
import AdicaoFormulario from "../Paginas/Formularios/Adicao/adicao.tsx";
import EditarForm from "../Paginas/Formularios/Edicao/pageEdicao.tsx";

//Page que vai organizar as chamadas e estruturar o formulario
export default function FormPage(props: { tipo: number }) {
    const location = useLocation()
    const { tamanhoJanela } = useContext(Contexto)
    let dados:any;
    let lista:any;
    let conta:any;
    if (location.state !== null) {
            dados=location.state.dados
            lista = location.state.lista
            conta = location.state.conta
        }
    

    //se o page for do tipo 1 então estrutura uma pagina de login.
    if (props.tipo === 1) {
        return (

                <div style={{backgroundColor:"rgba(197,55,55,255)",width:"100%",height:"100vh",paddingTop:"10%"}}>
                    <FormuloginMini />
                </div>


        )
    } 
    //caso seja do tipo 2 então estrutura uma pagina de cadastro.
    else if (props.tipo === 2) {
        return (
            <div style={{backgroundColor:"rgba(197,55,55,255)",width:"100%",height:"100%"}}>
                <FormuCadastro/>
            </div>
        )
    } 
    //caso 3 é pagina para adicionar
    else if (props.tipo === 3){
        return (
            <div style={{backgroundColor:"rgb(234, 234, 234)",width:"100%",height:"100%",paddingTop:"10%",marginBottom:"-100%"}}>
                <AdicaoFormulario/>
            </div>
        )
    }
    //caso não seja nenhum dos 3 tipos então estrutura uma pagina de atualização (informações nos props fazem o componente entender que é atualização).
    else {
        return (
            <LayoutMain>
                <EditarForm/>
                <FormucadastroMini info={dados} lista={lista} conta={conta} />
            </LayoutMain>
        )
    }
}