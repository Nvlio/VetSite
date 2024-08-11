import React from "react";
import NavMenuBarComp from "../NComponentes/NavMenu.jsx";
import FooterComp from "../NComponentes/Footer.jsx";

//pagina dde layout, todos as pages vão conter esse Layout
export default function LayoutMain(props) {
    return (
        <>
            <div>
                <NavMenuBarComp />
                {props.children}
                <FooterComp />
            </div >
        </>
    )
}