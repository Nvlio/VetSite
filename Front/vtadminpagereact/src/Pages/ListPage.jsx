import React, { useEffect, useState } from "react";
import NavMenu from "../Componentes/nav";
import ListaItens from "../Componentes/Lista";
import Button from 'react-bootstrap/Button';
import { CheckAuteticacao } from "../nFuncoes/auntenticar.js";
import ErroPage from "./Erro";
import { LinkContainer } from "react-router-bootstrap";
import ListaProdUnit from "../Componentes/ListaOutros.jsx";
import backgroundImage from "../public/estiloBasico.jpg"
import "../CSS/Crescer.css";

export default function Lista() {
    const [userTipo, setUserTipo] = useState("");
    const loggedRight = CheckAuteticacao();
    const auth = CheckAuteticacao();

    useEffect(() => {
        if (loggedRight.Conta === "cliente") {
            setUserTipo("Pacientes");
        }
    }, [loggedRight.Conta]);

    if (!loggedRight) {
        return <ErroPage />;
    }

    const bgEstilo = {
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
    }


    return (
        <div>
            <NavMenu position="" margin="-05%" tipo="lCA" /><br /><br />
            <div style={bgEstilo}>
                {loggedRight.Conta === "funcionario" && (
                    <div className="button-group">
                        <Button onClick={() => setUserTipo("Clientes")} className="custom-button small-button">Cliente</Button>
                        <Button onClick={() => setUserTipo("Funcionarios")} className="custom-button small-button">Funcionario</Button>
                        <Button onClick={() => setUserTipo("Produtos")} className="custom-button small-button">Produto</Button>
                        <Button onClick={() => setUserTipo("Unidades")} className="custom-button small-button">Unidade</Button>
                        <Button onClick={() => setUserTipo("Pacientes")} className="custom-button small-button">Animal</Button>
                    </div>
                )}


                {userTipo === "Pacientes" && auth.Conta !== "funcionario" && (
                    <div style={bgEstilo}>
                        <h4 className="section-title">Adicionar Animal</h4>
                        <LinkContainer to="/Animal" state={{ func: null }}>
                            <Button className="custom-button small-button">Adicionar</Button>
                        </LinkContainer>
                    </div>
                )}

                {userTipo === "Produtos" && (
                    <>
                        <h4 className="section-title">Adicionar Produto</h4>
                        <LinkContainer to="/AddForm" state={{ tipo: "Produtos" }}>
                            <Button className="custom-button small-button">Adicionar</Button>
                        </LinkContainer>
                    </>
                )}

                {userTipo === "Unidades" && (
                    <>
                        <h4 className="section-title">Adicionar {userTipo}</h4>
                        <LinkContainer to="/AddForm" state={{ tipo: "Unidades" }}>
                            <Button className="custom-button small-button">Adicionar</Button>
                        </LinkContainer>
                    </>
                )}

                <div className="list-container">
                    {userTipo === "Produtos" || userTipo === "Unidades" ? (
                        <ListaProdUnit user={userTipo} />
                    ) : (
                        <ListaItens user={userTipo} cpf={loggedRight.cpf} />
                    )}
                </div>
            </div>
        </div>
    );
}
