import React from 'react'
import CurrencyInput from 'react-currency-input'

const Currency = (props) => {
	const divProps = Object.assign({}, props)
	delete divProps.inputRef

  return (
		<CurrencyInput
      {...divProps}
      onChangeEvent={(event, values) => {
        props.onChange({
          target: {
            value: event.target.value,
          },
        })
      }}
      decimalSeparator=","
      thousandSeparator="."
    />
  )
}

export default Currency