import React, { useState } from 'react'
import '../src/CrashMessage.css'
import Mail from '../src/assets/fast-mail.svg'

const CrashMessage = () => {
    const [iconClicked, setIconClicked] = useState(false); 

    const handleIconClick = () => {
        setIconClicked(true); 
        window.location.href = "mailto:admin@example.com"; 
      };

  return (
    <div className="error-container">
        <h1 className="error-title">Warning</h1>
        <p className="error-message">This map has crashed. Please contact the administrator.</p>
        <p className="error-contact">
            Email: 
            <a href="mailto:admin@example.com" className="error-email">cdev@proton.me</a>
            <span className="email-icon" onClick={handleIconClick}>
                <img src={Mail} alt="Email Icon" className={`icon ${iconClicked ? 'clicked' : ''}`} />
            </span>
        </p>
    </div>
  )
}

export default CrashMessage
