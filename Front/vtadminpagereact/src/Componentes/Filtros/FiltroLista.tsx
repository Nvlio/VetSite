import React from "react";
import { Card, Col, FloatingLabel, Row, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

//componente com os filtros da lista especifica
export function FiltroComponente(props) {
    console.log(props.lista==="Clientes")
    return (
        <div style={{ margin: "2% 1%" }}>
            <Card style={{ padding: "1%" }}>
                <Row style={{ display: "flex", alignSelf: "flex-start" }}>
                    <p style={{ fontFamily: "serif", fontWeight: "bold", fontSize: "20px" }}>Filtro de {props.lista}</p>
                </Row>
                <Row>
                    {/* filtro para qualuqer um menos vendas */}
                    {props.lista !== "Vendas" ?
                        <Col>
                            <Form.Group controlId="Nome">
                                <FloatingLabel controlId="Nome" label={`Nome ${props.lista.substring(0, props.lista.length - 1)}`}>
                                    <Form.Control
                                        type="text"
                                        name="nome"
                                        style={{ border: "1px solid black" }}
                                        value={props.filtro.nome}
                                        className="borderBlack"
                                        onChange={(e) => { props.filtrar((prev) => ({ ...prev, nome: e.target.value })) }}
                                    />
                                </FloatingLabel>
                            </Form.Group>
                        </Col> : null}
                    {/* filtro para funcionarios */}
                    {props.lista === "Funcionarios" ?
                        <>
                            <Col>
                                <Form.Group controlId="especialidade">
                                    <FloatingLabel controlId="especialidade" label={`especialidade`}>
                                        <Form.Control
                                            type="text"
                                            name="especialidade"
                                            value={props.filtro.especialidade}
                                            className="borderBlack"
                                            onChange={(e) => { props.filtrar((prev) => ({ ...prev, especialidade: e.target.value })) }}
                                        />
                                    </FloatingLabel>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="funcao">
                                    <FloatingLabel controlId="funcao " label={`função`}>
                                        <Form.Control
                                            type="text"
                                            name="funcao"
                                            value={props.filtro.funcao}
                                            className="borderBlack"
                                            onChange={(e) => { props.filtrar((prev) => ({ ...prev, funcao: e.target.value })) }}
                                        />
                                    </FloatingLabel>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="unidade">
                                    <FloatingLabel controlId="unidade" label={`unidade`}>
                                        <Form.Control
                                            type="text"
                                            name="unidade"
                                            value={props.filtro.unidade}
                                            className="borderBlack"
                                            onChange={(e) => { props.filtrar((prev) => ({ ...prev, unidade: e.target.value })) }}
                                        />
                                    </FloatingLabel>
                                </Form.Group>
                            </Col>
                        </> : null}
                    {/* filtro para unidades */}
                    {props.lista === "Unidades" ?
                        <>
                            <Col>
                                <Form.Group controlId="">
                                    <FloatingLabel controlId="endereco" label={`endereco`}>
                                        <Form.Control
                                            type="text"
                                            name="endereco"
                                            value={props.filtro.endereco}
                                            className="borderBlack"
                                            onChange={(e) => { props.filtrar((prev) => ({ ...prev, endereco: e.target.value })) }}
                                        />
                                    </FloatingLabel>
                                </Form.Group>
                            </Col>
                        </> : null}
                    {/* filtro para produtos */}
                    {props.lista === "Produtos" ?
                        <>
                            <Col>
                                <Form.Group controlId="fornecedor">
                                    <FloatingLabel controlId="fornecedor" label={`fornecedor`}>
                                        <Form.Control
                                            type="text"
                                            name="fornecedor"
                                            value={props.filtro.fornecedor}
                                            className="borderBlack"
                                            onChange={(e) => { props.filtrar((prev) => ({ ...prev, fornecedor: e.target.value })) }}
                                        />
                                    </FloatingLabel>
                                </Form.Group>
                            </Col>
                        </> : null}
                    {/* filtro para pacientes */}
                    {props.lista === "Pacientes" ?
                        <>
                            <Col>
                                <Form.Group controlId="dono">
                                    <FloatingLabel controlId="dono" label={`dono`}>
                                        <Form.Control
                                            type="text"
                                            name="dono"
                                            value={props.filtro.dono}
                                            className="borderBlack"
                                            onChange={(e) => { props.filtrar((prev) => ({ ...prev, dono: e.target.value })) }}
                                        />
                                    </FloatingLabel>
                                </Form.Group>
                            </Col>
                        </> : null}
                    {/* filtro para Compras */}
                    {props.lista === "Compras" ?
                        <>
                            <Col>
                                <Form.Group controlId="produto">
                                    <FloatingLabel controlId="produto" label={`produto`}>
                                        <Form.Control
                                            type="text"
                                            name="produto"
                                            value={props.filtro.produto}
                                            className="borderBlack"
                                            onChange={(e) => { props.filtrar((prev) => ({ ...prev, produto: e.target.value })) }}
                                        />
                                    </FloatingLabel>
                                </Form.Group>
                            </Col>
                        </> : null}
                    {/* filtro para Vendas */}
                    {props.lista === "Vendas" ?
                        <>
                            <Col>
                                <Form.Group controlId="dataHora">
                                    <FloatingLabel controlId="dataHora" label="Data e Hora">
                                        <Form.Control
                                            type="date"
                                            name="dataHora"
                                            value={props.filtro.data}
                                            className="borderBlack"
                                            onChange={(e) => { props.filtrar((prev) => ({ ...prev, data: e.target.value })) }}
                                        />
                                    </FloatingLabel>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="formaPagamento">
                                    <FloatingLabel controlId="formaPagamento" label="forma de pagamento">
                                        <Form.Control
                                            type="text"
                                            name="formaPagamento"
                                            value={props.filtro.formaPagamento}
                                            className="borderBlack"
                                            onChange={(e) => { props.filtrar((prev) => ({ ...prev, formaPagamento: e.target.value })) }}
                                        />
                                    </FloatingLabel>
                                </Form.Group>

                            </Col>
                            <Col>
                                <Form.Group controlId="responsavel">
                                    <FloatingLabel controlId="responsavel" label="responsavel">
                                        <Form.Control
                                            type="text"
                                            name="responsavel"
                                            value={props.filtro.nome}
                                            className="borderBlack"
                                            onChange={(e) => { props.filtrar((prev) => ({ ...prev, nome: e.target.value })) }}
                                        />
                                    </FloatingLabel>
                                </Form.Group>

                            </Col>
                            <Col>
                                <Form.Group controlId="radio" style={{ border: "1px solid black", width: "60%", padding: "2%", borderRadius: "10px" }}>
                                    <Form.Check // prettier-ignore
                                        type={"radio"}
                                        id={`radio`}
                                        name="valor"
                                        label={`nenhum`}
                                        onChange={(e) => { props.filtrar((prev) => ({ ...prev, valor: "" })) }}
                                        className="Radio_custom"
                                    />
                                    <Form.Check // prettier-ignore
                                        type={"radio"}
                                        id={`radio`}
                                        name="valor"
                                        label={`Caros`}
                                        value={"Caros"}
                                        onChange={(e) => { props.filtrar((prev) => ({ ...prev, valor: e.target.value })) }}
                                        className="Radio_custom"
                                    />
                                    <Form.Check // prettier-ignore
                                        type={"radio"}
                                        id={`radio`}
                                        name="valor"
                                        value={"baratos"}
                                        onChange={(e) => { props.filtrar((prev) => ({ ...prev, valor: e.target.value })) }}
                                        label={`baratos`}
                                        className="Radio_custom"
                                    />
                                </Form.Group>
                            </Col>
                        </> : null}
                </Row>
                <Row style={{ marginTop: "1%" }}>
                    <Col className="text-start" style={{ display: "flex", gap: "1%" }}>
                        <Button variant="primary" onClick={() => props.executar(true)}>
                            Pesquisar
                        </Button>
                        {props.lista !== "Clientes" ?
                            <Link to={`/Adicionar/${props.lista}`}>
                                <Button variant="success">
                                    Adicionar {props.lista}
                                </Button>
                            </Link>
                            : null}
                    </Col>
                    <Col className="text-end">
                        <Button variant="secondary" onClick={() => props.executar()}>
                            Limpar Filtro(s)
                        </Button>
                    </Col>
                </Row>
            </Card>
        </div>
    )
}