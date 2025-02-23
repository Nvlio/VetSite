//classe com serviços ligados a lista
export default class ListaServices {
    #api

    constructor() {
        this.#api = 'http://localhost:3002'
    }

    async GET(rota) {
        let data
        let status
        let resp
        try {
            data = await fetch(`${this.#api}/${rota}`)
            resp = await data.json()
            status = await data.status
            console.log(resp)
            console.log(status)
        }
        //offline
        catch (e) {
            resp = [
                {
                    cpf: "01804724025",
                    nome: "João Gabriel",
                    telefone: "18991313131",
                    senha: "123",
                    email: "jgabriell2022@gmail.com"
                },
                {
                    cpf: "46478910890",
                    nome: "João Gabriel Caires Fernandes",
                    telefone: "18991095160",
                    senha: "senha123",
                    email: "jgabriell2009@gmail.com"
                },
                {
                    cpf: "56688779811",
                    nome: "beatriz",
                    telefone: "14141313141",
                    senha: "123",
                    email: "jgabriell2022@gmail.com"
                },
                {
                    cpf: "69894692001",
                    nome: "sdssfs",
                    telefone: "11213131313",
                    senha: "123",
                    email: "jgabriell2020@gmail.com"
                },
                {
                    cpf: "77181350048",
                    nome: "Jorge Amado",
                    telefone: "18991095160",
                    senha: "123",
                    email: "jgabriell2022@gmail.com"
                },
                {
                    cpf: "88135695055",
                    nome: "Jorge Amadim",
                    telefone: "18991095161",
                    senha: "123",
                    email: "jgabriell2022@gmail.com"
                }
            ];
            status = 200
        }
        return { resp, status }
    }

    async GETby(rota, filtro) {
        console.log(`${this.#api}/${rota}/${filtro}`)
        const data = await fetch(`${this.#api}/${rota}/${filtro}`)
        const resp = await data.json()
        const status = await data.status
        return { resp, status }
    }
}