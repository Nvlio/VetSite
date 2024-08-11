
import Button from 'react-bootstrap/Button';
import { Contexto } from "../Contexto.jsx";
import image from "../public/estiloBasico.jpg"
import Mask from '../nFuncoes/Validar.ts';

import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Cadastro} from '../nFuncoes/POST.ts';
import UPDATE from '../nFuncoes/UPDATE.ts';
import { CheckAuteticacao } from '../nFuncoes/auntenticar.js';


//minipage focada no cadastro
export default function FormucadastroMini(props: { info: any, lista: string }) {
    const { tamanhoJanela } = useContext(Contexto)
    const [estado, setEstado] = useState("ocioso")
    const [user, setUser] = useState('Cliente')
    const [unit, setUnit] = useState([''])
    const [unitNome, setUnitNome] = useState([''])
    const [EspecieNome, setEspecieNome] = useState<any>([])
    const [RacaNome, setRacaNome] = useState<any>(["Defina a Especie"])
    const [password, setPassword] = useState({ type: 'password', img: require("../public/simbolos/eyeClosed.png") })
    const especialidade = ["cirurgia", "marketing", "veterinário", "clínico"];
    const [data, setData] = useState({
        nome: "",
        email: "",
        senha: "",
        senha2: "",
        tel: "",
        cpf: "",
        unidade: "",
        especialidade: "",
        funcao: "",
        erro: "",
        endereco: "",
        valor: "",
        fornecedor: "",
        quantidade: "",
        especie: 1,
        sexo: "",
        raca: "",
    })
    const url = 'http://localhost:3002/'
    const auth = CheckAuteticacao()


    const navegar = useNavigate()

    const buttonFlex = { justifyContent: 'center', marginTop: "05%", gap: "03%", marginRight: "10%" }

    const Redirect = () => {
        navegar("/Login", { replace: true })
    }

    /*
    LEMBRAR DE COLOCAR TODAS ESSAS FUNÇÕES EM LUGARES SOZINHOS PARA REUTILIZAR
    */

    const ValidarDados = async (e: any) => {
        if (e.key === "Enter") {
            const resposta = await Mask(e.target.value, 'Email')
            if (resposta === false && data.email !== "") {
                e.target.className = "ErroInput custom-input"
                setData((prevState) => ({ ...prevState, erro: "Alguns campos estão errados" }))
                return false
            } else {
                e.target.className = "form-control custom-input"
                setData((prevState) => ({ ...prevState, erro: "" }))
                return true
            }
        } else if (e.key === "Fim") {
            const resposta = await Mask(data.email, 'Email')
            if (resposta === false && data.email !== "") {
                setData((prevState) => ({ ...prevState, erro: "Alguns campos estão errados" }))
                return false
            } else {
                setData((prevState) => ({ ...prevState, erro: "" }))
                return true
            }
        } else {
            return false
        }
    }

    const EnviarData = async () => {
        if (data.email !== "" && data.senha !== "") {
            const resposta = await ValidarDados({ key: 'Fim' })
            if (!resposta) {
                return
            } else {
                await Cadastro(url, data, user)
            }
        } else {
            setData((prevState) => ({ ...prevState, erro: "Há campos que não foram completos" }))
            return
        }




    }

    async function coletar(extra: null | string) {
        //faz a coleta de um dado especifico de unidades
        //""""""NÃO ESQUECER DE COLOCAR ISSO NA PARTE GET DE FUNÇÕES""""""
        //old version ---if (user === "Funcionário" || auth.Conta === "funcionario") {
        if (props.lista === "Funcionarios") {
            setEstado("carregando")
            fetch("http://localhost:3002/Unidades", { method: "GET", headers: { 'content-type': "application/json" } })
                .then((resp) => { return resp.json() })
                .then((resp) => {
                    try {
                        setData((prevState) => ({ ...prevState, erro: "" }))
                        const list: Array<string> = []
                        const listN: Array<string> = []
                        for (let item of resp) {

                            list.push(item['unidade'])
                            listN.push(item['nome'])
                        }
                        setUnit(list)
                        setUnitNome(listN)
                        setEstado("ocioso")
                    } catch (e) {
                        setData((prevState) => ({ ...prevState, erro: "Erro ao conectar com servidor" }))
                    }

                })
        } else if (props.lista === "Pacientes" && !extra) {
            setEstado("carregando")
            fetch("http://localhost:3002/Especies", { method: "GET", headers: { 'content-type': "application/json" } })
                .then((resp) => { return resp.json() })
                .then((resp) => {
                    try {
                        setData((prevState) => ({ ...prevState, erro: "" }))
                        const listN: Array<object> = []
                        for (let item of resp) {
                            listN.push({ nome: item['nome'], id: item['id'] })
                        }
                        setEspecieNome(listN)
                    } catch (e) {
                        setData((prevState) => ({ ...prevState, erro: "Erro ao conectar com servidor" }))
                    }
                })
            setEstado("ocioso")
        } else if (extra) {
            const especie = data.especie

            fetch(`http://localhost:3002/Racas/${especie}`, { method: "GET", headers: { 'content-type': "application/json" } })
                .then((resp) => { return resp.json() })
                .then((resp) => {
                    try {
                        setData((prevState) => ({ ...prevState, erro: "" }))
                        const listN: Array<object> = []
                        for (let item of resp.msg) {
                            listN.push({ nome: item['nome'], id: item['id'] })
                        }
                        setRacaNome(listN)
                    } catch (e) {
                        setData((prevState) => ({ ...prevState, erro: "Erro ao conectar com servidor" }))
                    }

                })


        }
    }

    const EditarData = async () => {
        let ident: any;
        if (props.lista === "Funcionarios" || props.lista === "Clientes") {
            ident = props.info.cpf
        } else {
            ident = props.info.id
        }
        await UPDATE(`${url}${props.lista}/${ident}`, props.lista, JSON.stringify({
            senha: data.senha,
            email: data.email,
            nome: data.nome,
            telefone: data.tel,
            cpf: data.cpf,
            funcao: data.funcao,
            unidade: data.unidade,
            especialidade: data.especialidade,
            endereco: data.endereco,
            raca: data.raca,
            sexo: data.sexo,
            especie: data.especie,
            valor: data.valor,
            quantidade: data.quantidade,
            fornecedor: data.fornecedor
        }))
    }

    //define o valor inicial do campo como sendo o valor de placeholder
    const BeginState = (e, tipo) => {
        if (data[`${tipo}`] === "") {
            e.target.value = e.target.placeholder
        }
    }

    //faz a coleta quando o user mudar
    useEffect(() => {
        coletar()
    }, [user])

    useEffect(() => {
        coletar('raca')
    }, [data.especie])


    //retorna page de cadastro
    if (props.info !== "") {
        if (props.lista === "Clientes" || props.lista === "Funcionarios" || props.lista === "Profile") {
            return (
                <><div className={tamanhoJanela.width >= '1509' ? "ImgBG" : "ImgBGCell"} style={{ backgroundImage: `url(${image})` }} >
                    <div className="Above">
                        <div className="DefaultDiv Formulario">
                            <div className="FormTitle"><h1>Editar</h1></div>
                            <div className='ErroBlock' style={{ display: data.erro !== "" ? 'block' : "none" }}><p>{data.erro}</p></div>

                            <form onSubmit={(e) => { e.preventDefault(); EditarData() }}>
                                <div className="FormBody">
                                    <input type="text" className="form-control custom-input" placeholder={props.info?.nome}
                                        onClick={(e) => { BeginState(e, "nome") }}
                                        onChange={(e) => { setData((prevState) => ({ ...prevState, nome: e.target.value })) }}
                                        onKeyDown={(e) => { ValidarDados(e) }}
                                    />
                                </div>


                                <div className="FormBody">
                                    <input type="telephone" className="form-control custom-input" placeholder={props.info?.telefone}
                                        onClick={(e) => { BeginState(e, "tel") }}
                                        onChange={(e) => { setData((prevState) => ({ ...prevState, tel: e.target.value })) }}
                                        onKeyDown={(e) => { ValidarDados(e) }}
                                    />
                                </div>

                                <div className="FormBody">
                                    <input type="text" className="form-control custom-input" placeholder={props.info?.email}
                                        onClick={(e) => { BeginState(e, "email") }}
                                        onChange={(e) => { setData((prevState) => ({ ...prevState, email: e.target.value })) }}
                                        onKeyDown={(e) => { ValidarDados(e) }}
                                    />
                                </div>

                                <div style={{ border: "1px solid black", borderRadius: "10px", margin: '02% 03%', padding: "03%" }}>
                                    <div className="FormBody" style={{ display: "flex", width: '74.5%' }}>
                                        <input type={password.type} className="form-control custom-input" placeholder={"nova senha"}
                                            onChange={(e) => { setData((prevState) => ({ ...prevState, senha: e.target.value })) }}
                                        />
                                        <img src={password.img} alt='simbolo que visualiza senha' height={'20px'} onClick={() => {
                                            setPassword(password.type === 'password' ? {
                                                type: 'text', img: require("../public/simbolos/eyeOpen.png")
                                            } :
                                                { type: 'password', img: require('../public/simbolos/eyeClosed.png') })
                                        }
                                        } />
                                    </div>

                                    <div className="FormBody" style={{ width: '69.5%' }}>
                                        <input type={password.type} className="form-control custom-input" placeholder={"confirme nova senha"}
                                            onChange={(e) => { setData((prevState) => ({ ...prevState, senha2: e.target.value })) }}
                                        />
                                    </div>
                                </div>


                                {props.lista !== "Clientes" && auth.Conta === "funcionario" ?
                                    <div style={{ marginLeft: "20%", width: "100%" }}>
                                        <div className="col-lg-6 col-md-6 form-group mt-3">
                                            <select className="form-control custom-input" name="unidade" id="unidade"
                                                onChange={(e) => setData((prevState) => ({ ...prevState, unidade: unit[e.target.selectedIndex] }))}>
                                                {unitNome.map((unidade, index) => {
                                                    return (
                                                        <>
                                                            <option key={unidade} value={unidade}>{unidade}</option>
                                                        </>
                                                    )
                                                })}
                                            </select>
                                            <div className="validate"></div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 form-group mt-3">
                                            <select className="form-control custom-input" name="especialidade" id="especialidade"
                                                onChange={(e) => setData((prevState) => ({ ...prevState, especialidade: e.target.options[e.target.selectedIndex].innerText }))}>
                                                <option value={especialidade[0]}>{especialidade[0]}</option>
                                                <option value={especialidade[1]}>{especialidade[1]}</option>
                                                <option value={especialidade[2]}>{especialidade[2]}</option>
                                                <option value={especialidade[3]}>{especialidade[3]}</option>
                                            </select>
                                            <div className="validate"></div>
                                        </div>
                                        <div className="FormBody" style={{ marginLeft: '-10%' }}>
                                            <input type="text" className="form-control custom-input" placeholder="função"
                                                onChange={(e) => { setData((prevState) => ({ ...prevState, funcao: e.target.value })) }}
                                                onKeyDown={(e) => { ValidarDados(e) }}
                                            />
                                        </div>
                                    </div>
                                    : null}

                                <div className='Flex' style={buttonFlex}>
                                    <Button type='submit' variant="outline-primary">Editar</Button>
                                    <Button href='/' variant="outline-warning">Voltar</Button>
                                </div>
                            </form>
                        </div>
                    </div >
                </div>
                </>
            )
        } else if (props.lista === "Unidades" || props.lista === "Produtos") {
            return (
                <><div className={tamanhoJanela.width >= '1509' ? "ImgBG" : "ImgBGCell"} style={{ backgroundImage: `url(${image})` }} >
                    <div className="Above">
                        <div className="DefaultDiv Formulario">
                            <div className="FormTitle"><h1>Editar</h1></div>
                            <div className='ErroBlock' style={{ display: data.erro !== "" ? 'block' : "none" }}><p>{data.erro}</p></div>

                            <form onSubmit={(e) => { e.preventDefault(); EditarData() }}>
                                <div className="FormBody">
                                    <p className='form'>Nome</p>
                                    <input type="text" className="form-control custom-input" placeholder={props.info?.nome}
                                        onClick={(e) => { BeginState(e, "nome") }}
                                        onChange={(e) => { setData((prevState) => ({ ...prevState, nome: e.target.value })) }}
                                        onKeyDown={(e) => { ValidarDados(e) }}
                                    />
                                </div>
                                {props.lista === "Unidades" ?
                                    <>
                                        <div className="FormBody">
                                            <p className='form'>Endereço</p>
                                            <input type="text" className="form-control custom-input" placeholder={props.info?.endereco}
                                                onClick={(e) => { BeginState(e, "nome") }}
                                                onChange={(e) => { setData((prevState) => ({ ...prevState, endereco: e.target.value })) }}
                                                onKeyDown={(e) => { ValidarDados(e) }}
                                            />
                                        </div>
                                        <div className="FormBody">
                                            <p className='form'>Telefone</p>
                                            <input type="text" className="form-control custom-input" placeholder={props.info?.telefone}
                                                onClick={(e) => { BeginState(e, "nome") }}
                                                onChange={(e) => { setData((prevState) => ({ ...prevState, tel: e.target.value })) }}
                                                onKeyDown={(e) => { ValidarDados(e) }}
                                            />
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className="FormBody">
                                            <p className='form'>Valor</p>
                                            <input type="number" className="form-control custom-input" placeholder={props.info?.valor}
                                                onClick={(e) => { BeginState(e, "nome") }}
                                                onChange={(e) => { setData((prevState) => ({ ...prevState, valor: e.target.value })) }}
                                                onKeyDown={(e) => { ValidarDados(e) }}
                                            />
                                        </div>
                                        <div className="FormBody">
                                            <p className='form'>Quantidade</p>
                                            <input type="number" className="form-control custom-input" placeholder={props.info?.quantidade}
                                                onClick={(e) => { BeginState(e, "nome") }}
                                                onChange={(e) => { setData((prevState) => ({ ...prevState, quantidade: e.target.value })) }}
                                                onKeyDown={(e) => { ValidarDados(e) }}
                                            />
                                        </div>
                                        <div className="FormBody">
                                            <p className='form'>Fornecedor</p>
                                            <input type="text" className="form-control custom-input" placeholder={props.info?.fornecedor}
                                                onClick={(e) => { BeginState(e, "nome") }}
                                                onChange={(e) => { setData((prevState) => ({ ...prevState, fornecedor: e.target.value })) }}
                                                onKeyDown={(e) => { ValidarDados(e) }}
                                            />
                                        </div>

                                    </>
                                }

                                {props.lista === "Funcionarios" && (
                                    <div style={{ marginLeft: "20%", width: "100%" }}>
                                        <div className="col-lg-6 col-md-6 form-group mt-3">
                                            <select className="form-control custom-input" name="unidade" id="unidade"
                                                onChange={(e) => setData((prevState) => ({ ...prevState, unidade: unit[e.target.selectedIndex] }))}>
                                                {unitNome.map((unidade, index) => {
                                                    return (
                                                        <>
                                                            <option key={unidade} value={unidade}>{unidade}</option>
                                                        </>
                                                    )
                                                })}
                                            </select>
                                            <div className="validate"></div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 form-group mt-3">
                                            <select className="form-control custom-input" name="especialidade" id="especialidade"
                                                onChange={(e) => setData((prevState) => ({ ...prevState, especialidade: e.target.options[e.target.selectedIndex].innerText }))}>
                                                <option value={especialidade[0]}>{especialidade[0]}</option>
                                                <option value={especialidade[1]}>{especialidade[1]}</option>
                                                <option value={especialidade[2]}>{especialidade[2]}</option>
                                                <option value={especialidade[3]}>{especialidade[3]}</option>
                                            </select>
                                            <div className="validate"></div>
                                        </div>
                                        <div className="FormBody" style={{ marginLeft: '-10%' }}>
                                            <input type="text" className="form-control custom-input" placeholder="função"
                                                onChange={(e) => { setData((prevState) => ({ ...prevState, funcao: e.target.value })) }}
                                                onKeyDown={(e) => { ValidarDados(e) }}
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className='Flex' style={buttonFlex}>
                                    <Button type='submit' variant="outline-primary">Editar</Button>
                                    <Button href='/' variant="outline-warning">Voltar</Button>
                                </div>
                            </form>
                        </div>
                    </div >
                </div>
                </>
            )
        } else {
            //Formulario para editar pacientes
            return (
                <><div className={tamanhoJanela.width >= '1509' ? "ImgBG" : "ImgBGCell"} style={{ backgroundImage: `url(${image})` }} >
                    <div className="Above">
                        <div className="DefaultDiv Formulario">
                            <div className="FormTitle"><h1>Editar</h1></div>
                            <div className='ErroBlock' style={{ display: data.erro !== "" ? 'block' : "none" }}><p>{data.erro}</p></div>

                            <form onSubmit={(e) => { e.preventDefault(); EditarData() }}>
                                <div className="FormBody">
                                    <p className='form'>Nome</p>
                                    <input type="text" className="form-control custom-input" placeholder={props.info?.nome}
                                        onClick={(e) => { BeginState(e, "nome") }}
                                        onChange={(e) => { setData((prevState) => ({ ...prevState, nome: e.target.value })) }}
                                        onKeyDown={(e) => { ValidarDados(e) }}
                                        key={"nomeEditar"} />
                                </div>

                                <select className="form-control custom-input form" name="unidade" id="unidade" required
                                    onChange={(e) => setData((prevState) => ({ ...prevState, especie: EspecieNome[e.target.selectedIndex]["id"] }))}>
                                    {EspecieNome.map((especie: object) => {
                                        return (
                                            <>
                                                <option key={especie['nome']} value={especie['nome']}>{especie['nome']}</option>
                                            </>
                                        )
                                    })}
                                </select>

                                <select className="form-control custom-input form" name="unidade" id="unidade" required
                                    onChange={(e) => setData((prevState) => ({ ...prevState, raca: RacaNome[e.target.selectedIndex]["id"] }))}>
                                    {RacaNome.map((raca: object) => {
                                        return (
                                            <>
                                                <option key={raca['nome']} value={raca['nome']}>{raca['nome']}</option>
                                            </>
                                        )
                                    })}
                                </select>




                                <div className='Flex' style={buttonFlex}>
                                    <Button type='submit' variant="outline-primary">Editar</Button>
                                    <Button href='/' variant="outline-warning">Voltar</Button>
                                </div>
                            </form>
                        </div>
                    </div >
                </div>
                </>
            )
        }
    } else {
        return (
            <><div className={tamanhoJanela.width >= '1509' ? "ImgBG" : "ImgBGCell"} style={{ backgroundImage: `url(${image})` }} >
                <div className="Above">
                    <div className="DefaultDiv Formulario">
                        <div className="FormTitle"><h1>Cadastro de {user}</h1></div>
                        <div className='ErroBlock' style={{ display: data.erro !== "" ? 'block' : "none" }}><p>{data.erro}</p></div>

                        <form onSubmit={(e) => { e.preventDefault(); EnviarData() }}>
                            <div className="FormBody">
                                <input type="text" className="form-control custom-input" placeholder="Nome"
                                    required
                                    onChange={(e) => { setData((prevState) => ({ ...prevState, nome: e.target.value })) }}
                                    onKeyDown={(e) => { ValidarDados(e) }}
                                />
                            </div>

                            <div className="FormBody">
                                <input type="text" className="form-control custom-input" placeholder="cpf"
                                    required
                                    onChange={(e) => { setData((prevState) => ({ ...prevState, cpf: e.target.value })) }}
                                    onKeyDown={(e) => { ValidarDados(e) }}
                                />
                            </div>

                            <div className="FormBody">
                                <input type="telephone" className="form-control custom-input" placeholder="Telefone"
                                    required
                                    onChange={(e) => { setData((prevState) => ({ ...prevState, tel: e.target.value })) }}
                                    onKeyDown={(e) => { ValidarDados(e) }}
                                />
                            </div>

                            <div className="FormBody">
                                <input type="text" className="form-control custom-input" placeholder="Seu Email"
                                    required
                                    onChange={(e) => { setData((prevState) => ({ ...prevState, email: e.target.value })) }}
                                    onKeyDown={(e) => { ValidarDados(e) }}
                                />
                            </div>

                            <div style={{ border: "1px solid black", borderRadius: "10px", margin: '02% 03%', padding: "03%" }}>
                                <div className="FormBody" style={{ display: "flex", width: '74.5%' }}>
                                    <input type={password.type} className="form-control custom-input" placeholder="Sua Senha" required
                                        onChange={(e) => { setData((prevState) => ({ ...prevState, senha: e.target.value })) }}
                                    />
                                    <img src={password.img} alt='simbolo que visualiza senha' height={'20px'} onClick={() => {
                                        setPassword(password.type === 'password' ? {
                                            type: 'text', img: require("../public/simbolos/eyeOpen.png")
                                        } :
                                            { type: 'password', img: require('../public/simbolos/eyeClosed.png') })
                                    }
                                    } />
                                </div>

                                <div className="FormBody" style={{ width: '69.5%' }}>
                                    <input type={password.type} className="form-control custom-input" placeholder="Confirme sua Senha" required
                                        onChange={(e) => { setData((prevState) => ({ ...prevState, senha2: e.target.value })) }}
                                    />
                                </div>
                            </div>

                            {user === "Funcionário" && (
                                <div style={{ marginLeft: "20%", width: "100%" }}>
                                    <div className="col-lg-6 col-md-6 form-group mt-3">
                                        <select className="form-control custom-input" name="unidade" id="unidade" required
                                            onChange={(e) => setData((prevState) => ({ ...prevState, unidade: unit[e.target.selectedIndex] }))}>
                                            {unitNome.map((unidade, index) => {
                                                return (
                                                    <>
                                                        <option key={unidade} value={unidade}>{unidade}</option>
                                                    </>
                                                )
                                            })}
                                        </select>
                                        <div className="validate"></div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 form-group mt-3">
                                        <select className="form-control custom-input" name="especialidade" id="especialidade" required
                                            onChange={(e) => setData((prevState) => ({ ...prevState, especialidade: e.target.options[e.target.selectedIndex].innerText }))}>
                                            <option value={especialidade[0]}>{especialidade[0]}</option>
                                            <option value={especialidade[1]}>{especialidade[1]}</option>
                                            <option value={especialidade[2]}>{especialidade[2]}</option>
                                            <option value={especialidade[3]}>{especialidade[3]}</option>
                                        </select>
                                        <div className="validate"></div>
                                    </div>
                                    <div className="FormBody" style={{ marginLeft: '-10%' }}>
                                        <input type="text" className="form-control custom-input" placeholder="função" required
                                            onChange={(e) => { setData((prevState) => ({ ...prevState, funcao: e.target.value })) }}
                                            onKeyDown={(e) => { ValidarDados(e) }}
                                        />
                                    </div>
                                </div>
                            )}

                            <div className='Flex' style={buttonFlex}>
                                <Button type='submit' variant="outline-primary">Cadastrar</Button>
                                <Button href='/' variant="outline-warning">Voltar</Button>
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
}