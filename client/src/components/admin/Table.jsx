import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

import { GoTrashcan } from "react-icons/go";
import { BsSearch } from "react-icons/bs";
import Skeleton from "../loading/Skeleton";
import { toast, ToastContainer } from "react-toastify";
const Table = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");
  const [filterSubmit, setFilterSubmit] = useState("");
  const [loading, setLoading] = useState(false);
  const deleteProductApi = process.env.REACT_APP_DELETE_PRODUCT;

  useEffect(() => {
    setLoading(true);
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    const res = await axios.get(process.env.REACT_APP_GET_PRODUCTS);
    const data = res.data;
    setProducts(data);
    setLoading(false);
  };
  const searchProduct = (e) => {
    e.preventDefault();
    setFilter(filterSubmit);
  };
  const deleteProduct = async (id) => {
    try {
      await axios.delete(deleteProductApi + id);
      getAllProducts();
      deleteToast("Product has been delete");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteToast = (message) => toast.success(message);

  return (
    <div className="flex flex-col h-[80vh] w-full">
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
      <form
        onSubmit={(e) => searchProduct(e)}
        className="p-2 bg-base-300 flex gap-0 w-full"
      >
        <input
          className="w-full h-full p-2 outline-none"
          type="text"
          placeholder="Search Product"
          value={filterSubmit}
          onChange={(e) => setFilterSubmit(e.target.value)}
        />
        <div>
          <button className="btn btn-accent rounded-none">
            <BsSearch className="text-black" />
          </button>
        </div>
      </form>
      <div className="overflow-x-auto  h-full">
        <table className="table w-full ">
          <thead>
            <tr className="">
              <th>ID</th>
              <th>Image</th>
              <th>Title</th>
              <th className="text-center">Price</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading === true ? (
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]?.map((item, i) => (
                <Skeleton key={i} type="table" />
              ))
            ) : products.filter((item) =>
                item.title.toLowerCase().includes(filter.toLowerCase())
              ).length === 0 ? (
              <tr className="active">
                <td className="py-5 ">Not found sorry</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            ) : (
              products
                .filter((item) =>
                  item.title.toLowerCase().includes(filter.toLowerCase())
                )
                ?.map((product, index) => (
                  <tr key={index} className="active">
                    <th>{(index += 1)}</th>
                    <td>
                      {" "}
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={product.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="truncate w-[300px]">{product.title}</p>
                    </td>
                    <td className="text-center">{product.price} $</td>
                    <td>
                      <div className="flex item-center gap-2 justify-center ">
                        <button
                          onClick={() => deleteProduct(product._id)}
                          className="btn btn-error flex items-center gap-1"
                        >
                          <GoTrashcan />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
