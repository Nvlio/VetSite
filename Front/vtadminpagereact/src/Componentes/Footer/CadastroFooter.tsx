import React from "react";
import { Button } from "react-bootstrap";

export default function FooterCadastro() {
    return (
        <div style={{ width: "100%", marginLeft: "-20%", position: "fixed", height: "8vh", backgroundColor: "white", border: "1px solid black" }}>
            <div style={{ display: "flex",gap:"15px",marginLeft:"2%" }}>
                <Button variant="primary" style={{ marginTop: "10px"}}>
                    Cancelar
                </Button>
                <Button variant="primary" style={{ marginTop: "10px" }}>
                    Salvar
                </Button>
            </div>
        </div>
    )
}