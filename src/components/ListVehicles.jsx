import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyComponent = () => {

  const token = sessionStorage.getItem('authToken');
  if (!token) {
    return <Navigate to="/login" />;
  }
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      
      try {
        const response = await axios.get('http://localhost:8080/api/vehicles', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        setVehicles(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <div>
      <h1>Vehicles</h1>
      {error && <p>Error: {error}</p>}
      {!error && (
        <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Model</th>
              <th>Brand</th>
              <th>Year</th>
              {/* Add more columns as needed based on vehicle data */}
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id}>
                <td>{vehicle.id}</td>
                <td>{vehicle.model}</td>
                <td>{vehicle.brand}</td>
                <td>{vehicle.year}</td>
                {/* Add more cells as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyComponent;
