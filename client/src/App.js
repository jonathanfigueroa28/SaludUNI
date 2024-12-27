import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import AppointmentScheduler from './SacarCita/Cita';
// import Medicamentos from './GestionMedicamentos/Medicamentos';
import Estudiantes from './InformacionEstudiantes/Estudiantes';
import Medicamento from './ConsultaMedicamentos/Medicamento';

import ScheduledAppointments from './SacarCita/Citas';

function App() {
    return (
        <div className="App">
            <header>
                <nav>

                    <Link to="/">Inicio</Link> | 
                    <Link to="/sacar-cita">Sacar Cita</Link> | 
                    <Link to="/botica">Botica</Link> | 
                    <Link to="/historia">Historias</Link> | 
                    <Link to="/reembolso">Reembolso</Link> | 
                    <Link to="/citas-programadas">Citas Programadas</Link>
                </nav>
            </header>

            <Routes>
                <Route
                    path="/"
                    element={
                        <div>
                            <h1>Centro Médico</h1>
                            <p>Bienvenido al Centro Médico. Selecciona una opción del menú.</p>
                            <Estudiantes/>
                        </div>
                    }
                />
                <Route path="/sacar-cita" element={<AppointmentScheduler />} />
                <Route path='/botica' element={<Medicamento />} />
                <Route path='/estudiante' element={<Estudiantes />}/>
                <Route path="/citas-programadas" element={<ScheduledAppointments />} />
            </Routes>
        </div>
    );
}

export default App;