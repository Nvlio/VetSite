import router from "express"
import RacaControle from "../Controle/RacaControle.js"

//cria objeto de rotas e de controle
const RacaRota = new router()
const ProdtCtrl = new RacaControle()

RacaRota
.get("/",ProdtCtrl.GET)
.get("/:especie",ProdtCtrl.GETVAL)
.post("/",ProdtCtrl.POST)
.put("/:id",ProdtCtrl.PUT)
.delete("/:id",ProdtCtrl.DELETE)

export default RacaRota