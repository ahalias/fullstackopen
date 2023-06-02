import { useState } from "react"

const useField = (name) => {
    const [value, setValue] = useState('')

    const onChange = (event, resetField = false) => {

        if (resetField) {
         setValue('')
        } else {
            setValue(event.target.value)
        }
    }




    return {
        name, 
        value, 
        onChange
    }

}




export default useField


