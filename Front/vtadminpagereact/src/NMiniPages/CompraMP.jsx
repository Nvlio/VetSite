import { useEffect, useState } from "react"
import GET from "../nFuncoes/GET.ts"
import { Button } from "react-bootstrap"
import { POST } from "../nFuncoes/POST.ts"
import { CheckAuteticacao } from "../nFuncoes/auntenticar.js"
import CarrinhoProduto from "../nFuncoes/carrinho.js"
import { useLocation } from "react-router-dom"

//page para compras
export default function MNpage() {
    const auth = CheckAuteticacao()
    const [qntd, setQntd] = useState()
    const path = useLocation().pathname.split("/")
    const url = path[2]
    const [compra, setCompra] = useState({
        cpf: auth.cpf,
        preço: "",
        formPagar: "",
        parcelas: "12",
        prodId: path[3],
        qntd: 0,
        prods: []

    })
    const [loading, setLoading] = useState("Ocioso")
    const [produto, setProduto] = useState()
    const [erro, setErro] = useState()
    const carrinho = new CarrinhoProduto()

    const formasPagamento = [
        "cartão de crédito a vista",
        "cartão de crédito parcelado",
        "pix",
        "boleto",
    ]



    const Verificar = async () => {
        let produtos;
        let itens;
        if (url !== "estoque") {
            itens = await carrinho.Coletar()
        } else {
            itens = [{ idProd: path[3] }]
        }
        setCompra((prev) => ({ ...prev, prods: itens }))
        produtos = []
        if (itens) {
            for (let item of itens) {
                const dados = await GET(`http://localhost:3002/Produtos/identificar/${item.idProd}`)
                produtos.push(dados.msg[0])
            }
        }

        setProduto(produtos)
    }


    useEffect(() => {
        Verificar()
    }, [loading])

    useEffect(() => {
    }, [loading])

    //remove itens do carrinho
    const Remover = async (id) => {
        setLoading("aguarde")
        carrinho.Remover(id)
        const produtos = []
        const itens = await carrinho.Coletar()
        setCompra((prev) => ({ ...prev, prods: itens }))
        for (let item of itens) {
            const dados = await GET(`http://localhost:3002/Produtos/identificar/${item.idProd}`)
            produtos.push(dados.msg[0])
        }
        setLoading("Ocioso")
    }

    //faz a compra
    const Finalizar = async () => {
        if (produto.quantidade - compra.qntd < 0) {
            setErro("Quantidade acima do que está disponivel")
        } else if ((compra.formPagar === "" && url!=="estoque")|| compra.qntd === "") {
            setErro("Falta dados para finalizar a compra")
        } else if (parseInt(compra.preço) < 0) {
            setErro('valor negativo')
        } else {
            setErro("")
            setCompra((prev) => ({ ...prev }))
            if (url !== "estoque") {
                await POST(`http://localhost:3002/Vendas`, JSON.stringify(compra), "Produtos")
                carrinho.Apagar()
            } else {
                await POST(`http://localhost:3002/Compras`, JSON.stringify(compra), "Lista")
                carrinho.Apagar()
            }
        }
    }

    if ((loading === "Ocioso" && produto && produto[0] && compra.prods.length > 0) && url !== "estoque") {
        return (
            <>
                <div style={{ display: "flex", marginLeft: "15%", }}>
                    <div style={{ width: "60%" }}>
                        <div style={{ border: "1px solid black", justifySelf: "center", padding: " 0% 0% 3% 0%" }}>
                            <label style={{ backgroundColor: "gray", color: "white", width: "100%" }}>Informações sobre os Produtos</label>
                            <h4>Itens no carrinho:{compra.prods.length}</h4>
                            <div style={{ overflowX: "auto" }}>
                                {produto.map((prod, ind) => {
                                    return (
                                        <div style={{ margin: "1%", border: "1px solid black", padding: "2%" }}>
                                            <h5>Nome: {prod.nome}</h5>
                                            <h6>quantidade: {compra.prods[ind] && compra.prods[ind]['quantidade'] ? compra.prods[ind]['quantidade'] : null}</h6>
                                            <h6>Valor Total: {prod.valor * compra.prods[ind]['quantidade']},00</h6>
                                            <hr />
                                            <h6 style={{ color: 'red', cursor: "pointer" }} onClick={() => { Remover(prod.id) }}>Remover</h6>
                                        </div>
                                    )
                                })}
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
    } else if (url === "estoque" && produto !== undefined) {
        return (
            <>
                <div style={{ display: "flex", marginLeft: "15%", }}>
                    <div style={{ width: "60%" }}>
                        <div style={{ border: "1px solid black", width: "100%", justifySelf: "center", padding: " 0% 0% 3% 0%" }}>
                            <label style={{ backgroundColor: "gray", color: "white", width: "100%" }}>Informações sobre os Produtos</label>
                            <div style={{ margin: "1%", border: "1px solid black", padding: "2%" }}>
                                <h5>Nome: {produto[0].nome}</h5>
                                <input type="text" placeholder="quantidade a ser comprada" onChange={(e) => { setQntd(e.target.value); setCompra((prev) => ({ ...prev, preço: produto[0].valor * e.target.value, qntd: parseInt(produto[0].quantidade) + parseInt(e.target.value) })) }} /><br />
                                <p>{`quantidade disponivel ${qntd ? parseInt(produto[0].quantidade) + parseInt(qntd) : produto[0].quantidade}`}</p>
                                <br />
                                <h6>Valor Total: {qntd ? produto[0].valor * qntd : 0},00</h6>
                                <hr />
                            </div>
                        </div>
                        <Button onClick={Finalizar} style={{ width: "50%", height: "50px" }} variant="success">Comprar</Button>

                        {erro != "" ?
                            <div style={{ backgroundColor: "red", color: "white", margin: "2% 10%" }}>{erro}</div>
                            : null}
                        <div className="validate"></div>
                    </div>

                </div >

            </>
        )
    }
}