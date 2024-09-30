import React, { useEffect, useState } from "react";
import GET from "../nFuncoes/GET.ts";
import { LinkContainer } from "react-router-bootstrap";



export default function Produtos() {

    const [images, setImages] = useState()
    const [links, setLinks] = useState([])

    function toBlob(file, tipo) {
        const byteC = atob(file)
        const byteN = new Array(byteC.length)
        for (let i = 0; i < byteC.length; i++) {
            byteN[i] = byteC.charCodeAt(i);
        }
        const byteA = new Uint8Array(byteN)
        const blob = new Blob([byteA], { type: `image/${tipo}` })
        return blob
    }

    function GetImgs() {
        if (images !== undefined) {
            const link = []
            images.map((image, ind) => {
                const linkImg = []
                image.img[0].map((prodImG) => {
                    const blob = toBlob(prodImG.file, prodImG.imagem.split(".")[1])
                    const link = (URL.createObjectURL(blob))
                    console.log(image.nome, link)
                    linkImg.push(link)
                })
                link.push(linkImg[0])
            })
            console.log(link)
            setLinks(link)
        }
    }

    //GET para produto pega as imagens
    const Getprod = async () => {
        try {
            const resposta = await GET("http://localhost:3002/Produtos/wImages/tudo")
            console.log(resposta)
            setImages(resposta)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        Getprod()
    }, [])

    useEffect(() => {
        GetImgs()
    }, [images])

    useEffect(() => {
        console.log(links)
    }, [links])

    if (images && links) {
        return (
            <>
                <h1>produtos</h1>
                <hr />
                {images.map((img, index) => {
                    return (

                        <div style={{ border: "1px solid black", borderRadius: "20px", margin: "2%", padding: '2%' }}>
                            <LinkContainer to={"/Produto"} state={{ info: img, img: links }} style={{ cursor: "pointer", display: "flex" }}>
                                <div>
                                    <div style={{ border: '1px solid black' }}>
                                        <img src={links[index]}  height={500} />
                                    </div>
                                    <div style={{ width: "100%", paddingLeft: "10px", textAlign: "left" }}>
                                        <h3>{img.nome}</h3>
                                        <hr style={{ width: "100%" }} />
                                        <h6>Valor:{img.valor}</h6>
                                        <h6>unidades:{img.quantidade}</h6>
                                        <p>{img.descricao}</p>
                                    </div>
                                </div>
                            </LinkContainer>
                        </div>

                    )
                })}
            </>
        )
    }
}