import fs from 'fs'

export default async function Exclude(name){
    const path = 'C:\\Users\\jgabr\\Downloads\\trabalho\\backup\\Imagens\\posts'

            fs.unlink(`${path}/${name}`,(err)=>{
                if(err){
                    return {msg:err}
                }else{
                    return {msg:"imagem excluida com sucesso!"}
                }
            })
    
}