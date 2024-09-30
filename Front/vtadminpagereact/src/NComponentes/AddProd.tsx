import React, { useState } from "react"


export default function AddProdTable(props: { prodInfo: any, isOpen: any, qnt: any }) {
    const [qntd, setQntd] = useState("")
    const AtualizarDados = (n: number) => {
        if (n == 1) {
            console.log(props.qnt,qntd)
            props.prodInfo((prev) => ({ ...prev, quantidade: parseInt(qntd) + props.qnt }))
        }
        props.isOpen(0)
    }
    return (
        <div style={{ backgroundColor: "rgba(0, 0, 0, 0.59)", height: "100vh", position: "fixed", zIndex: "2", marginTop: "-18.3%", marginLeft: "-17%", width: "100%" }}>
            <div style={{ backgroundColor: "white", border: "1px solid black", margin: "16% 35%" }}>
                <h1>Comprar mais unidades</h1>
                <hr />
                <p className='form'>Fornecedor</p>
                <input type="text" style={{width:"70%"}} placeholder={"quantidade que quer adicionar"}
                    onChange={(e) => { setQntd(e.target.value) }}

                />
                <hr/>
                
                <button onClick={() => { AtualizarDados(1) }}>Comprar</button>
                <button onClick={() => { AtualizarDados(0) }}>Cancelar</button>
                <br/><br/>
                <h6>Ao confirmar os valores serão descontados e o estoque atualizado, as informações ficaram salvas no Data base para futuras verificações</h6>
            </div>
        </div>
    )
}   