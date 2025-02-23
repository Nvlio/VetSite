import React, { useContext, useEffect, useState } from "react";
import NavMenuBarComp from "../../NComponentes/NavMenu";
import { Contexto } from "../../Contexto";
import ContasComp from "../../NComponentes/ContasList.tsx";
import FiltroComp from "../../Componentes/Filtros/filtros.tsx";
import { Navigate, useNavigate } from "react-router-dom";

export default function ContasPage() {
    const { tamanhoJanela } = useContext(Contexto)
    const [button, setButton] = useState<number>(1)
    const navigate = useNavigate()
    const [filtroOn, setFiltroOn] = useState(false)
    const [filtros, setFiltros] = useState({
        tipo: "_",
        preco: "_",
        validade: "_",
        status: "_",
        responsavel: "_",
        filtrar:false,
        filtroOn:false
    })

    useEffect(()=>{
            setFiltros({tipo:"_",preco:"_",validade:"_",status:"_",responsavel:"_",filtrar:false,filtroOn:!filtroOn})
    },[filtroOn])

    return (
        <>

            <div className={tamanhoJanela.width >= '1509' ? "ImgBG" : "ImgBGCell"} style={{  marginTop: "05%" }} >
                <div style={{ zIndex: "2", position: "initial" }}>
                    <NavMenuBarComp />
                    <div style={{ display: "flex" }}>
                        <div style={{ height: "100vh", border: "1px solid black", marginTop: "-5%", paddingTop: "9%", backgroundColor: "gray", position: "fixed" }}>
                            <button onClick={() => { setButton(1) }} style={{ width: "100%", backgroundColor: button === 1 ? "white" : "gray", color: button === 1 ? "black" : "white" }}>Contas a receber</button>
                            <button onClick={() => { setButton(2) }} style={{ width: "100%", backgroundColor: button === 2 ? "white" : "gray", color: button === 2 ? "black" : "white" }}>Contas a pagar</button>
                            <div style={{ marginTop: "4%" }}>
                                <button style={{width:"80%",borderRadius:"10px"}} onClick={() => { setFiltroOn(!filtroOn) }}>{filtroOn?"Fechar":"Filtros"}</button>
                                <div style={!filtroOn ? { display: "none" } : { display: "block" }}>
                                    <FiltroComp filtrar={setFiltros}/>
                                </div>
                                <br/>
                                <br/>
                                <br/>
                                <button style={{width:"90%",height:"10vh",borderRadius:"10px",fontSize:"30px",fontFamily:"sans-serif",backgroundColor:"yellowgreen",color:"white"}} onClick={()=>{navigate("/Contas/Adicionar")}}>Adicionar</button>
                            </div>
                        </div>
                        <div style={{ border: "1px solid black", width: "100%", backgroundColor: "white", margin: "5% 1% 0% 20%" }}>
                        <div style={{backgroundColor:"white",width:"90%",marginLeft:"-2.4%",marginTop:"-12%",height:"22vh",position:"fixed",zIndex:"1"}}></div>
                            <div>
                                <ContasComp filtro={filtros} tipoConta={button===1?"receber":"pagar"}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}