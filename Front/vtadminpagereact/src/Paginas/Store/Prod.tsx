import NavMenuBarComp from "../../NComponentes/NavMenu.jsx"
import React from "react"
import ImageMainBG from "../../public/hero-bg.jpg"
import Produtos from "../../NComponentes/produtos.jsx"
import StoreList from "./Inside/ListaPage.tsx"

type imagem = {
    imgbg: string,
    static: Boolean
}

//pagina para a lojinha
export default function ProduPage() {
    let imgvar: imagem = {
        imgbg: ImageMainBG,
        static: false
    }

    //pagina para lista de produtos disponiveis
    return (
        <div>
            <div style={{ zIndex: 2, position: "relative", paddingTop: "10%" }}>
                
                <div style={{position:"fixed",zIndex:2}}>
                <NavMenuBarComp extra={"sim"} />
                </div>
                <StoreList/>
            </div>
        </div>
    )
}