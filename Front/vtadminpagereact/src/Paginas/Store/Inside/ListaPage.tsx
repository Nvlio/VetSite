import React, { useEffect } from "react";
import StoreController from "../StoreController.js";
import BegCompStore from "../../../Componentes/Store/BeginStore.tsx";
import BlockComp from "../../../Componentes/Store/ProdBlock.tsx";
import MenuLateral from "../../../Componentes/Menus/Lateral.tsx";
import LateralFilterMenu from "../../../Componentes/Listas/LateralFiltroMenu.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CarrinhoComp from "../../../Componentes/Store/carrinho.tsx";

//pagina contendo a lista dos produtos
export default function StoreList() {
    const { carrinho, produtos, filtro, setFiltro, GETProdutos, Diminuir, cartIcon, AddCarrinho, carrinhoOpen, setCarrinhoOpen } = StoreController()

    //Offline remover esse trecho e trocar a condição de OFFprodutos para produtos

    const Offprodutos = [
        { nome: "Ração para Cães", valor: 50.00, descricao: "Ração para cães de todas as raças e idades", img: "https://s2.static.brasilescola.uol.com.br/be/2020/11/protista.jpg", quantidade: 1, id: 1 },]

    //fim de Offline

    //ao renderizar ele chama a coleta de produtos
    useEffect(() => {
        GETProdutos()
    }, [])

    useEffect(() => {
        if (filtro.filtrar) {
            GETProdutos()
        }
    }, [filtro.filtrar])

    //só renderiza se houver produtos
    if (Offprodutos) {
        return (
            <div style={{ marginTop: "0%" }}>

                <div style={{ marginTop: "-10%" }}>
                    <CarrinhoComp isActive={carrinhoOpen} diminuir={Diminuir} fechar={setCarrinhoOpen} />
                </div>
                <div style={{ position: "relative", zIndex: 1 }}>
                    <BegCompStore />
                </div>
                <div id="clicavel" onClick={() => { setCarrinhoOpen(!carrinhoOpen) }} style={{ position: "fixed", display: "flex", zIndex: "10", color: "white", margin: "15% 3%", borderRadius: "10px", backgroundColor: "green", height: "9vh", width: "4.5%", paddingTop: "01.2% ", paddingLeft: "1%" }}>
                    <FontAwesomeIcon icon={cartIcon} style={{ fontSize: "27px" }} />
                    {carrinho ? <h5 style={{ marginLeft: "10%" }}>{carrinho.totalCarrinho > 0 ? carrinho.totalCarrinho : null}</h5> : null}
                </div>
                <div style={{ display: "flex", position: "relative", zIndex: 2 }}>

                    <div style={{ width: "20%" }}>
                        <LateralFilterMenu selectedLista={setFiltro} filtro={filtro} />
                    </div>
                    <div id="hideScrollbar" style={{ display: "flex", width: "80%", flexWrap: "wrap", overflowY: "auto", height: "100vh", padding: "5% 0%", justifyContent: "space-around", backgroundColor: "#efecec" }}>
                        {Offprodutos.map((produto: any, index: number) => {
                            return (
                                
                                <BlockComp add={AddCarrinho} Title={produto.nome} preço={produto.valor} desc={produto.descricao} img={produto.img} quantidade={produto.quantidade} id={produto.id} />
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

//versão oficial abaixo
/*
Versão oficial

if (produtos) {
        return (
            <div style={{ marginTop: "0%" }}>

                <div style={{ marginTop: "-10%" }}>
                    <CarrinhoComp isActive={carrinhoOpen} diminuir={Diminuir} fechar={setCarrinhoOpen} />
                </div>
                <div style={{ position: "relative", zIndex: 1 }}>
                    <BegCompStore />
                </div>
                <div id="clicavel" onClick={() => { setCarrinhoOpen(!carrinhoOpen) }} style={{ position: "fixed", display: "flex", zIndex: "10", color: "white", margin: "15% 3%", borderRadius: "10px", backgroundColor: "green", height: "9vh", width: "4.5%", paddingTop: "01.2% ", paddingLeft: "1%" }}>
                    <FontAwesomeIcon icon={cartIcon} style={{ fontSize: "27px" }} />
                    {carrinho ? <h5 style={{ marginLeft: "10%" }}>{carrinho.totalCarrinho > 0 ? carrinho.totalCarrinho : null}</h5> : null}
                </div>
                <div style={{ display: "flex", position: "relative", zIndex: 2 }}>

                    <div style={{ width: "20%" }}>
                        <LateralFilterMenu selectedLista={setFiltro} filtro={filtro} />
                    </div>
                    <div id="hideScrollbar" style={{ display: "flex", width: "80%", flexWrap: "wrap", overflowY: "auto", height: "100vh", padding: "5% 0%", justifyContent: "space-around", backgroundColor: "#efecec" }}>
                        {produtos.map((produto: any, index: number) => {
                            return (
                                <BlockComp add={AddCarrinho} Title={produto.nome} preço={produto.valor} desc={produto.descricao} img={produto.img} quantidade={produto.quantidade} id={produto.id} />
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }

*/