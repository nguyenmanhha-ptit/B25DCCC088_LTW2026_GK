import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="nav-bar">
      <h2>Quản lý sản phẩm</h2>

      <div className="nav-links">
        <NavLink to="/" end>
          Trang chủ
        </NavLink>

        <NavLink to="/products" end>
          Danh sách sản phẩm
        </NavLink>

        <NavLink to="/products/new" end>
          Thêm sản phẩm
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;