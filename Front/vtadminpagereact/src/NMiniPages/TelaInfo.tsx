import React from "react";

//minipage de informação
export default function InfoComp(props: { headtext: string, maintext: string,children:React.ReactNode,color:string }) {

    return (
        <section className="Tela" style={{ backgroundColor: `${props.color}`}}>
            <div className="container aos-init aos-animate" data-aos="fade-up">

                <div className="section-title">
                    <h2>{props.headtext}</h2>
                    <p>{props.maintext}</p>
                </div>
                <div>
                    {props.children}
                </div>
            </div>
        </section>
    )
}


/*

<section id="why-us" className="why-us">
            <div className="container aos-init aos-animate" data-aos="fade-up">

                <div className="section-title">
                    <h2>Por que</h2>
                    <p>Escolher Nossa Clínica</p>
                </div>

                <div className="row">

                    <div className="col-lg-4">
                        <div className="box aos-init aos-animate" data-aos="zoom-in" data-aos-delay="100">
                            <span>01</span>
                            <h4>Experiência e Expertise</h4>
                            <p>ossa equipe altamente qualificada possui vasta experiência e expertise em cuidados veterinários,
                                garantindo a melhor atenção para o seu pet.</p>
                        </div>
                    </div>

                    <div className="col-lg-4 mt-4 mt-lg-0">
                        <div className="box aos-init aos-animate" data-aos="zoom-in" data-aos-delay="200">
                            <span>02</span>
                            <h4>Cuidado Personalizado</h4>
                            <p>Oferecemos um atendimento personalizado, compreendendo as necessidades individuais de cada animal e
                                proporcionando soluções específicas para garantir seu bem-estar.</p>
                        </div>
                    </div>

                    <div className="col-lg-4 mt-4 mt-lg-0">
                        <div className="box aos-init aos-animate" data-aos="zoom-in" data-aos-delay="300">
                            <span>03</span>
                            <h4>Vínculo e Confiança</h4>
                            <p>Valorizamos a relação entre você e seu pet, promovendo um ambiente acolhedor onde vocês se sintam
                                confiantes e seguros, fortalecendo o vínculo entre ambos.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

*/