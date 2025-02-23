import { Router } from "express";
import CompraControle from "../Controle/CompraControle.js";

const UnidCtrl = new CompraControle()
const rotaCompra = new Router()

//rotas de unidade
rotaCompra
.get("/",UnidCtrl.GET)
.get("/:info",UnidCtrl.GETVAL)
.get("/:nome/:produto",UnidCtrl.GETVAL)
.post("/",UnidCtrl.POST)

export default rotaCompra