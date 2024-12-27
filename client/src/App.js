import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';
import AppointmentScheduler from './SacarCita/Cita';
import Estudiantes from './InformacionEstudiantes/Estudiantes';
import Medicamento from './ConsultaMedicamentos/Medicamento';
import ScheduledAppointments from './SacarCita/Citas';
import Login from './Login/Login';
function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const codigoEstudiante = localStorage.getItem('codigoEstudiante');
    const navigate = useNavigate(); // Hook para navegación programática


    useEffect(() => {
        if (localStorage.getItem('isAuthenticated') === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');  
        setIsAuthenticated(false);
        navigate('/'); // Redirige a la ventana de login
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
                            <Link to="/">Inicio</Link> | 
                            <Link to="/sacar-cita">Sacar Cita</Link> | 
                            <Link to="/botica">Botica</Link> |  
                            <Link to="/citas-programadas">Citas Programadas</Link>
                            <button onClick={handleLogout}>Cerrar sesión</button>
                        </nav>
                    </header>

                    <Routes>
                        <Route
                            path="/"
                            element={
                                <div>
                                    <h1>Centro Médico</h1>
                                    <p>Bienvenido al Centro Médico.Selecciona una opción del menú.</p>
                                    <Estudiantes />
                                </div>
                            }
                        />
                        <Route path="/sacar-cita" element={<AppointmentScheduler />} />
                        <Route path="/botica" element={<Medicamento />} />
                        <Route path="/estudiante" element={<Estudiantes />} />
                        <Route path="/citas-programadas" element={<ScheduledAppointments />} />
                    </Routes>
                </>
            )}           
        </div>
    );
}

export default App;
