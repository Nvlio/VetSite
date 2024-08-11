import CommentMod from "../Modelo/ComentarioModelo.js";

export default class CommentDB {
    #regex = /^[\p{L}\p{M}]+/u;
    async GET(conexao) {
        try {
            const sqlcode = "SELECT comentarios.elogio,comentarios.text,usuario.nome AS dono,comentarios.id FROM comentarios INNER JOIN usuario ON comentarios.cpf_dono = usuario.cpf ORDER BY id DESC LIMIT 5"
            const [itens] = await conexao.query(sqlcode)
            const lista = []

            for (let item of itens) {
                const nome = item.dono.match(this.#regex)
                const model = new CommentMod(item.elogio, item.text, nome, item.id, item.data)
                lista.push(model.ToJSON())
            }

            return lista
        } catch (e) {
            return e
        }
    }
}