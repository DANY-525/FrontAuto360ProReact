import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, ArcElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar los componentes necesarios para Chart.js
ChartJS.register(CategoryScale, ArcElement, Title, Tooltip, Legend);

const FileList = () => {
  const [files, setFiles] = useState([]); // Inicializar los archivos como un array vacío
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({}); // Para almacenar los datos de la gráfica

  // Función para extraer la fecha del nombre del archivo
  const extractDateFromFilename = (filename) => {
    const datePattern = /(\d{8})T/; // Expresión regular para extraer la fecha en formato yyyyMMdd
    const match = filename.match(datePattern);
    return match ? match[1] : null; // Retorna la fecha si la encuentra
  };

  // Fetch de la lista de archivos desde la API
  useEffect(() => {
    axios.get('http://localhost:8080/api/ingestion/list-files')
      .then(response => {
        console.log('Files from NestJS:', response.data);

        // Verificar si la respuesta contiene 'files' y es un array
        if (response.data && Array.isArray(response.data.files)) {
          setFiles(response.data.files);
          console.log('Files successfully set in state:', response.data.files);

          // Agrupar los archivos por fecha
          const fileDates = response.data.files.map(file => extractDateFromFilename(file));
          const dateCounts = fileDates.reduce((acc, date) => {
            acc[date] = (acc[date] || 0) + 1; // Contar la cantidad de archivos por fecha
            return acc;
          }, {});

          // Preparar los datos para la gráfica (gráfico de pastel)
          const labels = Object.keys(dateCounts); // Las fechas serán las etiquetas
          const data = Object.values(dateCounts); // Los conteos serán los valores

          setChartData({
            labels: labels,
            datasets: [
              {
                label: 'Archivos por Fecha',
                data: data,
                backgroundColor: [
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(255, 159, 64, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 99, 132, 0.6)',
                ], // Colores personalizados para las secciones del pastel
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 1,
              },
            ],
          });
        } else {
          console.error('Files array is missing or malformed. Response:', response.data);
          setFiles([]);
        }

        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the files:", error);
        setLoading(false);
      });
  }, []);

  const handleDownload = (filename) => {
    axios({
      url: `http://localhost:8080/api/ingestion/download/${filename}`,
      method: 'GET',
      responseType: 'blob', // Importante para descargar archivos
    })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    })
    .catch((error) => {
      console.error("There was an error downloading the file:", error);
    });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>List of Files</h1>
      {loading ? (
        <p style={styles.loadingText}>Loading files...</p>
      ) : (
        <div style={styles.listContainer}>
          {files.length > 0 ? (
            <ul style={styles.fileList}>
              {files.map((file, index) => (
                <li key={index} style={styles.listItem}>
                  <span style={styles.fileName}>{file}</span>
                  <button 
                    onClick={() => handleDownload(file)} 
                    style={styles.downloadButton}
                  >
                    Download
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p style={styles.noFilesText}>No files available.</p>
          )}
        </div>
      )}

      <h2 style={styles.chartTitle}>File Count by Date</h2>
      {files.length > 0 && (
        <div style={styles.chartContainer}>
          <Pie data={chartData} options={{ responsive: true }} />
        </div>
      )}
    </div>
  );
};

// Estilos en línea
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '20px',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: '18px',
  },
  listContainer: {
    marginTop: '20px',
  },
  fileList: {
    listStyleType: 'none',
    padding: '0',
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 15px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '10px',
    transition: 'all 0.3s ease',
  },
  fileName: {
    fontSize: '18px',
    fontWeight: '600',
  },
  downloadButton: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '6px 12px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.3s',
  },
  downloadButtonHover: {
    backgroundColor: '#0056b3',
  },
  noFilesText: {
    textAlign: 'center',
    fontSize: '18px',
    color: 'gray',
  },
  chartTitle: {
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    marginTop: '40px',
    marginBottom: '20px',
  },
  chartContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
};

export default FileList;
