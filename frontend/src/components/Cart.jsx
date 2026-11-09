function Cart({ cart }) {

    let total = 0;

    for (let i = 0; i < cart.length; i++) {
        total = total + cart[i].price * cart[i].quantity;
    }

    return (
        <div className="cart">
            <h2>My Cart</h2>

            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (

                cart.map((item) => (
                    <div className="cart-item" key={item._id}>

                        <h3>{item.title}</h3>

                        <p>Price: ₹{item.price}</p>

                        <p>Quantity: {item.quantity}</p>

                        <p>
                            Subtotal: ₹{item.price * item.quantity}
                        </p>

                    </div>
                ))

            )}

            <h3>Total: ₹{total}</h3>
        </div>
    );
}

export default Cart;