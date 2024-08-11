import router from 'express'
import PacienteControle from '../Controle/PacienteControle.js'

//cria objeto de rotas e de controle
const PacienteRota = new router()
const pacCLi = new PacienteControle()

//rotas de cliente, que chama os metodos de controle de acordo com link
PacienteRota
.get("/",pacCLi.GETALL)
.get('/:cpf',pacCLi.GET)
.post('/',pacCLi.POST)
.get('/:cpf/:nome',pacCLi.GETVal)
.get('/:cpf/:nome/:dono',pacCLi.GETVal)
.put('/:id',pacCLi.PUT)
.delete('/:id',pacCLi.DELETE)

export default PacienteRota