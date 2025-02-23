import React from "react";
import NavMenuBarComp from "../../../NComponentes/NavMenu";
import { useParams } from "react-router-dom";
import { CheckAuteticacao } from "../../../nFuncoes/auntenticar";
import ErroPage from "../../../Pages/Erro";
import FormularioFuncionarios from "./Funcionarios.tsx";
import FooterCadastro from "../../../Componentes/Footer/CadastroFooter.tsx";
import UnidadeForm from "./Unidades.tsx";
import PacienteForm from "./Paciente.tsx";
import ProdutoForm from "./Produtos.tsx";
import { Button } from "react-bootstrap";

export default function AdicaoFormulario() {
    const lista = useParams().item
    const auth = CheckAuteticacao().Conta
    console.log(lista, auth)

    function EscolherForm(){
        if(lista==="Unidades"){
            return(<UnidadeForm/>)
        }else if(lista ==="Pacientes"){
            return(<PacienteForm/>)
        }else{
            return(<ProdutoForm/>)
        }

    }

    if (lista !== "Pacientes" && auth === "cliente") {
        return (
            <ErroPage />
        )
    } else {
        return (
            <div style={{ margin: "10% 20%" }}>
                <NavMenuBarComp />
                <div style={{ zIndex: "1",position:"relative"}}>
                    {lista === "Funcionarios" ? <FormularioFuncionarios /> : 
                    <EscolherForm/>
                    }
                </div>
                <Button variant="success">Retornar</Button>
            </div>
        )
    }
}