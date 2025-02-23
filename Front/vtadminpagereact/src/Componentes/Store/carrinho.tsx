import React, { useEffect } from "react";
import "../../CSS/Proprio.css"
import { Button, Image } from "react-bootstrap";
import StoreController from "../../Paginas/Store/StoreController.js";
import { faTrashCan, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CarrinhoComp(props: { isActive: boolean, diminuir: Function, fechar: Function }) {
    const { carrinho, FillCart, RemoveItens, navigate } = StoreController()

    useEffect(() => {
        FillCart()
    }, [localStorage.getItem("carrinho")])


    return (
        <div className="Carrinho" style={{ position: "fixed", border: "1px solid black", zIndex: "3", marginLeft: props.isActive ? "70%" : "100%", backgroundColor: "rgb(215, 81, 81)", color: "white", width: "30%", height: "100vh" }}>
            <div style={{ display: "flex", marginTop: "2%" }}>
                <h1 style={{ width: "95%" }}>carrinho</h1>
                <div id="clicavel" onClick={() => { props.fechar(false) }}>X</div>
            </div>
            <hr />
            <div className="RegisterWindow" style={{ overflowY: "auto", color: "black", border: "1px solid gray", margin: "2%", backgroundColor: "rgb(244, 244, 244)", padding: "2%", height: "75%", borderRadius: "10px" }}>

                {carrinho && carrinho.carrinho && carrinho.totalCarrinho > 0 ?
                    <>
                        {carrinho.carrinho.map((produto, index) => {
                            return (
                                <>
                                    <div style={{ border: "1px solid black", display: "flex", gap: "10px", backgroundColor: "white", borderRadius: "10px", height: "15vh", marginBottom: "2%", padding: "2%" }}>
                                        <div style={{ width: "30%", height: "10vh" }}>
                                            <Image src={produto.img} height={100} width={100} style={{ objectFit: "cover", maxHeight: "90%", maxWidth: "90%" }} />
                                        </div>
                                        <div style={{ justifyItems: "start", width: "50%" }}>
                                            <h6>{produto.nome}</h6>
                                            <h6>R$:{produto.valor * produto.quantidade}</h6>
                                            <h6>Quantidade: {produto.quantidade}</h6>
                                        </div>
                                        <div>
                                            <Button onClick={() => { props.diminuir(produto, true) }} style={{ height: "4vh", paddingBottom: "30px" }} variant="danger"><FontAwesomeIcon icon={faTrashCan} /></Button>
                                            <Button onClick={() => { props.diminuir(produto) }} style={{ height: "4vh", paddingBottom: "30px" }} variant="warning"><FontAwesomeIcon icon={faMinus} /></Button>
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                    </>
                    :
                    <h5>Nada em seu carrinho</h5>
                }
            </div>
            {carrinho && carrinho.totalCarrinho > 0 ?
                <>
                    <Button variant="success" onClick={() => { navigate("/Comprar") }} style={{ width: "70%" }}>Finalizar</Button>
                    <Button variant="danger" onClick={RemoveItens} style={{ width: "70%" }}>Remover Tudo</Button>
                </>
                : null
            }
        </div>
    )
}