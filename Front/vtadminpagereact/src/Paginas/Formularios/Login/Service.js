


//class com as funcionalidades de logar
export default class LoginServices {
    #api
    constructor() {
        this.#api = 'http://localhost:3002'
    }

    async Logar(isFuncionario, data) {
        const resp = await fetch(`${this.#api}/${isFuncionario ? "Funcionarios" : "Clientes"}/Login`,
            {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(data)
            })
            const resposta = await resp.json()
            const status =  resp.status
            return {resposta,status}
    }
}