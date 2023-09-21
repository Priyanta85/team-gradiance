import React, { Component } from 'react';
import SpeechToText from './components/SpeechToTextEngine';
import "./nav.css"
import { useState } from 'react';

export default function App() {

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    return(
        <div>
        <div className="navbar">
        <div className="navbar-container">
            <div className="navbar-menu-icon" onClick={toggleMenu}>
            <div className={`menu-line${menuOpen ? ' open' : ''}`}></div>
            <div className={`menu-line${menuOpen ? ' open' : ''}`}></div>
            <div className={`menu-line${menuOpen ? ' open' : ''}`}></div>
            </div>
            <div className="navbar-title">Agent's Wingman</div>
            <div className={`navbar-menu${menuOpen ? ' open' : ''}`}>
            <div className="navbar-item">Home</div>
            <div className="navbar-item">Search</div>
            <div className="navbar-item">Recent</div>
            <div className="navbar-item">Incoming</div>
            <div className="navbar-item">Outgoing</div>
            <div className="navbar-item">
                <i className="fas fa-cog"></i>
            </div>
            </div>
        </div>
        </div>
            <SpeechToText/>
        </div>
    )
}