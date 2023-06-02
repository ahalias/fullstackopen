import notificationContext from "../context"
import { useContext } from "react"

const Notification = () => {


  const [notification, notificationDispatch] = useContext(notificationContext)


  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
