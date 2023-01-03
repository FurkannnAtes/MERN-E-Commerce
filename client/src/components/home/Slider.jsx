// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper";

const Slider = () => {
  return (
    <div>
      <Swiper
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation={true}
        className="max-h-[800px] h-[90vh] banner "
        modules={[Navigation, Autoplay]}
      >
        <SwiperSlide
          className="h-full bg-no-repeat bg-center flex items-center justify-center "
          style={{ backgroundImage: "url('/images/slider-1.jpg')" }}
        >
          <div className="flex flex-col gap-5 text-white text-center banner-box">
            <div className="text-7xl font-extrabold">2023</div>
            <div className="text-7xl font-semibold">Lookbook.</div>
            <div className=" font-semibold btn btn-outline text-white w-fit rounded-full mx-auto border-white hover:bg-black hover:text-white hover:border-white">
              See More
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide
          className="h-full bg-no-repeat bg-center flex items-center justify-center "
          style={{ backgroundImage: "url('/images/slider-2.jpg')" }}
        >
          <div className="flex flex-col gap-5 text-white text-center banner-box">
            <div className="text-7xl font-extrabold">2023</div>
            <div className="text-7xl font-semibold">Lookbook.</div>
            <div className=" font-semibold btn btn-outline text-white w-fit rounded-full mx-auto border-white hover:bg-black hover:text-white hover:border-white">
              See More
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide
          className="h-full bg-no-repeat bg-center flex items-center justify-center"
          style={{ backgroundImage: "url('/images/slider-3.jpg')" }}
        >
          <div className="flex flex-col gap-5 text-white text-center banner-box">
            <div className="text-7xl font-extrabold">2023</div>
            <div className="text-7xl font-semibold">Lookbook.</div>
            <div className=" font-semibold btn btn-outline text-white w-fit rounded-full mx-auto border-white hover:bg-black hover:text-white hover:border-white">
              See More
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
