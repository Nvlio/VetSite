import React, { useEffect } from "react";
import ControllerFormularioAdição from "./controller";
import CadastroController from "../Cadastro/Controller";
import { Button, Card, Col, FloatingLabel, Form, Row } from "react-bootstrap";

export default function UnidadeForm() {

    const {
        formData,
        unidades,
        errors,
        Adicionar,
        setTable,
        onChange,
        setFormData
    } = ControllerFormularioAdição()
    const {
        uf,
        municipio,
        setUfSelected,
    } = CadastroController()

    useEffect(() => {  setTable("Unidades") }, [])

    return (
        <div style={{ width: "150%", marginLeft: "-25%", marginTop: "-15%" }}>
            <Form.Control type="hidden" name="id" value={formData.id}></Form.Control>
            <Card className="mb-3 border-0 p-3">
                <Card.Body>
                    <Card.Title style={{ fontFamily: "-moz-initial", fontSize: "30px", fontWeight: "bold" }} className="text-start">Informações de unidade</Card.Title>
                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId="nome">
                                <FloatingLabel controlId="nome" label="Nome">
                                    <Form.Control
                                        type="text"
                                        name="nome"
                                        value={formData.nome}
                                        onChange={onChange}
                                        placeholder="Digite o nome"
                                    />
                                </FloatingLabel>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="telefone">
                                <FloatingLabel controlId="telefone" label="Telefone">
                                    <Form.Control
                                        type="text"
                                        name="telefone"
                                        value={formData.telefone}
                                        onChange={onChange}
                                        placeholder="Digite o Telefone"
                                    />
                                </FloatingLabel>
                            </Form.Group>
                        </Col>
                    </Row>
                    <br />
                </Card.Body>
            </Card>
            <br />
            <Card className="mb-3 border-0 p-3">
                <Card.Body>
                    <Card.Title style={{ fontFamily: "-moz-initial", fontSize: "30px", fontWeight: "bold" }} className="text-start">Endereço</Card.Title>
                    <Card.Text style={{ fontFamily: "-moz-initial", fontSize: "20px" }} className="text-start">Dados Complementares</Card.Text>
                    <Row>
                        <Col>
                            <Form.Group controlId="CEP">
                                <FloatingLabel controlId="CEP" label="CEP">
                                    <Form.Control
                                        type="text"
                                        name="cep"
                                        value={formData.cep}
                                        onChange={onChange}
                                        placeholder="Digite o CEP"
                                    />
                                </FloatingLabel>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="rua">
                                <FloatingLabel controlId="rua" label="Rua">
                                    <Form.Control
                                        type="text"
                                        name="rua"
                                        value={formData.rua}
                                        onChange={onChange}
                                        placeholder="Digite o Rua"
                                    />
                                </FloatingLabel>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="numero">
                                <FloatingLabel controlId="numero" label="Numero">
                                    <Form.Control
                                        type="text"
                                        name="numero"
                                        value={formData.numero}
                                        onChange={onChange}
                                        placeholder="Digite o numero"
                                    />
                                </FloatingLabel>
                            </Form.Group>
                        </Col>
                    </Row>
                    <br /><br />
                    <Row>
                        <Col>
                            <Form.Group controlId="bairro">
                                <FloatingLabel controlId="bairro" label="Bairro">
                                    <Form.Control
                                        type="text"
                                        name="bairro"
                                        value={formData.bairro}
                                        onChange={onChange}
                                        placeholder="Digite o bairro"
                                    />
                                </FloatingLabel>
                            </Form.Group>

                        </Col>
                        <Col>
                            <FloatingLabel label="Estado" className="mb-3" >
                                <Form.Select
                                    style={{ border: "1px solid black" }}
                                    required
                                    onChange={(e) => {
                                        setUfSelected(e.target.value)
                                        setFormData((prev) => ({ ...prev, estado: e.target.selectedOptions[0].innerHTML }))
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
                        </Col>
                        <Col>
                            {/* Campo de Usuário Estado */}
                            <FloatingLabel label="Cidade" className="mb-3">
                                <Form.Select
                                    style={{ border: "1px solid black" }}
                                    required
                                    onChange={e => setFormData((prev) => ({ ...prev, cidade: e.target.selectedOptions[0].innerHTML }))}
                                >
                                    <option selected value={""}>nenhum</option>
                                    {municipio?.map((cidade) => {
                                        return (
                                            <option value={cidade.id}>{cidade.nome}</option>
                                        )
                                    })}
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <Button variant="success" onClick={Adicionar}>Adicionar</Button>
        </div>
    )
}