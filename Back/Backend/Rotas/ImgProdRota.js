import router from 'express'
import ImgProdControle from '../Controle/imgProdControle.js'
import multer from 'multer'
import path from 'path'

//cria objeto de rotas e de controle
const ImgProdRota = new router()
const imgProdtCtrl = new ImgProdControle()
const armazenamento = multer.memoryStorage({
    destination: function (req, file, cb) {
        const caminho = path.join("C:\\Users\\jgabr\\Downloads\\trabalho\\backup\\Imagens")
        cb(null, caminho);
    },
    filename: function (req, file, cb) {
        const nome = file.originalname + "_" + Date.now()
        cb(null,nome)
    }
})

const upload = multer({storage:armazenamento})

ImgProdRota
    .get("/:info", imgProdtCtrl.GETVAL)
    .post("/", upload.single("Produtos"),(req,resp,next)=>{imgProdtCtrl.POST(req,resp,next)})
    .delete("/:id", imgProdtCtrl.DELETE)

export default ImgProdRota