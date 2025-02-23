import React, { useEffect, useState } from "react";
import NavMenuBarComp from "../NComponentes/NavMenu";
import { POST } from "../nFuncoes/POST.ts";

export default function AddContaPage() {
    const [conta,setConta] = useState({
        nome:"",
        valor:"",
        data:"",
        tipo:"Pagar",
        mensal:"0",
    })

    const Adicionar = async()=>{
        await POST("http://localhost:3002/Contas/",JSON.stringify({
            nome:conta.nome,
            preço:conta.valor,
            DataV:conta.data,
            tipo:conta.tipo,
            mensal:conta.mensal
        }),"Contas")
    }

    return (
        <>

            <div >
                <div style={{ zIndex: "2", position: "initial" }}>
                    <NavMenuBarComp />
                    <div style={{ border: "1px solid black", margin: "10% 10%", height: "80vh", borderRadius: "10px", }}>
                        <form style={{ border: '1px solid black', width: "70%", margin: "5% 0% 0% 15%", padding: "3%" }}>
                            <div style={{ display: "flex", gap: "2%",width:"100%" }}>
                                <label style={{width:"20%" }}>Nome da conta: </label>
                                <input required style={{ width: "60%" }} type="text" placeholder="Nome da conta" onChange={(e)=>{setConta((prev)=>({...prev,nome:e.target.value}))}}/>
                            </div>
                            <br/>
                            <div style={{ display: "flex", gap: "2%",width:"100%"  }}>
                                <label style={{width:"20%" }}>valor da conta: </label>
                                <input required style={{ width: "60%" }} type="number" placeholder="valor" onChange={(e)=>{setConta((prev)=>({...prev,valor:e.target.value}))}}/>
                            </div>
                            <br/>
                            <div style={{ display: "flex", gap: "2%",width:"100%"  }}>
                                <label style={{width:"20%" }}>Mes de validade</label>
                                <input required type="date" onChange={(e)=>{setConta((prev)=>({...prev,data:e.target.value}))}}/>
                            </div>
                            <br/>
                            <div >
                                <select style={{width:"30%",height:"5vh",textAlign:"center" }} onChange={(e)=>{setConta((prev)=>({...prev,tipo:e.target.value}))}}>
                                    <option selected>Selecione o tipo</option>
                                    <option>Receber</option>
                                    <option>Pagar</option>
                                </select>
                            </div>
                            <br/>
                            <div>
                                <input type="radio" value='0' name="opt1" onChange={(e)=>{setConta((prev)=>({...prev,mensal:e.target.value}))}}/> unico<br/>
                                <input type="radio" value="1" name="opt1" onChange={(e)=>{setConta((prev)=>({...prev,mensal:e.target.value}))}}/> mensal
                            </div>
                        </form>
                        <br/>
                        <button style={{height:"7vh",width:"30%",backgroundColor:"green",color:"white",borderRadius:"10pxs"}} onClick={()=>{Adicionar()}}>Adicionar</button>
                    </div>
                    
                </div>
            </div>
        </>
    )

}