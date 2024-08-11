import React, { useState } from "react";

//componente para lista basica de serviços na ppagina home do site (alterar para adicionar comentarios reais do DB)
export default function ListaComp(props: { itens: string[] }) {
    const [id, setId] = useState(Number)
    const [itens] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9])


    return (
        <div>
            <div>
                <ul className="vertical">
                    {props.itens.map((item: string, ind: number) => {
                        return (
                            <li className="clicavel" onClick={() => { setId(ind) }} key={ind} style={{ color: id === ind ? 'red' : 'white' }}>{item}</li>
                        )
                    })}
                </ul>
            </div>
            <hr />
            <div style={{marginLeft:'10%'}} className="vertical">
                {itens.map((item) => {
                    return (
                        <div className="col-lg-6 menu-item filter-starters" style={{display:"flex"}}>
                            <img src={require("../public/menu/cardiologia.png")} className="perfilImg" alt="colocar dinamicamente" />
                            <div>
                                <div className="menu-content">
                                    <a href="/">Consulta Médica de Rotina</a><span><img src="assets/icons-baixados/Consultas.png" width="25px" /></span>
                                </div>
                                <div className="menu-ingredients" >
                                    Cuidado preventivo para a saúde do seu pet
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}