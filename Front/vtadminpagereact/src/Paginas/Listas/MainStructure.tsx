import React, { useEffect } from "react"
import MainErro from "../../NPages/Erro.tsx"
import ControllerLista from "./controllerLista.js"
import MenuLateral from "../../Componentes/Menus/Lateral.tsx"
import { icon } from "@fortawesome/fontawesome-svg-core"
import ListaComponent from "../../Componentes/Listas/Lista.tsx"
import { FiltroComponente } from "../../Componentes/Filtros/FiltroLista.tsx"
import PerfilComp from "../../Componentes/profile/Perfil.tsx"
import EditarForm from "../Formularios/Edicao/pageEdicao.tsx"


//pagina que estrutura a pagina de lista de dados
export default function ListaMain() {
    const {
        auth,
        itens,
        userName,
        icons,
        filtro,
        lista,
        keysFiltradas,
        selectedLista,
        setSelectedLista,
        setFiltro,
        Filtrar
    } = ControllerLista()
    // const { tamanhoJanela } = useContext(Contexto)
    // const [lista, setLista] = useState("Clientes")

    //se o usuario seja funcionario, então a lista vai conter mais paginas que podem ser vistas por ele, define qual componente é visto 
    //dependnedo das variaveis
    return (
        <div style={{ display: "flex", backgroundColor:"#f0f0f0",height:"100vh" }}>
            <MenuLateral itens={itens} auth={auth} name={userName} icons={icons} selectedLista={setSelectedLista} />
            <div style={{ marginLeft: "20%", display: "flex", width: "100%", flexDirection: "column", justifyContent: "start", justifyItems: "start", justifySelf: "start" }}>
                {selectedLista === undefined || selectedLista === "perfil" ?
                    <>
                        <PerfilComp selectedLista={setSelectedLista}/>
                    </>
                    :
                    <>
                        {selectedLista==="editar"?
                        <EditarForm selectedLista={setSelectedLista}/>
                        :
                        <>
                        <div style={{ backgroundColor: "black", width: "100%", height: "auto", color: "white" }}>
                            <h1>Lista de {selectedLista}</h1>
                        </div>
                        <FiltroComponente lista={selectedLista} conta={auth.Conta} filtrar={setFiltro} filtro = {filtro} executar={Filtrar}/>
                        <ListaComponent lista={lista} keys={keysFiltradas} listaEscolhida={selectedLista}/>
                        </>
                        }
                    </>
                }
            </div>
        </div >
    )

}