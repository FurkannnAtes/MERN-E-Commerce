import { FaProductHunt, FaPlus } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { MainContext } from "../../context/context";

const Sidebar = ({ showSideBar, setShowSideBar }) => {
  const location = useLocation();
  const { setUser } = useContext(MainContext);
  const logout = () => {
    setUser(null);
    localStorage.removeItem("User");
  };
  return (
    <div
      className={`${showSideBar}  w-[250px] z-40 left-0 top-0 absolute lg:flex lg:relative min-h-screen bg-base-300 py-5 flex flex-col`}
    >
      <div className="text-accent text-4xl font-semibold p-[27px] flex items-center justify-between">
        Ofenos{" "}
        <div
          className="lg:hidden z-50"
          onClick={() => setShowSideBar("hidden")}
        >
          <AiOutlineClose className="text-white  cursor-pointer text-4xl " />
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <Link
          to="/admin"
          className={`${
            location.pathname === "/admin" ? "text-info" : null
          } group duration-300 hover:text-info flex items-center gap-2 p-2 text-lg bg-base-100 border-l-4 border-white`}
        >
          <FaProductHunt className="group-hover:mr-2 duration-300 " />
          <div className="duration-300 ">All Products</div>
        </Link>
        <Link
          to="/admin/addProduct"
          className={`${
            location.pathname === "/admin/addProduct" ? "text-info" : null
          } group duration-300 hover:text-info flex items-center gap-2 p-2 text-lg bg-base-100 border-l-4 border-white`}
        >
          <FaPlus className="group-hover:mr-2 duration-300 " />
          <div className="duration-300 ">Add Product</div>
        </Link>
      </div>
      <Link
        to="/"
        className={` group duration-300 hover:text-info flex items-center gap-2 p-2 text-lg bg-base-100 border-l-4 border-white mt-auto`}
      >
        <BiLogOut className="group-hover:mr-2 duration-300 " />
        <div onClick={() => logout()} className="duration-300 ">
          Logout
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
