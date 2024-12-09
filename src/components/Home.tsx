import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import '../css/Home.css';
import { Product } from './class/Products';

const Home = () => {
  const token = sessionStorage.getItem('authToken');
  
  // State for product
  const [product, setProduct] = useState<Product>({
    name: "",
    color: "",
    price: "",
    size: "",
    weight: "",
  });

  // State for products list
  const [products, setProducts] = useState<Product[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const addProduct = () => {
    setProducts((prevProducts) => [...prevProducts, product]);
    setProduct({
      name: "",
      color: "",
      price: "",
      size: "",
      weight: "",
    }); // Reset the form
  };

  const deleteProduct = (indexToDelete: number) => {
    setProducts((prevProducts) =>
      prevProducts.filter((_, index) => index !== indexToDelete)
    );
  };

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="home-container">
      <form
        onSubmit={(e) => {
          e.preventDefault(); // Prevent form submission
          addProduct();
        }}
      >
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleInputChange}
          placeholder="name"
        />
        <input
          type="text"
          name="color"
          value={product.color}
          onChange={handleInputChange}
          placeholder="color"
        />
        <input
          type="text"
          name="price"
          value={product.price}
          onChange={handleInputChange}
          placeholder="price"
        />
        <input
          type="text"
          name="size"
          value={product.size}
          onChange={handleInputChange}
          placeholder="size"
        />
        <input
          type="text"
          name="weight"
          value={product.weight}
          onChange={handleInputChange}
          placeholder="weight"
        />
        <button type="submit">Add Product</button>
      </form>

      {products.length > 0 && (
        <div id="list">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Color</th>
                <th>Price</th>
                <th>Size</th>
                <th>Weight</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod, index) => (
                <tr key={index}>
                  <td>{prod.name}</td>
                  <td>{prod.color}</td>
                  <td>{prod.price}</td>
                  <td>{prod.size}</td>
                  <td>{prod.weight}</td>
                  <td>
                    <button
                      name="delete"
                      onClick={() => deleteProduct(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Home;
