import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Botao from './Button.jsx';
import { LinkContainer } from 'react-router-bootstrap';
import { CheckAuteticacao, LogOut } from '../nFuncoes/auntenticar.js';

//MENU NAVI//
function NavMenu(props) {
  let marginprop = props.margin
  let auth = CheckAuteticacao()
  return (
    <div>

      <div style={{ width: '100%', height: '60px', opacity: '30%', position: props.position, backgroundColor: "black" }}></div>
      <Navbar expand="lg">
        <Container style={{ marginLeft: auth === false ? "0px" : "55px", marginTop: marginprop }}>
          <img style={{ marginLeft: '100px' }} src={require('../public/Logo.png')} alt='logo' width={'70px'} height={"45px"} />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse style={{ marginLeft: '100px' }} id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to={"/"}>
                <Nav.Link href="#home">Home</Nav.Link>
              </LinkContainer>

              <NavDropdown title="Clinica" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Sobre</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Missão</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Valores</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Serviço" id="basic-nav-dropdown">

                <NavDropdown style={{ marginLeft: '10px' }} title="Exames" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Audimetria e Octoscopia</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Cardiológico</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Endoscópio</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.4">Hormonais</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.4">Imagem</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.4">Hormonais</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.4">Laboratórios</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.4">Neurológicos</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.4">Respiratorios</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown.Item href="#action/3.2">Especialidade</NavDropdown.Item>

                <NavDropdown style={{ marginLeft: '10px' }} title="Pequenos" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Clínica Médica de cachorro</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Clínica Médica de Gato</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Clínica Cirurgica de cachorro</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.4">Clínica Cirurgica de Gato</NavDropdown.Item>
                </NavDropdown>

                <NavDropdown style={{ marginLeft: '10px' }} title="Silvestres" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Aves</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Primatas</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Répteis</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.4">Anfibio</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.4">Lagomorfos</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.4">Roedores</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.4">Peixes</NavDropdown.Item>
                </NavDropdown>
              </NavDropdown>
              <Nav.Link href="#home">Localização</Nav.Link>
              <Nav.Link href="#home">Equipe</Nav.Link>
              <Nav.Link href="#home">Depoimento</Nav.Link>
              <Nav.Link href="#link">Contato</Nav.Link>
              <LinkContainer to={"/Blog"}><Nav.Link >Blog</Nav.Link></LinkContainer>
              {auth !== false && auth.Conta !== "cliente" ?
                <><LinkContainer to={"/List"}>
                  <Nav.Link >Ver Listas</Nav.Link>
                </LinkContainer>
                </>
                :
                null}
              {auth !== false && auth.Conta !== "funcionario" ?
                <div className='Flex'>
                  <LinkContainer to={"/List"}>
                  <Nav.Link >Ver Animais</Nav.Link>
                </LinkContainer>
                  <LinkContainer to={"/profile"}>
                    <Nav.Link >Conta</Nav.Link>
                  </LinkContainer>
                </div>
                :
                null}
              {auth !== false ?
                <Nav.Link onClick={() => { LogOut() }}>Sair</Nav.Link>
                : null}

            </Nav>
          </Navbar.Collapse>
        </Container>


        <Botao tipo={props.tipo} />
      </Navbar>
    </div>
  );
}

export default NavMenu;