import toBlob from "./Blob.ts";

const setImg = async (image: any, setLink: (src: any) => void) => {
    try {
        let src: any;
        if (image[0][0]) {
            const file = image[0][0].file
            const tipo = image[0][0].imagem

            const blob = await toBlob(file, tipo)
            src = URL.createObjectURL(blob)
            setLink(src)

        } else {
            src = "https://th.bing.com/th/id/R.c9a7dc5cbd6e3bff141f81e097cceebf?rik=TFN4ujldlAkJkg&riu=http%3a%2f%2fwallpapercave.com%2fwp%2fqkwoEmB.jpg&ehk=7T%2fZXliq65V6Ms0ifZ0%2bE0qf2bhmtXvGzwBOCwXPJtM%3d&risl=&pid=ImgRaw&r=0"
            setLink(src)
        }
    }
//offline
catch (e) {
    return
}


}

export default setImg