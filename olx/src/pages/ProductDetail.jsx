import { useParams } from "react-router-dom";
import products from "./data";
import "./ProductDetail.css";

function ProductDetail() {
  const { id } = useParams();

  const allProducts = Object.values(products).flat(); 
  const product = allProducts.find((p) => p.id.toString() === id);

  if (!product) {
    return <h2>Product not found!</h2>;
  }

  return (
    <div className="product-detail">
      <h2>{product.title}</h2>
      <img src={product.img} alt={product.title} />
      <h3>{product.price}</h3>
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Location:</strong> {product.location}</p>
      <p><strong>Posted:</strong> {product.time}</p>
    </div>
  );
}

export default ProductDetail;
