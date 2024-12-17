import React, { useState, useEffect } from 'react';
import './Login.css';

function Login({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    
    useEffect(() => {
        if (localStorage.getItem('isAuthenticated') === 'true') {
            onLoginSuccess();
        }
    }, [onLoginSuccess]);

    const handleSubmit = (e) => {
        e.preventDefault();

        
        if (username === '20204055B' && password === 'password') {
            localStorage.setItem('isAuthenticated', 'true'); 
            onLoginSuccess();  
        } else {
            setErrorMessage('Credenciales incorrectas.');
        }
    };

    return (
        <div className="login-container">
            <h2>Iniciar sesión</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Código UNI:</label>
                <input 
                    type="text" 
                    id="username" 
                    placeholder="Ingrese su código" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                />
                <label htmlFor="password">Contraseña:</label>
                <input 
                    type="password" 
                    id="password" 
                    placeholder="Ingrese su contraseña" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <button type="submit">Iniciar sesión</button>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </form>
        </div>
    );
}

export default Login;
