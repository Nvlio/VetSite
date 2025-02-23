import React from "react";
import { Button } from "react-bootstrap";

export default function LateralFilterMenu(props: { filtro: {primeiro:string,segundo:string}, selectedLista: (item: any) => void }) {

    return (
        <div style={{ backgroundColor: "rgba(197,55,55,255)", color: "white", height: "100vh", display: "flex", flexDirection: "column", width: "100%", alignContent: "start", alignItems: "start", padding: "2% 2% 0% 2%" }}>
            <h5><strong>{`Mostrando: ${props.filtro.primeiro===""&&props.filtro.segundo===""?"Todos":props.filtro.primeiro +" "+ props.filtro.segundo}`}</strong></h5>
            <hr style={{ border: "1px solid white", width: "100%" }} />
            <h5>Filtros</h5>
            <div style={{ border: "2px solid rgba(0, 0, 0, 0.07)",backgroundColor:"rgba(0, 0, 0, 0.15)", marginLeft: "10%", paddingTop: "5px", paddingRight: "40%", width: "80%", borderRadius: "10px" }}>
                <h5><strong>Preço</strong></h5>
                <ul style={{ marginLeft: "15%" }}>
                    <li id="clicavel" onClick={() => { props.selectedLista((prev: any) => ({ ...prev, primeiro: props.filtro.primeiro === "menor" ? "" : "menor",filtrar:false })) }}>{"menor"}</li>
                    <li id="clicavel" onClick={() => { props.selectedLista((prev:any) => ({ ...prev, primeiro: props.filtro.primeiro === "maior" ? "" : "maior",filtrar:false })) }}>{"maior"}</li>
                </ul>
            </div>
            <br/>
            <div style={{ border: "2px solid rgba(0, 0, 0, 0.07)",backgroundColor:"rgba(0, 0, 0, 0.15)", marginLeft: "10%", paddingTop: "5px", paddingRight: "40%", width: "80%", borderRadius: "10px" }}>
                <h5><strong>Categorias</strong></h5>
                <ul style={{ marginLeft: "15%" }}>
                    <li id="clicavel" onClick={() => { props.selectedLista((prev:any) => ({ ...prev, segundo: props.filtro.segundo === "remedios" ? "" : "remedios",filtrar:false })) }}>Remedios</li>
                    <li id="clicavel" onClick={() => { props.selectedLista((prev:any) => ({ ...prev, segundo: props.filtro.segundo === "alimentos" ? "" : "alimentos",filtrar:false })) }}>Alimentos</li>
                    <li id="clicavel" onClick={() => { props.selectedLista((prev:any) => ({ ...prev, segundo: props.filtro.segundo === "higiene" ? "" : "higiene",filtrar:false })) }}>Higiene</li>
                    <li id="clicavel" onClick={() => { props.selectedLista((prev:any) => ({ ...prev, segundo: props.filtro.segundo === "brinquedos" ? "" : "brinquedos",filtrar:false })) }}>Brinquedos</li>
                </ul>
            </div>
            <br/>
            <Button style={{justifyContent:"center",justifyItems:"center",justifySelf:"center",width:"100%"}} onClick={()=>{props.selectedLista((prev:any)=>({...prev,filtrar:true}))}}>Filtrar</Button>

        </div>
    )
}