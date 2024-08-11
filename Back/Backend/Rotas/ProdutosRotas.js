import router from 'express'
import ProdutoControle from '../Controle/ProdutoControle.js'

//cria objeto de rotas e de controle
const ProdutoRota = new router()
const ProdtCtrl = new ProdutoControle()

ProdutoRota
.get("/",ProdtCtrl.GET)
.get("/:info",ProdtCtrl.GETVAL)
.post("/",ProdtCtrl.POST)
.put("/:id",ProdtCtrl.PUT)
.delete("/:id",ProdtCtrl.DELETE)

export default ProdutoRota