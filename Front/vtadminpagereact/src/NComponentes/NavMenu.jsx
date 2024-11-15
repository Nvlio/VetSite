import React, { useEffect, useState } from "react";
import { CheckAuteticacao, LogOut } from "../nFuncoes/auntenticar";
import "../bootstrap/css/normalize.css";
import "../bootstrap/css/style.css";
import "../bootstrap/css/vendor.css";
import "../CSS/Proprio.css";
import '../CSS/swiper-bundle.min.css';

//CSS
import "../bootstrap/assets/vendor/animate.css/animate.min.css"
import "../bootstrap/assets/vendor/aos/aos.css"
import "../bootstrap/assets/vendor/bootstrap/css/bootstrap.min.css"
import "../bootstrap/assets/vendor/bootstrap-icons/bootstrap-icons.css"
import "../bootstrap/assets/vendor/boxicons/css/boxicons.min.css"
import "../bootstrap/assets/vendor/glightbox/css/glightbox.min.css"
import "../bootstrap/assets/vendor/swiper/swiper-bundle.min.css"
import "../bootstrap/assets/css/style.css"
import CarrinhoProduto from "../nFuncoes/carrinho";


//componente voltado ao navmenu do site
export default function NavMenuBarComp(props) {
    const auth = CheckAuteticacao();//coleta a autenticação do usuario
    const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar se o menu está aberto
    const [tamanhoJanela, setTamanhoJanela] = useState({ widht: "", height: "" })
    const [carrinhoCompra, setCarrinho] = useState([])
    const carrinho = new CarrinhoProduto()


    async function Coletar() {
        const itens = await carrinho.Coletar()
        setCarrinho(itens)
    }


    /*
    coleta e seta o valor o tamanho da tela do navegador ao iniciar o site
    */
    useEffect(() => {
        Coletar()
        const WindowSizeHandler = () => {
            setTamanhoJanela({
                widht: window.innerWidth,
                height: window.innerHeight
            })
        }

        window.addEventListener("resize", WindowSizeHandler);
        return () => {
            window.removeEventListener("resize", WindowSizeHandler);
        }
        Coletar()
    }, [])

    useEffect(() => { console.log(carrinhoCompra) }, [carrinhoCompra])



    // Função para alternar o estado do menu
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    //vai retornar um menu contendo todas as opções junto com os links para cada area do site
    //cliente|funcionario estando logado adiciona novas areas para ele acessar
    return (
        <>
            <div className={`offcanvas-menu`} style={{ display: menuOpen ? "" : "none" }}>
                <div className="Button" onClick={toggleMenu}>×</div>
                <nav id="navbar" className="navbar order-last order-lg-0">
                    <ul>
                        <li><a className="nav-link scrollto active" href="/">Home</a></li>
                        <li className="dropdown" ><a href="/"><span>Clínica</span> <i className="bi bi-chevron-down"></i></a>
                            <ul id={tamanhoJanela.widht <= 600 ? "cellphone" : ""}>
                                <li><a href="/">Sobre</a></li>
                                <li><a href="/">Missão</a></li>
                                <li><a href="/">Valores</a></li>
                            </ul>
                        </li>
                        <li className="dropdown"><a href="/"><span>Serviços</span> <i className="bi bi-chevron-down"></i></a>
                            <ul id={tamanhoJanela.widht <= 600 ? "cellphone" : ""}>
                                <li className="dropdown"><a href="/">Exames <i className="bi bi-chevron-right"></i></a>
                                    <ul>
                                        <li><a href="/">Audimetria e Otoscopia</a></li>
                                        <li><a href="/">Cardiológicos</a></li>
                                        <li><a href="/">Endoscópicos</a></li>
                                        <li><a href="/">Hormonais</a></li>
                                        <li><a href="/">Imagems</a></li>
                                        <li><a href="/">Laboratoriais</a></li>
                                        <li><a href="/">Neurológicos</a></li>
                                        <li><a href="/">Respiratórios</a></li>
                                    </ul>
                                </li>
                                <li><a href="/">Especialidades</a></li>
                                <li className="dropdown"><a href="/">Pequenos <i className="bi bi-chevron-right"></i></a>
                                    <ul>
                                        <li><a href="/">Clínica Médica de Cachorros</a></li>
                                        <li><a href="/">Clínica Médica de Gatos</a></li>
                                        <li><a href="/">Clínica Cirúrgica de Cachorros</a></li>
                                        <li><a href="/">Clínica Cirúrgica de Gatos</a></li>
                                    </ul>
                                </li>
                                <li className="dropdown"><a href="/">Silvestres<i className="bi bi-chevron-right"></i></a>
                                    <ul>
                                        <li><a href="/">Aves</a></li>
                                        <li><a href="/">Primatas</a></li>
                                        <li><a href="/">Répteis</a></li>
                                        <li><a href="/">Anfíbios</a></li>
                                        <li><a href="/">Lagomorfos</a></li>
                                        <li><a href="/">Roedores</a></li>
                                        <li><a href="/">Peixes</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li><a className="nav-link scrollto" href="/events">Localização</a></li>
                        <li><a className="nav-link scrollto" href="/chefs">Equipe</a></li>
                        <li><a className="nav-link scrollto" href="/gallery">Depoimento</a></li>
                        <li><a className="nav-link scrollto" href="/contact">Contato</a></li>
                        <li><a className="nav-link scrollto" href="/Blog">Blog</a></li>
                        <li><a className="nav-link scrollto" href="/Produtos">Produtos</a></li>
                        {auth ?
                            <>
                                <li><a className="nav-link scrollto" href="Profile">Conta</a></li>
                                <li><a className="nav-link scrollto" href="Lista">Lista</a></li>
                                {carrinhoCompra.length !== 0 ?
                                    <li><a className="nav-link scrollto" href="Comprar">Finalizar Compra</a></li>
                                    : null}
                            </>
                            : null}
                        {auth === false ?
                            <li><a href="/Login" className="nav-link scrollto" id="login">Login</a></li>
                            :
                            <li><a onClick={() => { LogOut() }} className="nav-link scrollto" id="login">Sair</a></li>
                        }
                    </ul>
                </nav>


            </div>

            <div className="Menu">
                <div id="topbar" className="d-flex align-items-center fixed-top">
                    <div className="container d-flex justify-content-center justify-content-md-between">
                        {props.extra ?
                            null
                            :
                            <div className="contact-info d-flex align-items-center" style={{ width: "40%" }}>
                                <i className="bi bi-phone d-flex align-items-center"><span>+55 (19) 3395-0058</span></i>
                                <i className="bi bi-clock d-flex align-items-center ms-4"><span> Atendimento 24H</span></i>
                            </div>
                        }
                        <div style={{ width: "50%" }} />
                        <div className="languages d-none d-md-flex align-items-center">
                            <ul>
                                <li>PT</li>
                                <li><a href="/">BR</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <header id="header" className="fixed-top d-flex align-items-center ">
                    <div className="container-fluid container-xl d-flex align-items-center justify-content-lg-between">
                        <div style={{ width: "10%" }}>
                            <h1 className="logo me-auto me-lg-0"><img src={require("../public/Logo.png")} width="70px" height="100%" alt="Logo" /></h1>
                        </div>

                        <nav id="navbar" className="navbar order-last order-lg-0 " >
                            <ul>
                                <li><a className="nav-link scrollto active" href="/">Home</a></li>
                                <li className="dropdown"><a href="/"><span>Clínica</span> <i className="bi bi-chevron-down"></i></a>
                                    <ul>
                                        <li><a href="/">Sobre</a></li>
                                        <li><a href="/">Missão</a></li>
                                        <li><a href="/">Valores</a></li>
                                    </ul>
                                </li>
                                <li className="dropdown"><a href="/"><span>Serviços</span> <i className="bi bi-chevron-down"></i></a>
                                    <ul>
                                        <li className="dropdown"><a href="/">Exames <i className="bi bi-chevron-right"></i></a>
                                            <ul>
                                                <li><a href="/">Audimetria e Otoscopia</a></li>
                                                <li><a href="/">Cardiológicos</a></li>
                                                <li><a href="/">Endoscópicos</a></li>
                                                <li><a href="/">Hormonais</a></li>
                                                <li><a href="/">Imagems</a></li>
                                                <li><a href="/">Laboratoriais</a></li>
                                                <li><a href="/">Neurológicos</a></li>
                                                <li><a href="/">Respiratórios</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="/">Especialidades</a></li>
                                        {auth.Conta==="funcionario"?<li><a href="/Contas">Financeiro</a></li>:null}
                                        <li className="dropdown"><a href="/">Pequenos <i className="bi bi-chevron-right"></i></a>
                                            <ul>
                                                <li><a href="/">Clínica Médica de Cachorros</a></li>
                                                <li><a href="/">Clínica Médica de Gatos</a></li>
                                                <li><a href="/">Clínica Cirúrgica de Cachorros</a></li>
                                                <li><a href="/">Clínica Cirúrgica de Gatos</a></li>
                                            </ul>
                                        </li>
                                        <li className="dropdown"><a href="/">Silvestres<i className="bi bi-chevron-right"></i></a>
                                            <ul>
                                                <li><a href="/">Aves</a></li>
                                                <li><a href="/">Primatas</a></li>
                                                <li><a href="/">Répteis</a></li>
                                                <li><a href="/">Anfíbios</a></li>
                                                <li><a href="/">Lagomorfos</a></li>
                                                <li><a href="/">Roedores</a></li>
                                                <li><a href="/">Peixes</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li><a className="nav-link scrollto" href="/events">Localização</a></li>
                                <li><a className="nav-link scrollto" href="/chefs">Equipe</a></li>
                                <li><a className="nav-link scrollto" href="/gallery">Depoimento</a></li>
                                <li><a className="nav-link scrollto" href="/contact">Contato</a></li>
                                <li><a className="nav-link scrollto" href="/Blog">Blog</a></li>
                                <li><a className="nav-link scrollto" href="/Produtos">Produtos</a></li>
                                {auth ?
                                    <>
                                        <li><a className="nav-link scrollto" href="Profile">Conta</a></li>
                                        <li><a className="nav-link scrollto" href="Lista">Lista</a></li>
                                        {carrinhoCompra.length !== 0 ?
                                            <li><a className="nav-link scrollto" href="Comprar">Finalizar Compra</a></li>
                                            : null}
                                    </>
                                    : null}
                            </ul>
                        </nav>
                        <div style={{ width: "80%" }} />
                        <i className="bi bi-list mobile-nav-toggle" onClick={toggleMenu}></i>
                        {auth === false ? <div className="Flex">
                            <a href="/Login" className="book-a-table-btn scrollto d-none d-lg-flex">Login</a>
                            <a href="/" className="book-a-table-btn scrollto d-none d-lg-flex">Ligue Agora</a>
                        </div> :
                            <a onClick={() => { LogOut() }} className="book-a-table-btn scrollto d-none d-lg-flex" id="clicavel">Sair</a>
                        }
                    </div>
                </header>
            </div>
        </>
    );
}