//função que transfroma em base64

import fs from 'fs'

//função para converter para 64
export default function toBASE64(file){
    const bufferFile = fs.readFileSync(file)
    const B64file = bufferFile.toString('base64')
    return B64file
}