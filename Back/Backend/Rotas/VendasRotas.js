import { Router } from "express";
import VendasControle from "../Controle/VendasControle.js";

const UnidCtrl = new VendasControle()
const rotaVenda = new Router()

//rotas de unidade
rotaVenda
.get("/",UnidCtrl.GET)
.get("/:info",UnidCtrl.GETVAL)
.get("/:nome/:tipo",UnidCtrl.GETVAL)
.get("/especifica/:id/tudo",UnidCtrl.GETSpecificVal)
.post("/",UnidCtrl.POST)

export default rotaVenda