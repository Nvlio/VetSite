import { Router } from "express";
import ContaControle from "../Controle/ContaControle.js";

const constaCtrl = new ContaControle()
const rotaConta = new Router()

//rotas de unidade
rotaConta
.get("/",constaCtrl.GET)
.get("/:tipoConta",constaCtrl.GETVAL)
.get("/:tipoConta/:extra",constaCtrl.GETVAL)
.get("/:unique/:outro/:id",constaCtrl.GETID)
.post("/",constaCtrl.POST)
.put("/:id",constaCtrl.PUT)

export default rotaConta