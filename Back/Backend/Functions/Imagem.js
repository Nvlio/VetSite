import fs from "fs"
import path from 'path'

export default function salvarIMG(body,file) {
    console.log('fui chamado')
    const caminho = 'C:\\Users\\jgabr\\Downloads\\trabalho\\backup\\Imagens\\posts';


    let nomeArquivo;
    for (let chave of Object.keys(file)){
        console.log(chave)
    }
    nomeArquivo = body.title+"."+body.imagemnome.split(".")[1]
    const caminhoCompleto = path.join(caminho, nomeArquivo)
    const buffer64 = file.buffer.toString("base64")

    try {
        fs.writeFileSync(caminhoCompleto,buffer64,'base64')

        console.log("arquivo adicionado no servidor")
    } catch (err) {
        console.log('Algo deu errado')
        return -1
    }

    return true
}