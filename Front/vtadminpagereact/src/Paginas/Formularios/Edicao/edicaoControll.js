import React, { useEffect, useRef, useState } from "react";
import { CheckAuteticacao } from "../../../nFuncoes/auntenticar.js";
import GET from "../../../nFuncoes/GET.ts";
import UPDATE from "../../../nFuncoes/UPDATE.ts";
import { POST } from "../../../nFuncoes/POST.ts";

function EdicaoControll() {
    const auth = CheckAuteticacao()
    const [profileData, setProfileData] = useState({})
    const inputRef = useRef()
    const [imagem, setImagem] = useState()


    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const resposta = await GET(`http://localhost:3002/${auth.Conta}s/${auth.cpf}/null`)
        setProfileData(resposta[0] ? resposta[0] : resposta)
    }

    function changedata(e) {
        if (e.target.id === "estado" || e.target.id === "cidade") {
            setProfileData((prev) => ({ ...prev, [e.target.id]: e.target.selectedOptions[0].innerHTML }))
        } else {
            setProfileData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
        }
    }

    function AddIMG(file) {
        console.log(file)
        setProfileData((prev) => ({ ...prev, imgNome: file.name, file: file }))
    }

    const Editar = async () => {
        const formData = new FormData()
        for (let item of Object.keys(profileData)) {
            formData.append(`${item}`, profileData[item])
        }
        const response = await UPDATE(`http://localhost:3002/${auth.Conta === "funcionario" ? "Funcionarios" : "Clientes"}/${auth.cpf}`, formData, "Y")
    }

    const Criar = async () => {
        const formData = new FormData()
        for (let item of Object.keys(profileData)) {
            formData.append(`${item}`, profileData[item])
        }
        const response = await POST(`http://localhost:3002/${auth.Conta === "funcionario" ? "Funcionarios" : "Clientes"}/${auth.cpf}`, formData, "Y")
    }

    const PreviewFile = (file) => {
        console.log(file)
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImagem(reader.result)
        }
    }

    const HandleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files;
        if (file) {
            console.log("file: ", file)
            PreviewFile(file[0])
            AddIMG(file[0])
        }
    }

    const HandleFileChange = (e) => {
        const file = e.target.files;
        if (file) {
            console.log("file: ", file)
            PreviewFile(file[0])
            AddIMG(file[0])
        }
    }

    const HandleDragOver = (e) => {
        e.preventDefault();
    }

    const HandleClick = () => {
        inputRef.current?.click();
    }


    return {
        profileData,
        inputRef,
        imagem,
        changedata,
        Editar,
        AddIMG,
        HandleDrop,
        HandleFileChange,
        HandleDragOver,
        HandleClick,
        PreviewFile
    }
}

export default EdicaoControll