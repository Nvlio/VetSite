import React from "react";
import { formatDateTime } from "../../utils/date.js"
import { maskCpfCnpj } from '../../utils/mask/cpf-cnpj'
import { maskPhone } from '../../utils/mask/phone'

export default function ListaUnica(props) {
    if (props.Lista === "Clientes") {
        return (
            <>
                <td className="text-left">{maskCpfCnpj(props.item.cpf)}</td>
                <td className="text-left">{props.item.nome}</td>
                <td className="text-left">{maskPhone(props.item.telefone)}</td>
                <td className="text-left">{props.item.email}</td>
                <td className="text-left">{props.item.rg}</td>
                <td className="text-left">{props.item.profissao}</td>
            </>

        )
    }
    if (props.Lista === "Funcionarios") {
        return (
            <>
                <td className="text-left">{maskCpfCnpj(props.item.cpf)}</td>
                <td className="text-left">{props.item.nome}</td>
                <td className="text-left">{maskPhone(props.item.telefone)}</td>
                <td className="text-left">{props.item.email}</td>
                <td className="text-left">{props.item.especialidade}</td>
                <td className="text-left">{props.item.funcao}</td>
                <td className="text-left">{props.item.unidade}</td>
            </>
        )
    }
    if (props.Lista === "Unidades") {
        return (
            <>
                <td className="text-left">{props.item.unidade}</td>
                <td className="text-left">{props.item.nome}</td>
                <td className="text-left">{maskPhone(props.item.telefone)}</td>
                <td className="text-left">{props.item.endereco}</td>
            </>
        )
    }
    if (props.Lista === "Produtos") {
        return (
            <>
                <td className="text-left">{props.item.nome}</td>
                <td className="text-left">{props.item.valor}</td>
                <td className="text-left">{props.item.quantidade}</td>
                <td className="text-left">{props.item.fornecedor}</td>
                <td className="text-left">{props.item.descricao}</td>
            </>
        )
    }
    if (props.Lista === "Pacientes") {
        console.log(props.item)
        return (
            <>
                <td className="text-left">{props.item.sexo}</td>
                <td className="text-left">{props.item.especie}</td>
                <td className="text-left">{props.item.raca}</td>
                <td className="text-left">{props.item.nome}</td>
                <td className="text-left">{props.item.dono}</td>
                <td className="text-left">{props.item.porte}</td>
            </>

        )
    }
    if (props.Lista === "Compras") {
        return (
            <>
                <td className="text-left">{props.item.cpf}</td>{/*mudar*/}
                <td className="text-left">{props.item.prodId}</td>{/*mudar*/}
                <td className="text-left">{formatDateTime(props.item.data)}</td>
                <td className="text-left">{props.item.qntd}</td>
                <td className="text-left">{props.item.valor}</td>
            </>

        )
    }
    if (props.Lista === "Vendas") {
        return (
            <>
                <td className="text-left">{props.item.cpf}</td>{/*mudar*/}
                <td className="text-left">{formatDateTime(props.item.data)}</td>
                <td className="text-left">{props.item.valor}</td>
                <td className="text-left">{props.item.formaPagamento}</td>
            </>
        )
    }
}