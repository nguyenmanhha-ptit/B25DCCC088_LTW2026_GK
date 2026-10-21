import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FilterBar from "../components/FilterBar";
import ProductTable from "../components/ProductTable";

function ProductList({ products, onDelete, onUpdate }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const location = useLocation();

  const handleQueryShift = (value) => {
    setQuery(value);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  useEffect(() => {
    const incomingMessage = location.state?.message;

    if (!incomingMessage) {
      setMessage("");
      return;
    }

    setMessage(incomingMessage);

    const timer = setTimeout(() => {
      setMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [location.key, location.state]);

  const filteredProducts = products.filter((product) => {
    const matchesQuery = product.name
      .toLowerCase()
      .includes(query.trim().toLowerCase());

    const matchesCategory =
      category === "" || product.category === category;

    return matchesQuery && matchesCategory;
  });

  return (
    <section>
      <h1>Danh sách sản phẩm</h1>

      {message && (
        <p className="success-message" role="status">
          {message}
        </p>
      )}

      <FilterBar
        query={query}
        category={category}
        onQueryChange={handleQueryShift}
        onCategoryChange={handleCategoryChange}
      />

      <p>Số sản phẩm tìm thấy: {filteredProducts.length}</p>

      <ProductTable
        products={filteredProducts}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    </section>
  );
}

export default ProductList;