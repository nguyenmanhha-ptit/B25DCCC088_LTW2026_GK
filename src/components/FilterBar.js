import React from "react";
import { CATEGORIES } from "../data";

function FilterBar({
  query,
  category,
  onQueryChange,
  onCategoryChange,
}) {
  return (
    <div className="filter-bar">
      <div className="form-group">
        <label htmlFor="query">Tìm kiếm</label>
        <input
          id="query"
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Nhập tên sản phẩm..."
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Danh mục</label>
        <select
          id="category"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="">Tất cả danh mục</option>

          {CATEGORIES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default FilterBar;