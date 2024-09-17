import React, { useContext } from "react";
import ImageMainBG from "../public/hero-bg.jpg"
import ImageAboutBG from "../public/about-bg2.jpg"
import ImageNewBG from "../public/events-bg.jpg"
import ImageErroBG from "../public/Erro-bg.png"

import { Contexto } from "../Contexto";


//css importação

type imagem = {
    imgbg: string,
    static: Boolean
}


/*
ver se excluir não da erro em nada

const CellPhone = {
    float: "left",
    marginLeft: "47%"
}*/


export default function ImagePage(props: {
    mainText: string | null,
    text: string | null,
    img: number | null,
    specialText: string | null,
    lista: string[] | null,
    children: React.ReactNode | null,
    list: Array<string> | null,
    endtext: string | null
    extra:string
}) {
    const { tamanhoJanela } = useContext(Contexto)

    let imgvar: imagem = {
        imgbg: "",
        static: false
    }

    //vai definir qual imagem deve ser renderizada dependendo do numero que o props.img tiver e se ela é estatíca.
    
    switch (props.img) {
        case 1:
            imgvar.imgbg = ImageMainBG //caso seja 1 a imagem que aparece é a main
            break
        case 2:
            imgvar.imgbg = ImageAboutBG //caso seja 2 a imagem que aparece é a about
            imgvar.static = true
            break
        case 3:
            imgvar.imgbg = ImageNewBG //caso seja 3 a imagem que aparece é a news
            imgvar.static = true
            break
        default:
            imgvar.imgbg = ImageErroBG //caso seja neenhuma ou outro valor a imagem que aparece é a error
            break
    }


    //vai retornar uma pagina contendo uma imagem como fundo e uma tabela no meio
    return (
        <>
            <div>
                <div style={{ display: "flex", width: "100%" }}>
                    <div className={props.img === 1 ? 'Tabela' : 'Tabs'} style={{ float: "left", width: '80%' }}>
                        <br />
                        <h1 className='Title'>{`${props.mainText} `}<span id="Laranja"><strong>{props.specialText}</strong></span></h1>
                        <hr id="separador" />
                        <div >
                            <div className="Text" >
                                <p>{props.text}</p>
                                {props.img === 2 ?
                                    <>
                                        <div style={{ border: '1px solid white', borderRadius: "1%",padding:"02%"}}>
                                            <ul>
                                                {props.list?.map((item,ind) => {
                                                    return (
                                                        <li key={ind}>
                                                            {item}
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                        <p>{props.endtext}</p>
                                    </>
                                    : null}
                            </div>
                            {props.img === 1 ?

                                <div style={{ margin: tamanhoJanela.widht <= 982 ? "0% 40%" : "" }}>
                                    <a href="http://www.youtube.com/watch?v=JxwaDBdk3vk" target="_blank" rel="noreferrer"><div id="blackcircle"><div id="triangulostatic"><div id="triangulo" /></div></div></a>
                                </div>
                                :
                                null}

                            {props.img === 2 ?
                                <div  style={{ margin: tamanhoJanela.widht <= 982 ? "05% -20%" : "" }}>
                                    {props.children}
                                </div>
                                :
                                null
                            }
                        </div>
                        {props.img === 1 ?
                            <div className="Container">
                                <a href="#book-a-table" className="book-a-table-btn scrollto  d-lg-flex">Agendar</a>
                                <a href="#book-a-table" className="book-a-table-btn scrollto  d-lg-flex">Resultado de Exames</a>
                            </div> : null
                        }

                    </div>
                </div>  
                <div className={tamanhoJanela.width >= '1043' || props.img === 1 ? "ImgBG" : "ImgBGCell"} style={{ backgroundImage: `url(${imgvar.imgbg})`,height:props.extra==="2"?"10":"" }} />

            </div>

        </>
    )
}
