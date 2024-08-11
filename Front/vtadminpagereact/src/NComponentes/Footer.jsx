import React from "react";
import "../CSS/Proprio.css";


//componente para o footer da pagina
export default function FooterComp() {
    return (
        <>
            <div className="Footer">
                <footer id="footer">
                    <div className="footer-top">
                        <div className="container">
                            <div className="row">

                                <div className="col-lg-3 col-md-6">
                                    <div className="footer-info">
                                        <h3>CãoXonado</h3>
                                        <p>

                                            Barao Geraldo - Rua Angelo Vicentim, 550 <br />
                                            Jardim Santa Genebra, Campinas - SP, 13084-460<br /><br />
                                            <strong>celular:</strong> (19) 3249-2599<br />
                                            <strong>Email:</strong> saude@caoxonado.com<br />
                                        </p>
                                        <div className="social-links mt-3">
                                            <a href="https://x.com/hcaoxonado" className="twitter"><i className="bx bxl-twitter"></i></a>
                                            <a href="https://www.facebook.com/caoxonado/?locale=pt_BR" className="facebook"><i className="bx bxl-facebook"></i></a>
                                            <a href="https://www.instagram.com/clinicacaoxonado/" className="instagram"><i className="bx bxl-instagram"></i></a>
                                            <a href="https://www.linkedin.com/company/caoxonado/?originalSubdomain=br" className="linkedin"><i className="bx bxl-linkedin"></i></a>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-2 col-md-6 footer-links">
                                    <h4>Useful Links</h4>
                                    <ul>
                                        <li><i className="bx bx-chevron-right"></i> <a href="/">Home</a></li>
                                        <li><i className="bx bx-chevron-right"></i> <a href="/">About us</a></li>
                                        <li><i className="bx bx-chevron-right"></i> <a href="/">Services</a></li>
                                        <li><i className="bx bx-chevron-right"></i> <a href="/">Terms of service</a></li>
                                        <li><i className="bx bx-chevron-right"></i> <a href="/">Privacy policy</a></li>
                                    </ul>
                                </div>

                                <div className="col-lg-3 col-md-6 footer-links">
                                    <h4>Our Services</h4>
                                    <ul>
                                        <li><i className="bx bx-chevron-right"></i> <a href="/">Web Design</a></li>
                                        <li><i className="bx bx-chevron-right"></i> <a href="/">Web Development</a></li>
                                        <li><i className="bx bx-chevron-right"></i> <a href="/">Product Management</a></li>
                                        <li><i className="bx bx-chevron-right"></i> <a href="/">Marketing</a></li>
                                        <li><i className="bx bx-chevron-right"></i> <a href="/">Graphic Design</a></li>
                                    </ul>
                                </div>

                                <div className="col-lg-4 col-md-6 footer-newsletter">
                                    <h4>Our Newsletter</h4>
                                    <p>Tamen quem nulla quae legam multos aute sint culpa legam noster magna</p>
                                    <form action="" method="post">
                                        <input type="email" name="email" /><input type="submit" value="Subscribe" />
                                    </form>

                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="container">
                        <div className="copyright">
                            &copy; Copyright <strong><span>Site CãoXonado</span></strong>. All Rights Reserved
                        </div>
                        <div className="credits">
                            Designed by João Gabriel & Rafaela Curtis
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}