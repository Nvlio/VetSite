import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import "../CSS/Crescer.css"


export function Tabela(props) {
    let [grow, setGrow] = useState({
        backGround: {
            width: '0px',
            height: '0px',
            opacity: '0%',
            margin: "0% 50%"
        },
        rest: {
            opacity: '0%'
        }
    })
    const style = { transition: 'all 0.5s ease-in-out' }

    useEffect(() => {
        setGrow({
            backGround: {
                width: '1404.5px',
                height: '570px',
                opacity: '40%',
                margin: "-10% -17%"
            },
            rest: {
                opacity: '100%'
            }
        })
    }, [])

    return (
        <>
            <div style={{ ...style, opacity: grow.backGround.opacity, width: grow.backGround.width, height: grow.backGround.height, margin: grow.backGround.margin, backgroundColor: "black", position: 'absolute', }}></div>
            <div style={{ display: 'flex', marginTop: '-40%', color: "white", position: 'relative', fontSize: '0px', ...style, opacity: grow.rest.opacity }}>
                <div style={{ width: "1000px", paddingBottom: "70px" }}>
                    <h1 >Bem vindo a CãoXonado</h1>
                    <h3>Onde o amor, a cura e a dedicação se encontram pelo seu pet!</h3>
                    <div style={{ paddingLeft: "25%" }}>
                        <Button variant="outline-warning">Agendar</Button>{' '}
                        <Button variant="outline-warning">Resultado Exames</Button>{' '}
                    </div>
                </div>
                <div style={{ paddingLeft: "10%", textAlign: 'center' }}>
                    <Button variant="outline-warning">Play</Button>{' '}
                </div>
            </div>

        </>
    )
}

export function TabelaLista(props) {
    let [grow, setGrow] = useState({
        backGround: {
            width: '0px',
            height: '0px',
            opacity: '0%',
            margin: "0% 50%"
        },
        rest: {
            opacity: '0%'
        }
    })
    const style = { transition: 'all 0.5s ease-in-out' }

    useEffect(() => {
        setGrow({
            backGround: {
                width: '1404.5px',
                height: '570px',
                opacity: '40%',
                margin: "-10% -17%"
            },
            rest: {
                opacity: '100%'
            }
        })
    }, [])

    return (
        <>
            <div style={{ ...style, opacity: grow.backGround.opacity, width: grow.backGround.width, height: grow.backGround.height, margin: grow.backGround.margin, backgroundColor: "black", position: 'absolute', }}></div>
            <div style={{ display: 'flex', color: "white", position: 'relative', ...style, opacity: grow.rest.opacity, marginLeft: "10%", marginTop: "10%" }}>
                <div style={{ width: "700px", paddingBottom: "70px" }}>
                    <h1>A Clínica Veterinária CãoXonado</h1>
                    <h5>
                        Acreditamos firmemente que os animais de estimação são membros especiais das famílias, trazendo consigo uma incrível dose de alegria, amor e companheirismo.
                    </h5>

                    <ul>
                        <li>
                            Nosso compromisso é garantir o bem-estar do seu pet, reconhecendo que sua felicidade e saúde beneficiam toda a família, através de cuidados excepcionais dedicados a eles.
                        </li>
                        <li>
                            Nossa equipe é apaixonada e altamente especializada, oferecendo serviços veterinários de excelência, desde consultas preventivas até tratamentos avançados, com máximo cuidado e expertise para atender às necessidades do seu pet.
                        </li>
                        <li>
                            Valorizamos sua relação com seu animal de estimação, buscando promover interação e cuidado mútuo, oferecendo orientações e recursos para momentos especiais juntos.
                        </li>
                    </ul>
                    <h5>
                        Portanto, pode contar conosco para garantir a saúde, o bem-estar e a felicidade do seu animal de estimação. Estamos comprometidos em proporcionar uma experiência excepcional, 
                        onde você e seu pet se sintam verdadeiramente acolhidos, respeitados e cuidados em todas as etapas do tratamento veterinário.
                    </h5>

                </div>
                <div>
                    <img src={require("../public/about.jpg")} alt="Imagem da clínica" height={'70%'} width={'80%'} />
                </div>
            </div >

        </>
    )
}