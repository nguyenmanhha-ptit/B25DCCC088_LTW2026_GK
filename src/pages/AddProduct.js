import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CATEGORIES } from "../data";

function AddProduct({ products, onAdd }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanName = name.trim();
    const parsedPrice = Number(price);
    const parsedStock = Number(stock);

    if (!cleanName) {
      setError("Vui lòng nhập tên sản phẩm.");
      return;
    }

    if (
      price.trim() === "" ||
      !Number.isFinite(parsedPrice) ||
      parsedPrice < 0
    ) {
      setError("Giá phải là số không âm.");
      return;
    }

    if (
      stock.trim() === "" ||
      !Number.isInteger(parsedStock) ||
      parsedStock < 0
    ) {
      setError("Số lượng tồn phải là số nguyên không âm.");
      return;
    }

    const newId =
      products.reduce(
        (maxId, product) => Math.max(maxId, product.id),
        0
      ) + 1;

    const newProduct = {
      id: newId,
      name: cleanName,
      category,
      price: parsedPrice,
      stock: parsedStock,
    };

    onAdd(newProduct);

    const message = `Thêm sản phẩm "${cleanName}" thành công!`;

    navigate("/products", {
      replace: true,
      state: { message },
    });
  };

  return (
    <section>
      <h1>Thêm sản phẩm</h1>

      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Tên sản phẩm</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Danh mục</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="price">Giá</label>
          <input
            id="price"
            type="number"
            min="0"
            step="any"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="stock">Số lượng tồn</label>
          <input
            id="stock"
            type="number"
            min="0"
            step="1"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>

        {error && (
          <p className="error-message" role="alert">
            {error}
          </p>
        )}

        <button type="submit">Thêm sản phẩm</button>
      </form>
    </section>
  );
}

export default AddProduct;