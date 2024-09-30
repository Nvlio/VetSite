import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { CheckAuteticacao } from "../nFuncoes/auntenticar"
import { useLocation, useNavigate } from "react-router-dom"

export default function Produtomini(props) {
    const [imgs, setImgs] = useState()
    const [links, setLinks] = useState()
    const auth = CheckAuteticacao()
    const location = useNavigate()

    const GETimgs = async () => {
        const resp = await fetch(`http://localhost:3002/ImgProd/${props.data.id}`, { method: "GET" })
        const resposta = await resp.json()
        setImgs(resposta.content)
    }


    //transforma as informações recebidas em imagens
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

    //faz a configuração para adicionar as imagens a lista do produto
    function GetImgs() {
        console.log(imgs)
        if (imgs) {
            const imglink = []
            imgs.map((img) => {
                const blob = toBlob(img.file, img.file)
                const link = (URL.createObjectURL(blob))
                imglink.push(link)
            })
            setLinks(imglink)
        }
    }

    function Comprar() {
        let path;
        if (auth) {
            path = `/Comprar/${props.data.id}`
        } else {
            path = `/Login`
        }
        location(path)


    }



    useEffect(() => {
        GETimgs()
    }, [])

    useEffect(() => {
        GetImgs()
        console.log(imgs)
    }, [imgs])

    useEffect(() => {
    }, [links])

    if (imgs && links) {
        //Se os objetos do tipo imagem carregarem e a lista links estiver cheia renderiza
        return (
            <div >
                <h1>{props.data.nome}</h1>
                <hr />
                <h4>R$:{props.data.valor}</h4>
                <h4>Unidades:{props.data.quantidade}</h4>
                <hr />
                <div>
                    {imgs.map((img, ind) => {
                        return (
                            <img src={links[ind]}  height={500} />
                        )
                    })}
                </div>
                <p>{props.data.descricao}</p>
                <br /><br />
                {props.data.quantidade===0?
                <div style={{ width: "50%",marginLeft:"25%", height: "80px",backgroundColor:'gray'}}>Não disponivel</div>
                :
                <Button onClick={Comprar} style={{ width: "50%", height: "80px" }} variant="success">Comprar</Button>}
                <br /><br /><br />
            </div>
        )
    } else {
        //coloca o carregamento aqui
        return (<h1>Não carregou</h1>)
    }
}