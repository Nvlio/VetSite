import React, { useState } from "react";
import { Login, Cadastro, AnimalForm, Atualizar } from "../Componentes/Form.jsx";
import NavMenu from "../Componentes/nav";
import { LinkContainer } from "react-router-bootstrap";
import Button from 'react-bootstrap/Button';
import { useLocation } from "react-router-dom";
import "../CSS/Crescer.css";

export default function Formulario(props) {
    const location = useLocation();
    const userInfo = location.state ? location.state.userInfo : null;
    const userName = location.state ? location.state.tipo : null

    const [tipo, setTipo] = useState("login");
    const [user, setUser] = useState(["Clientes", "Funcionarios"]);

    return (
        <div>
            <div className="nav-menu-wrapper">
                <NavMenu position="" margin="-05%" tipo="lCA" />
            </div>

            {!userInfo ?
                <div >
                    {tipo === "login" ? (
                        <div>
                            <h1>Login de {user[0]}</h1><br />
                            <Login user={user[0]} />
                        </div>
                    ) : (
                        <div>
                            <h1>Cadastro de {user[0]}</h1><br />
                            <Cadastro user={user[0]} func={userInfo} />
                        </div>
                    )}


                </div> 
                :
                <div>
                    <h1> Atualizar {userName}</h1>
                    <Atualizar user={userName} func={userInfo}/>
                    <LinkContainer to={'/List'}><button className="btn btn-success">voltar</button></LinkContainer>
                </div> 
                
            }


            <p>
                Não tem conta? <strong
                    onMouseOver={(e) => { e.target.style.cursor = 'pointer'; e.target.style.color = "blue" }}
                    onMouseOut={(e) => { e.target.style.cursor = "default"; e.target.style.color = "black" }}
                    onClick={() => setTipo("cadastro")}>Cadastre-se</strong>
            </p>

            <p>
                É um {user[1]}? <strong
                    onMouseOver={(e) => { e.target.style.cursor = 'pointer'; e.target.style.color = "blue" }}
                    onMouseOut={(e) => { e.target.style.cursor = "default"; e.target.style.color = "black" }}
                    onClick={() => { setTipo("login"); setUser([user[1], user[0]]) }}>Entre</strong>
            </p>
        </div>
    )
}