import { useEffect, useState } from 'react';
import API from '../api';

function ProductList({ addToCart }) {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const response = await API.get('/products');
        setProducts(response.data.products || response.data);
    };

    return (
        <div>
            <h2>Products</h2>

            <div className="product-list">
                {products.map((product) => (
                    <div className="product-card" key={product._id}>

                        <img src={product.imgUrl} alt={product.title} />

                        <h3>{product.title}</h3>

                        <p>{product.description}</p>

                        <h4>₹{product.price}</h4>

                        <button onClick={() => addToCart(product)}>
                            Add to Cart
                        </button>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;