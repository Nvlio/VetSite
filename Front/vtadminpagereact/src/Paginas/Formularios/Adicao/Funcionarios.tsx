import React, { useEffect } from "react";
import { Card, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import ControllerFormularioAdição from "./controller";
import CadastroController from "../Cadastro/Controller";

export default function FormularioFuncionarios(props) {
    const {
        formData,
        unidades,
        errors,
        onChange,
        setFormData
    } = ControllerFormularioAdição()
    const {
        uf,
        municipio,
        setUfSelected,
    } = CadastroController()


    return (
        <div style={{ width: "150%", marginLeft: "-25%", marginTop: "-15%" }}>
            <Form.Control type="hidden" name="id" value={formData.id}></Form.Control>
            <Card className="mb-3 border-0 p-3">
                <Card.Body>
                    <Card.Title style={{ fontFamily: "-moz-initial", fontSize: "30px", fontWeight: "bold" }} className="text-start">Informações do Funcionário</Card.Title>
                    <Card.Text style={{ fontFamily: "-moz-initial", fontSize: "20px" }} className="text-start">Dados Pessoais</Card.Text>
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
                            <Form.Group controlId="cpf">
                                <FloatingLabel controlId="cpf" label="CPF">
                                    <Form.Control
                                        type="text"
                                        name="cpf"
                                        value={formData.cpf}
                                        onChange={onChange}
                                        placeholder="Digite o CPF"
                                    />
                                </FloatingLabel>
                            </Form.Group>
                        </Col>
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
                    <br /><br />
                    <Row>
                        <Col>
                            <Form.Group controlId="email">
                                <FloatingLabel controlId="email" label="Email">
                                    <Form.Control
                                        type="text"
                                        name="email"
                                        value={formData.email}
                                        onChange={onChange}
                                        placeholder="Digite o Email"
                                    />
                                </FloatingLabel>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="senha">
                                <FloatingLabel controlId="senha" label="Senha">
                                    <Form.Control
                                        type="password"
                                        name="senha"
                                        value={formData.senha}
                                        onChange={onChange}
                                        placeholder="Digite o senha"
                                    />
                                </FloatingLabel>
                            </Form.Group>
                        </Col>
                    </Row>
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
            <br />
            <Card className="mb-3 border-0 p-3">
                <Card.Body>
                    <Card.Title style={{ fontFamily: "-moz-initial", fontSize: "30px", fontWeight: "bold" }} className="text-start">Parceria com nossa Empresa</Card.Title>
                    <Card.Text style={{ fontFamily: "-moz-initial", fontSize: "20px" }} className="text-start">Vínculo Trabalhista</Card.Text>
                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId="funcao">
                                <FloatingLabel controlId="funcao" label="Função">
                                    <Form.Control
                                        as="select"
                                        name="funcao"
                                        value={formData.funcao}
                                        onChange={(e)=>{setFormData((prev) => ({ ...prev, estado: e.target.selectedOptions[0].innerHTML }))}}
                                    >
                                        <option>Selecione...</option>
                                        <option>Médico</option>
                                        <option>Limpeza</option>
                                        <option>Segurança</option>
                                        <option>Recepcionista</option>
                                        <option>Enfermeira</option>
                                        <option>Banho e Tosa</option>
                                    </Form.Control>
                                </FloatingLabel>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="especialidade">
                                <FloatingLabel controlId="especialidade" label="Especialidade">
                                    <Form.Control
                                        as="select"
                                        name="especialidade"
                                        value={formData.especialidade}
                                        onChange={()=>{setFormData((prev) => ({ ...prev, estado: e.target.selectedOptions[0].innerHTML }))}}
                                    >
                                        <option>Selecione...</option>
                                        <option>Cães e Gatos</option>
                                        <option>Silvestres</option>
                                        <option>Selvagens</option>
                                    </Form.Control>
                                </FloatingLabel>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="salario">
                                <FloatingLabel controlId="salario" label="Salario">
                                    <Form.Control
                                        type="number"
                                        name="salario"
                                        value={formData.salario}
                                        onChange={onChange}
                                        placeholder="Digite o salario"
                                    />
                                </FloatingLabel>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="unidade">
                                <FloatingLabel controlId="unidade" label="Unidade">
                                    <Form.Control
                                        as="select"
                                        name="unidade"
                                        value={formData.especialidade}
                                        onChange={()=>{setFormData((prev) => ({ ...prev, estado: e.target.selectedOptions[0].innerHTML }))}}
                                    >
                                        {unidades.map((unidade) => {
                                            return (

                                                <option key={unidade.id}>{unidade.nome}</option>
                                            )
                                        })}
                                    </Form.Control>
                                </FloatingLabel>
                            </Form.Group>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    )
}