'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const CustomersHeader = ({ cartData, removeCartData }) => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  /* -------------------- Load from localStorage (client only) -------------------- */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const storedUser = localStorage.getItem('user');
    const storedCart = localStorage.getItem('cart');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCartItems(parsedCart);
      setCartCount(parsedCart.length);
    }
  }, []);

  /* -------------------- Add to Cart -------------------- */
  useEffect(() => {
    if (!cartData) return;

    setCartItems((prev) => {
      let updatedCart = [];

      if (prev.length > 0 && prev[0].resto_id !== cartData.resto_id) {
        alert('You are taking order from another restaurant');
        updatedCart = [cartData];
      } else {
        updatedCart = [...prev, cartData];
      }

      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setCartCount(updatedCart.length);

      return updatedCart;
    });
  }, [cartData]);

  /* -------------------- Remove Item from Cart -------------------- */
  useEffect(() => {
    if (!removeCartData) return;

    setCartItems((prev) => {
      const updatedCart = prev.filter(
        (item) => item._id !== removeCartData
      );

      if (updatedCart.length === 0) {
        localStorage.removeItem('cart');
      } else {
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      }

      setCartCount(updatedCart.length);
      return updatedCart;
    });
  }, [removeCartData]);

  /* -------------------- Logout -------------------- */
  const logout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  /* -------------------- JSX -------------------- */
  return (
    <div className="blackpart">
      <div className="logo-left">
        <img src="/burger-solid.svg" alt="Logo" />
      </div>

      <ul className="fdbar-nav cstm">
        <li>
          <Link href="/">
            <img src="/home.svg" alt="Home" />
          </Link>
        </li>

        {user ? (
          <>
            <li>
              <Link href="/profile">
                <img src="/user-circle-solid.svg" alt="Profile" />
                <b> HI {user.name}</b>
              </Link>
            </li>

            <li onClick={logout}>
              <img src="/power-off-solid.svg" alt="Logout" />
              <b> LOGOUT</b>
            </li>
          </>
        ) : (
          <li>
            <Link href="/user">
              <img src="/power-off-solid.svg" alt="Login" />
              <b> LOGIN</b>
            </Link>
          </li>
        )}

        <li className="cart-mgs">
          <Link href={cartCount ? '/cart' : '#'}>
            <img src="/cart-ic.svg" alt="Cart" />
            <span>{cartCount}</span>
          </Link>
        </li>

        <li>
          <Link href="/">
            <img src="/utensils-solid.svg" alt="Add Restaurant" />
            <b> Add Restaurant</b>
          </Link>
        </li>

        <li className="cart-mgs">
          <Link href="/deliverypartner">
            <img src="/handshake-solid.svg" alt="Delivery Partner" />
            <b> Delivery Partner</b>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default CustomersHeader;
