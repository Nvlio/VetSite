import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginServices from "./Service";
import { cpfValidator } from "cpf-validator-ianan";
import { Autenticar } from "../../../nFuncoes/auntenticar";

//controlle para cadastro de usuarios
export default function CadastroController() {
    const servico = new LoginServices()
    const [ufSelected, setUfSelected] = useState("")
    const [munSelected, setMunSelected] = useState("")
    const [isFuncionario, setFuncionario] = useState(false)
    const navigate = useNavigate()
    const [uf, setUF] = useState([])
    const [municipio, setMunicipio] = useState()
    const [error, setError] = useState("")
    const [msgError, setMsgError] = useState("")
    const [data, setData] = useState({
        cpf: "",
        rg: "",
        nome: "",
        telefone: "",
        email: "",
        senha: "",
        profissao: "",
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: "",
        cep: "",
        confirmpassword: ""
    })

    //ao renderizar a pagina ele pega os estados brasileiros
    useEffect(() => {
        if (uf.length === 0) {
            GetUF()
        }
    }, [])

    //quando o estado selecionado mudar ele faz uma chamada de todos os municipios desse estado
    useEffect(() => {
        if (ufSelected !== "") {
            GetMunicipio()
        }
    }, [ufSelected])

    //teste
    useEffect(() => {

    }, [municipio])

    //caso erro for definido ele mostra uma imagem por 5 segs
    useEffect(() => {
        if (error === "all") {
            setTimeout(() => {
                setError("")
            }, 5000)
        }
    }, [error])

    //funcionalidade que faz uma chamada api para o governo par pegar os estados
    const GetUF = async () => {
        const estado = await servico.cadastroget("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        setUF([...estado])
    }

    //funcionalidade que faz uma chamada api para pegar todos os municipios de um determinado estado
    const GetMunicipio = async () => {
        const muncipio = await servico.cadastroget(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufSelected}/municipios`)
        setMunicipio([...muncipio])
    }

    //verifica se a senha colocada é a mesma que a outra
    const isSameSenha = async e => {
        setData((prev) => ({ ...prev, confirmpassword: e.target.value }))
        const senhaCompleta = e.target.value === data.confirmpassword ? e.target.value : data.confirmpassword + e.target.value[e.target.value.length - 1]
        if (senhaCompleta !== data.senha) {
            setError("confirmSenha")
            setMsgError("Senhas Diferentes")
        } else {
            setError("")
            setMsgError("")
        }
    }

    //verifica se o email passado é valido
    const isEmailValid = async e => {
        const regex = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)@([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)\.(com)$/;
        const resultado = regex.test(e.target.value);
        if (!resultado) {
            setError("email")
            setMsgError("Email Invalido")
        } else {
            setError("")
            setMsgError("")
        }
    }

    //verifica se o cpf passado é vlido
    const cpfConfirmator = async e => {
        
        const resultado = cpfValidator(e.target.value)
        if (!resultado) {
            alert("errado")
            setError("cpf")
            setMsgError("Cpf Invalido")
        } else {
            setError("")
            setMsgError("")
        }
    }

    //verifica se o telefone é valido
    const isTelefoneValid = async e => {
        const regex = /^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/;
        const resultado = regex.test(e.target.value);
        if (!resultado) {
            setError("tel")
            setMsgError("Telefone Invalido")
        } else {
            setError("")
            setMsgError("")
        }
    }


    //funcionalidade ligada ao envio de dados para fazer o cadastro
    const handleSubmit = async e => {
        try{
            e.preventDefault()
        const respose = await servico.Cadastrar( data)
        if (respose.status === 200) {
            if(respose.resposta.msg){
                throw new Error(respose.resposta.msg.message)
            }
            Autenticar(respose.resposta.token)
            redirect("")
        } else {
            throw new Error("Conta não encontrada")
        }
        }catch(e){
            setError(e.message)
        }
    }

    //funcionalidade que faz redirect da pagina
    const redirect = (destino) => {
        navigate(`/${destino}`)
    }

    return {
        data,
        error,
        msgError,
        isFuncionario,
        uf,
        municipio,
        setData,
        isSameSenha,
        setMunSelected,
        isTelefoneValid,
        isEmailValid,
        cpfConfirmator,
        setUfSelected,
        setFuncionario,
        handleSubmit,
        redirect,
    }
}