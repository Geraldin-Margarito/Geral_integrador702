import React, { useEffect, useState } from 'react';
import '../App.css';

const ListaDocentes = () => {
    const [docentes, setDocentes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://alex.starcode.com.mx/apiBD.php');
            const data = await response.json();
            setDocentes(data);
        };

        fetchData();

        const intervalId = setInterval(fetchData, 1000); // Actualizar cada 5 segundos

        return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
    }, []);

    return (
        <div className="table-container">
            <h1 className="table-title">DOCENTES INGENIERÍA INFORMÁTICA TESSFP</h1>
            <table className="docente-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Teléfono</th>
                        <th>Sexo</th>
                    </tr>
                </thead>
                <tbody>
                    {docentes.map((docente) => (
                        <tr key={docente.id}>
                            <td>{docente.id}</td>
                            <td>{docente.nombre}</td>
                            <td>{docente.telefono}</td>
                            <td>{docente.sexo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListaDocentes;
