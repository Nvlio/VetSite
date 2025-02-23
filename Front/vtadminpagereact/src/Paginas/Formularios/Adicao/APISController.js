import React, { useState } from "react";
import GET from "../../../nFuncoes/GET.ts";

export default function APISGet(){
    const [especies,setEspecies] = useState()
    const [racas,setRacas] = useState()

    const GetAnimalsSpecie = async()=>{
        const resposta = await GET("http://localhost:3002/Especies")
        console.log(resposta)
        setEspecies([...resposta])
    }

    const GetAnimalsRaca = async(especie)=>{
        const resposta = await GET(`http://localhost:3002/Racas/${especie}`)
        console.log(resposta.msg)
        setRacas([...resposta.msg])
    }

    return{
        especies,
        racas,
        GetAnimalsSpecie,
        GetAnimalsRaca
    }
}