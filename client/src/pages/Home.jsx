import axios from "axios";
import { useEffect, useState } from "react";

import Slider from "../components/home/Slider";
import ProductCard from "../components/home/ProductCard";
import Skeleton from "../components/loading/Skeleton";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
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
    <div className="container">
      <Slider />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-5 ">
        {loading === true
          ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]?.map((item, index) => (
              <Skeleton key={index} type="productCard" />
            ))
          : products?.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
      </div>
    </div>
  );
};

export default Home;
