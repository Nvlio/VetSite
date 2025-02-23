//função focada na atualização de dados na url com os dados passados pelo usuario
export default async function UPDATE(url:string, data:any,isForm?:String) {
    alert("Updated")
    let respfinal;
    if(isForm){
        respfinal = fetch(url, { method: "PUT", body: data })
        .then((resposta) => { return resposta.json() })
    }else{
        respfinal = fetch(url, { method: "PUT", headers: { "content-type": "application/json" }, body: data })
        .then((resposta) => { return resposta.json() })
    }
        
    
}