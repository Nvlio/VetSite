import React, { useContext } from "react";
import LayoutMain from "./Layout.jsx";
import { Contexto } from "../Contexto.jsx";
import ImagePage from "../NMiniPages/ImagePage.tsx";
import InfoComp from "../NMiniPages/TelaInfo.tsx";
import QuadroComp from "../NComponentes/quadro.tsx";
import ListaComp from "../NComponentes/Lista.tsx";
import CommentList from "../NComponentes/ComentComp.tsx";

//pagina que estrutura a home page inicial, vai conter uma grande parte dos componentes.
export default function HomePage() {
    const { tamanhoJanela } = useContext(Contexto)

    return (
        <LayoutMain>
            <div className="BlackBG" />
            <ImagePage mainText="Bem vindo a" specialText="CãoXonado" text="Onde o amor, a cura e a dedicação se encontram pelo seu pet!" img={1} />
            <ImagePage
                mainText="A Clínica Veterinária CãoXonado"
                extra={'2'}
                text="Acreditamos firmemente que os animais de estimação são membros especiais das famílias, trazendo consigo uma incrível dose de alegria, amor e companheirismo."
                img={2}
                extraImg="../public/about.jpg"
                list={[
                    "Nosso compromisso é garantir o bem-estar do seu pet, reconhecendo que sua felicidade e saúde beneficiam toda a família, através de cuidados excepcionais dedicados a eles.",
                    "Nossa equipe é apaixonada e altamente especializada, oferecendo serviços veterinários de excelência, desde consultas preventivas até tratamentos avançados, com máximo cuidado e expertise para atender às necessidades do seu pet.",
                    "Valorizamos sua relação com seu animal de estimação, buscando promover interação e cuidado mútuo, oferecendo orientações e recursos para momentos especiais juntos."
                ]}
                endtext={"Portanto, pode contar conosco para garantir a saúde, o bem-estar e a felicidade do seu animal de estimação. Estamos comprometidos em proporcionar uma experiência excepcional, onde você e seu pet se sintam verdadeiramente acolhidos, respeitados e cuidados em todas as etapas do tratamento veterinário."}
            >
                <img src={require("../public/about.jpg")} alt="imagem de fundo" height={tamanhoJanela.width >= 1508 ? "35%" : "70%"} width={tamanhoJanela.width >= 1000 ? "35%" : "70%"} />
            </ImagePage>
            <InfoComp headtext="POR QUE" maintext="Escolher Nossa Clínica" color="black">
                <section id="why-us" className="why-us">
                    <div className="container aos-init aos-animate" data-aos="fade-up">
                        <div className="row">
                            <QuadroComp numero={1} title="Experiência e Expertise" text="Nossa equipe altamente qualificada possui vasta experiência e expertise em cuidados veterinários, garantindo a melhor atenção para o seu pet." />
                            <QuadroComp numero={2} title="Cuidado Personalizado" text="Oferecemos um atendimento personalizado, compreendendo as necessidades individuais de cada animal e proporcionando soluções específicas para garantir seu bem-estar." />
                            <QuadroComp numero={3} title="Vínculo e Confiança" text="Valorizamos a relação entre você e seu pet, promovendo um ambiente acolhedor onde vocês se sintam confiantes e seguros, fortalecendo o vínculo entre ambos." />
                        </div>
                    </div>
                </section>
            </InfoComp>
            {/* complicado isso, adicionar serviços e comentários no DB?*/}
            <InfoComp headtext="ALGUNS" maintext="De Nossos Serviços" color="rgb(29, 27, 27)">
                <ListaComp itens={['Todos', 'Consultas', 'Exames', 'Especialidades']} />
            </InfoComp>
            <InfoComp headtext="DEPOIMENTOS" maintext="De alguns de nossos clientes" color="black">
                <CommentList />
            </InfoComp>
        </LayoutMain>
    )
}

/*

<InfoComp headtext="ALGUNS" maintext="De Nossos Serviços" color="rgb(29, 27, 27)">
                
</InfoComp>

*/