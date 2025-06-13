import React, { useState, useRef, useEffect } from "react";
import "./index.scss";
import CarouselForYou from "../../components/SliderMain";
import { Typography } from "antd";
import { formatMoneyToVND } from "../../currency/currency";
import api from "../../config/api";
import { useParams } from "react-router";


const WorkshopDetails = () => {
  const { Text } = Typography;
  const { hasMoreDate, isHasMoreDate } = useState();
  const ticketInfoRef = useRef(null);
  const {id} = useParams();
  const data = {
    title: "Náo Loạn Tiếu Lâm Đường",
    intro:
      "Náo Loạn Tiếu Lâm Đường là một chương trình hài kịch mới, quy tụ nhiều nghệ sĩ trẻ tài năng.",
    description: `
      Tác giả: Nguyễn Bảo Ngọc. 
      Biên tập & Đạo diễn: Hồng Ngọc. 
      Diễn viên: Tuấn Kiệt, Võ Đăng Khoa, Long Chun, Mai Bảo Vinh, 5 Chà, Vương Chí Nam, Tú Tri, Mai Kim Liên, 
      Huỳnh Thi, Thắng Tăng, Nhã Uyên, Huyền Duy, Duy Tiến và các Diễn viên trẻ Nhà Hát Thanh Niên.
    `,
  };
  const matchData = {
    title: "Trận Đấu Giao Hữu: The Manchester Reds - VietNam All Stars",
    match: "The Manchester Reds - VietNam All Stars",
    date: " 26 Tháng 06, 2025",
    timeStart: "16:00",
    timeEnd: "20:00",
    moreDates: "2",
    location: "Sân Vận Động Hòa Xuân, Đà Nẵng",
    priceFrom: "250000 ",
  };
  const organizerData = {
    logo: "https://imgur.com/gallery/awoo-ufCuXWC",
    name: "Công Ty TNHH Sân Khấu - Nghệ Thuật Thái Dương",
    description: "Nhà Hát Thanh Niên",
  };

  const handleHasMoreDate = () => {
    if (data.moreDates > 1) {
      isHasMoreDate(data.moreDates - 1);
    }
  };

  const handleUserAccess = async () => {
    try {
      const response = await api.post("workshop/user-access",{id});
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleUserAccess();
  }, []);
  return (
    <div className="workshop-page">
      {/* Banner vé */}
      <section className="ticket-banner">
        <div className="ticket-banner__info">
          <h2>{matchData.title} </h2>
          <div className="ticket-banner__meta">
            <div>
              <i className="fa-regular fa-calendar"></i>
              16:00 - 20:00, 26 Tháng 06, 2025
            </div>
            {Number(matchData.moreDates) > 0 && (
              <div
                className="ticket-banner__more-date"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  ticketInfoRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                + {matchData.moreDates} ngày khác
              </div>
            )}

            <div>
              <i className="fa-solid fa-location-dot"></i>
              {matchData.location}
            </div>
          </div>
          <div className="ticket-banner__price">
            Giá từ <span>{formatMoneyToVND(matchData.priceFrom)}</span>
          </div>
          <button className="btn-main">Chọn lịch diễn</button>
        </div>
        <div className="ticket-banner__img">
          <img
            src="https://i.imgur.com/1Q9Z1Zm.png"
            alt="Manchester Reds vs Vietnam All Stars"
          />
        </div>
      </section>

      {/* Nội dung chi tiết */}
      <section className="workshop-details">
        {/* Giới thiệu */}
        <div className="workshop-card intro">
          <h3>Giới thiệu</h3>
          <div className="intro-content">
            <h2>{data.title}</h2>
            <div className="intro-content__description">
              <Text style={{ whiteSpace: "pre-line" }}>
                {data.description?.replace(/\\n/g, "\n")}{" "}
                {/*\\n (dạng escape), .replace(/\\n/g, "\n") để chuyển nó thành xuống dòng thật. */}
              </Text>
            </div>
          </div>
        </div>

        {/* Thông tin vé */}
        <div className="workshop-card ticket-info" ref={ticketInfoRef}>
          <div className="ticket-info__header">Thông tin vé</div>
          <div className="ticket-info__body">
            <span>
              <i className="fa-regular fa-angle-right"></i>
              <b>20:00 - 22:00, 19 Tháng 07, 2025</b>
            </span>
            <button className="btn-main">Mua vé ngay</button>
          </div>
        </div>

        {/* Ban tổ chức */}
        <div className="workshop-card organizer">
          <h4>Ban tổ chức</h4>
          <div className="organizer__info">
            <div className="organizer__center">
              <img
                src={organizerData.logo}
                alt="Logo"
                className="organizer__logo"
              />
              <div className="organizer__name">
                <b>{organizerData.name}</b>
                <div className="organizer__desc">
                  {organizerData.description}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gợi ý */}
      <section className="workshop-footer">
        <div className="workshop-footer__title">Có thể bạn cũng thích</div>
        <CarouselForYou title="" />
      </section>
    </div>
  );
};

export default WorkshopDetails;
