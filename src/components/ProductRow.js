import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CATEGORIES, formatMoney } from "../data";

function ProductRow({ product, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(product.name);
  const [category, setCategory] = useState(product.category);
  const [price, setPrice] = useState(String(product.price));
  const [stock, setStock] = useState(String(product.stock));
  const [error, setError] = useState("");

  const handleSave = () => {
    const cleanName = name.trim();
    const parsedPrice = Number(price);
    const parsedStock = Number(stock);

    if (!cleanName) {
      setError("Tên sản phẩm không được để trống.");
      return;
    }

    if (price.trim() === "" || !Number.isFinite(parsedPrice) || parsedPrice < 0) {
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

    onUpdate({
      ...product,
      name: cleanName,
      category,
      price: parsedPrice,
      stock: parsedStock,
    });

    setError("");
    setEditing(false);
  };

  const handleCancel = () => {
    setName(product.name);
    setCategory(product.category);
    setPrice(String(product.price));
    setStock(String(product.stock));
    setError("");
    setEditing(false);
  };

  if (editing) {
    return (
      <tr>
        <td>{product.id}</td>

        <td>
          <input
            aria-label="Tên sản phẩm"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </td>

        <td>
          <select
            aria-label="Danh mục"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </td>

        <td>
          <input
            aria-label="Giá"
            type="number"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </td>

        <td>
          <input
            aria-label="Số lượng tồn"
            type="number"
            min="0"
            step="1"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </td>

        <td>
          <button type="button" onClick={handleSave}>
            Lưu
          </button>

          <button type="button" onClick={handleCancel}>
            Hủy
          </button>

          {error && <p className="error-message">{error}</p>}
        </td>
      </tr>
    );
  }

  return (
    <tr>
      <td>{product.id}</td>

      <td>
        <Link to={`/products/${product.id}`}>{product.name}</Link>
      </td>

      <td>{product.category}</td>
      <td>{formatMoney(product.price)}</td>
      <td>{product.stock}</td>

      <td>
        <button type="button" onClick={() => setEditing(true)}>
          Cập nhật
        </button>

        <button type="button" onClick={() => onDelete(product.id)}>
          Xóa
        </button>
      </td>
    </tr>
  );
}

export default ProductRow;