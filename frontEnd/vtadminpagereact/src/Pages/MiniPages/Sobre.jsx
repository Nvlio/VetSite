
import { TabelaLista } from '../../Componentes/Tabela';
import backgroundImage from '../../public/about-bg2.jpg'; // Importe a imagem


export function Default() {
    const imgBk = [backgroundImage]

    return (
        <div style={{
            position: 'relative',
            backgroundImage: `url(${imgBk[0]})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: 'cover',
            height: '90vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', // Centraliza o conteúdo verticalmente
            justifyContent: 'center' // Centraliza o conteúdo horizontalmente
        }}>
            <div style={{ backgroundColor: "black", height: "100%", width: "100%", opacity: '60%', position: "absolute" }}></div>
            <TabelaLista />
        </div>
    )
}
