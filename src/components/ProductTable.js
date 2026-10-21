import React from "react";
import ProductRow from "./ProductRow";

function ProductTable({ products, onDelete, onUpdate }) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên sản phẩm</th>
            <th>Danh mục</th>
            <th>Giá</th>
            <th>Số lượng tồn</th>
            <th>Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="6" className="empty-message">
                Không tìm thấy sản phẩm.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                onDelete={onDelete}
                onUpdate={onUpdate}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;