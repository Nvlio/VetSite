//state={{ userInfo: user, tipo: props.user }}

import React, { useState } from "react";
import { Login, Cadastro, Animal } from "../Componentes/Form";
import NavMenu from "../Componentes/nav";
import { LinkContainer } from "react-router-bootstrap";

import Button from 'react-bootstrap/Button';
import { useLocation, useParams } from "react-router-dom";
import { AddFormComponente } from "../Componentes/FormOutros";

export default function FormAdicionar(props) {
    const location = useLocation()
    let Info = null;
    let usuario = null

    if (location.state != null) {
        console.log(location.state)
        Info = location.state['tipo']
        usuario = location.state["userInfo"]
    }

    const [tipo, setTipo] = useState("login")
    const [user, setUser] = useState(["Clientes", "Funcionarios"])

    let formSty = { border: '1px solid black', borderRadius: '10px', margin: " 10% 20%", padding: "04%" }

    return(
        <>
            <NavMenu position={""} margin={"-05%"} tipo={'lCA'} />
            <AddFormComponente tipo={Info} user={usuario}/>
        </>
    )    

}