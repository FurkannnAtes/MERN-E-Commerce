import { BiLoaderAlt } from "react-icons/bi";

const LoadingScreen = () => {
  return (
    <div className="w-screen h-screen bg-black z-50 fixed top-0 left-0 flex items-center justify-center">
      <BiLoaderAlt className="animate-spin text-7xl" />
    </div>
  );
};

export default LoadingScreen;
