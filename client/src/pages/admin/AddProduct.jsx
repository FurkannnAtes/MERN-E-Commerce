import { Formik } from "formik";
import * as Yup from "yup";
import React, { useContext, useState } from "react";
import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import NotFound from "../../components/404";
import { MainContext } from "../../context/context";

const AddProduct = () => {
  const [showSideBar, setShowSideBar] = useState("hidden");
  const createProductApi = process.env.REACT_APP_CREATE_NEW_PRODUCT;

  const addToast = (message) => toast.success(message);
  const { user } = useContext(MainContext);
  if (user?.isAdmin === true) {
    return (
      <div className="container flex ">
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
        <Sidebar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
        <div className="flex flex-col w-full">
          <Header showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
          <div className="flex items-center justify-center min-h-[85vh] ">
            <Formik
              initialValues={{
                title: "",
                price: "",
                description: "",
                image: "",
                category: "",
              }}
              validationSchema={Yup.object({
                title: Yup.string().required("Title cannot be left blank"),
                price: Yup.string().required("Price cannot be left blank"),
                description: Yup.string().required(
                  "Description cannot be left blank"
                ),
                image: Yup.string().required("Image cannot be left blank"),
                category: Yup.string()
                  .required("You have to choose one")
                  .oneOf([
                    "men's clothing",
                    "women's clothing",
                    "jewelery",
                    "electronics",
                  ]),
              })}
              onSubmit={async (values, { resetForm, setSubmitting }) => {
                try {
                  await axios.post(createProductApi, {
                    ...values,
                  });
                  resetForm();
                  setSubmitting(false);
                  addToast("Product has been add");
                } catch (error) {
                  console.log(error);
                  resetForm();
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
                <form
                  className="flex flex-col gap-5 bg-base-300 p-5 rounded-xl"
                  onSubmit={handleSubmit}
                >
                  <h1 className="text-info text-3xl text-center font-semibold">
                    Add New Product
                  </h1>
                  <div className="flex gap-5 ">
                    <div>
                      <input
                        type="text"
                        placeholder="Title"
                        id="title"
                        value={values.title}
                        onChange={handleChange}
                        className="p-2 w-full h-[40px] outline-none"
                      />
                      {errors.title && touched.title && (
                        <div className="text-error mt-2">{errors.title}</div>
                      )}
                    </div>
                    <div>
                      <input
                        type="number"
                        placeholder="Price"
                        id="price"
                        value={values.price}
                        onChange={handleChange}
                        className="p-2 w-full h-[40px] outline-none"
                      />
                      {errors.price && touched.price && (
                        <div className="text-error mt-2">{errors.price}</div>
                      )}
                    </div>
                  </div>
                  <div>
                    <textarea
                      type="text"
                      placeholder="Description"
                      id="description"
                      value={values.description}
                      onChange={handleChange}
                      className="p-2 w-full h-[40px] outline-none"
                    />
                    {errors.description && touched.description && (
                      <div className="text-error mt-2">
                        {errors.description}
                      </div>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      id="image"
                      placeholder="Image url"
                      value={values.image}
                      onChange={handleChange}
                      className="p-2 w-full h-[40px] outline-none"
                    />
                    {errors.image && touched.image && (
                      <div className="text-error mt-2">{errors.image}</div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <select
                      className="p-2 w-full h-[40px] outline-none"
                      id="category"
                      value={values.category}
                      onChange={handleChange}
                    >
                      <option value="">Choose Category</option>
                      <option value="men's clothing">Men's clothing</option>
                      <option value="jewelery">Jewelery</option>
                      <option value="electronics">Electronics</option>
                      <option value="women's clothing">Women's clothing</option>
                    </select>
                    {errors.category && touched.category && (
                      <div className="text-error mt-2">{errors.category}</div>
                    )}
                  </div>

                  <button
                    className="btn btn-info"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    Add
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    );
  } else {
    return <NotFound />;
  }
};

export default AddProduct;
