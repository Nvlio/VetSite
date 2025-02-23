
import Button from 'react-bootstrap/Button';
import { Contexto } from "../Contexto.jsx";
import image from "../public/estiloBasico.jpg"

import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { POST } from '../nFuncoes/POST.ts';
import GET from '../nFuncoes/GET.ts';
import { CheckAuteticacao } from '../nFuncoes/auntenticar.js';
import TelaAdd from '../NComponentes/Adicionar.tsx';


//minipage focada no cadastro
export default function AddPage(props: { lista: string }) {
    const { tamanhoJanela } = useContext(Contexto)
    let auth: any
    auth = CheckAuteticacao()
    const [show, setShow] = useState('Fechado')
    const [raca, setRaca] = useState({ racalist: [] })
    const [especie, setEspecie] = useState({ especielist: [] })
    const [data, setData] = useState({
        erro: "",
        nome: "",
        endereco: "",
        telefone: "",
        valor: "",
        fornecedor: "",
        quantidade: "0",
        especie: 1,
        raca: 1,
        cpf: auth.cpf,
        sexo: "Masculino",
        imagemNome: [""],
        imagem: [],
        descricao: ""

    })
    const url = 'http://localhost:3002/'
    const navegar = useNavigate()
    const buttonFlex = { justifyContent: 'center', marginTop: "05%", gap: "03%", marginRight: "10%" }
    const formdata = new FormData()

    const Redirect = () => {
        navegar("/Login", { replace: true })
    }

    /*
    LEMBRAR DE COLOCAR TODAS ESSAS FUNÇÕES EM LUGARES SOZINHOS PARA REUTILIZAR
    */

    //Função feita para enviar dados do tipo produto (lida com Imagem)
    async function EnviarDadosProd() {
        /* 
                Trabalhar para funcionar melhor
                1- ou comprimir
                2- dividir os envios
        
                codigo para enviar dados:
        */
        formdata.append("nome", data.nome)
        formdata.append("valor", data.valor)
        formdata.append("quantidade", data.quantidade)
        formdata.append("fornecedor", data.fornecedor)
        formdata.append("descricao", data.descricao)
        data.imagem.forEach((file: File, index: number) => {
            formdata.append(`imagem${index}`, file)
        })
        const resposta = await fetch(`${url}Produtos`, {
            method: "POST", body: formdata
        })
            .then((resp) => { return resp.json() })
            .then((resp) => {
                // window.location.href = "/Lista"
                return resp
            })

    }

    //função para enviar dados
    const EnviarData = async () => {
        setData((prevState) => ({ ...prevState, erro: "" }))
        if (data.imagem.length === 0) {
            const resp = await POST(`${url}${props.lista}`, JSON.stringify(data), "Lista")
            if (resp && resp.message) {
                setData((prevState) => ({ ...prevState, erro: "Erro ao conectar com banco de dados" }))
            }

        } else {
            await EnviarDadosProd()
            window.location.replace("/Lista")


        }
    }


    //coletar vai realizar a coleta de dados de um determinado campo de dados ao ser chamado retornando seus valores
    const coletar = async () => {
        if (especie.especielist.length === 0) {
            let especies: []
            let raca: any
            especies = await GET(url + "Especies")
            setEspecie((prevState) => ({ especielist: especies }))
            raca = await GET(url + `Racas/${data.especie}`)
            setRaca((prevState) => ({ ...prevState, racalist: raca.msg }))
        } else if (especie.especielist.length !== 0) {
            let raca: any
            raca = await GET(url + `Racas/${data.especie}`)
            setRaca((prevState) => ({ ...prevState, racalist: raca.msg }))
        }
    }

    //função que filtra qual a raça que vai ser enviada
    const filtrarEnvio = (valor: string) => {
        if (valor !== "escolher" && valor !== "Adicionar") {
            const racaID: any = raca.racalist.filter((racauni: any) => { if (racauni.nome === valor) { return racauni.id } })
            setData((prevState) => ({ ...prevState, raca: racaID[0].id }))
        }

    }

    //só define se a tabela do começo do retun vai ser aberta ou não
    const Abrir = (e: any) => {
        const valor = e.target.selectedOptions[0].value
        if (valor === "Adicionar") {
            setShow("Aberto")
            e.target.value = "escolher"
        }
    }

    //faz a coleta quando o user mudar
    useEffect(() => {
        if (raca.racalist && raca.racalist[0]) {
            setData((prevState) => ({ ...prevState, raca: raca.racalist[0].id }))
        }
    }, [raca])

    //chama a função coletar, sempre que a pagina for carregada
    useEffect(() => {
        if (props.lista === "Pacientes") {
            coletar()
        }
    }, [data.especie])

    //só adiciona ao state as imagens
    async function ConfigurarFoto(event: any) {

        const files = [...event.target.files];
        const filesName = files.map((file) => file.name)
        setData((prev) => ({ ...prev, imagem: [...files] }))

    }



    //retorna page de de adição
    return (
        <>
            <TelaAdd status={show} fechar={setShow} especies={especie} />
            <div className={tamanhoJanela.width >= '1509' ? "ImgBG" : "ImgBGCell"} style={{ backgroundImage: `url(${image})` }} >
                <div className="Above">
                    <div className="DefaultDiv Formulario">
                        <div className="FormTitle"><h1>Adição de {props.lista}</h1></div>
                        <div className='ErroBlock' style={{ display: data.erro !== "" ? 'block' : "none" }}><p>{data.erro}</p></div>

                        <form onSubmit={(e) => { e.preventDefault(); EnviarData() }}>
                            <div className="FormBody">
                                <input type="text" className="form-control custom-input" placeholder="Nome"
                                    required
                                    onChange={(e) => { setData((prevState) => ({ ...prevState, nome: e.target.value })) }}
                                />
                            </div>
                            {props.lista === "Unidades" ?
                                //se a tabela for para adicionar unidades
                                <>
                                    <div className="FormBody">
                                        <input type="text" className="form-control custom-input" placeholder="endereço"
                                            required
                                            onChange={(e) => { setData((prevState) => ({ ...prevState, endereco: e.target.value })) }}
                                        />
                                    </div>
                                    <div className="FormBody">
                                        <input type="text" className="form-control custom-input" placeholder="Telefone"
                                            required
                                            onChange={(e) => { setData((prevState) => ({ ...prevState, telefone: e.target.value })) }}
                                        />
                                    </div>
                                </>
                                :
                                <>
                                    {props.lista === "Produtos" ?
                                        //se for para adicionar produtos
                                        //parte para quando o formulario for para produtos
                                        <>
                                            <div className="FormBody">
                                                <input type="number" className="form-control custom-input" placeholder="valor"
                                                    required
                                                    onChange={(e) => { setData((prevState) => ({ ...prevState, valor: e.target.value })) }}
                                                />
                                            </div>

                                            <div className="FormBody">
                                                <input type="text" className="form-control custom-input" placeholder="fornecenedor"
                                                    required
                                                    onChange={(e) => { setData((prevState) => ({ ...prevState, fornecedor: e.target.value })) }}
                                                />
                                            </div>
                                            <div className="FormBody">
                                                <textarea rows={4} cols={50} placeholder="Digite seu texto aqui..." required onChange={(e) => { setData((prevState) => ({ ...prevState, descricao: e.target.value })) }} />

                                            </div>

                                            <div className="FormBody">
                                                <input required type="file" id="file" name="file" multiple accept="image/*" onChange={(e) => { ConfigurarFoto(e) }} />
                                            </div>
                                        </>
                                        :
                                        //parte parqa quando o formulario for para pacientes
                                        <>
                                            <div className="FormMainBody">
                                                <div className="col-lg-6 col-md-6 form-group mt-3" key={'especies'}>
                                                    <label>Especie do animal</label>
                                                    <select className="form-control custom-input" name="especie" id="especie"
                                                        onChange={(e) => { setData((prevState) => ({ ...prevState, especie: e.target.selectedIndex + 1 })) }}>
                                                        {especie.especielist.map((especie, index) => {
                                                            return (
                                                                <>
                                                                    <option key={`especie-${index}`} value={especie['nome']}>{especie['nome']}</option>
                                                                </>
                                                            )
                                                        })}
                                                    </select>
                                                    <div className="validate"></div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 form-group mt-3" key={'racas'}>
                                                    <label>Raça do animal</label>
                                                    <select className="form-control custom-input" name="raca" id="raca"
                                                        onChange={(e) => { filtrarEnvio(e.target.selectedOptions[0].value) }}
                                                        onClick={(e) => { Abrir(e) }}>
                                                        <option key={`choice`} selected value={'escolher'}>Escolher</option>
                                                        {raca.racalist.map((raca, index) => {
                                                            return (
                                                                <>
                                                                    <option key={`raca-${index}`} value={raca['nome']}>{raca['nome']}</option>
                                                                </>
                                                            )
                                                        })}
                                                        <option key={`add`} value={'Adicionar'}>Adicionar</option>
                                                    </select>
                                                    <div className="validate"></div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 form-group mt-3" key={'sexo'}>
                                                    <label>Raça do animal</label>
                                                    <select className="form-control custom-input" name="sexo" id="sexo"
                                                        onChange={(e) => { setData((prevState) => ({ ...prevState, sexo: e.target.selectedOptions[0].value })) }}>
                                                        <option key={`Male`} value={'Maculino'}>{"Maculino"}</option>
                                                        <option key={`Female`} value={"Feminino"}>{"Feminino"}</option>
                                                    </select>
                                                    <div className="validate"></div>
                                                </div>
                                            </div>
                                        </>}
                                </>
                            }



                            <div className='Flex' style={buttonFlex}>
                                <Button type='submit' variant="outline-primary">Adicionar</Button>
                                <Button href='/Lista' variant="outline-warning">Voltar</Button>
                            </div>
                        </form>
                    </div>

                </div >
            </div>
        </>
    )

}

/*



*/