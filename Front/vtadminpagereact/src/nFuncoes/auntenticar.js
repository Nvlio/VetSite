import { jwtDecode } from "jwt-decode";
import { useLocation } from "react-router-dom";
// import { Contexto } from "../Contextualizacao";

//função que autentica o token retornado
export async function Autenticar(token) {

  try {
    localStorage.setItem('token', token);

    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      console.error("Token não encontrado");
      return; 
    }

    const tokenID = jwtDecode(storedToken);

    

    return true;
  } catch (error) {
    return false; 
  }
}

//função que checa para ver se o token ainda esta disponivel
export function CheckAuteticacao() {
    try {
        const token = jwtDecode(localStorage.getItem("token"))
        if (!token.exp) {
            return false
        } else {
            const data = new Date().getTime()
            if (token.exp >= data / 1000) {
                return token
            } else {
                //LogOut()
                return false
            }
        }
    } catch (e) {
        return false
    }
}

export function LogOut() {
    
    try {
        localStorage.removeItem("token")
        window.location.href="/"
        return 
    } catch (e) {
    }
}

