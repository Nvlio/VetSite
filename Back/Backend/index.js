import cors from "cors"
import express from "express"
import ClienteRota from "./Rotas/ClientesRotas.js"
import FuncionarioRota from "./Rotas/FuncionarioRotas.js"
import PacienteRota from "./Rotas/PacienteRotas.js"
import UnidRota from "./Rotas/UnidadesRota.js"
import ProdutoRota from "./Rotas/ProdutosRotas.js"
import NoticiaRota from "./Rotas/NoticiasRotas.js"
import EspecieRota from "./Rotas/especieRota.js"
import RacaRota from "./Rotas/RacaRota.js"
import rotaComment from "./Rotas/ComentariosRotas.js"

const porta = 3002
const host = "localhost"

const app = express()
app.use(cors({
    origin:"*"
}))
app.use(express.json())

app.use('/Clientes',ClienteRota)
app.use("/Funcionarios",FuncionarioRota)
app.use("/Pacientes",PacienteRota)
app.use("/Unidades",UnidRota)
app.use("/Noticia",NoticiaRota)
app.use("/Produtos",ProdutoRota)
app.use("/Especies",EspecieRota)
app.use("/Racas",RacaRota)
app.use("/Comentarios",rotaComment)

app.listen(porta,host,()=>{console.log(`conectado: www.${host}:${porta}`)})