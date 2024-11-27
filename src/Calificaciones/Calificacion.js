import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import '../App.css';

const Calificacion = () => {
    const [alumnos, setAlumnos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://alex.starcode.com.mx/apiAlumnos.php');
            const data = await response.json();
            setAlumnos(data);
        };

        fetchData();
    }, []);

    return (
        <div className="calificacion-container">
            <h1 className="table-title">Calificaciones de los Alumnos</h1>
            {alumnos.map((alumno) => {
                const practicas = Object.entries(alumno.practicas);
                const promedio =
                    practicas.reduce((sum, [, calificacion]) => sum + parseFloat(calificacion), 0) /
                    practicas.length;

                // Determinar el color según el promedio
                const promedioColor = promedio >= 7 ? '#A8E6A1' : '#FF9AA2'; // Verde pastel o rojo pastel

                // Datos para la gráfica de barras
                const barData = {
                    labels: practicas.map(([practica]) => practica.replace('practica_', '').toUpperCase()),
                    datasets: [
                        {
                            label: `Calificaciones de ${alumno.nombre}`,
                            data: practicas.map(([, calificacion]) => parseFloat(calificacion)),
                            backgroundColor: ['#36a2eb', '#ff6384', '#4bc0c0', '#ffcd56', '#33FFCC'],
                        },
                    ],
                };

                // Datos para la gráfica de promedio
                const pieData = {
                    labels: ['Promedio', 'Faltante'],
                    datasets: [
                        {
                            data: [promedio, 10 - promedio],
                            backgroundColor: [promedioColor, '#e0e0e0'],
                        },
                    ],
                };

                return (
                    <div key={alumno.id} className="alumno-section">
                        <h2>{alumno.nombre} (Cuenta: {alumno.cuenta})</h2>
                        <div className="charts">
                            <div className="chart">
                                <h3>Calificaciones por Práctica</h3>
                                <Bar data={barData} options={{ responsive: true, maintainAspectRatio: true }} />
                            </div>
                            <div className="chart small-chart">
                                <h3>Promedio</h3>
                                <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: true }} />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Calificacion;
