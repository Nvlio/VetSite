import { useEffect, useState } from "react"
import GET from "../nFuncoes/GET.ts"
import { Button } from "react-bootstrap"
import { POST } from "../nFuncoes/POST.ts"
import { CheckAuteticacao } from "../nFuncoes/auntenticar.js"

//page para compras
export default function MNpage(props) {
    const auth = CheckAuteticacao()
    const [compra, setCompra] = useState({
        cpf: auth.cpf,
        preço: "",
        qntd: "",
        formPagar: "",
        parcelas: "12",
        prodId: "",
        qntdTotal: ""

    })
    const [produto, setProduto] = useState()
    const [erro, setErro] = useState()

    const formasPagamento = [
        "cartão de crédito a vista",
        "cartão de crédito parcelado",
        "pix",
        "boleto",
    ]

    const Produto = async () => {
        const dados = await GET(`http://localhost:3002/Produtos/identificar/${props.idprod}`)
        setCompra((prev) => ({ ...prev, prodId: dados.msg[0].id, qntdTotal: dados.msg[0].quantidade }))
        setProduto(dados.msg[0])

    }

    useEffect(() => {
        Produto()
    }, [])

    useEffect(() => {

    })

    //faz a compra
    const Finalizar = async () => {
        if (produto.quantidade - compra.qntd < 0) {
            setErro("Quantidade acima do que está disponivel")
        } else if (compra.formPagar === "" || compra.qntd==="") {
            setErro("Falta dados para finalizar a compra")
            console.log()
        } else {
            setErro("")
            setCompra((prev) => ({ ...prev, qntdTotal: produto.quantidade, prodId: props.idprod }))
            console.log(compra)
            
            await POST(`http://localhost:3002/Vendas`, JSON.stringify(compra), "Produtos")
        }
    }

    if (produto) {
        return (
            <>
                <div style={{ display: "flex", marginLeft: "15%", }}>
                    <div style={{ width: "60%" }}>
                        <div style={{ border: "1px solid black", justifySelf: "center", padding: " 0% 0% 3% 0%" }}>
                            <label style={{ backgroundColor: "gray", color: "white", width: "100%" }}>Informações sobre o Produto</label>
                            <div>
                                <h3>{produto.nome}</h3>
                                <h6>total R$:{compra.preço == 0 ? produto.valor : compra.preço}</h6>
                                <input onChange={(e) => { setCompra((prev) => ({ ...prev, qntd: e.target.value, preço: produto.valor * e.target.value })); }} type="number" placeholder="quantidade" />
                                <h6 style={{ color: "red" }}>quantidade disponivel:{produto.quantidade - compra.qntd}</h6>
                            </div>
                        </div>
                        <div style={{ border: "1px solid black", justifySelf: "center", padding: " 0% 0% 3% 0%", backgroundColor: "gray", color: "white" }}>
                            <h4>Informação</h4>
                            <div style={{ textAlign: "center" }}>
                                <h6>Alguns produtos vão precisar de uma receita para poder ser adquiridos</h6>
                            </div>
                        </div>
                    </div>

                    <div style={{ border: "1px solid black", width: "30%", marginLeft: "2%", justifySelf: "center" }}>
                        <label style={{ backgroundColor: "gray", color: "white", width: "100%" }}>Forma de pagamento</label>
                        <form >
                            <ul style={{ textDecoration: "none" }}>
                                {formasPagamento.map((forma) => {
                                    return (
                                        <li style={{ textAlign: "justify" }}>
                                            <input onClick={() => { setCompra((prev) => ({ ...prev, formPagar: forma })) }} type="radio" name="formasPagamento" />
                                            {forma}
                                        </li>
                                    )
                                })}
                            </ul>
                            <Button onClick={Finalizar} style={{ width: "50%", height: "50px" }} variant="success">Comprar</Button>
                        </form>
                        {erro != "" ?
                            <div style={{ backgroundColor: "red", color: "white", margin: "2% 10%" }}>{erro}</div>
                            : null}
                        <div className="validate"></div>
                    </div>
                </div>

            </>
        )
    }
}