import  Jwt  from "jsonwebtoken"

const Autenticacao = Jwt

export class Autenticador{
    

    async autenticar(valor){
        if (valor.Email && valor.Senha){
            try{
                const chave = valor.Senha
                console.log("Sou valor",valor)
                const token = Autenticacao.sign(valor,chave,{expiresIn:60*60})
                return token
            }catch(err){
                return 0
            }
        }else{
            return 0
        }
    }

}




