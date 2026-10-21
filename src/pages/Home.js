import React from "react";
import { Link } from "react-router-dom";
import { formatMoney } from "../data";

function Home({ products }) {
  const totalProducts = products.length;

  const totalStock = products.reduce(
    (total, product) => total + product.stock,
    0
  );

  const totalValue = products.reduce(
    (total, product) => total + product.price * product.stock,
    0
  );

  return (
    <section>
      <h1>Trang chủ</h1>
      <p>Tổng quan kho sản phẩm hiện tại.</p>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Tổng số sản phẩm</h3>
          <p>{totalProducts}</p>
        </div>

        <div className="stat-card">
          <h3>Tổng số lượng tồn</h3>
          <p>{totalStock}</p>
        </div>

        <div className="stat-card">
          <h3>Tổng giá trị tồn kho</h3>
          <p>{formatMoney(totalValue)}</p>
        </div>
      </div>

      <Link to="/products" className="primary-link">
        Xem danh sách sản phẩm
      </Link>
    </section>
  );
}

export default Home;