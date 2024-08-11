import React from "react";
import backgroundImage from '../../public/Erro-bg.png'; // Importe a imagem
import "../../CSS/Crescer.css";

export function ErroBG(props) {
    return (
        <div className="erro-bg">
            <div className="erro-message">
                <h1>Página não encontrada</h1>
            </div>
        </div>
    );
}
