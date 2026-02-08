import { useEffect, useState } from "react";
import { getAllProducts, getProductsByCategory } from "./ProductService";

function ProductList() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    getAllProducts().then(res => {
      setProducts(res.data);
    });
  };

  const filterCategory = (category) => {
    getProductsByCategory(category).then(res => {
      setProducts(res.data);
    });
  };

  return (
    <div>
      {/* CATEGORY NAVBAR */}
      <div className="category-bar">
        <button onClick={loadAllProducts}>All</button>
        <button onClick={() => filterCategory("iphone")}>iPhone</button>
        <button onClick={() => filterCategory("android")}>Android</button>
        <button onClick={() => filterCategory("laptop")}>Laptop</button>
        <button onClick={() => filterCategory("accessory")}>Accessories</button>
      </div>

      {/* PRODUCT GRID */}
      <div className="product-grid">
        {products.map(product => (
          <div className="product-card" key={product.id}>
            <img
              src={`/images/${product.image}`}
              alt={product.name}
            />
            <h3>{product.name}</h3>
            <p>₹ {product.price}</p>
            <button>Add to Cart</button>
            <button className="buy-btn">Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
