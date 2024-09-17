export default async function Inserir(url,body){
    const resposta = fetch(url,{method:"POST",headers:{"content-type":"application/json"},body:body})
    .then((resp)=>{return resp.json()})
    .then((resposta)=>{
        console.log(resposta)
        return resposta
    })

    return resposta
}