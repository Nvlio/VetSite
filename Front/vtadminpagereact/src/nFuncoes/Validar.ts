import { cpfValidator } from "cpf-validator-ianan";

//funções que verificam a dados:
//"""LEMBRAR DE ATUALIZAR PARA QUE RETORNE VALOR DOS DADOS """
export default async function Mask(value: string, tipo: string) {
    let regex: RegExp;
    let resultado;

    switch (tipo) {
        case "Email":
            regex = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)@([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)\.(com)$/;
            resultado = regex.test(value);
            break;
        case "CPF":
            resultado = cpfValidator(value)
            break;
        case "Telefone":
            regex = /^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/;
            resultado = regex.test(value);
            break;
        default:
            break;
    }
    return resultado
}

