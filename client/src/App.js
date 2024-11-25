import React, { useState } from 'react';
import './App.css';
import Cita from './SacarCita/Cita';
import Login from './Login/Login';  // Importamos Login

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);  // Estado para verificar si el usuario está logueado
    const [showScheduler, setShowScheduler] = useState(false);  // Estado para manejar el flujo del scheduler

    // Función para manejar el login exitoso
    const handleLoginSuccess = () => {
        setIsLoggedIn(true);  // Si el login es exitoso, actualizar el estado a true
    };

    // Función para manejar el click en "Sacar Cita"
    const handleShowScheduler = () => {
        setShowScheduler(true);  // Cambiar a true cuando el usuario hace clic en "Sacar Cita"
    };

    return (
        <div className="App">
            {!isLoggedIn ? (
                // Si no está logueado, mostrar el componente Login
                <Login onLoginSuccess={handleLoginSuccess} />
            ) : !showScheduler ? (
                // Si está logueado pero no ha hecho clic en "Sacar Cita", mostrar el botón
                <div>
                    <h1>Centro Médico</h1>
                    <button onClick={handleShowScheduler}>Sacar Cita</button>
                </div>
            ) : (
                // Si ha hecho clic en "Sacar Cita", mostrar el componente Cita
                <Cita />
            )}
        </div>
    );
}

export default App;
