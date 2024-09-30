import React, { useState } from "react"
import { POST } from "../nFuncoes/POST.ts"

export default function TelaAdd(props: { status: string, fechar: (status: string) => void, especies: any }) {
    const [erro, setErro] = useState("")
    const [data, setData] = useState({
        especie: 1,
        nome: ""
    })

    const Enviar=async (e:any)=>{
        e.preventDefault() 
        await POST(`http://localhost:3002/Racas/`,JSON.stringify({nome:data.nome,especie:data.especie}),"")
        window.location.reload()
        props.fechar("Fechado")
    }

    return (
        <div className="TelaFechar" style={{ display: props.status != "Fechado" ? 'flex' : 'none' }}>
            <div style={{ marginRight: "-90%" }}>
                <button onClick={() => { props.fechar('Fechado') }}>X</button>
            </div>
            <div id="formTela">
                <div className="TelaAdd" key={"Login"}>
                    <h1>Adicionar Raça</h1>
                    <hr style={{ width: "100%" }} />
                    <br/><br/>
                    <form onSubmit={(e) => {Enviar(e)}}>
                        <input type="text" placeholder="Raça" onChange={(e) => { setData((prevState) => ({ ...prevState, nome: e.target.value })) }} /><br />
                        <div className="col-lg-6 col-md-6 form-group mt-3" style={{marginLeft:"35%",width:"30%"}}>
                            <label>Especie do animal</label>
                            <select className="form-control custom-input" name="especie" id="especie"
                                onChange={(e) => { setData((prevState) => ({ ...prevState, especie: e.target.selectedIndex + 1 })) }}>
                                {props.especies.especielist.map((especie:string, index:number) => {
                                    return (
                                        <>
                                            <option key={`especie-${index}`} value={especie['nome']}>{especie['nome']}</option>
                                        </>
                                    )
                                })}
                            </select>
                        </div>
                        <br/>
                        <button>Enviar</button>
                    </form>
                    <div className="Error" style={{ display: erro !== "" ? "block" : "none" }}>{erro}</div>
                </div>
            </div>
        </div>
    )
}