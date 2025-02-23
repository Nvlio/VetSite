import React, { useEffect, useState } from "react";
import GET from "../nFuncoes/GET.ts";
import { Navigate, useLocation, useNavigate } from "react-router-dom";


export default function ContasComp(props: { filtro: any, tipoConta: String, }) {
    const [contas, setContas] = useState<any[]>()
    const navigate = useNavigate()

    const coletar = async () => {
        const resp = await GET(`http://localhost:3002/Contas/${props.tipoConta}/${props.filtro.tipo}-${props.filtro.status}-${props.filtro.preco}-${props.filtro.validade}`)
        console.log(resp)
        setContas([...resp])
    }

    useEffect(() => {
        if (props.filtro.filtrar) {
            coletar()
        }
    }, [props.filtro.filtrar])

    useEffect(() => {
        if (props.filtro.filtroOn) {
            coletar()
        }

    }, [props.filtro.filtroOn])

    useEffect(() => {
        coletar()
    }, [props.tipoConta])


    if (contas) {
        return (
            <>
                {contas?.map((conta, ind) => {
                    const dtV = new Date(conta.dataV)
                    const dtI = new Date(conta.dataI)
                    return (
                        <div style={{ border: "1px solid black", display: "flex", width: "100%" }}>
                            <div style={{ width: "80%", padding: "1% 0%" }}>
                                <div style={{ display: "flex", gap: "10%", width: "100%" }}>
                                    <h2 style={{ width: "40%" }}>conta:{conta.nome}</h2>
                                    <h2 style={{ width: "20%" }}>R$:{conta.valor}</h2>
                                    <h2 style={{ width: "20%" }}>Status:{conta.status}</h2>
                                </div>
                                <br />
                                <div style={{ display: "flex", marginLeft: "7%" }}>
                                    <h4>Validade:{dtV.getUTCDate()}/{dtV.getUTCMonth() + 1}/{dtV.getFullYear()}</h4>
                                </div>
                            </div>

                            {props.tipoConta === "pagar" && conta.status === "pendente" ?
                            
                                <button style={{ width: "7%", height: "70px", marginTop: "2%", marginLeft: "10%", backgroundColor: "blue", color: "white", borderRadius: "10px" }} onClick={() => { navigate(`/Contas/${conta.id}`) }}>Pagar</button>
                                :
                                null}
                        </div>
                    )
                })}
            </>
        )
    }
}