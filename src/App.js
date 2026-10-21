const BUILD_TAG = "kt-6641";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";
import ProductDetail from "./pages/ProductDetail";

import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedProducts = localStorage.getItem("gk_products");

    if (savedProducts !== null) {
      try {
        const parsedProducts = JSON.parse(savedProducts);

        if (Array.isArray(parsedProducts)) {
          setProducts(parsedProducts);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.error("Không đọc được dữ liệu đã lưu:", err);
      }
    }

    const controller = new AbortController();
    let active = true;

    const loadProducts = async () => {
      try {
        const response = await axios.get("/data/products.json", {
          signal: controller.signal,
        });

        if (active) {
          setProducts(response.data);
          setError("");
        }
      } catch (err) {
        if (
          active &&
          !axios.isCancel(err) &&
          err.code !== "ERR_CANCELED"
        ) {
          setError("Không tải được dữ liệu sản phẩm.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("gk_products", JSON.stringify(products));
    }
  }, [products, loading]);

  const handleAddProduct = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  const handleDeleteProduct = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  if (loading) {
    return <p className="status-message">Đang tải dữ liệu...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home products={products} />} />

        <Route
          path="products"
          element={
            <ProductList
              products={products}
              onDelete={handleDeleteProduct}
              onUpdate={handleUpdateProduct}
            />
          }
        />

        <Route
          path="products/new"
          element={
            <AddProduct
              products={products}
              onAdd={handleAddProduct}
            />
          }
        />

        <Route
          path="products/:id"
          element={<ProductDetail products={products} />}
        />
      </Route>
    </Routes>
  );
}

export default App;