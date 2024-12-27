import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Login.css';

function Login({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [hasError, setHasError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Enviar las credenciales al servidor
        axios.post('/api/estudiantes/login', { codigo: username, contraseña: password })
            .then((response) => {
                // Si la autenticación es exitosa
                console.log('Autenticación exitosa:', response.data);
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('codigoEstudiante', response.data.estudianteId);
                setHasError(false);
                onLoginSuccess();
            })
            .catch((error) => {
                // Si ocurre un error (por ejemplo, contraseña incorrecta)
                console.error('Error al autenticar:', error);
                setHasError(true);
                setErrorMessage('Credenciales incorrectas');
            });
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