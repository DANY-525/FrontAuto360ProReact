import React, { useState } from 'react';
import axios from 'axios';
import './VehicleRegistrationForm.css';

const VehicleRegistrationForm = () => {
  const token = sessionStorage.getItem('authToken');
  if (!token) {
    return <Navigate to="/login" />;
  }
  const [formData, setFormData] = useState({
    licensePlate: '',
    brand: '',
    model: '',
    soatExpirationDate: '',
    tecnoExpirationDate: '',
    userId: '', // Usaremos este campo para vincular el vehículo al usuario
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Objeto a enviar al backend
    const payload = {
      brand: formData.brand,
      model: formData.model,
      licensePlate: formData.licensePlate,
      soatExpirationDate: formData.soatExpirationDate,
      tecnoExpirationDate: formData.tecnoExpirationDate,
      user: {
        id: formData.userId,
      },
    };

    // Token Bearer quemado
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0b215c2F1cmlvIiwiaWF0IjoxNzMzMTcxNjMyLCJleHAiOjE3MzMxNzMwNzJ9.LFDuiOUlvzsqOGRu6h6DaoIFZQ-k_Cydg4q_E5t-FG4';

    try {
      const response = await axios.post(
        'http://localhost:8080/api/vehicles',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Mostrar mensaje de éxito y reiniciar formulario
      setSuccessMessage('¡Vehículo registrado exitosamente!');
      setErrorMessage('');
      setFormData({
        licensePlate: '',
        brand: '',
        model: '',
        soatExpirationDate: '',
        tecnoExpirationDate: '',
        userId: '',
      });
    } catch (error) {
      console.error('Error al registrar vehículo:', error);
      setErrorMessage('Hubo un error al registrar el vehículo. Por favor, inténtalo nuevamente.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="vehicle-registration-form">
      <h2>Registro de Vehículos</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="licensePlate">Placa</label>
          <input
            type="text"
            id="licensePlate"
            name="licensePlate"
            value={formData.licensePlate}
            onChange={handleChange}
            placeholder="Ingresa la placa del vehículo"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="brand">Marca</label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Ejemplo: Honda"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="model">Modelo</label>
          <input
            type="text"
            id="model"
            name="model"
            value={formData.model}
            onChange={handleChange}
            placeholder="Ejemplo: Cb124F"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="soatExpirationDate">Fecha de Expiración del SOAT</label>
          <input
            type="date"
            id="soatExpirationDate"
            name="soatExpirationDate"
            value={formData.soatExpirationDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="tecnoExpirationDate">Fecha de Expiración Técnico-Mecánica</label>
          <input
            type="date"
            id="tecnoExpirationDate"
            name="tecnoExpirationDate"
            value={formData.tecnoExpirationDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="userId">ID del Usuario</label>
          <input
            type="number"
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            placeholder="Ingresa el ID del usuario"
            required
          />
        </div>
        <button type="submit">Registrar Vehículo</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default VehicleRegistrationForm;
