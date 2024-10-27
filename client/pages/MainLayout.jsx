import React from 'react'
import { useNavigate } from 'react-router-dom';

const MainLayout = () => {
    const navigate = useNavigate();

    const goToPage = (target) => {
        navigate(target);
    };



    return (
        <div>
            <h1 className="center page-title">Air Quality Monitoring</h1>
            <div className="header-buttons">
                <button className="center-button" onClick={() => goToPage('/')}>Home</button>
                <button className="center-button" onClick={() => goToPage('/countries/')}>Countries</button>
            </div>
        </div>
    )
}

export default MainLayout
