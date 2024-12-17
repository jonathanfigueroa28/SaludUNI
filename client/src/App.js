import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import AppointmentScheduler from './SacarCita/Cita';
import Login from './Login/Login';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Verificar si el usuario ya está autenticado al cargar la página
    useEffect(() => {
        if (localStorage.getItem('isAuthenticated') === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');  // Limpiar el estado de autenticación
        setIsAuthenticated(false);
    };

    return (
        <div className="App">
            {!isAuthenticated ? (
                <Routes>
                    <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
                </Routes>
            ) : (
                <>
                    <header>
                        <nav>
                            <Link to="/">Inicio</Link> | <Link to="/sacar-cita">Sacar Cita</Link> | <Link to="/Botica">Botica</Link> | <Link to="/Historia">Historias</Link> | <Link to="/Reembolso">Reembolso</Link> 
                            <button onClick={handleLogout}>Cerrar sesión</button>
                        </nav>
                    </header>

                    <Routes>
                        <Route
                            path="/"
                            element={
                                <div>
                                    <h1>Centro Médico</h1>
                                    <p>Bienvenido al Centro Médico. Selecciona una opción del menú.</p>
                                </div>
                            }
                        />
                        <Route path="/sacar-cita" element={<AppointmentScheduler />} />
                    </Routes>
                </>
            )}
        </div>
    );
}

export default App;

