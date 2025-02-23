import NavMenuBarComp from "../NComponentes/NavMenu.jsx"
import React, { useEffect } from "react"
import ImageMainBG from "../public/hero-bg.jpg"
import Produtomini from "../NMiniPages/produto.jsx"
import { useParams } from "react-router-dom"



export default function ProdPage() {
    const params = useParams()
    console.log(params.id)

    //pagina para um produto especifico
    return (
        <div>
            
        </div>
    )
}