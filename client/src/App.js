import React, { useState } from 'react';
import './App.css';
import Cita from './SacarCita/Cita';

function App() {
    const [showScheduler, setShowScheduler] = useState(false);

    const handleShowScheduler = () => {
        setShowScheduler(true);
    };

    return (
        <div className="App">
            {!showScheduler ? (
                <div>
                    <h1>Centro Médico</h1>
                    <button onClick={handleShowScheduler}>Sacar Cita</button>
                </div>
            ) : (
                <Cita />

            )}
        </div>
    );
}

export default App;
