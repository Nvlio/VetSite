import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

export default function FormUsuario(props){

    const [validado, setValidado]= useState(false); 

    const manipulaEnvio = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }

        setValidado(true);
      };      
      
    return( 
      <Container className ="m-2 p-2 bolder">
      <Form noValidate validated={validado} onSubmit={manipulaEnvio}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Nome do Usuário</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Nome do Usuário"
            defaultValue=""
          />
          <Form.Control.Feedback type='invalid'> Por favor, informe o nome do usuário.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Sobrenome do Usuário:</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Sobrenome do Usuário"
            defaultValue=""
          />
          <Form.Control.Feedback type="invalid">Por favor, informe o sobrenome do usuário.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>Login</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Login do Usuário"
              aria-describedby="inputGroupPrepend"
              required
            />
            <Form.Control.Feedback type="invalid">
              Por favor escolha um nome de login para o Usuário.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>Tipo de Usuário</Form.Label>
          <Form.Control type="text" placeholder="Informe o tipo de usuário." required />
          <Form.Control.Feedback type="invalid">
            Por favor informe o tipo de usuário a ser cadastrado.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom04">
          <Form.Label>Senha do Usuário</Form.Label>
          <Form.Control type="password" placeholder="Informe a senha do usuário" required />
          <Form.Control.Feedback type="invalid">
            Por favor informe a senha do usuário a ser cadastrado.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom05">
          <Form.Label>CEP</Form.Label>
          <Form.Control type="text" placeholder="CEP" required />
          <Form.Control.Feedback type="invalid">
            O CEP digitado foi inválido, favor colocar um CEP do usuário válido.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row>
          <Form.Group as={Col} md="3" controlId="validationCustom05">
          <Form.Label>Telefone</Form.Label>
          <Form.Control type="text" placeholder="Número de telefone do usuário" required />
          <Form.Control.Feedback type="invalid">
            Informe um número de telefone para entrarmos em contato com o usuário.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <br></br>
      <Button as={Col} md="3" type="submit">Cadastrar</Button>
      
      <Button as={Col} md="3" type="button">Voltar</Button>
      
         </Form>
         </Container>
    );
  
}