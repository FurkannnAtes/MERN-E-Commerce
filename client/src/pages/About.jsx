import React from "react";

const About = () => {
  return (
    <div className=" flex container p-5  justify-center">
      <div className="bg-base-300 w-full flex h-fit flex-col md:flex-row justify-between p-5 items-center gap-5">
        <div className="flex flex-col  gap-5">
          <h1 className="text-4xl lg:text-7xl font-semibold">About US</h1>
          <p className="max-w-[600px]">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab laborum
            expedita aut nobis incidunt cumque consequatur, exercitationem illo
            necessitatibus odio voluptatem, veniam fugiat unde alias deserunt
            quisquam modi nostrum officiis!
          </p>
          <div>
            <button className="btn btn-accent btn-lg">Read More</button>
          </div>
        </div>
        <div>
          <img
            src="https://gro-ws.com/wp-content/uploads/2022/04/ozel-yazilim-e-ticaret.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default About;
