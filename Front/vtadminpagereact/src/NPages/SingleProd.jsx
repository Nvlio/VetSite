import NavMenuBarComp from "../NComponentes/NavMenu.jsx"
import React, { useEffect } from "react"
import ImageMainBG from "../public/hero-bg.jpg"
import Produtomini from "../NMiniPages/produto.jsx"
import { useLocation } from "react-router-dom"



export default function ProdPage() {
    const location = useLocation()
    let dados;

    if(location.state!==null){
        dados = location.state
    }


    let imgvar = {
        imgbg: ImageMainBG,
        static: false
    }


    //pagina para um produto especifico
    return (
        <>
            <div style={{ zIndex: 0, position: "fixed", backgroundImage: `url(${imgvar.imgbg})`, backgroundSize: "cover", height: "100vh", width: "100%" }}/>
            <div style={{ zIndex: 2, position: "relative", paddingTop: "10%" }}>
                <NavMenuBarComp extra={"sim"} />
                <div style={{ backgroundColor: "white", width: "94%", height: "100%", marginLeft: "3%" }}>
                    <Produtomini data={dados.info} img={dados.img[0]}/>
                </div>
            </div>
        </>
    )
}