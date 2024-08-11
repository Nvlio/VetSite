import { Router } from "express";
import CommentsCTRL from "../Controle/ComentarioControle.js";

const rotaComment = new Router()
const comentario = new CommentsCTRL()

rotaComment
.get("/",comentario.GET)
.get("/:id",comentario.GETVAL)
.post("/",comentario.POST)
.put("/:id",comentario.PUT)
delete("/",comentario.DELETE)

export default rotaComment