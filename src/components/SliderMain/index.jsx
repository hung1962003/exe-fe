import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { CalendarOutlined } from "@ant-design/icons";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./index.scss";

const data = [
  {
    id: 1,
    image: "https://i.imgur.com/1.jpg",
    title: 'ART WORKSHOP " SNICKERS MOUSSE STICK"',
    price: "2.300.000đ",
    date: "07 tháng 03, 2025",
  },
  {
    id: 2,
    image: "https://i.imgur.com/2.jpg",
    title: '[GARDEN ART] - ART WORKSHOP "TERRARIUM CAKE"',
    price: "330.000đ",
    date: "07 tháng 03, 2025",
  },
  {
    id: 3,
    image: "https://i.imgur.com/3.jpg",
    title: '[GARDEN ART] - ART WORKSHOP "TIRAMISU MOUSSE CAKE"',
    price: "80.000đ",
    date: "07 tháng 03, 2025",
  },
  {
    id: 4,
    image: "https://i.imgur.com/4.jpg",
    title: "Ema Roma _Workshop làm bánh nhung đỏ - bày tỏ thương yêu",
    price: "350.000đ",
    date: "08 tháng 03, 2025",
    badge: "Giá chỉ còn 350.000đ cho đăng ký trước 08.03.2025",
    discount: "30%",
  },
  {
    id: 5,
    image: "https://i.imgur.com/1.jpg",
    title: 'ART WORKSHOP " SNICKERS MOUSSE STICK"',
    price: "2.300.000đ",
    date: "07 tháng 03, 2025",
  },
];

export default function CarouselForYou({ title }) {
  return (
    <div className="carousel-for-you">
      <div className="carousel-title">{title}</div>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={24}
        slidesPerView={4}
        navigation
        
        loop={true}
        breakpoints={{
          1200: { slidesPerView: 4 },
          900: { slidesPerView: 3 },
          600: { slidesPerView: 2 },
          0: { slidesPerView: 1 },
        }}
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="carousel-card">
              <div className="carousel-img-wrap">
                <img
                  src={item.image}
                  alt={item.title}
                  className="carousel-img"
                />
                {item.discount && (
                  <div className="carousel-discount-badge">
                    Giảm {item.discount}
                  </div>
                )}
              </div>
              <div className="carousel-title-main">{item.title}</div>
              <div className="carousel-price">Từ {item.price}</div>
              <div className="carousel-date">
                <CalendarOutlined style={{ marginRight: 6 }} />
                {item.date}
              </div>
              {item.badge && <div className="carousel-badge">{item.badge}</div>}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
