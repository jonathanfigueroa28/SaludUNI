import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import AppointmentScheduler from './SacarCita/Cita';

function App() {
    return (
        <div className="App">
            <header>
                <nav>
                    <Link to="/">Inicio</Link> | <Link to="/sacar-cita ">Sacar Cita</Link> | <Link to=" /Botica">Botica</Link>| <Link to=" /Historia">Historias</Link> | <Link to=" /Reembolso">Reembolso</Link>     
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
        </div>
    );
}

export default App;
