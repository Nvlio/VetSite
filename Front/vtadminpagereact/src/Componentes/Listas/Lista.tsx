import React, { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import ListaUnica from "./Listagem.tsx";
import { useNavigate } from "react-router-dom";
import ControllerLista from "../../Paginas/Listas/controllerLista.js";

//compoennte contendo todos os itens da lista especifica
export default function ListaComponent(props) {
    const { id, prods, setId, GetVenda, } = ControllerLista()
    const [keysFiltradas, setKeysFiltradas] = useState<String[]>()
    const navigate = useNavigate()

    const Editar = (e) => {
        e.stopPropagation()
        alert("editei")
    }

    const Expandir = (e, item) => {
        if (id === item.id) {
            setId(0)
        } else {
            setId(item.id)
            if (!prods || prods[0].id !== item.id) {
                GetVenda(item.id)
            }
        }
    }

    useEffect(() => {
        console.log(prods)
    }, [prods])

    if (props.lista && props.keys) {
        return (
            <div style={{ margin: "0% 1%" }}>
                <Card style={{ width: "100%", padding: "10px" }}>
                    <Table striped hover className="pb-0 mb-0" style={{ borderRadius: "10px" }}>
                        <thead>
                            <tr>
                                {props.keys?.map((item) => {
                                    return (
                                        <>
                                            {props.listaEscolhida === "Vendas" && item === "quantidade" ? null :
                                                <th className="text-center" >
                                                    {item}
                                                </th>}
                                        </>
                                    )
                                })}
                                <th className="text-center" >
                                    Ação
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.lista && props.lista.length > 0 ? (
                                props.lista.map(item => (
                                    <>
                                        <tr id="clicavel" onClick={(e) => { Expandir(e, item) }} key={item.id}>
                                            <ListaUnica Lista={props.listaEscolhida} item={item} />
                                            <td className="text-center">
                                                <Button key={item.id} onClick={Editar} variant="warning">
                                                    Editar
                                                </Button>
                                            </td>
                                        </tr>
                                        {item.id === id && prods ?
                                            <>
                                                {prods.map((prod) => {
                                                    return (
                                                        <tr id="clicavel"  style={{width:"10000px"}} key={item.id}>
                                                            <td className="text-left" style={{width:"33%"}}>{prod.prodNome}</td>
                                                            <td className="text-left" style={{width:"33%"}}>{prod.prodqntd}</td>
                                                            <td className="text-left" style={{width:"33%"}}>{prod.prodValor}</td>
                                                            <td className="text-left" style={{width:"33%"}}>{}</td>
                                                            <td className="text-left" style={{width:"33%"}}>{}</td>
                                                        </tr>
                                                    )
                                                })}
                                            </>
                                            : null}
                                    </>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center">
                                        Sem registros
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>

                </Card>
            </div>
        )
    }
}