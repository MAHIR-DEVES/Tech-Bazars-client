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
  const images = [BannerImg1, BannerImg2, BannerImg3, BannerImg4];

  return (
    <div className="w-full sm:max-w-7xl mx-auto pt-2">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="sm:rounded-2xl"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              className="w-full h-auto max-h-[500px] object-contain sm:object-cover object-center sm:rounded-2xl"
              src={img}
              alt={`Banner  ${index + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
