import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation} from 'react-router-dom';
import AuthButtons from '../components/AuthButtons'

const MainLayout = ({pageTitle}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [title, setTitle] = useState("Air Quality Monitoring")

    const goToPage = (target) => {
        navigate(target);
    };

    const isActive = (path) => location.pathname === path ? 'active' : '';

    useEffect(() => {
        if(pageTitle){
            setTitle(pageTitle)
        } else{
            return;
        }
    }, [pageTitle])

    return (
        <div>
            {isLoggedIn ? "" : <AuthButtons />}
            <h1 className="center page-title">{title ? title : "Air Quality Monitoring"}</h1>
            <div className="header-buttons">
                <button className={`center-button ${isActive('/')}`} onClick={() => goToPage('/')}>Home</button>
                <button className={`center-button ${isActive('/countries/') || isActive('/countries/:id') || isActive('/countries/:id/:id')}`} onClick={() => goToPage('/countries/')}>Countries</button>
                <button className={`center-button ${isActive('/my-sensors/')}`} onClick={() => goToPage('/my-sensors/')}>My Locations</button>
            </div>
        </div>
    )
}

export default MainLayout
