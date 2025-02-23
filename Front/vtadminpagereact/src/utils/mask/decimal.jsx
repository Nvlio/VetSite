import { NumericFormat } from 'react-number-format'

export function maskDecimal(value, config = {}) {
  return (
    <NumericFormat
      fixedDecimalScale
      value={value}
      displayType="text"
      decimalSeparator={config.decimalSeparator ?? ','}
      thousandSeparator={config.thousandSeparator ?? '.'}
      decimalScale={config.precision ?? 2}
      prefix={config.prefix ?? ''}
    />
  )
}

export const maskMoney = (value) => maskDecimal(value, { prefix: 'R$ ' })
export const tableMaskMoney = (value) => (
  <div className="flex text-left">
    <div className="flex-1">R$</div>
    <div>{maskDecimal(value)}</div>
  </div>
)
