
import Button from 'react-bootstrap/Button';
import { Contexto } from "../Contexto.jsx";
import image from "../public/estiloBasico.jpg"

import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { POST } from '../nFuncoes/POST.ts';
import GET from '../nFuncoes/GET.ts';
import { CheckAuteticacao } from '../nFuncoes/auntenticar.js';


//minipage focada no cadastro
export default function AddPage(props: { lista: string }) {
    const { tamanhoJanela } = useContext(Contexto)
    let auth: any
    auth = CheckAuteticacao()
    const [user, setUser] = useState('Cliente')
    const [raca, setRaca] = useState({ racalist: [] })
    const [especie, setEspecie] = useState({ especielist: [] })
    const [data, setData] = useState({
        erro: "",
        nome: "",
        endereco: "",
        telefone: "",
        valor: "",
        fornecedor: "",
        quantidade: "",
        especie: 1,
        raca: 1,
        cpf: auth.cpf,
        sexo: "Masculino"

    })
    const url = 'http://localhost:3002/'
    const navegar = useNavigate()
    const buttonFlex = { justifyContent: 'center', marginTop: "05%", gap: "03%", marginRight: "10%" }


    const Redirect = () => {
        navegar("/Login", { replace: true })
    }

    /*
    LEMBRAR DE COLOCAR TODAS ESSAS FUNÇÕES EM LUGARES SOZINHOS PARA REUTILIZAR
    */


    const EnviarData = async () => {
        setData((prevState) => ({ ...prevState, erro: "" }))
        const resp = await POST(`${url}${props.lista}`, JSON.stringify(data))
        if (resp && resp.message) {
            setData((prevState) => ({ ...prevState, erro: "Erro ao conectar com banco de dados" }))
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
    const filtrarEnvio = (valor) => {
        const racaID: any = raca.racalist.filter((racauni: any) => { if (racauni.nome === valor) { return racauni.id } })
        setData((prevState) => ({ ...prevState, raca: racaID[0].id }))
    }

    //faz a coleta quando o user mudar
    useEffect(() => {
        if(raca.racalist && raca.racalist[0]){
            console.log("fui?")
            setData((prevState)=>({...prevState,raca:raca.racalist[0].id}))
        }
    }, [raca])

    //chama a função coletar, sempre que a pagina for carregada
    useEffect(() => {
        if (props.lista === "Pacientes") {
            coletar()
        }
    }, [data.especie])



    //retorna page de cadastro
    return (
        <>
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
                                        //parte para quando o formulario for para
                                        <>
                                            <div className="FormBody">
                                                <input type="number" className="form-control custom-input" placeholder="valor"
                                                    required
                                                    onChange={(e) => { setData((prevState) => ({ ...prevState, valor: e.target.value })) }}
                                                />
                                            </div>
                                            <div className="FormBody">
                                                <input type="number" className="form-control custom-input" placeholder="quantidade"
                                                    required
                                                    onChange={(e) => { setData((prevState) => ({ ...prevState, quantidade: e.target.value })) }}
                                                />
                                            </div>
                                            <div className="FormBody">
                                                <input type="text" className="form-control custom-input" placeholder="fornecenedor"
                                                    required
                                                    onChange={(e) => { setData((prevState) => ({ ...prevState, fornecedor: e.target.value })) }}
                                                />
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
                                                        onChange={(e) => { filtrarEnvio(e.target.selectedOptions[0].value) }}>
                                                        {raca.racalist.map((raca, index) => {
                                                            return (
                                                                <>
                                                                    <option key={`raca-${index}`} value={raca['nome']}>{raca['nome']}</option>
                                                                </>
                                                            )
                                                        })}
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