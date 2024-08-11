import { Router } from "express";
import UnidadeControle from "../Controle/UnidadeControle.js";

const UnidCtrl = new UnidadeControle()
const UnidRota = new Router()

//rotas de unidade
UnidRota
.get("/",UnidCtrl.GET)
.get("/:info",UnidCtrl.GETVAL)
.get("/:nome/:tipo",UnidCtrl.GETVAL)
.post("/",UnidCtrl.POST)
.put("/:id",UnidCtrl.PUT)
.delete("/:id",UnidCtrl.DELETE)

export default UnidRota