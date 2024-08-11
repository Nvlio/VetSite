import React from "react";
import { Nav } from "react-bootstrap";
import "../CSS/Crescer.css";

export default function NavMenu(props) {
    return (
        <Nav className="nav-menu-wrapper navbar">
            <Nav.Item>
                <Nav.Link href="#home">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="#features">Features</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav.Item>
        </Nav>
    );
}
