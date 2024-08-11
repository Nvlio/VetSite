import React, { useState, createContext, useEffect } from "react";

export const Contexto = createContext()

export function ContextoSite(props) {
    const [tamanhoJanela, setTamanhoJanela] = useState({
        width: "1536",
        height: "738"
    })

    useEffect(() => {
        const WindowSizeHandler = () => {
            setTamanhoJanela({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }

        window.addEventListener("resize", WindowSizeHandler);
        return () => {
            window.removeEventListener("resize", WindowSizeHandler);
        }
    }, [])

    

    return (
        <Contexto.Provider value={{ tamanhoJanela }}>
            {props.children}
        </Contexto.Provider>
    )
}