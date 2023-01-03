import {
  BsGithub,
  BsLinkedin,
  BsFillEnvelopeFill,
  BsTelephone,
} from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  return (
    <div
      className={`${
        location.pathname.includes("/admin")
          ? "hidden"
          : "flex flex-col bg-base-300 container"
      }`}
    >
      <div className="flex items-center p-5 justify-between border-b">
        <div className="text-white text-xl font-semibold">Links:</div>
        <div className="flex gap-5  text-xl">
          <a
            target="_blank"
            href="https://github.com/FurkannnAtes"
            className="duration-300 hover:text-success"
            rel="noreferrer"
          >
            {" "}
            <BsGithub />
          </a>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/furkan-ate%C5%9F-b67491240/"
            className="duration-300 hover:text-success"
            rel="noreferrer"
          >
            {" "}
            <BsLinkedin />
          </a>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-start md:justify-around gap-5 p-5">
        <div className="flex flex-col gap-3">
          <h1 className="text-white font-semibold text-xl">Products</h1>
          <div>React</div>
          <div>Tailwind</div>
          <div>Daisy ui</div>
          <div>Node</div>
          <div> Express</div>
          <div>Mongo DB</div>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-white font-semibold text-xl">Pages</h1>
          <Link to="/home" className="duration-300 hover:text-success">
            Home
          </Link>
          <Link to="/shop" className="duration-300 hover:text-success">
            Shop
          </Link>
          <Link to="/about" className="duration-300 hover:text-success">
            About
          </Link>
          <Link to="/blog" className="duration-300 hover:text-success">
            Blog
          </Link>
          <Link to="/contact" className="duration-300 hover:text-success">
            Contact
          </Link>
          <Link to="/basket" className="duration-300 hover:text-success">
            Basket
          </Link>
        </div>

        <div className="flex flex-col items-center md:items-start gap-3">
          <h1 className="text-white font-semibold text-xl">Contact</h1>
          <div className="flex gap-2 items-center">
            <BsFillEnvelopeFill />
            <div>example@hotmail.com</div>
          </div>
          <div className="flex gap-2 items-center">
            <BsTelephone />
            <div>555 555 55 55</div>
          </div>
        </div>
      </div>
      <div className="bg-base-200 text-white py-5 text-center">
        Copyright ©2022 All rights reserved | This template is made with by
        Ofenos
      </div>
    </div>
  );
};

export default Footer;
