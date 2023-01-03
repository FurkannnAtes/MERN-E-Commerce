import axios from "axios";
import React, { useContext } from "react";

import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { MainContext } from "../../context/context";

const ProductCard = ({ product }) => {
  const { user, setUser } = useContext(MainContext);
  const addBasketApi = process.env.REACT_APP_BASKET_ADD;
  const singleUserApi = process.env.REACT_APP_GET_SINGLE_USER;

  const addBasket = async (id) => {
    if (user == null) {
      loginToast("You must login first");
    } else {
      try {
        await axios.put(addBasketApi + id, {
          userId: user._id,
        });

        const newUser = await axios.get(singleUserApi + user._id);

        setUser(newUser.data);
        await localStorage.setItem("User", JSON.stringify(newUser.data));

        addBasketToast("Product has been add");
      } catch (error) {
        console.log(error);
      }
    }
  };
  //Toasts
  const addBasketToast = (message) => toast.success(message);
  const loginToast = (message) => toast.error(message);

  return (
    <div className="flex flex-col  bg-base-300 rounded-2xl overflow-hidden  ">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Link to={`/product/${product._id}`} className="w-full h-[200px]">
        <img className="h-full w-full " src={product.image} alt="" />
      </Link>
      <div className="flex flex-col gap-5 p-2">
        <p className="line-clamp-1 mt-5 ">{product.title}</p>
        <div className="flex justify-between items-center">
          <div>{product.price}$</div>
          <div className="btn btn-info" onClick={() => addBasket(product._id)}>
            Add to cart
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
