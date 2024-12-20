import React, { useState, useEffect } from 'react';
import './Login.css';

function Login({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [hasError, setHasError] = useState(false)
    
    useEffect(() => {
        if (localStorage.getItem('isAuthenticated') === 'true') {
            onLoginSuccess();
        }
    }, [onLoginSuccess]);

    const handleSubmit = (e) => {
        e.preventDefault();

        
        if (username === '20204055B' && password === 'password') {
            localStorage.setItem('isAuthenticated', 'true'); 
            setHasError(false);
            onLoginSuccess();  
        } else {
            setHasError(true);
            setErrorMessage('Credenciales incorrectas.');
        }
    };

    return (
        <div className="login-container">
            <h2>Centro Médico</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Código UNI:</label>
                <input 
                    type="text" 
                    id="username"
                    className={hasError ? 'input-error' : ''} 
                    placeholder="Ingrese su código" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value.toUpperCase())}

                />
                <label htmlFor="password">Contraseña:</label>
                <input 
                    type="password" 
                    id="password"
                    className={hasError ? 'input-error' : ''} 
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
