import React, { useState } from "react";
import "../../CSS/Proprio.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function MenuLateral(props) {
    const [selectedIndes, setSelectedIndex] = useState<string | number>("profile")

    if (props.itens) {
        return (
            <div style={{ backgroundColor: "rgba(197,55,55,255)", color: "white", height: "100vh", position: "fixed", display: "flex", flexDirection: "column", width: "20%", alignContent: "start", alignItems: "start", padding: "2% 0% 0% 2%" }}>
                <h4>{props.name}</h4>
                <h6>{props.auth.Conta}</h6>
                <hr style={{ border: "1px solid white", margin: "0% 0%", width: "80%" }} />
                <div className="ListaClicavel" style={{ backgroundColor: selectedIndes === "profile" ? "rgb(129, 47, 51)" : "" }} onClick={() => { setSelectedIndex('profile'); props.selectedLista("perfil") }}><FontAwesomeIcon icon={props.icons[props.icons.length-1]} style={{ color: "#ffffff", paddingTop: "4%" }} /><p style={{ fontFamily: "-moz-initial", fontSize: "20px" }}>{"perfil"}</p></div>
                {props.itens.map((item: string, ind: number) => {
                    return (
                        <div className="ListaClicavel" style={{ backgroundColor: selectedIndes === ind ? "rgb(129, 47, 51)" : "" }} onClick={() => { setSelectedIndex(ind); props.selectedLista(item) }}><FontAwesomeIcon icon={props.icons[ind]} style={{ color: "#ffffff", paddingTop: "4%" }} /><p style={{ fontFamily: "-moz-initial", fontSize: "20px" }}>{item}</p></div>
                    )
                })}
                <div className="ListaClicavel" style={{ marginTop: "65%"}}>
                    <Link to={"/"} style={{textDecoration:"none",color:"white"}}>
                        <p style={{ fontFamily: "-moz-initial", fontSize: "20px" }}>Voltar</p>
                    </Link>
                </div>
            </div>
        )
    }
}