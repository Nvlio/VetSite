import React, { useEffect, useState } from "react";
import NavMenuBarComp from "../../../NComponentes/NavMenu";
import StoreController from "../StoreController.js";
import { Button, Image, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faTrashCan, faPlus } from "@fortawesome/free-solid-svg-icons";

//pagina para a compra de itens
export default function CompraPage() {
    const { carrinho, pagamentos, enderecos, formaPagamento, FinalizarCompra, changedata, Diminuir, navigate, AddCarrinho, setFormPag } = StoreController()


    return (
        <div style={{ backgroundColor: "rgb(215, 81, 81)", height: "100vh", display: "flex", justifyContent: "space-between", color: "white", padding: "11% 5%" }}>
            <NavMenuBarComp />
            <div style={{ borderRadius: "10px", backgroundColor: "rgba(0, 0, 0, 0.16)", width: "70%", height: "70vh" }}>
                <h2>Sua Compra</h2>
                <div style={{ borderRadius: "10px", overflowY: "auto", backgroundColor: "white", width: "90%", height: "35vh", marginLeft: "6%", padding: "1%" }}>
                    {carrinho && carrinho.carrinho && carrinho.carrinho.length > 0 ?
                        <div>
                            {carrinho.carrinho.map((item) => {
                                return (
                                    <div style={{ backgroundColor: "rgba(201, 201, 201, 0.79)", border: "1px solid black", height: "20vh", display: "flex", padding: "2%", gap: "2%" }}>
                                        <div style={{ width: "30%" }}>
                                            <Image src={item.img} height={200} width={200} style={{ maxHeight: "80%", width: "50%", objectFit: "cover" }} />
                                        </div>
                                        <div style={{ justifyItems: "start", width: "70%" }}>
                                            <h5>{item.nome}</h5>
                                            <hr />
                                            <h5>valor:{item.valor * item.quantidade}</h5>
                                            <h5>quantidade comprada:{item.quantidade}</h5>
                                        </div>
                                        <div>
                                            <Button onClick={() => { Diminuir(item, true) }} style={{ height: "5vh", marginTop: "-50%" }} variant="danger"><FontAwesomeIcon icon={faTrashCan} /></Button><br /><br />
                                            <Button onClick={() => { Diminuir(item) }} style={{ height: "5vh", marginTop: "-100%" }} variant="warning"><FontAwesomeIcon icon={faMinus} /></Button><br /><br />
                                            <Button onClick={() => { AddCarrinho(item, 1, Image.img) }} style={{ height: "5vh", marginTop: "-200%" }} variant="warning"><FontAwesomeIcon icon={faPlus} /></Button>
                                        </div>
                                    </div>

                                )
                            }
                            )}
                        </div> :
                        <div style={{ color: "black" }}>
                            <h5>Sem Compras no carrinho</h5>
                        </div>}
                        <br/>
                    <Button variant="primary" onClick={() => { navigate("/Produtos") }}>Voltar as compras</Button>
                </div>
                <div style={{ justifyItems: "start", margin: "2% 6%" }}>
                    <p>Informação: Algumas compras podem não ser compradas sem a comprovação de receita</p>
                </div>
                <hr />
                <h5>Endereço</h5>
                <div style={{ width: "10%", margin: "2% 45%" }}>
                    <Form.Check
                        onClick={changedata}
                        name="endereco"
                        type="radio"
                        id="Padrão"
                        label="Padrão"
                        value={"Padrão"}
                    />
                    <Form.Check
                    onClick={changedata}
                        name="endereco"
                        type="radio"
                        id="Outro"
                        label="Outro"
                        value={"Outro"}
                    />
                </div>
            </div>
            <div style={{ width: "25%" }}>
                <div className="RegisterWindow" style={{ overflowY: "auto", borderRadius: "10px", backgroundColor: "rgb(166, 59, 59)", height: "45vh", padding: "5%" }}>
                    <h4>Metodo de pagamento</h4>
                    <div>
                        {pagamentos.map((item, index) => {
                            return (
                                <>
                                    <div id="clicavel" key={item} onClick={() => { setFormPag(item) }} style={{ borderRadius: "10px", backgroundColor: formaPagamento === item ? "rgba(0, 0, 0, 0.36)" : "rgba(0, 0, 0, 0.11)", height: "10vh", alignContent: "center", marginBottom: "2%" }}>
                                        <h4>{item}</h4>
                                    </div>
                                </>
                            )
                        })}
                    </div>
                </div>
                <br />
                <div style={{ borderRadius: "10px", backgroundColor: "rgb(166, 59, 59)", height: "20vh" }}>
                    <h4>Finalizar</h4>
                    <h4>Total: R$   {carrinho.valorTotal}</h4>
                    <Button onClick={FinalizarCompra} variant="success" style={{ width: "70%", height: "auto", fontSize: "30px", fontFamily: "sans-serif" }}>Comprar</Button>
                </div>
            </div>


        </div>
    )

}