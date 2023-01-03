import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { SlBasket } from "react-icons/sl";
import LoadingScreen from "../components/loading/LoadingScreen";
import { toast, ToastContainer } from "react-toastify";
import { MainContext } from "../context/context";
const ProductDetails = () => {
  const [singleProduct, setSingleProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const { user, setUser } = useContext(MainContext);
  const addBasketApi = process.env.REACT_APP_BASKET_ADD;
  const singleUserApi = process.env.REACT_APP_GET_SINGLE_USER;
  useEffect(() => {
    const singleProductGet = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          process.env.REACT_APP_GET_SINGLE_PRODUCT + params.id
        );
        const data = res.data;
        setSingleProduct(data);
        setLoading(false);
      } catch (error) {}
    };
    singleProductGet();
  }, [params.id]);

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
    <div className="p-5 container">
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
      {loading === true ? <LoadingScreen /> : null}
      <div className="flex flex-col md:flex-row gap-5 bg-base-300">
        <div>
          <img
            src={singleProduct.image}
            alt=""
            className="h-full lg:h-[400px] min-w-full md:min-w-[400px] max-w-[400px] max-h-[440px]"
          />
        </div>
        <div className="flex flex-col gap-10 p-5 ">
          <div className="text-4xl text-white">{singleProduct.title}</div>
          <div>{singleProduct.description}</div>

          <div className="flex items-center justify-end gap-5 mt-auto">
            <div className="text-xl">{singleProduct.price} $</div>
            <div>
              <button
                onClick={() => addBasket(singleProduct._id)}
                className="btn  flex gap-5 items-center"
              >
                <SlBasket className="text-lg text-success" />
                <div>Add Basket</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
