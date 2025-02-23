export default class CarrinhoProduto {
    #objeto
    #carrinhoLocal

    constructor(item) {
        this.#objeto = item
        this.#carrinhoLocal = [];
    }

    Adicionar() {
        if (this.#objeto.quantidade === 0 || isNaN(this.#objeto.quantidade)) {
            return ("Erro")
        } else {
            const Existe = this.#carrinhoLocal.find(item => item.idProd === this.#objeto.idProd)
            if (Existe) {
                this.#carrinhoLocal = this.#carrinhoLocal.map((item) =>
                    item.idProd === this.#objeto.idProd && item.totaldisp > 0 ?
                        {
                            ...item,
                            valor: item.valor += this.#objeto.valor,
                            quantidade: item.quantidade += parseInt(this.#objeto.quantidade),
                            totaldisp: item.totaldisp -= parseInt(this.#objeto.quantidade)
                        } : item
                )
            } else {
                this.#carrinhoLocal.push(this.#objeto)
            }

            localStorage.setItem("carrinho", JSON.stringify(this.#carrinhoLocal))
        }

    }

    Apagar() {
        localStorage.removeItem("carrinho")
    }

    async Coletar() {
        return this.#carrinhoLocal
    }

    Remover(idProd) {
        const newLista = []

        const Existe = this.#carrinhoLocal.find(item => item.idProd === idProd)
        if (Existe) {
            this.#carrinhoLocal.map((item) => {
                if (item.idProd !== idProd) {
                    newLista.push(item)
                }
            }

            )
            console.log(newLista)
        }
        localStorage.setItem("carrinho", JSON.stringify(newLista))

    }
}