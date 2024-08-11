//função focada na atualização de dados na url com os dados passados pelo usuario
export default async function UPDATE(url:string,lista:string, data:any) {
    const respfinal = fetch(url, { method: "PUT", headers: { "content-type": "application/json" }, body: data })
        .then((resposta) => { return resposta.json() })
        .then((resp) =>{
            if(resp.resp==="work"){
                window.location.href=lista==="Profile"?"/Profile":"/Lista"
            }
            window.location.href=lista==="Profile"?"/Profile":"/Lista"
        })
    
}