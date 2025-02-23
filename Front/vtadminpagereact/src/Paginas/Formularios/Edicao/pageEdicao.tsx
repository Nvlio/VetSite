import React, { useEffect, useRef, useState } from "react";
import { Card, Row, Form, FloatingLabel, Col, Button, Image } from "react-bootstrap";
import EdicaoControll from "./edicaoControll";
import LoginController from "../Cadastro/Controller";

const estilo = {
    border: "1px solid gray"
}

//pagina com formulario de edição
export default function EditarForm(props: { selectedLista: any }) {
    const { profileData, inputRef, imagem, AddIMG, changedata, Editar, HandleDrop, HandleFileChange, HandleDragOver, HandleClick } = EdicaoControll()
    const { uf, municipio, setUfSelected, setData } = LoginController()

    return (
        <div style={{ margin: "1% 2%" }}>
            <Card>
                <Row><h1>Editar dados do perfil</h1></Row>
            </Card>
            <br />
            <Card style={{ padding: "2%" }}>
                <Row style={{ justifyContent: "center" }}>
                    <h4>Foto do perfil</h4>
                    <div onClick={HandleClick} onDragOver={HandleDragOver} onDrop={HandleDrop} id="clicavel" style={{ border: "1px solid black", borderRadius: "100%", height: "25vh", width: "16%", alignContent: "center" }}>
                        {!imagem ?
                            <h3>Perfil</h3>
                            :
                            <Image src={imagem} height={186} width={180} style={{ objectFit: "cover", marginLeft: "-8%", marginTop: "-2px", borderRadius: "100px", objectPosition: "top" }} />
                        }
                        <input
                            type="file"
                            ref={inputRef}
                            style={{ display: "none" }}
                            onChange={HandleFileChange}
                        />
                    </div>
                </Row>
            </Card>
            <br />
            <Card style={{ paddingTop: "2%" }}>
                <Card.Title>Dados Pessoais</Card.Title>
                <Row style={{ margin: "1% 2%" }}>
                    <Form.Group controlId="nome">
                        <FloatingLabel controlId="nome" label="Nome">
                            <Form.Control
                                style={estilo}
                                type="text"
                                maxLength={255}
                                onChange={changedata}
                                value={profileData.nome}
                            />
                        </FloatingLabel>
                    </Form.Group>
                </Row>
                <Col>
                    <Row style={{ margin: "1% 2%" }}>
                        <Form.Group controlId="email" style={{ width: "50%" }}>
                            <FloatingLabel controlId="email" label="email">
                                <Form.Control
                                    style={estilo}
                                    type="text"
                                    maxLength={255}
                                    onChange={changedata}
                                    value={profileData.email}
                                />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group controlId="telefone" style={{ width: "50%" }}>
                            <FloatingLabel controlId="telefone" label="telefone">
                                <Form.Control
                                    style={estilo}
                                    type="text"
                                    maxLength={255}
                                    onChange={changedata}
                                    value={profileData.telefone}
                                />
                            </FloatingLabel>
                        </Form.Group>
                    </Row>
                </Col>
                <Row style={{ margin: "1% 2%" }}>
                    <Form.Group controlId="especialidade">
                        <FloatingLabel controlId="especialidade" label="especialidade">
                            <Form.Control
                                style={estilo}
                                type="text"
                                maxLength={255}
                                onChange={changedata}
                                value={profileData.especialidade}
                            />
                        </FloatingLabel>
                    </Form.Group>
                </Row>

                <br />
            </Card>
            <br />
            <Card style={{ paddingTop: "2%" }}>
                <Card.Title>Endereço</Card.Title>
                <Row style={{ margin: "1% 2%" }}>
                    <Form.Group controlId="endereco" style={{ width: "33.5%" }}>
                        <FloatingLabel controlId="endereco" label="rua">
                            <Form.Control
                                style={estilo}
                                type="text"
                                maxLength={255}
                                onChange={changedata}
                                value={profileData.endereco}
                            />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group controlId="numero" style={{ width: "30%" }}>
                        <FloatingLabel controlId="numero" label="numero">
                            <Form.Control
                                style={estilo}
                                type="text"
                                maxLength={255}
                                onChange={changedata}
                                value={profileData.numero}
                            />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group controlId="bairro" style={{ width: "36.5%" }}>
                        <FloatingLabel controlId="bairro" label="bairro">
                            <Form.Control
                                style={estilo}
                                type="text"
                                maxLength={255}
                                onChange={changedata}
                                value={profileData.bairro}
                            />
                        </FloatingLabel>
                    </Form.Group>
                </Row>
                <Row style={{ margin: "1% 2%" }}>
                    <Form.Group controlId="estado" style={{ width: "50%" }}>
                        <FloatingLabel controlId="estado" label="estado">
                            <Form.Select
                                style={{ border: "1px solid black" }}
                                required
                                onChange={(e) => {
                                    setUfSelected(e.target.value)
                                    changedata(e)
                                }}

                            >
                                <option selected value={""}>nenhum</option>
                                {uf?.map((estado) => {
                                    return (
                                        <option value={estado.id}>{estado.sigla}</option>
                                    )
                                })}
                            </Form.Select>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group controlId="cidade" style={{ width: "50%" }}>
                        <FloatingLabel controlId="cidade" label="cidade">
                            <Form.Select
                                style={{ border: "1px solid black" }}
                                required
                                onChange={changedata}>
                                <option selected value={""}>nenhum</option>
                                {municipio?.map((cidade) => {
                                    return (
                                        <option value={cidade.id}>{cidade.nome}</option>
                                    )
                                })}
                            </Form.Select>
                        </FloatingLabel>
                    </Form.Group>
                </Row>
                <Row style={{ margin: "1% 2%" }}>
                    <Form.Group controlId="cep">
                        <FloatingLabel controlId="cep" label="cep">
                            <Form.Control
                                style={estilo}
                                type="text"
                                maxLength={255}
                                onChange={changedata}
                                value={profileData.cep}
                            />
                        </FloatingLabel>
                    </Form.Group>
                </Row>
            </Card>
            <Card style={{ marginTop: "2%", padding: "2%", width: "100%", alignItems: "end" }}>
                <Row>
                    <div style={{ display: "flex", width: "120%", height: "50px", gap: "20px" }}>
                        <Button onClick={(e) => {
                            Editar();
                            window.location.reload()
                        }} style={{ width: "120px" }} variant="primary" >Editar</Button>
                        <Button onClick={() => { props.selectedLista("perfil") }} style={{ width: "120px" }} variant="danger">Cancelar</Button>
                    </div>

                </Row>
            </Card>
        </div>
    )
}