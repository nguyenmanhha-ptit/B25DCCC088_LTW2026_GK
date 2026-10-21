import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatMoney } from "../data";

function ProductDetail({ products }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <section>
        <h1>Không tìm thấy sản phẩm</h1>
        <button type="button" onClick={() => navigate("/products")}>
          Quay lại danh sách
        </button>
      </section>
    );
  }

  return (
    <section>
      <h1>Chi tiết sản phẩm</h1>

      <div className="detail-card">
        <p><strong>ID:</strong> {product.id}</p>
        <p><strong>Tên sản phẩm:</strong> {product.name}</p>
        <p><strong>Danh mục:</strong> {product.category}</p>
        <p><strong>Giá:</strong> {formatMoney(product.price)}</p>
        <p><strong>Số lượng tồn:</strong> {product.stock}</p>
      </div>

      <button type="button" onClick={() => navigate("/products")}>
        Quay lại danh sách
      </button>
    </section>
  );
}

export default ProductDetail;