//classe com serviços ligados a lista
export default class ListaServices {
    #api

    constructor() {
        this.#api = 'http://localhost:3002'
    }

    async GET(rota) {
        const data = await fetch(`${this.#api}/${rota}`)
        const resp = await data.json()
        const status = await data.status
        return { resp, status }
    }

    async GETby(rota,filtro) {
        console.log(`${this.#api}/${rota}/${filtro}`)
        const data = await fetch(`${this.#api}/${rota}/${filtro}`)
        const resp = await data.json()
        const status = await data.status
        return { resp, status }
    }
}