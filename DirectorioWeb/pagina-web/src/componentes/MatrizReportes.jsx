import React, { useState } from 'react';
import ReporteFormulario from './ReporteFormulario';
import Reporte from './Reporte';
import '../hojas-de-estilo/MatrizReportes.css';

function MatrizReportes({ borrable }) {

    const [reportes, setReportes] = useState([]);

    const agregarReporte = reporte => {
        if (reporte.texto.trim()) {
            reporte.texto = reporte.texto.trim();
            const reportesActualizados = [reporte, ...reportes];
            setReportes(reportesActualizados);
        }
    }

    const eliminarReporte = id => {
        const reportesActualizados = reportes.filter(reporte => reporte.id !== id);
        setReportes(reportesActualizados);
    }

    const verReporte = id => {
        const reportesActualizados = reportes.map(reporte => {
            if (reporte.id === id) {
                // Aqui toca mostrar el reporte en la ventana nueva que aun no existe
            }
            return reporte;
        });
        setReportes(reportesActualizados);
    }


    return (
        <>
            <ReporteFormulario onSubmit={agregarReporte} />
            <div className='reportes-matriz-contenedor'>
                {
                    reportes.map((reporte) =>
                        <Reporte
                            key={reporte.id}
                            id={reporte.id}
                            texto={reporte.texto}
                            verReporte={verReporte}
                            borrable={borrable}
                            eliminarReporte={eliminarReporte} />
                    )
                }
            </div>
        </>
    );
}

export default MatrizReportes;