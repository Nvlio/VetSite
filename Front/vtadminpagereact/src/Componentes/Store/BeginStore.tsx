import React from "react";
import { Image } from "react-bootstrap";

export default function BegCompStore(){
    return(
        <div style={{display:"flex",justifyContent:"center"}}>
            <div style={{alignSelf:"center",textAlign:"start"}}>
                <h4>Os melhores produtos para seu pet você encontra aqui</h4>
                <h5>E com as melhores ofertas!</h5>
            </div>
            <Image src="https://www.pixelstalk.net/wp-content/uploads/2016/03/Animals-baby-cat-dog-HD-wallpaper-620x349.jpg" height={"auto"} width={700}/>
        </div>
    )
}