import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import setImg from "../../Funcoes/CreateUrl.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import StoreController from "../../Paginas/Store/Inside/StoreController.js";

export default function BlockComp(props: { Title: String, quantidade: number, preço: number, desc: String, img: any, id: number, add: Function }) {
    const [link, setLink] = useState("")
    const [hover, setHover] = useState(false)
    const url = useNavigate()

    //offline
    const img = "https://s2.static.brasilescola.uol.com.br/be/2020/11/protista.jpg"

    useEffect(() => {
        setImg(props.img, setLink)
    }, [])

    return (
        <div onMouseEnter={() => { setHover(true) }} onMouseLeave={() => { setHover(false) }} id="clicavel" onClick={() => { url(`/Produto/${props.id}`) }} style={{ border: "5px solidrgb(128, 11, 11)", position: "relative", zIndex: "1", borderRadius: "10px", marginBottom: "5%", height: "55vh", width: "21.1%", backgroundColor: "white", objectFit: "cover" }}>
            <div style={{ width: "100%", height: "50%" }}>
                <Image src={img} style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: "10px 10px 0px 0px" }} />
                {/* <Image src={link} style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: "10px 10px 0px 0px" }} /> */}
            </div>
            <div style={{ textAlign: "start", padding: "2% 2%" }}>
                <h5>{props.Title}</h5>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p>R$:{props.preço}</p>
                    {hover ?
                        <div onClick={(e) => { e.stopPropagation(); props.add({ nome: props.Title, valor: props.preço, quantidade: props.quantidade, prodID: props.id }, 1, link) }} style={{ position: "relative", zIndex: "2", marginRight: "10%" }}>
                            <FontAwesomeIcon icon={faCartShopping} style={{ fontSize: "20px" }} />
                        </div>
                        : null}
                </div>
                <hr />
                <p>{props.desc.substring(0, 50)}{props.desc.length > 25 ? "..." : ""}</p>
            </div>
        </div>
    )
}