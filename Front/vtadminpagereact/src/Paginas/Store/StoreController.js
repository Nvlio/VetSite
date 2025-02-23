import React, { useEffect, useState } from "react";
import GET from "../../nFuncoes/GET.ts";
import { POST } from "../../nFuncoes/POST.ts"
import { CheckAuteticacao } from "../../nFuncoes/auntenticar.js";
import { useNavigate } from "react-router-dom";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

//controlle de store
function StoreController() {
    let path = "http://localhost:3002/Produtos/"
    const [carrinho, setCarrinho] = useState([])
    const [pagamentos, setPagamentos] = useState(["Cartão de credito", "Cartão de débito", "Boleto", "Pix"])
    const [carrinhoOpen, setCarrinhoOpen] = useState(false)
    const cartIcon = faCartShopping
    const [formaPagamento, setFormPag] = useState()
    const navigate = useNavigate()
    const [enderecos, setEndereco] = useState()
    const auth = CheckAuteticacao()
    const [produtos, setProdutos] = useState([])
    const [filtro, setFiltro] = useState({ primeiro: "", segundo: "", filtrar: false })

    //ao renderizar ele enche o carrinho
    useEffect(() => {
        FillCart()
    }, [])

    // verifica se há itens no carrinho do localstorage se houver ele enche o carrinho visivel se não ele define o padrão
    const FillCart = () => {
        if (localStorage.getItem("carrinho") !== undefined) {
            setCarrinho(JSON.parse(localStorage.getItem("carrinho")))
        } else {
            localStorage.setItem("carrinho", { carrinho: [], totalCarrinho: 0, valorTotal: 0 })
            setCarrinho([])
        }
    }

    // faz a remoção de itens no carrinho
    const RemoveItens = () => {
        localStorage.removeItem("carrinho")
        setCarrinho([])
    }

    //faz a coleta dos produtos todos disponiveis
    const GETProdutos = async () => {
        if (filtro.primeiro || filtro.segundo) {
            path+=`limite/Filtro/${filtro.primeiro}/${filtro.segundo}`
        }else{
            path+="wImages/tudo"
        }
        const response = await GET(path)
        console.log(response)
        setProdutos(response)
    }

    //faz a coleta de dados de 1 produto especifico
    const GETProduto = async (id) => {
        const response = await GET(`http://localhost:3002/Produtos/identificar/${id}`)
        setProdutos(response.msg)
    }

    //faz a adição de itens no carrinho além de verificar se é possivel fazer a adição (caso esteja indisponivel o produto)
    const AddCarrinho = async (produto, qnt, link) => {
        if (auth) {
            console.log(produto)
            const carrinhoLocal = localStorage.getItem("carrinho") ? JSON.parse(localStorage.getItem("carrinho")) : { carrinho: [], totalCarrinho: 0, valorTotal: 0 }
            let precoTotal = parseFloat(carrinhoLocal.valorTotal)
            let existe = false
            let total = 0
            if (carrinhoLocal.carrinho) {
                carrinhoLocal.carrinho.map((item, index) => {
                    if (item.nome === produto.nome) {
                        existe = true
                        if (item.total - carrinhoLocal.carrinho[index].quantidade > 0) {
                            precoTotal += parseFloat(produto.valor)
                            total++
                            carrinhoLocal.carrinho[index].quantidade++
                        } else {
                            alert("não tem disponibilidade dos itens")
                        }
                    }
                })
            }


            if (existe !== true) {
                precoTotal += parseFloat(produto.valor)
                total++
                carrinhoLocal.carrinho.push({ nome: produto.nome, valor: produto.valor * qnt, prodID: produto.prodID, quantidade: qnt, total: produto.quantidade, img: link })
            }
            localStorage.setItem("carrinho", JSON.stringify({ carrinho: [...carrinhoLocal.carrinho], totalCarrinho: carrinhoLocal.totalCarrinho + total, valorTotal: precoTotal }))

            setCarrinho(JSON.parse(localStorage.getItem("carrinho")))

        } else {
            navigate("/Login")
        }
    }

    //função que diminui a quantidade de um item no carrinho
    const Diminuir = (produto, apagar = false) => {
        let carrinhoLocal = JSON.parse(localStorage.getItem("carrinho"))
        let precoTotal = parseFloat(carrinhoLocal.valorTotal)
        let carrinhoFinal = []
        let total = carrinhoLocal.totalCarrinho
        console.log(total)

        carrinhoLocal.carrinho.map((item, index) => {
            if (item.nome !== produto.nome) {
                console.log("primeiro")
                console.log(total)
                carrinhoFinal.push(item)

            } else if (item.quantidade > 1 && apagar !== true) {
                console.log("segundo")
                item.quantidade--
                precoTotal -= parseFloat(produto.valor)
                total--
                carrinhoFinal.push(item)
            } else {
                console.log("apago tudo")
                precoTotal -= parseFloat(produto.valor * item.quantidade)
                total -= produto.quantidade
            }
        })

        localStorage.setItem("carrinho", JSON.stringify({ carrinho: [...carrinhoFinal], totalCarrinho: total, valorTotal: precoTotal }))
        setCarrinho(JSON.parse(localStorage.getItem("carrinho")))
    }

    //faz a mudança do endereço
    const changedata = (e) => {
        setEndereco(e.target.value)
    }

    //realiza a compra dos produtos no carrinho
    const FinalizarCompra = async () => {
        if (formaPagamento && enderecos && carrinho.carrinho) {
            console.log("Compra Finalizada")
            console.log(carrinho)
            const response = await POST(`http://localhost:3002/Vendas`, JSON.stringify({
                cpf: auth.cpf,
                formPagar: formaPagamento,
                parcelas: 12,
                prods: [carrinho.carrinho],
                qntTotal: carrinho.totalCarrinho,
                valorTotal: carrinho.valorTotal,
            }))
            localStorage.removeItem("carrinho")
            navigate("/Produtos")

        } else {
            console.log("Compra recusada falta de dados")
        }
    }




    return {
        carrinho,
        filtro,
        enderecos,
        produtos,
        carrinhoOpen,
        cartIcon,
        pagamentos,
        formaPagamento,
        setFormPag,
        navigate,
        GETProdutos,
        setCarrinho,
        setProdutos,
        GETProduto,
        setFiltro,
        FillCart,
        RemoveItens,
        AddCarrinho,
        setCarrinhoOpen,
        Diminuir,
        changedata,
        FinalizarCompra
    }
}

export default StoreController;