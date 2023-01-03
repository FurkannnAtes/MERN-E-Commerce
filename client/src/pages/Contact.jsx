import React from "react";
import {
  BsFillEnvelopeFill,
  BsFillTelephoneFill,
  BsGeoAltFill,
} from "react-icons/bs";

const Contact = () => {
  return (
    <div className=" flex container p-5  justify-center">
      <div className="bg-base-300 w-full flex h-fit flex-col md:flex-row justify-between p-5  gap-5">
        <div className="flex flex-col  gap-5 w-full md:w-1/2">
          <h1 className="text-4xl font-semibold">Send Message Us</h1>
          <input
            type="text"
            placeholder="Name"
            className="w-full py-3 p-2 outline-none"
          />
          <input
            type="text"
            placeholder="Email"
            className="w-full py-3 p-2 outline-none"
          />
          <textarea
            className="w-full py-3 p-2 outline-none"
            placeholder="Message"
            cols="30"
            rows="5"
          ></textarea>
          <div>
            <button className="btn btn-accent btn-lg w-full">Send</button>
          </div>
        </div>
        <div className="flex flex-col gap-6 w-full md:w-1/2 ">
          <h1 className="text-4xl font-semibold">Get in Touch</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            dolorum dolorem soluta quidem expedita aperiam aliquid at. Totam
            magni ipsum suscipit amet? Autem nemo esse laboriosam ratione nobis
            mollitia inventore?
          </p>
          <div className="flex gap-2 items-center ">
            <div>
              <BsGeoAltFill className="text-error" />
            </div>
            <div>329 WASHINGTON ST BOSTON, MA 02108</div>
          </div>
          <div className="flex gap-2 items-center">
            <div>
              <BsFillTelephoneFill className="text-green-400" />
            </div>
            <div>(555) 557-5555</div>
          </div>
          <div className="flex gap-2 items-center">
            <div>
              <BsFillEnvelopeFill className="text-yellow-400" />
            </div>
            <div>contact@example.com</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
