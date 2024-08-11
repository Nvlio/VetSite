import React from "react";

//componente de um quadro, nesse quadro serve para mostrar itens.
export default function QuadroComp(props: { numero: number, title: string, text: string }) {
    return (
        <div className="col-lg-4 mt-4 mt-lg-0">
            <div className="box aos-init aos-animate" data-aos="zoom-in" data-aos-delay="200">
                <span>{props.numero}</span>
                <h4>{props.title}</h4>
                <p>{props.text}</p>
            </div>
        </div>
    )
}