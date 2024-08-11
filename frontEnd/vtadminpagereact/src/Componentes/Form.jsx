import { useEffect, useRef, useState } from 'react';
import { cpfValidator } from 'cpf-validator-ianan';
import { Autenticar, CheckAuteticacao } from '../nFuncoes/auntenticar';
import NavMenu from './nav';
import '../CSS/Crescer.css'; // Importando o CSS
import { Spinner } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import backgroundImage from '../public/about-bg2.jpg'; // Certifique-se de que o caminho está correto

const formContainerStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    border: '1px solid black',
    borderRadius: '10px',
    margin: '2% 12%',
    padding: '2%'
};

const sectionStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '79vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};

export function Login(props) {
    const [estado, setEstado] = useState("Login")
    const warnRef = useRef(null);
    const especialidade = ["cirurgia", "marketing", "veterinário", "clínico"];
    const [userData, setUserData] = useState({ nome: "", email: "", senha: "", confirm: false, tel: "", cpf: "", unidade: "", especialidade: especialidade[0], funcao: "" });

    function Mask(e, tipo) {
        let regex;
        let value = e.target.value;
        let resultado;

        if (e.key === "Enter" || e.key === undefined) {
            switch (tipo) {
                case "Email":
                    regex = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)@([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)\.(com)$/;
                    resultado = regex.test(value);
                    break;
                case "CPF":
                    if (cpfValidator(value)) {
                        setUserData((prevState) => ({ ...prevState, cpf: value }));
                    } else {
                        resultado = false;
                    }
                    break;
                case "Telefone":
                    regex = /^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/;
                    resultado = regex.test(value);

                    if (e.target.value.length === 11) {
                        let numRegx = regex.exec(value);
                        let numero = `(${numRegx[1]}) ${numRegx[2]}-${numRegx[3]}`;
                        e.target.value = numero;
                        setUserData((prevState) => ({ ...prevState, tel: numero }));
                    } else if (/^\(\d{2}\) \d{5}-\d{4}$/.test(value)) {
                        resultado = true;
                    }
                    break;
                default:
                    break;
            }
            if (resultado === false) {
                e.target.style.color = "red";
                e.target.value = `O campo ${tipo} está errado`;
            }
        }
    }

    function Reset(e, tipo) {
        if (e.target.value === `O campo ${tipo} está errado`) {
            e.target.style.color = "black";
            e.target.value = "";
        }
    }

    async function EnviarData(id = "", tipo = "") {
        console.log(userData);
        if (!userData.confirm) {
            alert('Confirme a senha');
        } else if (userData.nome === "" || userData.email === "" || userData.tel === "" || userData.cpf === "") {
            alert("Ainda há campos sem os dados");
        } else if (props.user === "Funcionario" && (userData.funcao === "" || userData.unidade === "" || userData.especialidade === "")) {
            alert("Ainda há campos sem os dados");
        } else {
            console.log(userData);
            fetch('http://localhost:3002/' + props.user, {
                method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({
                    cpf: userData.cpf,
                    nome: userData.nome,
                    telefone: userData.tel,
                    senha: userData.senha,
                    email: userData.email,
                    especialidade: userData.especialidade,
                    unidade: userData.unidade,
                    funcao: userData.funcao
                })
            }).then((resp) => {
                return resp.json();
            }).then((resposta) => {
                console.log(resposta);
                if (resposta.resp === "work") {
                    Autenticar(resposta.token);
                    window.location.href = "/";
                }
            });
        }
    }

    async function Atualizar(id = "", tipo = "") {
        console.log(userData);

        let cpf = userData.cpf === "" ? props.func.userInfo["cpf"] : userData.cpf;
        let nome = userData.nome === "" ? props.func.userInfo["nome"] : userData.nome;
        let tel = userData.tel === "" ? props.func.userInfo["telefone"] : userData.tel;
        let senha = userData.senha === "" ? props.func.userInfo["senha"] : userData.senha;
        let email = userData.email === "" ? props.func.userInfo["email"] : userData.email;
        let especialidade = userData.especialidade === "" ? props.func.userInfo["especialidade"] : userData.especialidade;
        let unidade = userData.unidade === "" ? props.func.userInfo["unidade"] : userData.unidade;
        let funcao = userData.funcao === "" ? props.func.userInfo["funcao"] : userData.funcao;
        console.log(cpf, nome, tel, senha, email, especialidade, unidade, funcao);

        fetch('http://localhost:3002/' + tipo + `/${id}`, {
            method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify({
                cpf: cpf,
                nome: nome,
                telefone: tel,
                senha: senha,
                email: email,
                especialidade: especialidade,
                unidade: unidade,
                funcao: funcao
            })
        }).then((resp) => {
            return resp.json();
        }).then((resposta) => {
            console.log(resposta);
        });
    }

    function isSenhaIgual(e) {
        if (e.key === "Enter" || e.key === undefined) {
            if (e.target.value === userData.senha) {
                e.target.style.background = "white";
                setUserData((prevState) => ({ ...prevState, confirm: true }));
            } else {
                setUserData((prevState) => ({ ...prevState, confirm: false }));
                e.target.style.background = "red";
                e.target.value = "";
                e.target.placeholder = "Senha diferente";
            }
        } else {
            e.target.style.background = "white";
            setUserData((prevState) => ({ ...prevState, confirm: false }));
        }
    }

    function Warning() {
        warnRef.current.focus();
        warnRef.current.innerText = "Conta não existe";
        warnRef.current.style.background = "red";
        warnRef.current.style.color = "white";
    }

    async function EnviarData(id = "", tipo = "") {
        if (userData.email === "" || userData.senha === "") {
            alert("Ainda há campos sem os dados");
        } else {
            fetch('http://localhost:3002/' + props.user + "/Login", {
                method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({
                    senha: userData.senha,
                    email: userData.email
                })
            }).then((resp) => {
                return resp.json();
            }).then((resposta) => {
                console.log(resposta.conta);
                if (resposta.resp === true) {
                    Autenticar(resposta.token);
                    window.location.href = "/";
                } else {
                    Warning();
                }
            });
        }
    }

    return (
        <section id="Login" className="d-flex align-items-center" style={sectionStyle}>
            <div className="container position-relative text-center text-lg-start" data-aos="zoom-in" data-aos-delay="100">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div ref={warnRef} />
                        <h1>Faça seu login como {props.user} na <span>CãoXonado</span></h1>
                        <h2>Se você for tutor use seu CPF e se você for da equipe, use seu RT.</h2>
                        <section id="book-a-table" className="book-a-table">
                            <div className="container" data-aos="fade-up">
                                <form id="contact-form" className="php-email-form" data-aos="fade-up" data-aos-delay="100"
                                    onSubmit={(e) => { e.preventDefault(); EnviarData(); }}>
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 form-group">
                                            <input type="text" name="name" className="form-control custom-input" id="name" placeholder="Seu nome"
                                                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                                onKeyDown={(e) => Mask(e, 'Email')}
                                                onMouseOut={(e) => Mask(e, 'Email')}
                                                required />
                                            <div className="validate"></div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 form-group mt-3 mt-md-0">
                                            <input type="password" className="form-control custom-input" name="senha" id="senha" placeholder="Sua senha"
                                                onChange={(e) => setUserData({ ...userData, senha: e.target.value })}
                                                required />
                                            <div className="validate"></div>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="loading" style={{ display: 'none' }}>Carregando</div>
                                        <div className="error-message" style={{ display: 'none', color: 'red' }}>Erro ao enviar a mensagem. Por favor, tente novamente.</div>
                                        <div className="sent-message" style={{ display: 'none', color: 'green' }}>Obrigada por ter enviado uma mensagem! Em breve, entraremos em contato.</div>
                                    </div>
                                    <div className="form-group mt-3 mt-md-0">
                                        <button type="submit" className="btn btn-danger">Entrar</button>
                                    </div>
                                </form>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function Cadastro(props) {
    const especialidade = ["cirurgia", "marketing", "veterinário", "clínico"];
    const [userData, setUserData] = useState({ nome: "", email: "", senha: "", confirm: false, tel: "", cpf: "", unidade: "", especialidade: especialidade[0], funcao: "" });
    const [unit, setUnit] = useState()
    const [unitNome, setUnitNome] = useState()
    const [estado, setEstado] = useState("ocioso")
    const reference = useRef(null)

    async function coletar() {
        if (props.user === "Funcionarios") {
            setEstado("carregando")
            fetch("http://localhost:3002/Unidades", { method: "GET", headers: { 'content-type': "application/json" } })
                .then((resp) => { return resp.json() })
                .then((resp) => {
                    const list = []
                    const listN = []
                    for (let item of resp) {
                        console.log(item)
                        list.push(item['unidade'])
                        listN.push(item['nome'])
                    }
                    setUnit(list)
                    setUnitNome(listN)
                    setEstado("ocioso")
                })
        }
    }

    useEffect(() => {
        coletar()
    }, [])

    function Mask(e, tipo) {
        if (e.target.value !== "") {
            let regex;
            let value = e.target.value;
            let resultado;

            if (e.key === "Enter" || e.key === undefined) {
                switch (tipo) {
                    case "Email":
                        regex = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)@([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)\.(com)$/;
                        resultado = regex.test(value);
                        break;
                    case "CPF":
                        if (cpfValidator(value)) {
                            setUserData((prevState) => ({ ...prevState, cpf: value }));
                        } else {
                            resultado = false;
                        }
                        break;
                    case "Telefone":
                        regex = /^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/;
                        resultado = regex.test(value);

                        if (e.target.value.length === 11) {
                            let numRegx = regex.exec(value);
                            let numero = `(${numRegx[1]}) ${numRegx[2]}-${numRegx[3]}`;
                            e.target.value = numero;
                            setUserData((prevState) => ({ ...prevState, tel: numero }));
                        } else if (/^\(\d{2}\) \d{5}-\d{4}$/.test(value)) {
                            resultado = true;
                        }
                        break;
                    default:
                        break;
                }
                if (resultado === false) {
                    e.target.style.color = "red";
                    e.target.value = `O campo ${tipo} está errado`;
                }
            }
        }
    }

    function Reset(e, tipo) {
        if (e.target.value === `O campo ${tipo} está errado`) {
            e.target.style.color = "black";
            e.target.value = "";
        }
    }

    async function EnviarData(id = "", tipo = "") {
        console.log(userData);
        if (!userData.confirm) {
            alert('Confirme a senha');
        } else if (userData.nome === "" || userData.email === "" || userData.tel === "" || userData.cpf === "") {
            alert("Ainda há campos sem os dados");
        } else if (props.user === "Funcionario" && (userData.funcao === "" || userData.unidade === "" || userData.especialidade === "")) {
            alert("Ainda há campos sem os dados");
        } else {
            console.log(userData);
            fetch('http://localhost:3002/' + props.user, {
                method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({
                    cpf: userData.cpf,
                    nome: userData.nome,
                    telefone: userData.tel,
                    senha: userData.senha,
                    email: userData.email,
                    especialidade: userData.especialidade,
                    unidade: userData.unidade,
                    funcao: userData.funcao
                })
            }).then((resp) => {
                return resp.json();
            }).then((resposta) => {
                alert("x");
                if (resposta.resp === "work") {
                    Autenticar(resposta.token);
                    window.location.href = "/";
                } else {
                    reference.current.focus()
                    reference.current.style.backgroundColor = "red";
                    reference.current.style.color = "white"
                    reference.current.innerText = 'cpf já existente'
                }
            });
        }
    }

    async function Atualizar(id = "", tipo = "") {
        console.log(userData);

        let cpf = userData.cpf === "" ? props.func.userInfo["cpf"] : userData.cpf;
        let nome = userData.nome === "" ? props.func.userInfo["nome"] : userData.nome;
        let tel = userData.tel === "" ? props.func.userInfo["telefone"] : userData.tel;
        let senha = userData.senha === "" ? props.func.userInfo["senha"] : userData.senha;
        let email = userData.email === "" ? props.func.userInfo["email"] : userData.email;
        let especialidade = userData.especialidade === "" ? props.func.userInfo["especialidade"] : userData.especialidade;
        let unidade = userData.unidade === "" ? props.func.userInfo["unidade"] : userData.unidade;
        let funcao = userData.funcao === "" ? props.func.userInfo["funcao"] : userData.funcao;
        console.log(cpf, nome, tel, senha, email, especialidade, unidade, funcao);

        fetch('http://localhost:3002/' + tipo + `/${id}`, {
            method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify({
                cpf: cpf,
                nome: nome,
                telefone: tel,
                senha: senha,
                email: email,
                especialidade: especialidade,
                unidade: unidade,
                funcao: funcao
            })
        }).then((resp) => {
            return resp.json();
        }).then((resposta) => {
            console.log(resposta);
        });
    }

    function isSenhaIgual(e) {
        e.target.style.color = "white"
        e.target.style.backgroundColor = "    "
        if (e.key === "Enter" || e.key === undefined) {
            if (e.target.value === userData.senha) {
                setUserData((prevState) => ({ ...prevState, confirm: true }));
            } else {
                setUserData((prevState) => ({ ...prevState, confirm: false }));
                e.target.value = "";
                e.target.placeholder = "Senha diferente";
            }
        } else {
            setUserData((prevState) => ({ ...prevState, confirm: false }));
        }
    }

    if (estado === "ocioso") {
        return (
            <>
                <section id="Cadastro" className="d-flex align-items-center" style={sectionStyle}>
                    <div className="container position-relative text-center text-lg-start" data-aos="zoom-in" data-aos-delay="100">
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <div ref={reference} />
                                <h1>Faça seu cadastro na <span>IBC</span></h1>
                                <section id="book-a-table" className="book-a-table">
                                    <div className="container" data-aos="fade-up">
                                        <form id="contact-form" className="php-email-form" data-aos="fade-up" data-aos-delay="100"
                                            onSubmit={(e) => { e.preventDefault(); EnviarData(); }}>
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6 form-group">
                                                    <input type="text" name="nome" className="form-control custom-input" id="nome" placeholder="Seu nome"
                                                        onChange={(e) => setUserData({ ...userData, nome: e.target.value })}
                                                        required />
                                                    <div className="validate"></div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 form-group mt-3 mt-md-0">
                                                    <input type="email" className="form-control custom-input" name="email" id="email" placeholder="Seu email"
                                                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                                        onKeyDown={(e) => Mask(e, 'Email')}
                                                        onMouseOut={(e) => Mask(e, 'Email')}
                                                        onClick={(e) => Reset(e, 'Email')}
                                                        required />
                                                    <div className="validate"></div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 form-group mt-3">
                                                    <input type="password" className="form-control custom-input" name="senha" id="senha" placeholder="Sua senha"
                                                        onChange={(e) => setUserData({ ...userData, senha: e.target.value })}
                                                        required />
                                                    <div className="validate"></div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 form-group mt-3">
                                                    <input type="password" className="form-control custom-input" name="confirmaSenha" id="confirmaSenha" placeholder="Confirme sua senha"
                                                        onKeyDown={(e) => { isSenhaIgual(e) }}
                                                        onMouseOut={(e) => { isSenhaIgual(e) }}
                                                        required />
                                                    <div className="validate"></div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 form-group mt-3">
                                                    <input type="text" maxLength={11} className="form-control custom-input" name="tel" id="tel" placeholder="Seu telefone"
                                                        onChange={(e) => setUserData({ ...userData, tel: e.target.value })}
                                                        onKeyDown={(e) => Mask(e, 'Telefone')}
                                                        onMouseOut={(e) => Mask(e, 'Telefone')}
                                                        onClick={(e) => Reset(e, 'Telefone')}
                                                        required />
                                                    <div className="validate"></div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 form-group mt-3">
                                                    <input type="text" className="form-control custom-input" name="cpf" id="cpf" placeholder="Seu CPF"
                                                        onChange={(e) => setUserData({ ...userData, cpf: e.target.value })}
                                                        onKeyDown={(e) => Mask(e, 'CPF')}
                                                        onMouseOut={(e) => Mask(e, 'CPF')}
                                                        onClick={(e) => Reset(e, 'CPF')}
                                                        required />
                                                    <div className="validate"></div>
                                                </div>
                                                {unit !== undefined ?
                                                    <>
                                                        {props.user === "Funcionarios" && (
                                                            <>
                                                                <div className="col-lg-6 col-md-6 form-group mt-3">
                                                                    <select className="form-control custom-input" name="especialidade" id="especialidade"
                                                                        onChange={(e) => setUserData({ ...userData, unidade: unit[e.target.selectedIndex] })}
                                                                        required>
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
                                                                        onChange={(e) => setUserData({ ...userData, especialidade: e.target.options[e.target.selectedIndex].innerText })}
                                                                        required>
                                                                        <option value={especialidade[0]}>{especialidade[0]}</option>
                                                                        <option value={especialidade[1]}>{especialidade[1]}</option>
                                                                        <option value={especialidade[2]}>{especialidade[2]}</option>
                                                                        <option value={especialidade[3]}>{especialidade[3]}</option>
                                                                    </select>
                                                                    <div className="validate"></div>
                                                                </div>
                                                                <div className="col-lg-6 col-md-6 form-group mt-3">
                                                                    <input type="text" className="form-control custom-input" name="funcao" id="funcao" placeholder="Função"
                                                                        onChange={(e) => setUserData({ ...userData, funcao: e.target.value })}
                                                                        required />
                                                                    <div className="validate"></div>
                                                                </div>
                                                            </>
                                                        )}
                                                    </>
                                                    : <></>}

                                            </div>
                                            <div className="mb-3">
                                                <div className="loading" style={{ display: 'none' }}>Carregando</div>
                                                <div className="error-message" style={{ display: 'none', color: 'red' }}>Erro ao enviar a mensagem. Por favor, tente novamente.</div>
                                                <div className="sent-message" style={{ display: 'none', color: 'green' }}>Obrigada por ter enviado uma mensagem! Em breve, entraremos em contato.</div>
                                            </div>
                                            <div className="form-group mt-3 mt-md-0">
                                                <button type="submit" className="btn btn-success">Cadastrar</button>
                                            </div>
                                        </form>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    } else {
        return (
            <Spinner />
        )
    }
}

export function AnimalForm(props) {
    const [animalData, setAnimalData] = useState({ nome: "", sexo: "Masculino", raca: "", especie: "" });
    const auth = CheckAuteticacao();
    const location = useLocation()
    let info;
    if (location.state !== undefined) {
        info = location.state
    }

    async function EnviarData(id = "", tipo = "") {
        console.log(animalData);
        if (animalData.nome === "" || animalData.raca === "" || animalData.especie === "") {
            alert("Ainda há campos sem os dados");
        } else {
            fetch('http://localhost:3002/Pacientes', {
                method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({
                    cpf: auth.cpf,
                    nome: animalData.nome,
                    sexo: animalData.sexo,
                    raca: animalData.raca,
                    especie: animalData.especie
                })
            }).then((resp) => {
                return resp.json();
            }).then((resposta) => {
                console.log(resposta);
                if (resposta.resp === "work") {
                    window.location.href = "/List";
                }
            });
        }
    }

    function Resetar(e) {
        if (e.target.value === "") {
            e.target.value = e.target.placeholder
        }

    }

    async function AtualizarData(id = "", tipo = "") {
        fetch(`http://localhost:3002/Pacientes/${info.userInfo['id']}`, {
            method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify({
                cpf: auth.cpf,
                nome: animalData.nome,
                sexo: animalData.sexo,
                raca: animalData.raca,
                especie: animalData.especie
            })
        }).then((resp) => {
            return resp.json();
        }).then((resposta) => {
            console.log(resposta);
            if (resposta.resp === "work") {
                window.location.href = "/List";
            }
        });
    }

    if (info.func === null) {
        return (
            <>
                <NavMenu position={""} margin={"-05%"} tipo={'lCA'} />
                <h1>Adicionar Pet</h1>
                <div style={formContainerStyle}>
                    <form className="form-container">
                        <div className="form-group">
                            <label htmlFor="formBasicEmail">Nome</label>
                            <input type="text" className="form-control custom-input"
                                onChange={(e) => { setAnimalData((prevState) => ({ ...prevState, nome: e.target.value })) }}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="formBasicEmail">Especie</label>
                            <input type="text" className="form-control custom-input"
                                onChange={(e) => { setAnimalData((prevState) => ({ ...prevState, especie: e.target.value })) }}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="formBasicEmail">Raça</label>
                            <input type="text" className="form-control custom-input"
                                onChange={(e) => { setAnimalData((prevState) => ({ ...prevState, raca: e.target.value })) }}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="formBasicEmail">Sexo</label>
                            <select className="form-control custom-input" onChange={(e) => { setAnimalData((prevState) => ({ ...prevState, sexo: e.target.options[e.target.selectedIndex].innerText })) }}>
                                <option value={"Masculino"}>Masculino</option>
                                <option value={"Feminino"}>Feminino</option>
                            </select>
                        </div>

                        <button type="button" className="btn btn-primary" onClick={() => { EnviarData() }}>
                            Adicionar
                        </button>
                    </form>
                </div>
            </>
        );
    } else {
        return (
            <>
                <NavMenu position={""} margin={"-05%"} tipo={'lCA'} />
                <h1>Atualizar Pet</h1>
                <div style={formContainerStyle}>
                    <form className="form-container">
                        <div className="form-group">
                            <label htmlFor="formBasicEmail">Nome</label>
                            <input type="text" className="form-control custom-input" placeholder={info.userInfo['nome']}
                                onClick={(e) => { Resetar(e) }}
                                onChange={(e) => { setAnimalData((prevState) => ({ ...prevState, nome: e.target.value })) }}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="formBasicEmail">Especie</label>
                            <input type="text" className="form-control custom-input" placeholder={info.userInfo['especie']}
                                onClick={(e) => { Resetar(e) }}
                                onChange={(e) => { setAnimalData((prevState) => ({ ...prevState, especie: e.target.value })) }}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="formBasicEmail">Raça</label>
                            <input type="text" className="form-control custom-input" placeholder={info.userInfo['raca']}
                                onClick={(e) => { Resetar(e) }}
                                onChange={(e) => { setAnimalData((prevState) => ({ ...prevState, raca: e.target.value })) }}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="formBasicEmail">Sexo</label>
                            <select className="form-control custom-input" onChange={(e) => { setAnimalData((prevState) => ({ ...prevState, sexo: e.target.options[e.target.selectedIndex].innerText })) }}>
                                <option value={"Masculino"}>Masculino</option>
                                <option value={"Feminino"}>Feminino</option>
                            </select>
                        </div>

                        <button type="button" className="btn btn-primary" onClick={() => { AtualizarData() }}>
                            Atualizar
                        </button>
                    </form>
                </div>
            </>
        );
    }
}

export function Atualizar(props) {
    const reference = useRef(null)
    const [unit, setUnit] = useState()
    const [unitNome, setUnitNome] = useState()
    const [estado, setEstado] = useState("ocioso")
    const especialidade = ["cirurgia", "marketing", "veterinário", "clínico"];
    const [userData, setUserData] = useState({ nome: "", email: "", senha: "", confirm: false, tel: "", cpf: "", unidade: "", especialidade: especialidade[0], funcao: "" });


    async function coletar() {
        if (props.user === "Funcionarios") {
            setEstado("carregando")
            fetch("http://localhost:3002/Unidades", { method: "GET", headers: { 'content-type': "application/json" } })
                .then((resp) => { return resp.json() })
                .then((resp) => {
                    const list = []
                    const listN = []
                    for (let item of resp) {
                        console.log(item)
                        list.push(item['unidade'])
                        listN.push(item['nome'])
                    }
                    setUnit(list)
                    setUnitNome(listN)
                    setEstado("ocioso")
                })
        }
    }

    useEffect(() => {
        coletar()
    }, [])


    function Mask(e, tipo) {
        if (e.target.value !== "") {
            let regex;
            let value = e.target.value;
            let resultado;

            if (e.key === "Enter" || e.key === undefined) {
                switch (tipo) {
                    case "Email":
                        regex = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)@([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)\.(com)$/;
                        resultado = regex.test(value);
                        break;
                    case "CPF":
                        if (cpfValidator(value)) {
                            setUserData((prevState) => ({ ...prevState, cpf: value }));
                        } else {
                            resultado = false;
                        }
                        break;
                    case "Telefone":
                        regex = /^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/;
                        resultado = regex.test(value);

                        if (e.target.value.length === 11) {
                            let numRegx = regex.exec(value);
                            let numero = `(${numRegx[1]}) ${numRegx[2]}-${numRegx[3]}`;
                            e.target.value = numero;
                            setUserData((prevState) => ({ ...prevState, tel: numero }));
                        } else if (/^\(\d{2}\) \d{5}-\d{4}$/.test(value)) {
                            resultado = true;
                        }
                        break;
                    default:
                        break;
                }
                if (resultado === false) {
                    e.target.style.color = "red";
                    e.target.value = `O campo ${tipo} está errado`;
                }
            }
        }
    }

    function Reset(e, tipo) {
        if (e.target.value === `O campo ${tipo} está errado`) {
            e.target.style.color = "black";
            e.target.value = "";
            return
        } else if (e.target.value === "") {
            e.target.value = e.target.placeholder
        }

    }

    async function AtualizarData() {
        console.log(userData)

        let cpf = userData.cpf === "" ? props.func["cpf"] : userData.cpf;
        let nome = userData.nome === "" ? props.func["nome"] : userData.nome;
        let tel = userData.tel === "" ? props.func["telefone"] : userData.tel;
        let senha = userData.senha === "" ? props.func["senha"] : userData.senha;
        let email = userData.email === "" ? props.func["email"] : userData.email;
        let especialidadeP = userData.especialidade === "" ? props.func["especialidade"] : userData.especialidade;
        let unidade;
        let auth = CheckAuteticacao()

        if (unit) {
            unidade = userData.unidade === "" ? unit[0] : userData.unidade;
        }
        let funcao = userData.funcao === "" ? props.func["funcao"] : userData.funcao;
        console.log(cpf, nome, tel, senha, email, especialidade, unidade, funcao);

        fetch(`http://localhost:3002/${props.user}/${props.func.cpf}`, {
            method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify({
                cpf: cpf,
                nome: nome,
                telefone: tel,
                senha: senha,
                email: email,
                especialidade: especialidadeP,
                unidade: unidade,
                funcao: funcao
            })
        }).then((resp) => {
            return resp.json();
        }).then((resposta) => {
            console.log(resposta);
            if (auth.Conta === "funcionario") {
                window.location.href = "/List"
            } else {
                window.location.href = "/profile"
            }
        });
    }
    return (
        <>
            <section id="Cadastro" className="d-flex align-items-center" style={sectionStyle}>
                <div className="container position-relative text-center text-lg-start" data-aos="zoom-in" data-aos-delay="100">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div ref={reference} />
                            <h1>Formulário de atualização</h1>
                            <section id="book-a-table" className="book-a-table">
                                <div className="container" data-aos="fade-up">
                                    <form id="contact-form" className="php-email-form" data-aos="fade-up" data-aos-delay="100"
                                        onSubmit={(e) => { e.preventDefault(); AtualizarData(); }}>
                                        {props.user !== 'Pacientes' ?
                                            <>
                                                <div className="row">
                                                    <div className="col-lg-6 col-md-6 form-group">
                                                        <input type="text" name="nome" className="form-control custom-input" id="nome" placeholder={props.func.nome}
                                                            onChange={(e) => setUserData({ ...userData, nome: e.target.value })}
                                                            onClick={(e) => Reset(e)}
                                                        />
                                                        <div className="validate"></div>
                                                    </div>

                                                    <div className="col-lg-6 col-md-6 form-group mt-3 mt-md-0">
                                                        <input type="email" className="form-control custom-input" name="email" id="email" placeholder={props.func.email}
                                                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                                            onKeyDown={(e) => Mask(e, 'Email')}
                                                            onMouseOut={(e) => Mask(e, 'Email')}
                                                            onClick={(e) => Reset(e, 'Email')}
                                                        />
                                                        <div className="validate"></div>
                                                    </div>

                                                    <div className="col-lg-6 col-md-6 form-group mt-3">
                                                        <input type="password" className="form-control custom-input" name="senha" id="senha" placeholder={props.func.senha}
                                                            onChange={(e) => setUserData({ ...userData, senha: e.target.value })}
                                                            onClick={(e) => Reset(e)}
                                                        />
                                                        <div className="validate"></div>
                                                    </div>

                                                    <div className="col-lg-6 col-md-6 form-group mt-3">
                                                        <input type="text" maxLength={11} className="form-control custom-input" name="tel" id="tel" placeholder={props.func.telefone}
                                                            onChange={(e) => setUserData({ ...userData, tel: e.target.value })}
                                                            onKeyDown={(e) => Mask(e, 'Telefone')}
                                                            onMouseOut={(e) => Mask(e, 'Telefone')}
                                                            onClick={(e) => Reset(e, 'Telefone')}
                                                        />
                                                        <div className="validate"></div>
                                                    </div>
                                                    {unit !== undefined ?
                                                        <>
                                                            {props.user === "Funcionarios" && (
                                                                <>
                                                                    <div className="col-lg-6 col-md-6 form-group mt-3">
                                                                        <select className="form-control custom-input" name="unidade" id="unidade"
                                                                            onChange={(e) => { setUserData({ ...userData, unidade: unit[e.target.selectedIndex] }) }}
                                                                        >
                                                                            {unitNome.map((unidade) => {
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
                                                                            onChange={(e) => setUserData({ ...userData, especialidade: e.target.options[e.target.selectedIndex].innerText })}
                                                                        >
                                                                            <option value={especialidade[0]}>{especialidade[0]}</option>
                                                                            <option value={especialidade[1]}>{especialidade[1]}</option>
                                                                            <option value={especialidade[2]}>{especialidade[2]}</option>
                                                                            <option value={especialidade[3]}>{especialidade[3]}</option>
                                                                        </select>
                                                                        <div className="validate"></div>
                                                                    </div>
                                                                    <div className="col-lg-6 col-md-6 form-group mt-3">
                                                                        <input type="text" className="form-control custom-input" name="funcao" id="funcao" placeholder={props.func.funcao}
                                                                            onChange={(e) => setUserData({ ...userData, funcao: e.target.value })}
                                                                            onClick={(e) => Reset(e)}
                                                                        />
                                                                        <div className="validate"></div>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </>
                                                        : <></>}

                                                </div>
                                                <div className="mb-3">
                                                    <div className="loading" style={{ display: 'none' }}>Carregando</div>
                                                    <div className="error-message" style={{ display: 'none', color: 'red' }}>Erro ao enviar a mensagem. Por favor, tente novamente.</div>
                                                    <div className="sent-message" style={{ display: 'none', color: 'green' }}>Obrigada por ter enviado uma mensagem! Em breve, entraremos em contato.</div>
                                                </div>
                                                <div className="form-group mt-3 mt-md-0">
                                                    <button type="submit" className="btn btn-success">Atualizar</button>

                                                </div>
                                            </>
                                            : null

                                        }
                                    </form>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

/*

<section id="book-a-table" className="book-a-table">
                                <div className="container" data-aos="fade-up">
                                    <form id="contact-form" className="php-email-form" data-aos="fade-up" data-aos-delay="100"
                                        onSubmit={(e) => { e.preventDefault(); EnviarData(); }}>
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6 form-group">
                                                <input type="text" name="nome" className="form-control custom-input" id="nome" placeholder="Seu nome"
                                                    onChange={(e) => setUserData({ ...userData, nome: e.target.value })}
                                                    required />
                                                <div className="validate"></div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 form-group mt-3 mt-md-0">
                                                <input type="email" className="form-control custom-input" name="email" id="email" placeholder="Seu email"
                                                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                                    onKeyDown={(e) => Mask(e, 'Email')}
                                                    onMouseOut={(e) => Mask(e, 'Email')}
                                                    onClick={(e)=>Reset(e,'Email')}
                                                    required />
                                                <div className="validate"></div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 form-group mt-3">
                                                <input type="password" className="form-control custom-input" name="senha" id="senha" placeholder="Sua senha"
                                                    onChange={(e) => setUserData({ ...userData, senha: e.target.value })}
                                                    required />
                                                <div className="validate"></div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 form-group mt-3">
                                                <input type="password" className="form-control custom-input" name="confirmaSenha" id="confirmaSenha" placeholder="Confirme sua senha"
                                                    onKeyDown={(e) => { isSenhaIgual(e) }}
                                                    onMouseOut={(e) => { isSenhaIgual(e) }}
                                                    required />
                                                <div className="validate"></div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 form-group mt-3">
                                                <input type="text" maxLength={11} className="form-control custom-input" name="tel" id="tel" placeholder="Seu telefone"
                                                    onChange={(e) => setUserData({ ...userData, tel: e.target.value })}
                                                    onKeyDown={(e) => Mask(e, 'Telefone')}
                                                    onMouseOut={(e) => Mask(e, 'Telefone')}
                                                    onClick={(e) => Reset(e, 'Telefone')}
                                                    required />
                                                <div className="validate"></div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 form-group mt-3">
                                                <input type="text" className="form-control custom-input" name="cpf" id="cpf" placeholder="Seu CPF"
                                                    onChange={(e) => setUserData({ ...userData, cpf: e.target.value })}
                                                    onKeyDown={(e) => Mask(e, 'CPF')}
                                                    onMouseOut={(e) => Mask(e, 'CPF')}
                                                    onClick={(e)=>Reset(e,'CPF')}
                                                    required />
                                                <div className="validate"></div>
                                            </div>
                                            {unit !== undefined ?
                                                <>
                                                    {props.user === "Funcionarios" && (
                                                        <>
                                                            <div className="col-lg-6 col-md-6 form-group mt-3">
                                                                <select className="form-control custom-input" name="especialidade" id="especialidade"
                                                                    onChange={(e) => setUserData({ ...userData, unidade: e.target.options[e.target.selectedIndex].innerText })}
                                                                    required>
                                                                    {unit.map((unidade) => {
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
                                                                    onChange={(e) => setUserData({ ...userData, especialidade: e.target.options[e.target.selectedIndex].innerText })}
                                                                    required>
                                                                    <option value={especialidade[0]}>{especialidade[0]}</option>
                                                                    <option value={especialidade[1]}>{especialidade[1]}</option>
                                                                    <option value={especialidade[2]}>{especialidade[2]}</option>
                                                                    <option value={especialidade[3]}>{especialidade[3]}</option>
                                                                </select>
                                                                <div className="validate"></div>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 form-group mt-3">
                                                                <input type="text" className="form-control custom-input" name="funcao" id="funcao" placeholder="Função"
                                                                    onChange={(e) => setUserData({ ...userData, funcao: e.target.value })}
                                                                    required />
                                                                <div className="validate"></div>
                                                            </div>
                                                        </>
                                                    )}
                                                </>
                                                : <></>}

                                        </div>
                                        <div className="mb-3">
                                            <div className="loading" style={{ display: 'none' }}>Carregando</div>
                                            <div className="error-message" style={{ display: 'none', color: 'red' }}>Erro ao enviar a mensagem. Por favor, tente novamente.</div>
                                            <div className="sent-message" style={{ display: 'none', color: 'green' }}>Obrigada por ter enviado uma mensagem! Em breve, entraremos em contato.</div>
                                        </div>
                                        <div className="form-group mt-3 mt-md-0">
                                            <button type="submit" className="btn btn-success">Cadastrar</button>
                                        </div>
                                    </form>
                                </div>
                            </section>

*/