import React from 'react';
import imgLogo from '../public/quiz-logo.png';

export default function Header(){

    return (
        <header>
            <img src={imgLogo} alt="Quiz Logo" />    
            <h1>Quiz</h1>
        </header>
    );
}
