import { createContext, useReducer } from 'react'

const notificationReducer = (state = null, action) => {
    switch (action.type) {
      case "MESSAGE":
        return action.payload
      case "ERROR":
        return action.payload
      default: return null
    }
  }

  const notificationContext = createContext()
  

  export const ContextProvider = props => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, null)

    return (
        <notificationContext.Provider value={[notification, notificationDispatch]}>
        {props.children}
        </notificationContext.Provider>
    )
  }


  export default notificationContext