import React, { useEffect } from "react";
import BlogController from "../../Paginas/Blog/blogController.js";
import { Image } from "react-bootstrap";


export default function PageLista(props: { title: String, article: String, file: any, imagem: any, id: number }) {
    const { link, GetLink, navigate } = BlogController()


    useEffect(() => {
        GetLink(props.file, props.imagem)
    }, [])


    if (props.file && props.imagem) {
        return (
            <div id="clicavel"  onClick={() => {navigate(`News/${props.id}`)}} style={{ width: "30%", height: "50vh",marginBottom:"5%", border: "1px solid black", borderRadius: "10px", backgroundColor: "white", color: "black" }}>
                <div style={{ height: "27vh", marginBottom: "1%" }}>
                    <Image src={link} style={{ height: "27vh", borderRadius: "10px 10px 0px 0px", width: "100%", objectFit: "cover" }} />
                </div>
                <h4><strong>{props.title}</strong></h4>
                <hr />
                <p>{props.article.substring(0, 16)}{props.article.length > 16 ? "..." : ""}</p>
            </div>
        )
    }

}