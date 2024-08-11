import React from "react"


export default function ConfirmTable(props: { text: string, Excluir: any }) {
    return (
        <div style={{backgroundColor:"rgba(0, 0, 0, 0.59)",height:"100vh",position:"fixed",zIndex:"2",marginTop:"-18.3%",marginLeft:"-17%",width:"100%"}}>
        <div style={{backgroundColor:"white",border:"1px solid black",margin:"16% 35%"}}>
            <h1>{props.text}</h1>
            <button onClick={()=>{props.Excluir((prevState)=>({...prevState,excluir:true,aberto:false}))}}>Sim</button>
            <button onClick={()=>{props.Excluir((prevState)=>({...prevState,excluir:false,aberto:false}))}}>Não</button>
        </div>
        </div>
    )
}   