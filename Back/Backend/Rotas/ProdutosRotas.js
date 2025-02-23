import router from 'express'
import ProdutoControle from '../Controle/ProdutoControle.js'
import multer from 'multer';
import path from 'path';

//cria objeto de rotas e de controle
const ProdutoRota = new router()
const ProdtCtrl = new ProdutoControle()
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


ProdutoRota
.get("/",ProdtCtrl.GET)
.get("/limite/Filtro/:Primeiro/:Segundo",ProdtCtrl.GETbyFilter)
.get("/identificar/:id",ProdtCtrl.GETVAL)
.get("/:info",ProdtCtrl.GETVAL)
.get("/wImages/tudo",ProdtCtrl.GetImages)
.post("/",upload.fields([{name:"imagem0"},{name:"imagem1"},{name:"imagem2"},{name:"imagem3"}]), (req, res,next) => {ProdtCtrl.POST(req,res,next)})
.put("/:id",ProdtCtrl.PUT)
.delete("/:id",ProdtCtrl.DELETE)

export default ProdutoRota