import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { CheckAuteticacao } from "../nFuncoes/auntenticar"
import { useLocation, useNavigate } from "react-router-dom"
import CarrinhoProduto from "../nFuncoes/carrinho"

export default function Produtomini(props) {
    const [imgs, setImgs] = useState()
    const [links, setLinks] = useState()
    const [qntd, setQntd] = useState(0)
    const [msg, setMsg] = useState("")
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

    const atualizarMSG = async () => {
        setMsg("Produto(s) adicionado(s) ao carrinho")
        setTimeout(() => {
            setMsg("")
        }, 2000)
    }

    async function Comprar() {

        let path;
        if (auth) {
            console.log(localStorage.getItem("carrinho"))
            const objeto = { valor: props.data.valor * qntd, idProd: props.data.id, quantidade: parseInt(qntd), totaldisp: parseInt(props.data.quantidade - qntd) }
            const carrinho = new CarrinhoProduto(objeto)
            const resp = carrinho.Adicionar()
            if (resp !== 'Erro') {
                await atualizarMSG("Carrinho atualizado")
            }

        } else {
            path = `/Login`
            location(path)
        }



    }



    useEffect(() => {
        GETimgs()
    }, [])

    useEffect(() => {
        GetImgs()
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
                            <img src={links[ind]} height={500} />
                        )
                    })}
                </div>
                <p>{props.data.descricao}</p>
                <br /><br />
                {msg !== "" ? <div style={{ backgroundColor: 'green', color: "white", width: '30%', marginLeft: "35%", marginBottom: "2%", borderRadius: "10px" }}>{msg}</div> : null}
                <input type="text" placeholder="quantidade a ser comprada" onChange={(e) => { setQntd(e.target.value) }} /><br />
                <p>{props.data.quantidade - qntd < 0 ? 'acima do disponivel' : `quantidade disponivel ${props.data.quantidade - qntd}`}</p>
                <br />
                {props.data.quantidade === 0 ?
                    <div style={{ width: "50%", marginLeft: "25%", height: "80px", backgroundColor: 'gray' }}>Não disponivel</div>
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