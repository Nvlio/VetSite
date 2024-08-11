import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';
import { CheckAuteticacao } from '../nFuncoes/auntenticar';

function Botao(props) {
  const checked = CheckAuteticacao()
  if (checked === false && props.tipo===undefined) {
    return (
      <>
        <LinkContainer  to={"/Form"}><Button variant="outline-primary">Login</Button></LinkContainer>
      </>
    );
  }else{
    return(
      <>
        
      </>
    )
  }

}

export default Botao;