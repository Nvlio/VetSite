import { PatternFormat } from 'react-number-format'

export function maskCpfCnpj(cpf) {
  return cpf ? (
    <PatternFormat value={cpf} displayType="text" format={cpf.length <= 11 ? '###.###.###-##' : '##.###.###/####-##'} />
  ) : (
    ''
  )
}
