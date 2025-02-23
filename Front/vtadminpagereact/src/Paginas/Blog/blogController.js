import React, { useEffect, useState } from "react";
import GET from "../../nFuncoes/GET.ts";
import { set } from "date-fns";
import setImg from "../../Funcoes/CreateUrl.ts";
import { useNavigate } from "react-router-dom";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import UPDATE from "../../nFuncoes/UPDATE.ts";
import { CheckAuteticacao } from "../../nFuncoes/auntenticar.js";

function BlogController() {
    const auth = CheckAuteticacao()
    const [news, setNews] = useState()
    const [topnews, setTOPnews] = useState()
    const [link, setLink] = useState()
    const navigate = useNavigate()
    const [heart, setHeart] = useState()



    const fillBlogList = async () => {
        const resposta = await GET("http://localhost:3002/Noticia")
        const respostaTops = await GET(`http://localhost:3002/Noticia/Limit/TOP/all`)
        setNews(resposta.resposta)
        setTOPnews(respostaTops.resposta)
    }

    const GetLink = async (arquivo, tipo) => {
        const src = await setImg({ 0: { 0: { file: arquivo, imagem: tipo } } }, setLink)
    }

    const GetNews = async (id) => {
        const noticia = await GET(`http://localhost:3002/Noticia/id/${id}/${auth.cpf}`)
        setHeart(noticia.resposta[0].curtido ? faHeartSolid : faHeartRegular)
        setNews(noticia.resposta[0])
    }

    const GetTOPNews = async (id) => {
        const noticia = await GET(`http://localhost:3002/Noticia/Limit/TOP/all`)
        setTOPnews(noticia.resposta)
    }

    const CurtirDescurtir = async () => {
        if (auth) {
            setHeart(heart === faHeartRegular ? faHeartSolid : faHeartRegular)
            await UPDATE(`http://localhost:3002/Noticia/curtir/${news.id}`, JSON.stringify({ userID: auth.cpf }))
        } else {
            alert("vai logar vai")
        }
    }

    return {
        news,
        link,
        topnews,
        heart,
        auth,
        CurtirDescurtir,
        navigate,
        fillBlogList,
        GetLink,
        GetNews
    }
}

export default BlogController