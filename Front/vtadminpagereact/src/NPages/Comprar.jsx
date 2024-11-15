import NavMenuBarComp from "../NComponentes/NavMenu.jsx"
import React from "react"
import ImageMainBG from "../public/Erro-bg.png"
import Produtos from "../NComponentes/produtos.jsx"
import { useParams } from "react-router-dom"
import MNpage from "../NMiniPages/CompraMP.jsx"

export default function ComprarPage(){

    let imgvar = {
        imgbg: ImageMainBG,
        static: false
    }

    //pagina para a finalização da compra
    return(
        <div>
            <div style={{ zIndex: 0, position: "fixed", backgroundImage: `url(${imgvar.imgbg})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", height: "100vh", width: "100%" }} />
            <div style={{ zIndex: 2, position: "relative", paddingTop: "15%" }}>
                <NavMenuBarComp extra={"sim"} />
                <div style={{ backgroundColor: "white", width: "94%", height: "100%", marginLeft: "3%",padding:"2% 0%" }}>
                    <h1>Finalizar Compra</h1>
                    <hr/>
                    <MNpage />
                </div>
            </div>
        </div>
    )
}