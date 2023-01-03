import { Link, useLocation } from "react-router-dom";
import { SlBasket } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRef } from "react";
import { MainContext } from "../../context/context";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Navbar = () => {
  const [nav, setNav] = useState("h-0");
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(0);
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loadingBTN, setLoadingBTN] = useState(false);
  const modalRef = useRef();
  const loginModalRef = useRef();
  const registerModalRef = useRef();
  const { setUser, user } = useContext(MainContext);
  const loginApi = process.env.REACT_APP_LOGIN;
  const registerApi = process.env.REACT_APP_REGISTER;

  useEffect(() => {
    const productsGet = async () => {
      try {
        const res = await axios.get(process.env.REACT_APP_GET_PRODUCTS);
        const data = res.data;
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    productsGet();
    calculateBasket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.basket]);
  const searchItem = (e) => {
    if (e.target.value.trimStart() === "") {
      e.target.value = "";
      setSearch("");
    } else {
      setSearch(e.target.value);
    }
  };
  const closeModal = () => {
    setSearch("");
    modalRef.current.click();
  };

  const calculateBasket = async () => {
    var newAmount = 0;
    const total = await user.basket?.map((item) => item.amount);
    await total?.map((item) => (newAmount += item));
    setCount(newAmount);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("User");
  };
  const loginToast = (message) => toast.error(message);
  const registerToast = (message) => toast.success(message);

  return (
    <>
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
      <div
        className={`${
          location.pathname.includes("/admin")
            ? "hidden"
            : "sticky container flex-col lg:flex-row  top-0 left-0 flex items-center  justify-between min-h-[10vh] p-5 bg-base-300 text-lg z-40 overflow-visible"
        }`}
      >
        <div className="flex justify-between items-center w-full lg:w-fit text-4xl">
          <Link to="/" className="text-4xl" onClick={() => setNav("h-0")}>
            Ofenos
          </Link>
          <div
            onClick={() => setNav(nav === "h-0" ? "h-full" : "h-0")}
            className="cursor-pointer hover:text-success duration-300 lg:hidden"
          >
            <GiHamburgerMenu />
          </div>
        </div>
        <div
          className={`${nav} lg:h-full w-full overflow-hidden lg:overflow-visible flex flex-col lg:flex-row justify-between lg:w-2/3`}
        >
          <div className="flex gap-5 items-center flex-col lg:flex-row my-5 lg:my-0">
            <Link
              className={`${
                location.pathname === "/" ? "text-success" : null
              } hover:text-success duration-300`}
              to="/"
              onClick={() => setNav("h-0")}
            >
              Home
            </Link>
            <Link
              className={`${
                location.pathname === "/shop" ? "text-success" : null
              } hover:text-success duration-300`}
              to="/shop"
              onClick={() => setNav("h-0")}
            >
              Shop
            </Link>
            <Link
              className={`${
                location.pathname === "/about" ? "text-success" : null
              } hover:text-success duration-300`}
              to="/about"
              onClick={() => setNav("h-0")}
            >
              About
            </Link>
            <Link
              className={`${
                location.pathname === "/contact" ? "text-success" : null
              } hover:text-success duration-300`}
              to="/contact"
              onClick={() => setNav("h-0")}
            >
              Contact
            </Link>
          </div>
          <div className="flex gap-5 items-center flex-col lg:flex-row">
            <div className="flex gap-2 items-center text-2xl">
              <label ref={modalRef} htmlFor="search">
                <BsSearch
                  className="hover:text-success duration-300 cursor-pointer"
                  onClick={() => setNav("h-0")}
                />
              </label>
              {user == null ? null : (
                <Link to="/basket" className="relative">
                  <SlBasket
                    className="hover:text-success duration-300"
                    onClick={() => setNav("h-0")}
                  />
                  {user.basket?.length !== 0 ? (
                    <div className="bg-error absolute -top-2 -right-3 rounded-full text-xs flex justify-center items-center  text-white w-5 h-5">
                      {count}
                    </div>
                  ) : null}
                </Link>
              )}
            </div>
            {user == null ? (
              <div className="flex gap-2 items-center">
                <label
                  className="btn btn-success text-white"
                  onClick={() => setNav("h-0")}
                  htmlFor="login-modal"
                >
                  Login
                </label>
                <label
                  className="btn btn-info text-white"
                  onClick={() => setNav("h-0")}
                  htmlFor="register-modal"
                >
                  Register
                </label>
              </div>
            ) : (
              <div className="relative dropdown-top  lg:!dropdown-bottom lg:dropdown-end ">
                <div className="dropdown dropdown-end z-50 relative">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar "
                  >
                    <div className="w-10 rounded-full">
                      <img
                        src="https://i.pinimg.com/236x/d4/37/4b/d4374b6dc2934880eaa7a5e8989c1f64.jpg"
                        alt=""
                      />
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="mt-3 -translate-x-1/2 left-1/2 lg:left-full lg:-translate-x-full z-50 p-2 shadow menu menu-compact dropdown-content drop bg-base-100 rounded-box w-52"
                  >
                    <Link to="/" onClick={() => logout()}>
                      <li>
                        <span>Logout</span>
                      </li>
                    </Link>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Search Modal */}
      <input type="checkbox" id="search" className="modal-toggle" />
      <label htmlFor="search" className="modal cursor-pointer ">
        <label className="modal-box relative " htmlFor="">
          <div className="relative text-xl">
            <input
              type="text"
              placeholder="Search"
              className="p-2 pl-10 w-full my-2 outline-none"
              onChange={(e) => searchItem(e)}
              value={search}
            />
            <BsSearch className="text-success absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          <div className="flex flex-col gap-5">
            {search !== ""
              ? products
                  .filter((product) =>
                    product.title.toLowerCase().includes(search.toLowerCase())
                  )
                  ?.map((product, index) => (
                    <Link
                      to={`/product/${product._id}`}
                      key={index}
                      onClick={() => closeModal()}
                    >
                      <div className="flex items-center justify-between gap-5">
                        <div>{product.title}</div>
                        <div>
                          <div className="avatar">
                            <div className="w-10 rounded-xl">
                              <img src={product.image} alt="" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
              : null}
          </div>
        </label>
      </label>
      {/* Login Modal */}

      <input
        ref={loginModalRef}
        type="checkbox"
        id="login-modal"
        className="modal-toggle"
      />
      <label htmlFor="login-modal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <div className="flex flex-col">
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email("This is not a real email")
                  .required("Name cannot be left blank"),
                password: Yup.string()
                  .min(8, "Password cannot be shorter than 8 length")
                  .required("Password cannot be left blank"),
              })}
              onSubmit={async (values, { resetForm, setSubmitting }) => {
                try {
                  setLoadingBTN(true);
                  const user = await axios.post(loginApi, {
                    ...values,
                  });
                  if (user.status === 200) {
                    await localStorage.setItem(
                      "User",
                      JSON.stringify(user.data)
                    );
                    const saveUser = await JSON.parse(
                      localStorage.getItem("User")
                    );

                    setUser(saveUser);
                    loginModalRef.current.click();
                    resetForm();
                    setSubmitting(false);
                    setLoadingBTN(false);
                    if (user.data.isAdmin === true) {
                      location.pathname = "/admin";
                    }
                  }
                } catch (error) {
                  console.log(error);
                  loginToast(error.response.data);
                  setLoadingBTN(false);
                  setSubmitting(false);
                }
              }}
            >
              {({
                values,
                handleSubmit,
                touched,
                handleChange,
                errors,
                isSubmitting,
              }) => (
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                  <h1 className="text-info text-3xl text-center font-semibold">
                    Login
                  </h1>

                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      id="email"
                      value={values.email}
                      onChange={handleChange}
                      className="p-2 w-full h-[40px] outline-none"
                    />
                    {errors.email && touched.email && (
                      <div className="text-error mt-2">{errors.email}</div>
                    )}
                  </div>
                  <div>
                    <input
                      type="password"
                      placeholder="Password"
                      id="password"
                      value={values.password}
                      onChange={handleChange}
                      className="p-2 w-full h-[40px] outline-none"
                    />
                    {errors.password && touched.password && (
                      <div className="text-error mt-2">{errors.password}</div>
                    )}
                  </div>

                  <button
                    className="btn btn-info"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    {loadingBTN === true ? (
                      <div className="animate-spin ">
                        <AiOutlineLoading3Quarters className="h-6 w-6" />
                      </div>
                    ) : (
                      "Login"
                    )}
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </label>
      </label>
      {/* Register Modal */}
      <input
        ref={registerModalRef}
        type="checkbox"
        id="register-modal"
        className="modal-toggle"
      />
      <label htmlFor="register-modal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <div className="flex flex-col">
            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                agree: false,
                gender: "",
              }}
              validationSchema={Yup.object({
                name: Yup.string().required("Name cannot be left blank"),
                email: Yup.string()
                  .email("This is not a real email")
                  .required("Name cannot be left blank"),
                password: Yup.string()
                  .min(8, "Password cannot be shorter than 8 length")
                  .required("Password cannot be left blank"),
                confirmPassword: Yup.string()
                  .required("Confirm password cannot be left blank")
                  .oneOf([Yup.ref("password"), null], "Passwords must match."),
                agree: Yup.boolean()
                  .oneOf([true], "You must accept the contract")
                  .required("You must accept the contract"),
                gender: Yup.string()
                  .required("You have to choose one")
                  .oneOf(["man", "woman"]),
              })}
              onSubmit={async (values, { resetForm, setSubmitting }) => {
                try {
                  setLoadingBTN(true);
                  await axios.post(registerApi, {
                    ...values,
                  });
                  registerModalRef.current.click();
                  resetForm();
                  setSubmitting(false);
                  setLoadingBTN(false);
                  registerToast("Successful to register");
                } catch (error) {
                  loginToast(error.response.data);
                  setLoadingBTN(false);
                }
              }}
            >
              {({
                values,
                handleSubmit,
                touched,
                handleChange,
                errors,
                isSubmitting,
              }) => (
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                  <h1 className="text-info text-3xl text-center font-semibold">
                    Register
                  </h1>
                  <div>
                    <input
                      type="text"
                      placeholder="Full Name"
                      id="name"
                      value={values.name}
                      onChange={handleChange}
                      className="p-2 w-full h-[40px] outline-none"
                    />
                    {errors.name && touched.name && (
                      <div className="text-error mt-2">{errors.name}</div>
                    )}
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      id="email"
                      value={values.email}
                      onChange={handleChange}
                      className="p-2 w-full h-[40px] outline-none"
                    />
                    {errors.email && touched.email && (
                      <div className="text-error mt-2">{errors.email}</div>
                    )}
                  </div>
                  <div>
                    <input
                      type="password"
                      placeholder="Password"
                      id="password"
                      value={values.password}
                      onChange={handleChange}
                      className="p-2 w-full h-[40px] outline-none"
                    />
                    {errors.password && touched.password && (
                      <div className="text-error mt-2">{errors.password}</div>
                    )}
                  </div>
                  <div>
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      id="confirmPassword"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      className="p-2 w-full h-[40px] outline-none"
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                      <div className="text-error mt-2">
                        {errors.confirmPassword}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="gender">Choose gender</label>
                    <select
                      className="p-2 w-full h-[40px] outline-none"
                      id="gender"
                      value={values.gender}
                      onChange={handleChange}
                    >
                      <option value="">Choose gender</option>
                      <option value="man">Man</option>
                      <option value="woman">Woman</option>
                    </select>
                    {errors.gender && touched.gender && (
                      <div className="text-error mt-2">{errors.gender}</div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="agree"
                        value={values.agree}
                        onChange={handleChange}
                      />
                      <label htmlFor="agree">Accept the contract</label>
                    </div>
                    {errors.agree && touched.agree && (
                      <div className="text-error mt-2"> {errors.agree} </div>
                    )}
                  </div>
                  <button
                    className="btn btn-info"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    {loadingBTN === true ? (
                      <div className="animate-spin ">
                        <AiOutlineLoading3Quarters className="h-6 w-6" />
                      </div>
                    ) : (
                      "Register"
                    )}
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </label>
      </label>
    </>
  );
};

export default Navbar;
