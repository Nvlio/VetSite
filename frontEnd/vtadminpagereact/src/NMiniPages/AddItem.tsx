
import Button from 'react-bootstrap/Button';
import { Contexto } from "../Contexto.jsx";
import image from "../public/estiloBasico.jpg"

import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { POST } from '../nFuncoes/POST.ts';


//minipage focada no cadastro
export default function AddPage(props: { lista: string }) {
    const { tamanhoJanela } = useContext(Contexto)
    const [user, setUser] = useState('Cliente')
    const [data, setData] = useState({
        erro: "",
        nome: "",
        endereco:"",
        telefone:"",
        valor: "",
        fornecedor: "",
        quantidade: ""
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
        setData((prevState)=>({...prevState,erro:""}))
        const resp = await POST(`${url}${props.lista}`, JSON.stringify(data))
        if(resp && resp.message){
            setData((prevState)=>({...prevState,erro:"Erro ao conectar com banco de dados"}))
        }
    }


    //define o valor inicial do campo como sendo o valor de placeholder
    

    //faz a coleta quando o user mudar
    useEffect(() => {
    }, [user])



    //retorna page de cadastro
    return (
        <><div className={tamanhoJanela.width >= '1509' ? "ImgBG" : "ImgBGCell"} style={{ backgroundImage: `url(${image})` }} >
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
                        }



                        <div className='Flex' style={buttonFlex}>
                            <Button type='submit' variant="outline-primary">Adicionar</Button>
                            <Button href='/Lista' variant="outline-warning">Voltar</Button>
                        </div>
                    </form>
                </div>
                <div >
                    <p>Já tem conta? <span id='clicavel' onClick={Redirect}>Entre</span></p>
                    <p>É {user === 'Cliente' ? 'Funcionário' : 'Cliente'}? <span id='clicavel' onClick={() => { setUser(user === 'Cliente' ? 'Funcionário' : 'Cliente') }}>Entrar</span></p>
                </div>
            </div >
        </div>
        </>
    )

}