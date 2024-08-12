import React, { useContext, useEffect, useState } from "react";
import GET from "../nFuncoes/GET.ts"
import { Contexto } from "../Contexto";

//componente para a area de comentarios basicos da page home
export default function CommentList() {
        const {tamanhoJanela} = useContext(Contexto)
        const [fcomments,setFcomments]:any = useState()

        const [comments] = useState([
            { nome: "Ellen Souza", elogio: "Cuidados Excepcionais para Meu Gato", complemento: 'A clínica veterinária proporcionou cuidados excepcionais para o meu gato. Profissionais atenciosos e competentes!', href: require("../public/depoimentos/1.png") },
            { nome: "Lucas Mota", elogio: "Excelente Atendimento para Nosso Cão", complemento: "Estou muito satisfeito com os serviços prestados pela clínica veterinária. Sempre recebemos um tratamento excelente para nosso cão!", href: require("../public/depoimentos/2.png") },
            { nome: "Marcela Antunes", elogio: "Confiança Plena na Equipe Veterinária",complemento: "Confio plenamente na equipe da clínica veterinária para cuidar da saúde do meu cachorro. Recomendo a todos!", href: require("../public/depoimentos/3.png") },
            { nome: "Laura e Rodrigo Duarte", elogio: "Impressão Positiva: Cuidados com Nossos Cães", complemento: "Nossa experiência na clínica veterinária foi incrível. O atendimento dedicado e os cuidados com nossos cães nos impressionaram!", href: require("../public/depoimentos/4.png") },
            { nome: "Sofia Medeiros", elogio: "Bem-estar Garantido para Meu Gato", complemento: "A clínica veterinária é o lugar perfeito para cuidar da saúde e bem-estar do meu gato. Profissionais comprometidos e ambiente acolhedor!", href: require("../public/depoimentos/5.png") }
        ])

        const [commentActive, setCommentActiv] = useState(0)

        async function conectar(){
            const itens:any = await GET("https://300e-189-124-0-88.ngrok-free.app/Comentarios")
            setFcomments(itens)
        }

        useEffect(()=>{
            conectar()
        },[])

        useEffect(()=>{
        },[fcomments])

    if(fcomments){
        return (
            <>
                <div className="vertical" style={{ width: "100%" }}>
                    <div className="showlist" style={{ width:tamanhoJanela.width>=1110?'10%':'100%', height:tamanhoJanela.width>=1110?'180px':'90%'}}>
                        <ul id="comment">
                            {fcomments?.map((comment, ind) => {
                                return (
                                    <li onClick={() => { setCommentActiv(ind) }} style={{ backgroundColor: commentActive === ind ? 'red' : "" }} key={comment.dono}>{comment.dono}</li>
                                )
                            })}
                        </ul>
                    </div>
    
    
    
                    <div style={{ width: "70%"}} className="Flex">
                        <div   style={{ width: '70%'}}>
                            <h5>{fcomments[commentActive].elogio}</h5>
                            <hr />
                            <p>{fcomments[commentActive].comentario}</p>
                        </div>
                        <div>
                            <img alt="foto do comentador" src={comments[commentActive].href} width={'100%'}/>
                        </div>
                    </div>
                </div>
            </>
        )
    }else{
        return(<h1>carregando</h1>)
    }
}

/*


*/