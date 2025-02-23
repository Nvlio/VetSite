import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavMenuBarComp from "../NComponentes/NavMenu";
import GET from "../nFuncoes/GET.ts";
import UPDATE from "../nFuncoes/UPDATE.ts";
import { CheckAuteticacao } from "../nFuncoes/auntenticar.js";
import { POST } from "../nFuncoes/POST.ts";

export default function PagarConta() {
    const auth = CheckAuteticacao()
    const [conta, setConta] = useState()
    const [data, setData] = useState()
    const urlParams = useLocation().pathname.split("/")

    //pegar dados da conta especifico
    const getInfo = async () => {
        const resp = await GET(`http://localhost:3002/Contas/outro/unique/${urlParams[urlParams.length - 1]}`)
        console.log(resp)
        setConta(...resp)
    }

    const pagarContas = async()=>{
        //atualizar conta para ter status pago
        UPDATE(`http://localhost:3002/Contas/${urlParams[urlParams.length - 1]}`,"Contas",JSON.stringify({status:"paga",respNome:auth.cpf}))
        //atualizar compras para adicionar esse valor
        POST(`http://localhost:3002/Compras/`,JSON.stringify({
            cpf: auth.cpf,
            preço: conta.valor,
            formPagar: "interno",
            parcelas: "12",
            prodId: 18,
            qntd: 1,
            prods: ["luz"]}),"Contas")
    }

    useEffect(() => {
        getInfo()
    }, [])

    useEffect(() => {
        console.log(conta)
        if (conta) {
            const data = new Date(conta.dataV)
            setData(`${data.getUTCDate()}/${data.getUTCMonth() + 1}/${data.getFullYear()}`)
        }
    }, [conta])

    useEffect(()=>{
        console.log(auth)
    },[auth])

    if (conta && data) {
        return (
            <>

                <div >
                    <div style={{ zIndex: "2", position: "initial" }}>
                        <NavMenuBarComp />
                        <div style={{ border: "1px solid black", margin: "10% 10%", height: "70vh", borderRadius: "10px", display: "flex" }}>
                            <div style={{ border: "1px solid black", width: "60%", margin: "2%", justifyItems: "flex-start", paddingLeft: "20px" }}>
                                <h1 style={{ fontSize: "100px" }}>{conta.nome}</h1>
                                <br />
                                <h1>R$:{conta.valor}</h1>
                                <h2>Validade:{data}</h2>
                            </div>
                            <div style={{alignContent:"center",width:"40%"}}>
                                <button style={{width:"70%",height:"10vh",borderRadius:"10px",backgroundColor:"green",color:"white"}} onClick={()=>{pagarContas()}}>Pagar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}