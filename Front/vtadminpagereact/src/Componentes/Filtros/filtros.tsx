import React, { useState } from "react";


export default function FiltroComp(props:{filtrar:any}) {

    return (
        <div>
            <div style={{ marginTop: "4%" }}>
                <input style={{ width: "80%", borderRadius: "10px" }} type="text" placeholder="Tipo da conta" onChange={(e) => { props.filtrar((prev) => ({ ...prev,filtrar:false, tipo: e.target.value===""?"_":e.target.value  })) }}></input>
                <hr/>
                
                
                <div style={{ display: "flex", gap: "10px", border: "1px solid black",backgroundColor:"white", borderRadius: "10px", margin: "0% 2%", padding: "0% 2%" }}>
                    <input type="radio" name="Valor" value={"caro"} onChange={(e) => { props.filtrar((prev) => ({ ...prev,filtrar:false, preco: e.target.value })) }} />caros
                    <input type="radio" name="Valor" value={"barato"} onChange={(e) => { props.filtrar((prev) => ({ ...prev,filtrar:false, preco: e.target.value })) }} />barato
                    <input type="radio" name="Valor" value={"_"} onChange={(e) => { props.filtrar((prev) => ({ ...prev,filtrar:false, preco: e.target.value })) }} />Nenhum
                </div>
                <hr />
                <div style={{ display: "flex", flexDirection: "column", gap: "10px",backgroundColor:"white", border: "1px solid black", borderRadius: "10px", margin: "0% 2%", padding: "0% 2%" }}>
                    <div><input type="radio" name="validade" value={"Perto"} onChange={(e) => { props.filtrar((prev) => ({ ...prev,filtrar:false ,validade: e.target.value })) }} /> Perto da validade</div>
                    <div><input type="radio" name="validade" value={"Longe"} onChange={(e) => { props.filtrar((prev) => ({ ...prev,filtrar:false, validade: e.target.value })) }} /> Longe da validade</div>
                    <div><input type="radio" name="validade" value={"_"} onChange={(e) => { props.filtrar((prev) => ({ ...prev,filtrar:false, validade: e.target.value })) }} /> Nenhum</div>
                </div>
                <hr/>
                <div style={{ display: "flex", gap: "10px", border: "1px solid black",backgroundColor:"white", borderRadius: "10px", margin: "0% 2%", padding: "0% 13%" }}>
                    <input type="radio" name="status" value={"paga"} onChange={(e) => { props.filtrar((prev) => ({ ...prev,filtrar:false, status: e.target.value })) }} /> Pagas
                    <input type="radio" name="status" value={"pendente"} onChange={(e) => { props.filtrar((prev) => ({ ...prev,filtrar:false, status: e.target.value })) }} /> Pendentes
                    
                </div>
            </div>
            <br/>
            <button style={{width:"90%",height:"7vh",borderRadius:"10px",backgroundColor:"green",color:"white"}} onClick={()=>{props.filtrar((prev)=>({...prev,filtrar:true}))}}>Filtrar</button>
        </div>
    )
}