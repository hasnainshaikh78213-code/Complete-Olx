import { useParams, Link } from "react-router-dom";
import products from "./data";
import "./ProductListing.css";

function ProductListing() {
  const { category } = useParams();
  const selectedProducts = products[category] || [];

  return (
    <div className="listing-container">
      <h2 className="listing-title">Showing Products for: {category}</h2>

      {selectedProducts.length > 0 ? (
        <div className="listing-cards-wrapper">
          {selectedProducts.map((item) => (
            <Link
              key={item.id}
              to={`/Product/${item.id}`}
              className="listing-card"
            >
              <img
                src={item.img}
                alt={item.title}
                className="listing-card-image"
              />
              <div className="listing-card-info">
                <h3 className="listing-card-price">{item.price}</h3>
                <p className="listing-card-title">{item.title}</p>
                <p className="listing-card-time">{item.time}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="no-products-text">No products found in this category.</p>
      )}
    </div>
  );
}

export default ProductListing;
