import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

export default function FormPaciente(props){

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
          <Form.Label>Nome do Paciente</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Nome do Paciente"
            defaultValue=""
          />
          <Form.Control.Feedback type='invalid'> Por favor, informe o nome do Paciente.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Tipo de Animal:</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Tipo do Paciente"
            defaultValue=""
          />
          <Form.Control.Feedback type="invalid">Por favor, informe o tipo de animal que é o Paciente.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>Raça</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="text"
              placeholder="Raça do Paciente"
              aria-describedby="inputGroupPrepend"
              required
            />
            <Form.Control.Feedback type="invalid">
              Por favor, escreva a raça do animal (Paciente).
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>Peso</Form.Label>
          <Form.Control type="tel" placeholder="Informe o peso de Paciente." required />
          <Form.Control.Feedback type="invalid">
            Por favor informe o peso do Paciente a ser cadastrado.
          </Form.Control.Feedback>
        </Form.Group>
          </Row>
      <Row>
          <Form.Group as={Col} md="3" controlId="validationCustom05">
          <Form.Label>Telefone</Form.Label>
          <Form.Control type="text" placeholder="Número de telefone do Paciente" required />
          <Form.Control.Feedback type="invalid">
            Informe um número de telefone para entrarmos em contato com o Paciente.
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