import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavMenuBarComp from "../NComponentes/NavMenu.jsx";
import NewsStruc from "../NComponentes/noticiaComponent.jsx";
import backGroundImg from "../public/Erro-bg.png"

export default function NewsPage(prop){
    const location = useLocation()
    let noticia 
    const estiloBG = {
            position: 'fixed',
            zindex:"1",
            backgroundImage: `url(${backGroundImg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: 'cover',
            height: '200vh',
            marginTop:'-50px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', // Centraliza o conteúdo verticalmente
            justifyContent: 'center' // Centraliza o conteúdo horizontalmente
    }

    if(location.state!==null){
        noticia = location.state
    }
    useEffect(()=>{console.log(noticia  )},[noticia]) 

    //pagina para a noticia especifica
    return(
        <>
        <div style={{zindex:"2",position:"relative"}}>
        <NavMenuBarComp/>
        </div>
        <hr/>
        <div style={estiloBG}/>
        <div style={{zIndex:"1",position:"relative",marginTop:"14%"}}>
            <NewsStruc info={noticia.InfoNew} img={noticia.img} ind={noticia.index}/>
        </div>
        </>
    )
}