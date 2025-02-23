
import Button from 'react-bootstrap/Button';

import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Col, FloatingLabel, Form, Image, Row } from 'react-bootstrap';
import LoginController from './Controller';
import "../../../CSS/Proprio.css"
import EdicaoControll from '../Edicao/edicaoControll';



//mini pagina voltada a formulario de Login
export default function FormuCadastro() {
    const {
        data,
        error,
        msgError,
        isFuncionario,
        municipio,
        uf,
        setData,
        isEmailValid,
        setUfSelected,
        isTelefoneValid,
        isSameSenha,
        cpfConfirmator,
        setFuncionario,
        handleSubmit,
        redirect,
    } = LoginController()
    const {imagem,inputRef,HandleClick,HandleDragOver,HandleDrop,HandleFileChange,} =EdicaoControll()

    return (
        <div>
            <Image src={require("../../../public/Logo.png")} height={"auto"} width={200} />

            <Row className="w-100">
                <Col xs={12} md={6} lg={4} className="mx-auto" style={{ width: "100%" }} >
                    {/* Formulário de Login */}
                    <Form onSubmit={handleSubmit}>
                        <div style={{ backgroundColor: "rgba(223,222,224,255)", width: "60%", marginLeft: "21%", borderRadius: "10px" }}>
                            <h2>Cadastro de Cliente</h2>
                            <div className='RegisterWindow'>
                                {/* Campo de Usuário ou CPF */}
                                <FloatingLabel className="mb-3">
                                    <div onClick={HandleClick} onDragOver={HandleDragOver} onDrop={HandleDrop} id="clicavel" style={{ border: "1px solid black",justifySelf:"center", borderRadius: "100%", height: "25vh", width: "22%", alignContent: "center" }}>
                                        {!imagem ?
                                            <h3>Perfil</h3>
                                            :
                                            <Image src={imagem} height={190} width={186} style={{ objectFit: "cover", marginLeft: "-0%", marginTop: "-2px", borderRadius: "100px", objectPosition: "top" }} />
                                        }
                                        <input
                                            type="file"
                                            ref={inputRef}
                                            style={{ display: "none" }}
                                            onChange={HandleFileChange}
                                        />
                                    </div>
                                </FloatingLabel>

                                <FloatingLabel label={error === "cpf" ? msgError : "CPF"} className="mb-3">
                                    <Form.Control
                                        type="text"
                                        required
                                        placeholder="Digite seu cpf"
                                        value={data.cpf}
                                        maxLength={11}
                                        isInvalid={error === "cpf"}
                                        style={{ border: error === "cpf" ? "1px solid red" : "1px solid black" }}
                                        onBlur={cpfConfirmator}
                                        onChange={e => setData((prev => ({ ...prev, cpf: e.target.value })))}
                                    />
                                </FloatingLabel>

                                {/* Campo de Usuário ou RG */}
                                <FloatingLabel label="RG" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        required
                                        maxLength={12}
                                        placeholder="Digite seu RG"
                                        value={data.rg}
                                        onChange={e => setData((prev => ({ ...prev, rg: e.target.value })))}
                                    />
                                </FloatingLabel>

                                {/* Campo de Usuário ou E-mail */}
                                <FloatingLabel label={error === "email" ? msgError : "Email"} className="mb-3">
                                    <Form.Control
                                        type="text"
                                        required
                                        isInvalid={error === "email"}
                                        style={{ border: error === "email" ? "1px solid red" : "1px solid black" }}
                                        placeholder="Digite seu e-mail"
                                        value={data.email}
                                        onBlur={isEmailValid}
                                        onChange={e => setData((prev => ({ ...prev, email: e.target.value })))}
                                    />
                                </FloatingLabel>

                                <div style={{ backgroundColor: "white", border: "1px solid gray", borderRadius: "10px", padding: "2%", marginBottom: "2%" }}>
                                    {/* Campo de Senha */}
                                    <FloatingLabel label="Senha" className="mb-3">
                                        <Form.Control
                                            type="password"
                                            placeholder="Digite sua senha"
                                            required
                                            style={{ border: "1px solid black" }}
                                            value={data.senha}
                                            onChange={e => setData((prev) => ({ ...prev, senha: e.target.value }))}
                                        />
                                    </FloatingLabel>

                                    {/* Campo de confirmação Senha */}
                                    <FloatingLabel label={error === "confirmSenha" ? msgError : "Confirme sua Senha"} className="mb-3">
                                        <Form.Control
                                            type="password"
                                            placeholder="Confirme sua Senha"
                                            required
                                            value={data.confirmpassword}
                                            onBlur={isSameSenha}
                                            onChange={isSameSenha}
                                            isInvalid={error === "confirmSenha"}

                                            style={{ border: error === "confirmSenha" ? "1px solid red" : "1px solid black" }}
                                        />
                                    </FloatingLabel>
                                    <span style={{ color: "red", display: error === "confirmSenha" ? "block" : "none" }}>{msgError}</span>
                                </div>

                                {/* Campo de Usuário ou Telefone */}
                                <FloatingLabel label={error === "tel" ? msgError : "Telefone"} className="mb-3">
                                    <Form.Control
                                        type="tel"
                                        required
                                        maxLength={11}
                                        placeholder="Digite seu telefone"
                                        value={data.telefone}
                                        onBlur={isTelefoneValid}
                                        isInvalid={error === "tel"}
                                        style={{ border: error === "tel" ? "1px solid red" : "1px solid black" }}
                                        onChange={e => setData((prev => ({ ...prev, telefone: e.target.value })))}
                                    />
                                </FloatingLabel>

                                {/* Campo de Usuário ou Nome */}
                                <FloatingLabel label="Nome" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        required
                                        placeholder="Digite seu nome"
                                        value={data.nome}
                                        onChange={e => setData((prev => ({ ...prev, nome: e.target.value })))}
                                    />
                                </FloatingLabel>
                                {/* Campo de Usuário profissão  */}
                                <FloatingLabel label="Profissão" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        required
                                        placeholder="Sua Profissão"
                                        value={data.profissao}
                                        onChange={e => setData((prev => ({ ...prev, profissao: e.target.value })))}
                                    />
                                </FloatingLabel>

                                <div style={{ border: "1px solid gray", padding: "2%", borderRadius: "10px", backgroundColor: "white" }}>
                                    <div style={{ display: "flex", width: "100%", gap: "10px" }}>
                                        {/* Campo de Usuário Rua */}
                                        <FloatingLabel label="Rua" className="mb-3" style={{ width: "80%" }}>
                                            <Form.Control
                                                type="text"
                                                style={{ border: "1px solid black" }}
                                                required
                                                placeholder="Sua Rua"
                                                value={data.rua}
                                                onChange={e => setData((prev => ({ ...prev, rua: e.target.value })))}
                                            />
                                        </FloatingLabel>

                                        {/* Campo de Usuário numero */}
                                        <FloatingLabel label="Numero" className="mb-3" style={{ width: "20%" }}>
                                            <Form.Control
                                                type="number"
                                                style={{ border: "1px solid black" }}
                                                required
                                                placeholder="Numero"
                                                value={data.numero}
                                                onChange={e => setData((prev => ({ ...prev, numero: e.target.value })))}
                                            />
                                        </FloatingLabel>
                                    </div>

                                    {/* Campo de Usuário Bairro */}
                                    <FloatingLabel label="Bairro" className="mb-3">
                                        <Form.Control
                                            type="text"
                                            required
                                            style={{ border: "1px solid black" }}
                                            placeholder="Sua Bairro"
                                            value={data.bairro}
                                            onChange={e => setData((prev => ({ ...prev, bairro: e.target.value })))}
                                        />
                                    </FloatingLabel>

                                    <div style={{ display: "flex", width: "100%", gap: "10px" }}>
                                        {/* Campo de Usuário Estado*/}
                                        <FloatingLabel label="Estado" className="mb-3" style={{ width: "50%" }}>
                                            <Form.Select
                                                style={{ border: "1px solid black" }}
                                                required
                                                onChange={(e) => {
                                                    setUfSelected(e.target.value)
                                                    setData((prev) => ({ ...prev, estado: e.target.selectedOptions[0].innerHTML }))
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

                                        {/* Campo de Usuário Estado */}
                                        <FloatingLabel label="Cidade" className="mb-3" style={{ width: "50%" }}>
                                            <Form.Select
                                                style={{ border: "1px solid black" }}
                                                required
                                                onChange={e => setData((prev) => ({ ...prev, cidade: e.target.selectedOptions[0].innerHTML }))}
                                            >
                                                <option selected value={""}>nenhum</option>
                                                {municipio?.map((cidade) => {
                                                    return (
                                                        <option value={cidade.id}>{cidade.nome}</option>
                                                    )
                                                })}
                                            </Form.Select>
                                        </FloatingLabel>


                                    </div>
                                    <FloatingLabel label="CEP" className="mb-3" style={{ width: "100%" }}>
                                        <Form.Control
                                            type="text"
                                            style={{ border: "1px solid black" }}
                                            required
                                            placeholder="Seu CEP"
                                            maxLength={8}
                                            value={data.cep}
                                            onChange={e => setData((prev => ({ ...prev, cep: e.target.value })))}
                                        />
                                    </FloatingLabel>
                                </div>
                            </div>
                        </div>
                        <br />
                        {/* Botão Entrar */}
                        <Button variant="outline-light" type="submit" style={{ width: '60%', marginLeft: "2%" }}>
                            Cadastrar
                        </Button>

                        {/* Link Esqueci minha senha */}
                        <div className="mt-3 text-center">
                            <Link to="/Login" className="text-decoration-none text-white" >
                                tem conta? <strong>Entre</strong>
                            </Link>
                        </div>
                        <div style={{ backgroundColor: "red", color: "white", width: "40%", marginLeft: "30%", border: "1px solid white", borderRadius: "10px" }}>{error}</div>
                        <br /><br />
                    </Form>
                </Col>
            </Row>

        </div>
    )

}