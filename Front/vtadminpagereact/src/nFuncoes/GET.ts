//função focada para a coleta de dados na url passada pelo cliente
export default async function GET(url: string) {

    let respfinal = await  fetch(url, { method: 'GET', headers: { 'ngrok-skip-browser-warning': 'true' } })
        .then((resposta) => { return resposta.json() })
        .then((resp) => {
            return resp.itens?resp.itens:resp
        })
    return respfinal
}