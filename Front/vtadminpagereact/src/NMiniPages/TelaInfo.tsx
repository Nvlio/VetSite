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
