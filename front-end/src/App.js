import React, { useState } from "react";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const closeCartHandler = () => {
    setCartIsShown(false);
  };

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={closeCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider >
  );
}

export default App;
