import React, { useEffect } from "react";
import ControllerFormularioAdição from "./controller";
import CadastroController from "../Cadastro/Controller";
import { Button, Card, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import APISGet from "./APISController";
import { CheckAuteticacao } from "../../../nFuncoes/auntenticar";

export default function PacienteForm() {
    const auth = CheckAuteticacao()
    const {
        formData,
        unidades,
        errors,
        setTable,
        onChange,
        setFormData,
        Adicionar
    } = ControllerFormularioAdição()

    const {
        uf,
        municipio,
        setUfSelected,
    } = CadastroController()

    const {
        especies, racas,
        GetAnimalsSpecie,
        GetAnimalsRaca

    } = APISGet()

    useEffect(() => { GetAnimalsSpecie(); setTable("Pacientes") }, [])


    return (
        <div style={{ width: "150%", marginLeft: "-25%", marginTop: "-15%" }}>
            <Form.Control type="hidden" name="id" value={formData.id}></Form.Control>
            <Card className="mb-3 border-0 p-3">
                <Card.Body>
                    <Card.Title style={{ fontFamily: "-moz-initial", fontSize: "30px", fontWeight: "bold" }} className="text-start">Informações do PET</Card.Title>
                    <Card.Text style={{ fontFamily: "-moz-initial", fontSize: "20px" }} className="text-start">Dados Basicos</Card.Text>
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
                            <FloatingLabel label="Sexo" className="mb-3" >
                                <Form.Select
                                    style={{ border: "1px solid black" }}
                                    required
                                    onChange={(e) => {
                                        setUfSelected(e.target.value)
                                        setFormData((prev) => ({ ...prev, estado: e.target.selectedOptions[0].innerHTML }))
                                    }}

                                >
                                    <option selected value={""}>escolha</option>
                                    <option value={"Masculino"}>Masculino</option>
                                    <option value={"Feminino"}>Feminino</option>

                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <FloatingLabel label="Porte" className="mb-3" >
                                <Form.Select
                                    style={{ border: "1px solid black" }}
                                    required
                                    onChange={(e) => {
                                        setUfSelected(e.target.value)
                                        setFormData((prev) => ({ ...prev, estado: e.target.selectedOptions[0].innerHTML }))
                                    }}

                                >
                                    <option selected value={""}>escolha</option>
                                    <option value={"Grande"}>Grande</option>
                                    <option value={"Medio"}>Medio</option>
                                    <option value={"Pequeno"}>Pequeno</option>

                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <FloatingLabel label="Especie" className="mb-3" >
                                <Form.Select
                                    style={{ border: "1px solid black" }}
                                    required
                                    onChange={(e) => {
                                        GetAnimalsRaca(e.target.value)
                                        setFormData((prev) => ({ ...prev, especie: e.target.value }))
                                    }}

                                >
                                    <option selected value={""}>escolha</option>
                                    {especies?.map((especie) => {
                                        return (
                                            <option value={especie.id}>{especie.nome}</option>
                                        )
                                    })}

                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <FloatingLabel label="Raças" className="mb-3" >
                                <Form.Select
                                    style={{ border: "1px solid black" }}
                                    required
                                    onChange={(e) => {
                                        setFormData((prev) => ({ ...prev, raca: e.target.value }))
                                    }}

                                >
                                    <option selected value={""}>escolha</option>
                                    {racas?.map((raca) => {
                                        return (
                                            <option value={raca.id}>{raca.nome}</option>
                                        )
                                    })}

                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <br />
                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId="data">
                                <FloatingLabel controlId="data" label="data de nascimento">
                                    <Form.Control
                                        type="date"
                                        name="data"
                                        value={formData.data}
                                        onChange={onChange}
                                        placeholder="data de nascimento"
                                    />
                                </FloatingLabel>
                            </Form.Group>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <br />
            {auth.Conta === "funcionario" ?
                <>
                    <Card className="mb-3 border-0 p-3">
                        <Card.Body>
                            <Card.Title style={{ fontFamily: "-moz-initial", fontSize: "30px", fontWeight: "bold" }} className="text-start">Informações extras</Card.Title>
                            <Card.Text style={{ fontFamily: "-moz-initial", fontSize: "20px" }} className="text-start">Reservado para funcionarios deixar oculto pra cliente</Card.Text>
                            <Row className="mb-3">
                                <Col>
                                    <Form.Group controlId="comportamento">
                                        <FloatingLabel controlId="comportamento" label="comportamento">
                                            <Form.Control
                                                style={{ height: "200px" }}
                                                as="textarea"
                                                name="comportamento"
                                                rows={4}
                                                value={formData.comportamento}
                                                onChange={onChange}
                                                placeholder="Escreva o comportamento do animal."
                                            />
                                        </FloatingLabel>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col>
                                    <Form.Group controlId="pedigree">
                                        <FloatingLabel controlId="pedigree" label="Pedigree do animal">
                                            <Form.Control
                                                type="text"
                                                name="pedigree"
                                                value={formData.pedigree}
                                                onChange={onChange}
                                                placeholder="pedigree"
                                            />
                                        </FloatingLabel>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col>
                                    <Form.Group controlId="porte">
                                        <FloatingLabel controlId="porte" label="porte do animal">
                                            <Form.Control
                                                type="text"
                                                name="porte"
                                                value={formData.porte}
                                                onChange={onChange}
                                                placeholder="porte"
                                            />
                                        </FloatingLabel>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col>
                                    <Form.Group controlId="pelo">
                                        <FloatingLabel controlId="pelo" label="pelo do animal">
                                            <Form.Control
                                                type="text"
                                                name="pelo"
                                                value={formData.pelo}
                                                onChange={onChange}
                                                placeholder="pelo"
                                            />
                                        </FloatingLabel>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="cor1">
                                        <FloatingLabel controlId="cor1" label="cor mais predominante">
                                            <Form.Control
                                                type="text"
                                                name="cor1"
                                                value={formData.cor1}
                                                onChange={onChange}
                                                placeholder="cor1"
                                            />
                                        </FloatingLabel>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="cor2">
                                        <FloatingLabel controlId="cor2" label="Outra cor observavel">
                                            <Form.Control
                                                type="text"
                                                name="cor2"
                                                value={formData.cor2}
                                                onChange={onChange}
                                                placeholder="cor2"
                                            />
                                        </FloatingLabel>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col>
                                    <Form.Group controlId="alergia">
                                        <FloatingLabel controlId="alergia" label="alergia do animal">
                                            <Form.Control
                                                type="text"
                                                name="alergia"
                                                value={formData.alergia}
                                                onChange={onChange}
                                                placeholder="alergia"
                                            />
                                        </FloatingLabel>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="reacao">
                                        <FloatingLabel controlId="reacao" label="reacao alergica">
                                            <Form.Control
                                                type="text"
                                                name="reacao"
                                                value={formData.reacao}
                                                onChange={onChange}
                                                placeholder="reacao"
                                            />
                                        </FloatingLabel>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col>
                                    <Form.Group controlId="observacao">
                                        <FloatingLabel controlId="observacao" label="observacao">
                                            <Form.Control
                                                style={{ height: "200px" }}
                                                as="textarea"
                                                name="observacao"
                                                rows={4}
                                                value={formData.observacao}
                                                onChange={onChange}
                                                placeholder="Escreva o observacao sobre o animal."
                                            />
                                        </FloatingLabel>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <Button variant="success" onClick={Adicionar}>Adicionar</Button>
                </>
                : null}
            <br />
        </div>
    )
}