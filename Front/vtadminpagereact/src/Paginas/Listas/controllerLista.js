import { useEffect, useState } from "react";
import { CheckAuteticacao } from "../../nFuncoes/auntenticar";
import { useNavigate } from "react-router-dom";
import { faPaw, faIdCard, faBuilding, faBoxesStacked, faPerson, faShoppingCart, faFileInvoiceDollar, faUser } from "@fortawesome/free-solid-svg-icons";
import ListaServices from "./service";
import GET from "../../nFuncoes/GET.ts";


//controlee relacionado a pagina de listas de dados que o usuario pode ver
export default function ControllerLista() {
    const service = new ListaServices()
    const [id,setId] = useState(0)
    const [prods,setProds] = useState()
    const [auth] = useState(CheckAuteticacao())
    const [userName, setUserName] = useState()
    const [lista, setLista] = useState()
    const [selectedLista, setSelectedLista] = useState()
    const [itens, setItens] = useState()
    const [icons, setIcons] = useState()
    const navigate = useNavigate()
    const [keysFiltradas, setKeysFiltradas] = useState()
    const [filtro, setFiltro] = useState({
        nome: "",
        especialidade: "",
        funcao: "",
        unidade: "",
        fornecedor: "",
        dono: "",
        produto: "",
        endereco: "",
        data: "",
        valor: "",
        formaPagamento: ""
    })

    //ao renderizar ele pega a autenticação do usuario e define tabelas personalizadas ao usuario
    useEffect(() => {
        GetAuth()
        setUserName(auth.nome ? auth.nome : localStorage.getItem("userName"))
    }, [])

    //quando a lista selecionada for mudada ele faz a coleta da nova lista
    useEffect(() => {
        if (selectedLista) {
            GETList()
        }
    }, [selectedLista])

    //ao pegar dados de lista ele censura alguns itens 
    useEffect(() => {
        if (lista && lista.length > 0) {
            const keys = Object.keys(lista[0]).filter((item) => {
                if (item !== "senha" &&
                    item !== "recado" &&
                    item !== "observacao" &&
                    item !== "bairro" &&
                    item !== "rua" &&
                    item !== "cidade" &&
                    item !== "estado" &&
                    item !== "salario" &&
                    item !== "numero" &&
                    item !== "id" &&
                    item !== "validade" &&
                    item !== "img" &&
                    item !== "data_nascimento" &&
                    item !== "comportamento" &&
                    item !== "pedigree" &&
                    item !== "raca_predominante" &&
                    item !== "raca_secundaria" &&
                    item !== "pelo" &&
                    item !== "cor_predominante" &&
                    item !== "cor_secundaria" &&
                    item !== "alergias" &&
                    item !== "reacao" &&
                    item !== "parcelas" &&
                    item !== "id_dono" &&
                    item !== "CEP") {
                    return item
                }
            })
            setKeysFiltradas([...keys])
        }
    }, [lista])

    //funcionalidade que define os dados de filtros que serão passados ao database
    const Filtrar = async (data) => {
        if (!data) {
            GETList()
            setFiltro({
                nome: "",
                especialidade: "",
                funcao: "",
                unidade: "",
                fornecedor: "",
                dono: "",
                produto: "",
                endereco: "",
                data: "",
                valor: "",
                formaPagamento: ""
            })
        } else {
            let filtropesquisa;
            //define qual que vai ser a api chamada e qual os parametros a serem passados
            switch (selectedLista) {
                case "Clientes":
                    filtropesquisa = `${filtro.nome}`
                    break
                case "Funcionarios":
                    filtropesquisa = `${filtro.nome ? filtro.nome : "_"}-${filtro.especialidade ? filtro.especialidade : "_"}-${filtro.funcao ? filtro.funcao : "_"}-${filtro.unidade ? filtro.unidade : "_"}`
                    break
                case "Unidades":
                    filtropesquisa = `${filtro.nome ? filtro.nome : "_"}-${filtro.endereco ? filtro.endereco : "_"}`
                    break
                case "Produtos":
                    filtropesquisa = `${filtro.nome ? filtro.nome : "_"}-${filtro.fornecedor ? filtro.fornecedor : "_"}`
                    break
                case "Pacientes":
                    filtropesquisa = `${auth.Conta === "Funcionario" ? auth.cpf : "_"}/${filtro.nome ? filtro.nome : "_"}/${filtro.dono ? filtro.dono : "_"}`
                    break
                case "Compras":
                    filtropesquisa = `${filtro.nome ? filtro.nome : "_"}/${filtro.produto ? filtro.produto : "_"}`
                    break
                case "Vendas":
                    if (filtro.nome) {
                        filtropesquisa = `${filtro.nome}/tipo`
                    } else {
                        FiltraFront()
                        return
                    }
            }
            const resposta = await service.GETby(selectedLista, filtropesquisa)
            const itens = resposta.resp.itens ? resposta.resp.itens : resposta.resp

            setLista(itens.msg ? [...itens.msg] : [...itens])
        }
    }

    //funcionalidade que pega a lista  selecionada pelo usuario
    const GETList = async () => {
        setLista()
        if (selectedLista !== "perfil" && selectedLista !== "editar") {
            const resposta = await service.GET(selectedLista)
            const itens = resposta.resp.itens ? resposta.resp.itens : resposta.resp
            setLista([...itens])
        } else {
            return
        }

    }

    //funcionalidade que faz o filtro da lista baseada nos dados passados pelo usuario
    const FiltraFront = () => {
        let listafiltrada = [...lista]
        if (filtro.valor) {
            listafiltrada = listafiltrada.sort((a, b) =>
                filtro.valor === "Caros" ? b.valor - a.valor : a.valor - b.valor
            );
        }
        if (filtro.formaPagamento) {
            listafiltrada = listafiltrada.filter((item) => item.formaPagamento === filtro.formaPagamento);
        }
        if (filtro.data) {
            listafiltrada = listafiltrada.filter((item) => {
                return item.data.substring(0, 10) == filtro.data
            });
        }
        setLista([...listafiltrada])
    }

    //funcão que pega a autenticação do usuario, caso não esteja envia para o login
    const GetAuth = () => {
        if (!auth) {
            navigate("/Login")
        }
        if (auth.Conta === "funcionario") {
            setItens([
                "Clientes",
                "Funcionarios",
                "Unidades",
                "Produtos",
                "Pacientes",
                "Compras",
                "Vendas"
            ])
            setIcons([
                faPerson,
                faIdCard,
                faBuilding,
                faBoxesStacked,
                faPaw,
                faFileInvoiceDollar,
                faShoppingCart,
                faUser

            ])
        } else {
            setItens(["Pacientes"])
            setIcons([faPaw,])
        }
    }

    const GetVenda = async (id) => {
        const resposta = await GET(`http://localhost:3002/Vendas/especifica/${id}/tudo`)
        setProds(resposta)
    }

    return {
        auth,
        itens,
        userName,
        icons,
        filtro,
        lista,
        prods,
        keysFiltradas,
        selectedLista,
        id,
        setId,
        setSelectedLista,
        setFiltro,
        Filtrar,
        GetVenda
    }
}