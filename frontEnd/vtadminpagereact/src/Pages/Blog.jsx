import React, { useContext } from "react";
import img from "../public/estiloBasico.jpg"
import BlogList from "../Componentes/BlogList";
import NavMenuBarComp from "../NComponentes/NavMenu";
import { Contexto } from "../Contexto";

export default function BlogPage(props) {
    const {tamanhoJanela} = useContext(Contexto)

    return (
        <>  
        
            <div className={tamanhoJanela.width >= '1509' ? "ImgBG" : "ImgBGCell"} style={{ backgroundImage: `url(${img})`, marginTop: "05%" }} >
                <div style={{ zIndex: "2", position: "initial" }}>
                    <NavMenuBarComp />
                    <div>
                        <div style={{ border: "1px solid black", margin: "10% 10%",backgroundColor:"white"}}>
                            <BlogList />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

/*
style={{
                    position: 'relative',
                    backgroundImage: `url(${BGIMG})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: 'cover',
                    height: '90vh',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center', // Centraliza o conteúdo verticalmente
                    justifyContent: 'center' // Centraliza o conteúdo horizontalmente
                }}
*/