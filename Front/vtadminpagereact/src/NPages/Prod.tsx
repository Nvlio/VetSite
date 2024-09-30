import NavMenuBarComp from "../NComponentes/NavMenu.jsx"
import React from "react"
import ImageMainBG from "../public/hero-bg.jpg"
import Produtos from "../NComponentes/produtos.jsx"

type imagem = {
    imgbg: string,
    static: Boolean
}

export default function ProduPage() {
    let imgvar: imagem = {
        imgbg: ImageMainBG,
        static: false
    }

    //pagina para lista de produtos disponiveis
    return (
        <div>
            <div style={{ zIndex: 0, position: "fixed", backgroundImage: `url(${imgvar.imgbg})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", height: "100vh", width: "100%" }} />
            <div style={{ zIndex: 2, position: "relative", paddingTop: "10%" }}>
                <NavMenuBarComp extra={"sim"} />
                <div style={{ backgroundColor: "white",  width: "70%", height: "100%", marginLeft: "15%",paddingBottom:"2%"}}>
                    <Produtos/>
                </div>
            </div>
        </div>
    )
}