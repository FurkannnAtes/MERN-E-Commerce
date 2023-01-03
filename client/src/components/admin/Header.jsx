import { useContext } from "react";
import { BsList } from "react-icons/bs";
import { MainContext } from "../../context/context";

const Header = ({ showSideBar, setShowSideBar }) => {
  const { user } = useContext(MainContext);
  const toggleSideBar = () => {
    if (showSideBar === "hidden") {
      setShowSideBar("block");
    } else {
      setShowSideBar("flex");
    }
  };

  return (
    <div className="h-[15vh] flex justify-between items-center w-full bg-base-300 p-5 sticky">
      <div className="btn text-4xl lg:hidden" onClick={() => toggleSideBar()}>
        <BsList />
      </div>
      <div className="ml-auto flex items-center gap-2">
        <div>{user.name}</div>
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img
              src="https://i.pinimg.com/236x/d4/37/4b/d4374b6dc2934880eaa7a5e8989c1f64.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
