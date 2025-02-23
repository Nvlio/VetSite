import { Router } from "express";
import Noticiacontrole from "../Controle/NoticiasControle.js";
import multer from "multer";
import path from "path";

const Noticias = new Noticiacontrole()
const NoticiaRota = new Router()

const armazenamento = multer.memoryStorage({
    destination: function (req, file, cb) {
        // Define o diretório de destino dinamicamente usando path.join para garantir a correta formatação do caminho
        const caminho = path.join("C:\\Users\\jgabr\\Downloads\\trabalho\\backup\\Imagens");
        cb(null, caminho);
    },
    filename: function (req, file, cb) {
        // Gera um nome de arquivo único
        const nomeArquivo = file.originalname + '-' + Date.now();
        cb(null, nomeArquivo);
    }
});

const upload = multer({ storage: armazenamento });

NoticiaRota
.get("/", Noticias.GET)
.get("/Limit/TOP/all",Noticias.GETTOP)
.get("/:tipo/:valor/:cpf", Noticias.GETVal)
.post("/", upload.single("noticia"), (req, res,next) => {Noticias.POST(req,res,next)})
.put("/:id", Noticias.PUT)
.put("/curtir/:id",Noticias.Curtir)
.delete("/:id/:img", Noticias.DELETE)

export default NoticiaRota;