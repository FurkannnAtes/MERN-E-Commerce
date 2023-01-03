import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../components/home/ProductCard";

import { AnimatePresence, motion } from "framer-motion";
import Skeleton from "../components/loading/Skeleton";
const Shop = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    setLoading(true);
    productsGet();
  }, []);

  const productsGet = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_GET_PRODUCTS);
      const data = res.data;
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-[90vh] flex flex-col  p-5 container">
      <select
        onChange={(e) => setFilter(e.target.value)}
        className="select select-accent ml-auto  max-w-xs focus:outline-none w-fit mb-5"
      >
        <option value="men's clothing">Men's clothing</option>
        <option value="jewelery">Jewelery</option>
        <option value="electronics">Electronics</option>
        <option value="women's clothing">Women's clothing</option>
      </select>
      <AnimatePresence initial={false}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ">
          {filter !== ""
            ? loading === true
              ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]?.map((item, index) => (
                  <Skeleton key={index} type="productCard" />
                ))
              : products
                  .filter((product) => product.category === filter)
                  ?.map((product, index) => (
                    <motion.div
                      layout
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      key={index}
                    >
                      <ProductCard key={index} product={product} />
                    </motion.div>
                  ))
            : loading === true
            ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]?.map((item, index) => (
                <Skeleton key={index} type="productCard" />
              ))
            : products?.map((product, index) => (
                <motion.div
                  layout
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  key={index}
                >
                  <ProductCard key={index} product={product} />
                </motion.div>
              ))}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default Shop;
