import { useState } from "react"

export const useForm = ( initialState = {} ) => {
  const [values, setValues] = useState(initialState)
  
  const reset = ( newFormState = initialState ) => {
    setValues(newFormState) // De esta manera, cuando se llame el reset, puedo establecer los valores que yo quiera
  }

  const handleInputChange = ({target}) => {
    setValues({
      ...values,
      [target.name]: target.value
    })
  }
  return [values, handleInputChange, reset]
}