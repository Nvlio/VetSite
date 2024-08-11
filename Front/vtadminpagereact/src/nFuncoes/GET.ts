//função focada para a coleta de dados na url passada pelo cliente
export default async function GET(url: string) {
    console.log(url)

    let respfinal: Promise<any>
    respfinal = fetch(url, { method: 'GET', headers: { 'content-type': "application/json" } })
        .then((resposta) => { return resposta.json() })
        .then((resp) => {
            console.log(resp)
            return resp.itens?resp.itens:resp
        })
    return respfinal
}