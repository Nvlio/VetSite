


//class com as funcionalidades de logar
export default class LoginServices {
    #api
    constructor() {
        this.#api = 'http://localhost:3002'
    }

    async Logar(isFuncionario, data) {
        try {
            const resp = await fetch(`${this.#api}/${isFuncionario ? "Funcionarios" : "Clientes"}/Login`,
                {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify(data)
                })
            const resposta = await resp.json()
            console.log(resposta)
            const status = resp.status
            console.log(status)
            return { resposta, status }
        }
        //funfar offline 
        catch (e) {
            const resposta = {
                info: {
                    CEP: "", bairro: "", cidade: "", cpf: "46478910890", email: "jgabriell2022@gmail.com", endereco: "", especialidade: "Engenheiro de software",
                    estado: "", funcao: "nutrição", nome: "João Gabriel", numero: "", salario: "", senha: "123", telefone: "18991095160",
                    unidade: 1
                }, resp: true, token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6ImpnYWJyaWVsbDIwMjJAZ21haWwuY29tIiwiU2VuaGEiOiIxMjMiLCJDb250YSI6ImZ1bmNpb25hcmlvIiwiY3BmIjoiNDY0Nzg5MTA4OTAiLCJpYXQiOjE3NDAzMzY1ODAsImV4cCI6MTc0MDM0MDE4MH0.5XoP9YjACkdyx94jzJqaHKwnyHTdz6VU87YnnYRTTI0"
            }

            const status = 200

            return { resposta, status }
        }
    }
}