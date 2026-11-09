import { useState } from 'react';
import API from './api';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import './App.css';

function App() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [userId, setUserId] = useState('');

    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);

    const createUser = async (e) => {
        e.preventDefault();

        const response = await API.post('/users', {
            name,
            email
        });

        setUser(response.data.user);

        alert('User created successfully');
    };

    const getUser = async (e) => {
    e.preventDefault();

    const response = await API.get(`/users/${userId}`);

    setUser(response.data.user);

    setUserId('');

    alert('User found successfully');
};

    const addToCart = (product) => {

        let productExists = false;

        const updatedCart = cart.map((item) => {

            if (item._id === product._id) {

                productExists = true;

                return {
                    ...item,
                    quantity: item.quantity + 1
                };
            }

            return item;
        });

        if (productExists) {
            setCart(updatedCart);
        } else {
            setCart([
                ...cart,
                {
                    ...product,
                    quantity: 1
                }
            ]);
        }
    };

    return (
    <div className="container">

        <h1>My Shopping App</h1>

        {!user ? (

            <>
                {/* Create New User */}
                <form onSubmit={createUser}>

                    <h2>Create User</h2>

                    <input
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <button type="submit">
                        Create User
                    </button>

                </form>

                <hr />

                {/* Get Existing User */}
                <form onSubmit={getUser}>

                    <h2>Get Existing User</h2>

                    <input
                        type="text"
                        placeholder="Enter User ID"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                    />

                    <button type="submit">
                        Get User
                    </button>

                </form>
            </>

        ) : (

            <>
                <h2>Welcome, {user.name}</h2>

                <p>User ID: {user._id}</p>

                <ProductList addToCart={addToCart} />

                <Cart cart={cart} />
            </>

        )}

    </div>
);
}

export default App;