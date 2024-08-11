import { useRef, useState } from 'react';
import { cpfValidator } from 'cpf-validator-ianan';
import { Autenticar, CheckAuteticacao } from '../nFuncoes/auntenticar.js';
import NavMenu from './nav';
import '../CSS/Crescer.css'; // Importando o CSS

export function AddFormComponente(props) {

    const [userData, setUserData] = useState({ nome: "", valor: "", validade: "", quantidade: "", fornecedor: "", endereco: "", telefone: "" });

    function Reset(e, tipo) {
        let valor;
        if (e.target.value === `O campo ${tipo} está errado`) {
            e.target.style.color = "black";
            e.target.value = "";
            return
        } else if (e.target.value === "") {
            console.log(tipo)
            e.target.value = e.target.placeholder
        }

    }

    function Mask(e, tipo) {
        let regex;
        let value = e.target.value;
        let resultado;

        if (e.key === "Enter" || e.key === undefined) {

            regex = /^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/;
            resultado = regex.test(value);

            if (e.target.value.length === 11) {
                let numRegx = regex.exec(value);
                let numero = `(${numRegx[1]}) ${numRegx[2]}-${numRegx[3]}`;
                e.target.value = numero;
                setUserData((prevState) => ({ ...prevState, telefone: numero }));
            } else if (/^\(\d{2}\) \d{5}-\d{4}$/.test(value)) {
                resultado = true;
            }
        }

    }

    async function EnviarData(id = "", tipo = "") {
        if (props.tipo === "Produtos" && (userData.nome === "" || userData.valor === "" || userData.validade === "" || userData.quantidade === "" || userData.fornecedor === "")) {
            alert("Ainda há campos sem os dados");
        } else if (props.user === "Funcionario" && (userData.nome === "" || userData.endereco === "" || userData.telefone === "")) {
            alert("Ainda há campos sem os dados");
        } else {
            fetch('http://localhost:3002/' + props.tipo, {
                method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({
                    nome: userData.nome,
                    valor: userData.valor,
                    validade: userData.validade,
                    quantidade: userData.quantidade,
                    fornecedor: userData.fornecedor,
                    endereco: userData.endereco,
                    telefone: userData.telefone
                })
            }).then((resp) => {
                return resp.json();
            }).then((resposta) => {
                if (resposta.status === 200) {
                    window.location.href = "/List";
                }
            });
        }

    }

    async function Atualizar(id = "", tipo = "") {
        console.log(userData);
        fetch(`http://localhost:3002/${props.tipo}/${props.tipo === "Produtos" ? props.user['id'] : props.user['unidade']}`, {
            method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify({
                nome: userData.nome,
                valor: userData.valor,
                validade: userData.validade,
                quantidade: userData.quantidade,
                fornecedor: userData.fornecedor,
                endereco: userData.endereco,
                telefone: userData.telefone
            })
        }).then((resp) => {
            return resp.json();
        }).then((resposta) => {
            console.log(resposta);
            window.location.href = "/List";
        });
    }

    if (props.user === undefined) {
        return (
            <section id="Cadastro" className="d-flex align-items-center">
                <div className="container position-relative text-center text-lg-start" data-aos="zoom-in" data-aos-delay="100">
                    <div className="row">
                        <div className="col-lg-8">
                            <h1>Adicionar <span>{props.tipo}</span></h1>
                            <section id="book-a-table" className="book-a-table">
                                <div className="container" data-aos="fade-up">
                                    <form id="contact-form" className="php-email-form" data-aos="fade-up" data-aos-delay="100"
                                        onSubmit={(e) => { e.preventDefault(); EnviarData(); }}>
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6 form-group">
                                                <a style={{ color: 'white' }}>Nome do item</a>
                                                <input type="text" name="nome" className="form-control" id="nome" placeholder="Nome do item"
                                                    onChange={(e) => setUserData({ ...userData, nome: e.target.value })}
                                                    required />
                                                <div className="validate"></div>
                                            </div>
                                            {props.tipo === "Produtos" ?
                                                <>
                                                    <div className="col-lg-6 col-md-6 form-group mt-3 mt-md-0">
                                                        <a style={{ color: 'white' }}>Valor do produto</a>
                                                        <input type="number" className="form-control" name="valor" id="valor" placeholder="Valor do produto"
                                                            onChange={(e) => setUserData({ ...userData, valor: e.target.value })}
                                                            required />
                                                        <div className="validate"></div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 form-group mt-3 mt-md-0">
                                                        <a style={{ color: 'white' }}>Validade do produto</a>
                                                        <input type="date" className="form-control" name="validade" id="validade" placeholder="validade do produto"
                                                            onChange={(e) => setUserData({ ...userData, validade: e.target.value })}
                                                            required />
                                                        <div className="validate"></div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 form-group mt-3 mt-md-0">
                                                        <a style={{ color: 'white' }}>quantidade do produto</a>
                                                        <input type="number" className="form-control" name="quantidade" id="quantidade" placeholder="quantidade"
                                                            onChange={(e) => setUserData({ ...userData, quantidade: e.target.value })}
                                                            required />
                                                        <div className="validate"></div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 form-group mt-3 mt-md-0">
                                                        <a style={{ color: 'white' }}>fornecedor do produto</a>
                                                        <input type="text" className="form-control" name="fornecedor" id="fornecedor" placeholder="fornecedor"
                                                            onChange={(e) => setUserData({ ...userData, fornecedor: e.target.value })}
                                                            required />
                                                        <div className="validate"></div>
                                                    </div>
                                                </>
                                                :
                                                <>
                                                    <div className="col-lg-6 col-md-6 form-group mt-3 mt-md-0">
                                                        <a style={{ color: 'white' }}>Endereço da unidade</a>
                                                        <input type="text" className="form-control" name="valor" id="valor" placeholder="bairro-rua,numero-subBairro-cidade-estado-CEP"
                                                            onChange={(e) => setUserData({ ...userData, endereco: e.target.value })}
                                                            required />
                                                        <div className="validate"></div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 form-group mt-3">
                                                        <input type="text" className="form-control" maxLength={11} name="tel" id="tel" placeholder="Seu telefone"
                                                            onChange={(e) => setUserData({ ...userData, telefone: e.target.value })}
                                                            onKeyDown={(e) => Mask(e, 'Telefone')}
                                                            onMouseOut={(e) => Mask(e, 'Telefone')}
                                                            required />
                                                        <div className="validate"></div>
                                                    </div>
                                                </>
                                            }
                                        </div>
                                        <div className="mb-3">
                                            <div className="loading" style={{ display: 'none' }}>Carregando</div>
                                            <div className="error-message" style={{ display: 'none', color: 'red' }}>Erro ao enviar a mensagem. Por favor, tente novamente.</div>
                                            <div className="sent-message" style={{ display: 'none', color: 'green' }}>Obrigada por ter enviado uma mensagem! Em breve, entraremos em contato.</div>
                                        </div>
                                        <div className="col-lg-3 col-md-3 form-group mt-3 mt-md-0">
                                            <button type="submit" style={{ backgroundColor: '#4a6e22' }}>Adicionar</button>
                                        </div>
                                    </form>
                                </div>
                            </section>
                        </div>
                        <div className="col-lg-4 d-flex align-items-center justify-content-center position-relative" data-aos="zoom-in" data-aos-delay="200">
                            <a href="https://youtu.be/IXoNOqyJYdk" className="glightbox play-btn" aria-label="Play video"></a>
                        </div>
                    </div>
                </div>
            </section>
        );
    } else {
        return (
            <section id="Cadastro" className="d-flex align-items-center">
                <div className="container position-relative text-center text-lg-start" data-aos="zoom-in" data-aos-delay="100">
                    <div className="row">
                        <div className="col-lg-8">
                            <h1>Atualizar <span>{props.tipo}</span></h1>
                            <section id="book-a-table" className="book-a-table">
                                <div className="container" data-aos="fade-up">
                                    <form id="contact-form" className="php-email-form" data-aos="fade-up" data-aos-delay="100"
                                        onSubmit={(e) => { e.preventDefault(); Atualizar(); }}>
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6 form-group">
                                                <a style={{ color: 'white' }}>Nome do item</a>
                                                <input type="text" name="nome" className="form-control" id="nome" placeholder={props.user['nome']}
                                                    onClick={(e) => { Reset(e) }}
                                                    onChange={(e) => setUserData({ ...userData, nome: e.target.value })}
                                                />
                                                <div className="validate"></div>
                                            </div>
                                            {props.tipo === "Produtos" ?
                                                <>
                                                    <div className="col-lg-6 col-md-6 form-group mt-3 mt-md-0">
                                                        <a style={{ color: 'white' }}>Valor do produto</a>
                                                        <input type="number" className="form-control" name="valor" id="valor" placeholder={props.user['valor']}
                                                            onClick={(e)=>{Reset(e)}}
                                                            onChange={(e) => setUserData({ ...userData, valor: e.target.value })}
                                                        />
                                                        <div className="validate"></div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 form-group mt-3 mt-md-0">
                                                        <a style={{ color: 'white' }}>quantidade do produto</a>
                                                        <input type="number" className="form-control" name="quantidade" id="quantidade" placeholder={props.user['quantidade']}
                                                            onClick={(e)=>{Reset(e)}}
                                                            onChange={(e) => setUserData({ ...userData, quantidade: e.target.value })}
                                                        />
                                                        <div className="validate"></div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 form-group mt-3 mt-md-0">
                                                        <a style={{ color: 'white' }}>fornecedor do produto</a>
                                                        <input type="text" className="form-control" name="fornecedor" id="fornecedor" placeholder={props.user['fornecedor']}
                                                            onClick={(e)=>{Reset(e)}}
                                                            onChange={(e) => setUserData({ ...userData, fornecedor: e.target.value })}
                                                        />
                                                        <div className="validate"></div>
                                                    </div>
                                                </>
                                                :
                                                <>
                                                    <div className="col-lg-6 col-md-6 form-group mt-3 mt-md-0">
                                                        <a style={{ color: 'white' }}>Endereço da unidade</a>
                                                        <input type="text" className="form-control" name="valor" id="valor" placeholder={props.user['endereco']}
                                                            onClick={(e)=>{Reset(e)}}
                                                            onChange={(e) => setUserData({ ...userData, endereco: e.target.value })}
                                                        />
                                                        <div className="validate"></div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 form-group mt-3">
                                                        <input type="text" className="form-control" maxLength={11} name="tel" id="tel" placeholder={props.user['telefone']}
                                                            onChange={(e) => setUserData({ ...userData, telefone: e.target.value })}
                                                            onKeyDown={(e) => Mask(e, 'Telefone')}
                                                            onClick={(e)=>{Reset(e)}}
                                                            onMouseOut={(e) => Mask(e, 'Telefone')}
                                                        />
                                                        <div className="validate"></div>
                                                    </div>
                                                </>
                                            }
                                        </div>
                                        <div className="mb-3">
                                            <div className="loading" style={{ display: 'none' }}>Carregando</div>
                                            <div className="error-message" style={{ display: 'none', color: 'red' }}>Erro ao enviar a mensagem. Por favor, tente novamente.</div>
                                            <div className="sent-message" style={{ display: 'none', color: 'green' }}>Obrigada por ter enviado uma mensagem! Em breve, entraremos em contato.</div>
                                        </div>
                                        <div className="col-lg-3 col-md-3 form-group mt-3 mt-md-0">
                                            <button type="submit" style={{ backgroundColor: '#4a6e22' }}>Atualizar</button>
                                        </div>
                                    </form>
                                </div>
                            </section>
                        </div>
                        <div className="col-lg-4 d-flex align-items-center justify-content-center position-relative" data-aos="zoom-in" data-aos-delay="200">
                            <a href="https://youtu.be/IXoNOqyJYdk" className="glightbox play-btn" aria-label="Play video"></a>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}