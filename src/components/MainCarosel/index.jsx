import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./index.scss";
import VideoCard from "../VideoCard";

export default function MainCarosel({ data }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="main-carousel">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        //autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          // 1500: { slidesPerView: 5 },
          1200: { slidesPerView: 4 },
          900: { slidesPerView: 3 },
          600: { slidesPerView: 2 },
          0: { slidesPerView: 1 },
        }}
      >
        {data.map((item, index) => (
          <SwiperSlide
            key={item.id}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="main-carousel-card">
              <img
                src={item.image}
                alt={item.title}
                className={`main-carousel-img ${
                  hoveredIndex === index ? "hidden" : ""
                }`}
              />
              {hoveredIndex === index && (
                <VideoCard src={item.video} link={item.link} />
              )}
              <div className="main-carousel-content">
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
