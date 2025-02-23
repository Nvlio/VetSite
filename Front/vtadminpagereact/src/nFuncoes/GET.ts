//função focada para a coleta de dados na url passada pelo cliente
export default async function GET(url: string) {
    alert("GET")
    try {
        console.log(url)
        let respfinal = await fetch(url, { method: 'GET', headers: { 'ngrok-skip-browser-warning': 'true' } })
            .then((resposta) => { return resposta.json() })
            .then((resp) => {
                return resp.itens ? resp.itens : resp
            })
        console.log(respfinal)
        return respfinal
    }
    //sem net
    catch (e) {
        const respfinal = {
            CEP: "19400612",
            bairro: "jardim eldorado",
            cidade: "Presidente Venceslau",
            cpf: "46478910890",
            email: "jgabriell2022@gmail.com",
            endereco: "antonio roque dos santos",
            especialidade: "Engenheiro de software",
            estado: "SP",
            funcao: "nutrição",
            nome: "João Gabriel",
            nomeArquivo: "João Gabriel.jpg",
            numero: "235",
            salario: "12000.00",
            senha: "123",
            telefone: "18991095160",
            unidade: 1
        };
        return respfinal

    }
}