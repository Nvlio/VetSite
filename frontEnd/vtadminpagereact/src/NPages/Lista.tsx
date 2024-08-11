import React, { useContext, useEffect, useState } from "react";
import { Contexto } from "../Contexto";
import LayoutMain from "./Layout";
import img from "../public/lista.jpg"
import ListaPage from "../NMiniPages/ListaPage.tsx";
import { CheckAuteticacao } from "../nFuncoes/auntenticar.js";
import MainErro from "./Erro.tsx";

//pagina que estrutura a pagina de lista de dados
export default function ListaMainPage() {
    const { tamanhoJanela } = useContext(Contexto)
    const [lista, setLista] = useState("Clientes")

    const auth = CheckAuteticacao()

    useEffect(() => {
        if (!auth) {
            window.location.href = "/Login"
        }
    }, [])

    //se o usuario for funcionario, então a lista vai conter mais paginas que podem ser vistas por ele
    if (auth?.Conta === "funcionario") {
        return (
            <div className={tamanhoJanela.width >= '1509' ? "ImgBG" : "ImgBGCell"} style={{ backgroundImage: `url(${img})`, marginTop:"05%"}} >
                <LayoutMain>
                    <div style={{ padding: "10% 10% 15% 20%",marginLeft:"-3%" }}>
                        <div style={{ display: "flex" }}>
                            <p style={{ border: "1px solid black", width: "100%", backgroundColor: "white" }} id="clicavel" onClick={(e) => { setLista(e.target.textContent) }}>Clientes</p>
                            <p style={{ border: "1px solid black", width: "100%", backgroundColor: "white" }} id="clicavel" onClick={(e) => { setLista(e.target.textContent) }}>Funcionarios</p>
                            <p style={{ border: "1px solid black", width: "100%", backgroundColor: "white" }} id="clicavel" onClick={(e) => { setLista(e.target.textContent) }}>Unidades</p>
                            <p style={{ border: "1px solid black", width: "100%", backgroundColor: "white" }} id="clicavel" onClick={(e) => { setLista(e.target.textContent) }}>Produtos</p>
                            <p style={{ border: "1px solid black", width: "100%", backgroundColor: "white" }} id="clicavel" onClick={(e) => { setLista(e.target.textContent) }}>Pacientes</p>
                        </div>
                        <ListaPage Lista={lista} />
                    </div>

                </LayoutMain>
            </div>
        )
    } 
    //caso o usuario for clientes, então só mostra uma lista basica de paciente (o unico que o cliente pode ver)
    else if (auth.Conta === "cliente") {
        return (
            <div className={tamanhoJanela.width >= '1509' ? "ImgBG" : "ImgBGCell"} style={{ backgroundImage: `url(${img})` }} >
                <LayoutMain>
                    <div style={{ padding: "10% 10% 15% 20%" }}>
                        <ListaPage Lista="Pacientes" />
                    </div>
                </LayoutMain>
            </div>
        )
    } 
    //se o usuario não estiver logado então ele vê tela de erro.
    else {
        return (
            <>
                <MainErro />
            </>
        )
    }

}