import React, { useEffect, useState } from "react";
import ListaServices from "../../Listas/service";
import { CheckAuteticacao } from "../../../nFuncoes/auntenticar";
import { Await, useNavigate } from "react-router-dom";
import { POST } from "../../../nFuncoes/POST.ts";

export default function ControllerFormularioAdição() {
    const serviceGet = new ListaServices()
    const formdata = new FormData()
    const navigate = useNavigate()
    const path = "http://localhost:3002"
    const auth = CheckAuteticacao()
    const [table,setTable] = useState()
    const [formData, setFormData] = useState({
        id: "",
        cpf: "",
        dono:auth?auth.cpf:null
    })
    const[unidades,setUnidades] = useState([])
    const [errors, setErrors] = useState()

    useEffect(()=>{
        get()
    },[])

    const get = async ()=>{
        const units = await serviceGet.GET("Unidades")
        console.log(units.resp)
        setUnidades(units.resp)
    }

    const onChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const Adicionar = async()=>{
        console.log(formData)
        if(table!=="Produtos"){
            await POST(`${path}/${table}`,JSON.stringify(formData))
            navigate("/Lista")
        }else{
            for(let item  of Object.keys(formData)){
                if(item==="imagem" || item==="imagemNome"){
                    console.log(item)
                    formData[item].map((itemesp,index)=>{
                        formdata.append(`${item}${index}`,itemesp)
                    })
                }else{
                    formdata.append(item,formData[item])
                }
            }

            for(let data of formdata.entries()){
                console.log(data)
            }

            await fetch(`${path}/${table}`,{method:"POST",body:formdata})
            navigate("/Lista")
        }
    }

    async function ConfigurarFoto(event) {
        const files = [...event.target.files];
        const fNames = [...files.map(file=>file.name)]
        setFormData((prevState) => ({ ...prevState, imagemNome: fNames }))
        setFormData((prevState) => ({ ...prevState, imagem: files }))
    }

   

    return {
        formData,
        auth,
        errors,
        unidades,
        ConfigurarFoto,
        setTable,
        onChange,
        setFormData,
        Adicionar
    }
}