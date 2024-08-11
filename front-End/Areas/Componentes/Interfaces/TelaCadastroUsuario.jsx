import FormUsuario from "../Formularios/Usuario";
import Pagina from "../Templates/Pagina";
export default function TelaCadastroUsuario(props){
    return(
        <div>
        <Pagina>
            <h2>Tela de Cadastro de Usuários</h2>
            <FormUsuario/>
        </Pagina>
    </div>
    )
}