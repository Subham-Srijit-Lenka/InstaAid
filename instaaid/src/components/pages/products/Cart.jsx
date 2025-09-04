import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../../../redux/Cart/cartSlice";
import Layout from "../../layout/Layout";

const Cart = () => {
  const dispatch = useDispatch();
  const { items, totalQty, totalPrice } = useSelector((state) => state.cart);

  if (items.length === 0) {
    return (
      <Layout>
        <div className="p-6 text-center">
          <h2 className="text-xl font-bold">Your Cart is Empty 🛒</h2>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

        <ul className="space-y-4">
          {items.map((item) => (
            <li
              key={item._id}
              className="flex justify-between items-center border p-4 rounded-lg shadow-sm"
            >
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p>Price: ₹{item.price}</p>
                <p>Qty: {item.qty}</p>
                <p>Total: ₹{item.totalPrice}</p>
              </div>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                onClick={() => dispatch(removeFromCart(item._id))}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-6 border-t pt-4">
          <p className="text-lg">
            <strong>Total Items:</strong> {totalQty}
          </p>
          <p className="text-lg">
            <strong>Total Price:</strong> ₹{totalPrice}
          </p>

          <div className="mt-4 flex justify-between">
            <button
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </button>

            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
