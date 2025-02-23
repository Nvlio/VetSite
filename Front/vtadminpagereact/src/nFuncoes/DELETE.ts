//função focada na exclusão de dados da url passada pelo usuario
export default async function DELETE(url:string){
    alert("delete")

    const respFinal = fetch(`${url}`,{method:'DELETE'})
    .then((resposta)=>{return resposta.json()})
    .then((resp)=>{return resp})
    
    return respFinal
    
}