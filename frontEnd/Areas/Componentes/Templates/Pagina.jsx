import Cabecalho from "./componentes/Cabecalho"
import Menu from "./componentes/Menu"

export default function Pagina(props){
    return(
        <div>
            <Cabecalho titulo= "Sistema de Gerenciamento de Hospitais Veterinários - VET ADMIN"/>
            <Menu/>
            <div>
                {props.children}
            </div>
        </div>
    );
}