
import Button from 'react-bootstrap/Button';
import Mask from '../nFuncoes/Validar.ts';

import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Login } from '../nFuncoes/POST.ts';
import login from '../nFuncoes/testando.ts';


//mini pagina voltada a formulario de Login
export default function FormuloginMini() {
    const [user, setUser] = useState('Cliente')
    const [password, setPassword] = useState({ type: 'password', img: require("../public/simbolos/eyeClosed.png") })
    const [data, setData] = useState({ email: "", senha: "", erro: "" })
    const url = 'http://localhost:3002/' //url do servidor
    const navegar = useNavigate()//vai permitir mudar de url

    const buttonFlex = { justifyContent: 'center', marginTop: "05%", gap: "03%", marginRight: "10%" }

    //redireciona o usuário de volta para a home page
    const Redirect = () => {
        navegar("/Cadastro", { replace: true })
        
    }

    //função que valida se os dados estão corretos
    const ValidarDados = async (e: any) => {
        

        if (e.key === "Enter") {
            //chama caso a validação seja feita ao terminar um campo
            const resposta = await Mask(e.target.value, 'Email')
            if (resposta === false && data.email !== "") {
                //caso a resposta dê ruim modifica o estilo para avisar erro
                e.target.className = "ErroInput custom-input"
                setData((prevState) => ({ ...prevState, erro: "Alguns campos estão errados" }))
                return false
            } else {
                e.target.className = "form-control custom-input"
                setData((prevState) => ({ ...prevState, erro: "" }))
                return true
            }
        } else if (e.key === "Fim") {
            //chama quando for feito o submit do formulário
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


    //função que envia os dados do formulario para o servidor
    const EnviarData = async () => {
        alert("oi")
        try{
            fetch("https://2ceb-189-124-0-88.ngrok-free.app/Comentarios",{method:"GET"})
        }catch(e){
            alert(e)
        }
        
/*

if (data.email !== "" && data.senha !== "") {
            const resposta = await ValidarDados({ key: 'Fim' })
            if (!resposta) {
                return
            } else {
                await Login(url, data, user)
            }
        } else {
            setData((prevState) => ({ ...prevState, erro: "Há campos que não foram completos" }))
            return
        }

*/



    }

    //page de Login
    return (
        <>
            <div className="Above">
                <div className="DefaultDiv Formulario">
                    <div className="FormTitle"><h1>Login de {user}</h1></div>
                    <div className='ErroBlock' style={{ display: data.erro !== "" ? 'block' : "none" }}><p>{data.erro}</p></div>
                    <div className="FormBody">
                        <input type="text" className="form-control custom-input" placeholder="Seu Email"
                            onChange={(e) => { setData((prevState) => ({ ...prevState, email: e.target.value })) }}
                            onKeyDown={(e) => { ValidarDados(e) }}
                        />
                    </div>
                    <div className="FormBody" style={{ display: "flex", width: '74.5%' }}>
                        <input type={password.type} className="form-control custom-input" placeholder="Sua Senha"
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
                    <div className='Flex' style={buttonFlex}>
                        <Button onClick={(e) => { EnviarData() }} variant="outline-primary">Login</Button>
                        <Button href='/' variant="outline-warning">Voltar</Button>
                    </div>
                </div>
                <div>
                    <p>Não tem conta? <span id='clicavel' onClick={Redirect}>Cadastre-se</span></p>
                    <p>É {user === 'Cliente' ? 'Funcionário' : 'Cliente'}? <span id='clicavel' onClick={() => { setUser(user === 'Cliente' ? 'Funcionário' : 'Cliente') }}>Entrar</span></p>
                </div>
            </div>
        </>
    )
}