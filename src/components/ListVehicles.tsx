import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

interface Vehicle {
  id: number;
  model: string;
  brand: string;
  year: number;
  // Add more fields if needed based on the API response
}

const MyComponent: React.FC = () => {
  const token = sessionStorage.getItem('authToken');
  if (!token) {
    return <Navigate to="/login" />;
  }

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get<Vehicle[]>('http://localhost:8080/api/vehicles', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        setVehicles(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message);
      }
    };

    fetchVehicles();
  }, [token]);

  return (
    <div>
      <h1>Vehicles</h1>
      {error && <p>Error: {error}</p>}
      {!error && (
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
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

