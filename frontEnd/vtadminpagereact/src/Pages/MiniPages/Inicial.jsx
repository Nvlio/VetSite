import React from "react";
import TopMenu from "../../Componentes/MenuTop";
import NavMenu from "../../Componentes/nav";
import backgroundImage from '../../public/hero-bg.jpg'; // Importe a imagem
import { Corpo } from "../Corpo";

export function Inicio(props) {
    return (
        <div style={{
            position: 'relative',
            backgroundImage: `url(${backgroundImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: 'cover',
            height: '100vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', // Centraliza o conteúdo verticalmente
            justifyContent: 'center' // Centraliza o conteúdo horizontalmente
        }}>
            <div>
                <Corpo/>
            </div>

        </div >
    )
}