import fs from "fs"
import path from 'path'

export default function salvarIMG(body, file, outro, config = "",isPerfil) {
    console.log(file)
    try {
        const caminho = 'C:\\Users\\jgabr\\Downloads\\trabalho\\backup\\Imagens\\posts';
        const caminho2 = 'C:\\Users\\jgabr\\Downloads\\trabalho\\backup\\Imagens\\produtos';
        const caminho3 = 'C:\\Users\\jgabr\\Downloads\\trabalho\\backup\\Imagens\\Perfil';

        let nomeArquivo;
        let caminhoCompleto;
        if (config === "multiple") {
            let ind = 0
            for (let chave of Object.keys(file)) {
                nomeArquivo = body.nome + `[${ind}].` + file[chave][0].originalname.split(".")[1]
                ind += 1
                caminhoCompleto = path.join(caminho2, nomeArquivo)
                const buffer64 = file[chave][0].buffer.toString("base64")
                fs.writeFileSync(caminhoCompleto, buffer64, 'base64')
            }
        } else {
            console.log(file)
            console.log(body)
            nomeArquivo = isPerfil?outro+"."+file.originalname.split(".")[1]:file.originalname
            caminhoCompleto = path.join(isPerfil?caminho3:caminho, nomeArquivo)
            const buffer64 = file.buffer.toString("base64")
            fs.writeFileSync(caminhoCompleto, buffer64, 'base64')
        }
        
        
        console.log("arquivo adicionado no servidor")

    } catch (err) {
        console.log(err)
        console.log('Algo deu errado')
        return -1
    }

    return true
}