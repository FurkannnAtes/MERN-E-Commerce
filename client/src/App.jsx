import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import { MainContext } from "./context/context";
import About from "./pages/About";
import AddProduct from "./pages/admin/AddProduct";
import Admin from "./pages/admin/Admin";
import Basket from "./pages/Basket";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Shop from "./pages/Shop";

export const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
};

const App = () => {
  const [basket, setBasket] = useState([]);
  const [user, setUser] = useState({});
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("User")));
  }, []);
  const data = {
    basket,
    setBasket,
    user,
    setUser,
  };
  return (
    <MainContext.Provider
      value={data}
      data-theme="dark"
      className="container relative"
    >
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/product/:id" element={<ProductDetails />} />

          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/addProduct" element={<AddProduct />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </MainContext.Provider>
  );
};

export default App;
