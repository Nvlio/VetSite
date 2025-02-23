import React, { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import NavMenuBarComp from "../../../NComponentes/NavMenu"
import { Button, Image } from "react-bootstrap"
import StoreController from "../StoreController.js"
import setImg from "../../../Funcoes/CreateUrl.ts"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import CarrinhoComp from "../../../Componentes/Store/carrinho.tsx"

//pagina para produto especifico
export default function ProdPage() {
    const { GETProduto,carrinhoOpen,carrinho,produtos,Diminuir,AddCarrinho,cartIcon,setCarrinhoOpen } = StoreController()
    const params = useParams()
    const [link, SetLink] = useState<any>()
    const navigate = useNavigate()

    useEffect(() => {
        GETProduto(params.id)
    }, [])

    useEffect(() => {
        if (produtos.length>0) {
            setImg({ 0: produtos[0].img }, SetLink)
        }
    }, [produtos])

    useEffect(() => {
        console.log(carrinho)
    }, [carrinho])

    
    



    //pagina para um produto especifico]
    if (produtos.length>0) {
        return (
            <div style={{ fontFamily: "Arial, sans-serif" }}>
                <NavMenuBarComp extra={"sim"} />
                <CarrinhoComp isActive={carrinhoOpen} diminuir={Diminuir} fechar={setCarrinhoOpen}/>
                <div id="clicavel" onClick={()=>{setCarrinhoOpen(!carrinhoOpen)}} style={{position:"fixed",display:"flex",zIndex:"10",margin:"43% 3%",borderRadius:"10px",backgroundColor:"green",height:"9vh",width:"4.5%",paddingTop:"01.2% ",paddingLeft:"10px"}}>
                    <FontAwesomeIcon icon={cartIcon}  style={{color:"white",fontSize:"27px"}} />
                    {carrinho?<h5 style={{color:"white",marginLeft:"11%",marginTop:"1%"}}>{carrinho.totalCarrinho>0?carrinho.totalCarrinho:null}</h5>:null}
                </div>
                <div style={{ backgroundColor: "rgba(116, 3, 3, 0.73)", width: "100%", height: "100vh", paddingTop: "10%" }}>

                    <div style={{ backgroundColor: "white", width: "80%", height: "79vh", borderRadius: "10px", border: "1px solid black", margin: "auto", display: "flex" }}>
                        <div style={{width:"40%",height: "78.6vh",borderRadius: "10px 10px 10px 10px",alignContent:"center",alignItems:"center"}}>
                            <Image alt="foto do produto" src={link} style={{  objectFit: "cover",maxHeight: "100%",maxWidth:"100%",borderRadius: "10px 10px 10px 10px" }} />
                        </div>
                        <div style={{ justifyItems: "start", padding: "5% 7%", backgroundColor: "rgba(219, 218, 218, 0.68)", borderRadius: "0px 10px 10px 0px", width: "60%", }}>
                            <h2>{produtos[0].nome}</h2>
                            <h6>{produtos[0].fornecedor}</h6>
                            <br />
                            <div>
                                <h5 style={{ textAlign: "start" }}>{produtos[0].descricao}</h5>
                            </div>
                            <br /><br />
                            <h3>Preço: {produtos[0].valor}</h3>
                            <hr style={{ width: "100%", height: "0.5%" }} />
                            <div style={{ justifyItems: "end", width: "80%", height: "12vh", marginTop: "22%" }}>
                                <Button onClick={()=>{AddCarrinho(produtos[0],1,link)}} variant="success" style={{ width: "150%", height: "12vh", fontSize: "25px", marginBottom: "20px" }}>Adicionar no carrinho</Button>

                                <h6 style={{ marginRight: "-120px" }}>Unidades disponiveis: {produtos[0].quantidade}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
    }
}