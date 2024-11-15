import React, { useEffect, useState } from "react";
import GET from "../nFuncoes/GET.ts";


export default function ContasComp(props:{filtro:any,tipoConta:String,}) {
    const [contas,setContas] = useState<any[]>()

    const coletar = async()=>{
        const resp = await GET(`http://localhost:3002/Contas/${props.tipoConta}/${props.filtro.tipo}-${props.filtro.status}-${props.filtro.responsavel}-${props.filtro.preco}-${props.filtro.validade}`)
        console.log(resp)
    }

    useEffect(()=>{
        if(props.filtro.filtrar){
            console.log(props.filtro)
            coletar()
        }
    },[props.filtro.filtrar])

    useEffect(()=>{
        console.log(props.tipoConta)
        coletar()
    },[props.tipoConta])


    if(contas){
        return (
            <>
                {contas?.map((conta,ind)=>{
                    const dtV = new Date(conta.dataV)
                    const dtI = new Date(conta.dataI)
                    return(
                        <div style={{border:"1px solid black"}}>
                            <h1>{conta.nome}</h1>
                            <h1>{dtV.getUTCDate()}/{dtV.getUTCMonth()+1}/{dtV.getFullYear()}</h1>
                            <h1>{dtI.getUTCDate()}/{dtI.getUTCMonth()+1}/{dtI.getFullYear()}</h1>
                            <h1>{conta.valor}</h1>
                            <h1>{conta.status}</h1>
                            <h1>{conta.RespNome}</h1>
                        </div>
                    )
                })}
            </>
        )
    }
}