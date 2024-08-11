import './css/cabecalho.css';
export default function Cabecalho(props){
    return (
        <div classname='caixa'>
            <h1>{props.titulo || " VetAdmin"}</h1>
        </div>
    );


}




  

