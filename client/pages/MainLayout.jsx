import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthButtons from '../components/AuthButtons'

const MainLayout = ({pageTitle}) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [title, setTitle] = useState("Air Quality Monitoring")

    const goToPage = (target) => {
        navigate(target);
    };



    return (
        <div>
            {isLoggedIn ? "" : <AuthButtons />}
            <h1 className="center page-title">{pageTitle ? pageTitle : "Air Quality Monitoring"}</h1>
            <div className="header-buttons">
                <button className="center-button" onClick={() => goToPage('/')}>Home</button>
                <button className="center-button" onClick={() => goToPage('/countries/')}>Countries</button>
                <button className="center-button" onClick={() => goToPage('/countries/')}>My Locations</button>
            </div>
        </div>
    )
}

export default MainLayout
