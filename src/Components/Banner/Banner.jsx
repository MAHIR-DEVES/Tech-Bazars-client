import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

// Images
import BannerImg1 from '../../assets/banner1.png';
import BannerImg2 from '../../assets/banner2.png';
import BannerImg3 from '../../assets/banner3.png';
import BannerImg4 from '../../assets/banner4.png';

const Banner = () => {
  return (
    <div className=" w-full sm:w-10/12 mx-auto pt-2">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="sm:rounded-2xl"
      >
        <SwiperSlide>
          <img
            className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover object-center sm:rounded-2xl"
            src={BannerImg1}
            alt="Banner 1"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover object-center sm:rounded-2xl"
            src={BannerImg2}
            alt="Banner 2"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover object-center sm:rounded-2xl"
            src={BannerImg3}
            alt="Banner 3"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover object-center sm:rounded-2xl"
            src={BannerImg4}
            alt="Banner 4"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
