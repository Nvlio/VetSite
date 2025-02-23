import React, { useContext, useEffect, useState } from "react";
import img from "../public/Profile.jpg"
import { Contexto } from "../Contexto";
import LayoutMain from "./Layout";
import ProfileMiniPage from "../NMiniPages/ProfilePage.jsx";
import { CheckAuteticacao } from "../../nFuncoes/auntenticar.js";
import { Button, Card, Col, Image, Row, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import GET from "../../nFuncoes/GET.ts";
import setImg from "../../Funcoes/CreateUrl.ts";
import { Link } from "react-router-dom";

//Fazer a função que pega a imagem de perfil foto e le a imagem

//componente que tem a pagina de perfil do usuario
export default function PerfilComp(props: { selectedLista: any }) {
    const auth = CheckAuteticacao()
    const [user, setUser] = useState<any>({})
    const [link, setLink] = useState()

    useEffect(() => {
        Coletar()
    }, [])

    const Coletar = async () => {
        const resposta = await GET(`http://localhost:3002/${auth.Conta}s/${auth.cpf}/null`)
        console.log(resposta)
        setUser(resposta[0] ? resposta[0] : resposta)
    }

    const GetLink = async () => {
        await setImg({ 0: { 0: { file: user.image, imagem: user.nomeArquivo.split(".")[1] } } }, setLink)
    }

    useEffect(() => {
        console.log(user)
        if(user && user.nome){
            GetLink()
        }
    }, [user])

    useEffect(()=>{
        console.log(link)
    },[Link])

    return (
        <div style={{ height: "100vh", width: "100%" }}>
            <Card style={{ width: "97%", height: "10vh", padding: "10px", margin: "2% 2%" }}>
                <h1>Informações do perfil</h1>
            </Card>

            <div style={{ display: "flex", marginTop: "5%" }}>

                <Card style={{ width: "40%", height: "55vh", padding: "10px", margin: "2% 2%" }}>
                    <Image src={link?link:"https://img.freepik.com/fotos-gratis/retrato-de-homem-sorridente-com-olhos-azuis-profundos_8353-1193.jpg"} style={{ objectFit: "cover", border: "1px solid black", borderRadius: "100px", height: "28vh", width: "66%", margin: "-14% 14%" }} />
                    <div style={{ marginTop: "18%" }}>
                        <h4>{user.nome}</h4>
                    </div>
                    <div style={{ display: "block", marginTop: "10%" }}>
                        <Button style={{ width: "100%", height: "8vh", paddingTop: "10px" }} onClick={() => { props.selectedLista("editar") }} variant="outline-warning" >Editar</Button>
                        <br />
                        <Button style={{ width: "100%", height: "8vh", marginTop: "10px", paddingTop: "10px" }} onClick={() => { Deletar() }} variant="outline-danger">Excluir</Button>
                    </div>
                </Card>

                <Card style={{ width: "97%", height: "55vh", paddingTop: "2%", margin: "2% 2%" }}>
                    <Row>
                        <h4>Informação pessoal</h4>
                        <Col style={{ backgroundColor: "#f0f0f0", margin: "0% 7%", borderRadius: "10px", padding: "1% 2%", justifyItems: "start", }}>
                            <h5>CPF:{user.cpf}</h5>
                            <h5>Especialidade:{user.especialidade}</h5>
                            <h5 style={{ marginBottom: "2%" }}>Função:{user.funcao}</h5>
                            <h6>Endereço:{`${user.endereco} ${user.numero}, ${user.bairro}`}</h6>
                            <h6>{user.cidade}/{user.estado}</h6>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <h4>Contato</h4>
                        <Col style={{ backgroundColor: "#f0f0f0", margin: "0% 7%", borderRadius: "10px", padding: "1% 2%", justifyItems: "start", }}>
                            <h5>Email:{user.email}</h5>
                            <h5>Telefone:{user.telefone}</h5>
                        </Col>
                    </Row>
                </Card>

            </div>
        </div>
    )
}




// //pagina que estrutura a pagina de profile do usuario
// export default function ProfileMain() {
//     const { tamanhoJanela } = useContext(Contexto)
//     const auth = CheckAuteticacao()

//     useEffect(() => {
//         if (!auth) {
//             window.location.href = "/Login"
//         }
//     }, [])

//     return (
//         <div>
//             <div className={tamanhoJanela.width >= '1509' ? "ImgBG" : "ImgBGCell"} style={{ backgroundImage: `url(${img})` }} >
//                 <LayoutMain>
//                     <ProfileMiniPage />
//                 </LayoutMain>
//             </div>

//         </div>
//     )
// }