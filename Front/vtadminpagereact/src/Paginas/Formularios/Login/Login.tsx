
import Button from 'react-bootstrap/Button';

import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Col, FloatingLabel, Form, Image, Row } from 'react-bootstrap';
import LoginController from './Controller';




//mini pagina voltada a formulario de Login
export default function Formulogin() {
    const {
        password,
        isFuncionario,
        error,
        emaillogin,
        setEmail,
        setPassword,
        handleSubmit,
        setFuncionario,
    } = LoginController()

    return (
        <div>
            <Image src={require("../../../public/Logo.png")} height={"auto"} width={200} style={{ marginBottom: "3%" }} />
            <Row className="w-100">
                <Col xs={12} md={6} lg={4} className="mx-auto">
                    {/* Formulário de Login */}
                    <Form onSubmit={handleSubmit}>
                        {/* Campo de Usuário ou E-mail */}
                        <FloatingLabel label="E-mail" className="mb-3">
                            <Form.Control
                                type="text"
                                required
                                placeholder="Digite seu e-mail ou CPF/CNPJ"
                                value={emaillogin}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </FloatingLabel>

                        {/* Campo de Senha */}
                        <FloatingLabel label="Senha" className="mb-3">
                            <Form.Control
                                type="password"
                                placeholder="Digite sua senha"
                                required
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </FloatingLabel>
                        <Form.Check // prettier-ignore
                            style={{ color: "white" }}
                            type={"checkbox"}
                            id={`default-${"checkbox"}`}
                            onChange={() => { setFuncionario(!isFuncionario) }}
                            label={`Sou funcionario`}
                        />
                        <br />

                        {/* Botão Entrar */}
                        <Button variant="outline-light" type="submit"  style={{ width: '100%' }}>
                            Entrar
                        </Button>

                        {/* Link Esqueci minha senha */}
                        <div className="mt-3 text-center">
                            <Link to="/Cadastro" className="text-decoration-none text-white">
                                Não tem conta? <strong>Cadastre-se</strong>
                            </Link>
                        </div>
                        <div style={{ backgroundColor: "red", color: "white", width: "40%", marginLeft: "30%", border: "1px solid white", borderRadius: "10px" }}>{error}</div>
                    </Form>
                </Col>
            </Row>
        </div>
    )

}