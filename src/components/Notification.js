import "./notification.css"

const ErrorNotification = ({ errorMessage }) => {
    if (errorMessage === null) {
      return null
    }
  
    return (
      <div className="error">
        {errorMessage}
      </div>
    )
}

const GreatNotification = ({ greatMessage }) => {
    if (greatMessage === null) {
      return null
    }
  
    return (
      <div className="great">
        {greatMessage}
      </div>
    )
}

  export { GreatNotification, ErrorNotification }