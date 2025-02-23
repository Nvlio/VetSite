//class com os serviços ligados ao cadastro
export default class LoginServices {
    #api
    constructor() {
        this.#api = 'http://localhost:3002'
    }

    async Cadastrar(data) {
        const resp = await fetch(`${this.#api}/Clientes`,
            {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(data)
            })
            const resposta = await resp.json()
            const status =  resp.status
            return {resposta,status}
    }

    async cadastroget(api){
        const valorJson = await fetch(api,{method:"GET"})
        const valor = await valorJson.json()
        return valor
    }
}