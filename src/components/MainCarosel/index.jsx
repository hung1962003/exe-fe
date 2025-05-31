import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./index.scss";

// Nhận props: data (array các object {id, image, title, [link]})
export default function MainCarosel({ data }) {
  return (
    <div className="main-carousel">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={32}
        slidesPerView={2}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          1200: { slidesPerView: 2 },
          900: { slidesPerView: 1 },
          600: { slidesPerView: 1 },
          0: { slidesPerView: 1 },
        }}
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="main-carousel-card">
              <img
                src={item.image}
                alt={item.title}
                className="main-carousel-img"
              />
              <div className="main-carousel-content">
                <div className="main-carousel-title">{item.title}</div>
                {item.link && (
                  <a href={item.link} className="main-carousel-btn">
                    Xem chi tiết
                  </a>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
