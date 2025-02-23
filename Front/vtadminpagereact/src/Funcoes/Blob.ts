export default async function toBlob(file: any, tipo: any) {

        const byteChar = atob(file)
        const byteNum = new Array(byteChar.length)
        for (let i = 0; i < byteChar.length; i++) {
            byteNum[i] = byteChar.charCodeAt(i)
        }
        const byteArray = new Uint8Array(byteNum)
        const blob = new Blob([byteArray], { type: `image/${tipo}` })
        return blob
}