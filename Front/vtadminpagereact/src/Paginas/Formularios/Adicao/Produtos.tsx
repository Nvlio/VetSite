import React, { useEffect } from "react";
import ControllerFormularioAdição from "./controller";
import CadastroController from "../Cadastro/Controller";
import { Button, Card, Col, FloatingLabel, Form, Row } from "react-bootstrap";

export default function ProdutoForm() {
    const {
        formData,
        unidades,
        errors,
        onChange,
        setTable,
        Adicionar,
        setFormData,
        ConfigurarFoto
    } = ControllerFormularioAdição()
    const {
        uf,
        municipio,
        setUfSelected,
    } = CadastroController()

    useEffect(() => { setTable("Produtos") }, [])

    return (
        <div style={{ width: "150%", marginLeft: "-25%", marginTop: "-15%" }}>
            <Form.Control type="hidden" name="id" value={formData.id}></Form.Control>
            <Card className="mb-3 border-0 p-3">
                <Card.Body>
                    <Card.Title style={{ fontFamily: "-moz-initial", fontSize: "30px", fontWeight: "bold" }} className="text-start">Informações do Funcionário</Card.Title>
                    <Card.Text style={{ fontFamily: "-moz-initial", fontSize: "20px" }} className="text-start">Dados Pessoais</Card.Text>
                    <Row className="mb-3">
                        <Col>
                            <input required type="file" multiple name="foto" onChange={ConfigurarFoto} />
                        </Col>
                    </Row>

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
                            <Form.Group controlId="valor">
                                <FloatingLabel controlId="valor" label="valor">
                                    <Form.Control
                                        type="text"
                                        name="valor"
                                        value={formData.valor}
                                        onChange={onChange}
                                        placeholder="Digite o Valor do produto"
                                    />
                                </FloatingLabel>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="quantidade">
                                <FloatingLabel controlId="quantidade" label="quantidade">
                                    <Form.Control
                                        type="text"
                                        name="quantidade"
                                        value={formData.quantidade}
                                        onChange={onChange}
                                        placeholder="Digite a quantidade disponivel"
                                    />
                                </FloatingLabel>
                            </Form.Group>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <FloatingLabel label="Categoria" className="mb-3" >
                                <Form.Select
                                    style={{ border: "1px solid black" }}
                                    required
                                    onChange={(e) => {
                                        setFormData((prev) => ({ ...prev, categoria: e.target.selectedOptions[0].innerHTML }))
                                    }}

                                >
                                    <option selected value={""}>nenhum</option>
                                    <option  value={"alimento"}>Alimento</option>
                                    <option  value={"brinquedo"}>Brinquedo</option>
                                    <option  value={"higiene"}>Higiene</option>
                                    <option  value={"remedio"}>Remedio</option>

                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <br /><br />
                    <Row>
                        <Col>
                            <Form.Group controlId="fornecedor">
                                <FloatingLabel controlId="fornecedor" label="fornecedor">
                                    <Form.Control
                                        type="text"
                                        name="fornecedor"
                                        value={formData.fornecedor}
                                        onChange={onChange}
                                        placeholder="Digite o nome do fornecedor"
                                    />
                                </FloatingLabel>
                            </Form.Group>
                        </Col>
                    </Row>
                    <br /><br />
                    <Row>
                        <Col>
                            <Form.Group controlId="descricao">
                                <FloatingLabel controlId="descricao" label="descricao">
                                    <Form.Control
                                        style={{ height: "200px" }}
                                        as="textarea"
                                        name="descricao"
                                        rows={4}
                                        value={formData.descricao}
                                        onChange={onChange}
                                        placeholder="Escreva a descricao"
                                    />
                                </FloatingLabel>
                            </Form.Group>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <br />
            <Button variant="success" onClick={Adicionar}>Adicionar</Button>
        </div>
    )
}