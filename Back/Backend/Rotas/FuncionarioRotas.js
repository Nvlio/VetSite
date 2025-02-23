import router from 'express'
import FuncionarioControle from '../Controle/FuncionarioControle.js'
import multer from 'multer';
import path from 'path';



//cria objeto de rotas e de controle
const FuncionarioRota = new router()
const CtrCLi = new FuncionarioControle()

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


//rotas de cliente, que chama os metodos de controle de acordo com link
FuncionarioRota
    .get('/', CtrCLi.GET)
    .post('/', CtrCLi.POST)
    .post('/:tipo', CtrCLi.LOGIN)
    .get('/:nome', CtrCLi.GETVal)
    .get("/:cpf/:tipo", CtrCLi.GETcpf)
    .put('/:cpf',upload.single("file"), (req, res,next) => { CtrCLi.PUT(req,res,next)})
    .delete('/:cpf', CtrCLi.DELETE)

export default FuncionarioRota