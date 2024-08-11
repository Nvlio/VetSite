import router from "express"
import especieControle from "../Controle/especieControle.js"

//cria objeto de rotas e de controle
const EspecieRota = new router()
const ProdtCtrl = new especieControle()

EspecieRota
.get("/",ProdtCtrl.GET)
.get("/:info",ProdtCtrl.GETVAL)
.post("/",ProdtCtrl.POST)
.put("/:id",ProdtCtrl.PUT)
.delete("/:id",ProdtCtrl.DELETE)

export default EspecieRota