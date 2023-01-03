/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { MainContext } from "../context/context";
import axios from "axios";
//Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useLocation } from "react-router";
import NotFound from "../components/404";
const Basket = () => {
  const { user, setUser } = useContext(MainContext);
  const [total, setTotal] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [buying, setBuying] = useState(false);
  const deletebasketApi = process.env.REACT_APP_BASKET_DELETE;
  const singleUserApi = process.env.REACT_APP_GET_SINGLE_USER;
  const buyBasket = process.env.REACT_APP_BASKET_BUY;
  const location = useLocation();
  useEffect(() => {
    let count = 0;

    user.basket?.map((item) => (count += item.price * item.amount));
    setTotal(count);
  }, []);

  const buyItems = async () => {
    try {
      setBuying(true);
      await axios.put(buyBasket + user._id, {});

      const newUser = await axios.get(singleUserApi + user._id);

      setUser(newUser.data);
      await localStorage.setItem("User", JSON.stringify(newUser.data));

      setTotal(0);
      buy("Successful purchase");
      setBuying(false);
    } catch (error) {
      console.log(error);
      setBuying(false);
    }
  };
  const deleteItem = async (id) => {
    try {
      setDeleting(true);

      await axios.put(deletebasketApi + id, {
        userId: user._id,
      });
      const newUser = await axios.get(singleUserApi + user._id);

      await setUser(newUser.data);
      await localStorage.setItem("User", JSON.stringify(newUser.data));
      let count = 0;
      const newTotal = await newUser.data.basket?.map(
        (item) => (count += item.price * item.amount)
      );
      setTotal(newTotal);
      deleted("Product successfully deleted");
      setDeleting(false);
    } catch (error) {
      console.log(error);
      setDeleting(false);
    }
  };
  //Toasts
  const buy = (message) => toast.success(message);
  const deleted = (message) => toast.success(message);
  if (user) {
    return (
      <div className="p-5 min-h-[90vh]">
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
        {user.basket?.length !== 0 ? (
          <div>
            <div className="overflow-x-auto ">
              <table className="table w-full ">
                <thead>
                  <tr>
                    <th></th>
                    <th>Product</th>
                    <th>Name</th>
                    <th className="text-center">Amount</th>
                    <th className="text-end">Price</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {user.basket?.map((item, index) => (
                    <tr key={index} className="active ">
                      <th>{(index += 1)}</th>
                      <td>
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={item.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </td>
                      <td>{item.title}</td>
                      <th className="text-center">{item.amount}</th>
                      <td className="text-end">{item.price} $</td>
                      <td className="text-end">
                        <button
                          onClick={() => deleteItem(item.id)}
                          className="btn btn-error ml-auto"
                        >
                          {deleting === true ? (
                            <div className="animate-spin ">
                              <AiOutlineLoading3Quarters className="h-6 w-6" />
                            </div>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-3 flex justify-between items-center bg-base-300">
              <div className="text-lg font-semibold">
                Total price: {total === undefined ? 0 : total}
                <span className="text-success">$</span>
              </div>
              <div>
                <button onClick={() => buyItems()} className="btn btn-success">
                  {buying === true ? (
                    <div className="animate-spin ">
                      <AiOutlineLoading3Quarters className="h-6 w-6" />
                    </div>
                  ) : (
                    "Buy"
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center text-xl md:text-4xl lg:text-7xl font-semibold h-[80vh] text-center">
            Sorry, the basket is empty.
          </div>
        )}
      </div>
    );
  } else {
    return <NotFound />;
  }
};

export default Basket;
