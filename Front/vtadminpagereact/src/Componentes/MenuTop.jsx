import React from "react";


export default function TopMenu(props) {
    return (
        <>
            {/* top site */}
            <div  className="d-flex align-items-center" >
                <div className="container d-flex justify-content-center justify-content-md-between">

                    <div className="contact-info d-flex align-items-center">
                        <i className="bi bi-phone d-flex align-items-center"><span>+55 (19) 3395-0058</span></i>
                        <i className="bi bi-clock d-flex align-items-center ms-4"><span> Atendimento 24H</span></i>
                    </div>

                    <div className="languages d-none d-md-flex align-items-center">
                        
                            {/* colocar links */}
                            PT/
                            BR
                        
                    </div>
                </div>
            </div>
        </>
    )
}