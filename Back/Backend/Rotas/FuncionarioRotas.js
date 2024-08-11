import router from 'express'
import FuncionarioControle from '../Controle/FuncionarioControle.js'

//cria objeto de rotas e de controle
const FuncionarioRota = new router()
const CtrCLi = new FuncionarioControle()

//rotas de cliente, que chama os metodos de controle de acordo com link
FuncionarioRota
.get('/',CtrCLi.GET)
.post('/',CtrCLi.POST)
.post('/:tipo',CtrCLi.LOGIN)
.get('/:nome',CtrCLi.GETVal)
.get("/:cpf/:tipo",CtrCLi.GETcpf)
.put('/:cpf',CtrCLi.PUT)
.delete('/:cpf',CtrCLi.DELETE)

export default FuncionarioRota