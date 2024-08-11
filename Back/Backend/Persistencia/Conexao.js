import mysql from "mysql2/promise"

//função que conecta com o database da loja
async function Conectar(){
    if (global.conexao){
        return global.conexao
    }else{
        const conexao = await mysql.createConnection({
            host:'localhost',
            user:'root',
            password:"",
            database:"vettemp"
        })
        global.conexao = conexao
        return global.conexao
    }
}

export default Conectar