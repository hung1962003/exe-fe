import React from "react";
import { Button, Input, Tooltip } from "antd";
import {
  YoutubeOutlined,
  GithubOutlined,
  GoogleOutlined,
} from "@ant-design/icons";
import "./index.scss";
// import { jwtDecode } from "jwt-decode";
import CarouselForYou from "../../components/SliderMain";
import BannerCarousel from "../../components/BannerCarousel";
import MainCarosel from "../../components/MainCarosel";

function Home() {
  // const decode = () => {
  //   const token =
  //     "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJIQUdfV09SS1NIT1AiLCJzdWIiOiJKV1QgVG9rZW4iLCJpZCI6MSwicm9sZSI6IkFETUlOIiwiZmlyc3ROYW1lIjoic3RyaW5nIiwibGFzdE5hbWUiOiJzdHJpbmciLCJwaG9uZSI6IjA5NjIyNDEwMDkiLCJpYXQiOjE3NDg1MzQ5MDcsImV4cCI6MTc0ODU2MzcwN30.XPYEpHSSrl2zzdKpnWEF_FuOqrUHIYh0mRqU6wPLXq4";
  //   const decoded = jwtDecode(token);
  //   console.log(decoded);
  // };

  const suKienData = [
    { id: 1, image: "/img/youknowwho.png", title: "Sự kiện 1" },
    { id: 2, image: "/img/youknowwho.png", title: "Sự kiện 2" },
    { id: 3, image: "/img/youknowwho.png", title: "Sự kiện 3" },
    { id: 4, image: "/img/youknowwho.png", title: "Sự kiện 4" },
    { id: 5, image: "/img/youknowwho.png", title: "Sự kiện 5" },
    // ...
  ];

  return (
    <div className="view">
      <div className="block">
        {" "}
        <MainCarosel data={suKienData} />
      </div>
      <div className="block">
        {" "}
        <BannerCarousel title="Sự kiện đặc biệt" data={suKienData} />{" "}
      </div>
      <div className="block">
        {" "}
        <CarouselForYou title="Dành cho bạn" />
      </div>
      <div className="block">
        {" "}
        <CarouselForYou title="Workshop" />
      </div>
      <div className="block">
        <CarouselForYou title="San khau & Nghe thuat" />
      </div>
    </div>
  );
}

export default Home;
