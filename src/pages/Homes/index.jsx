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
  const suKienData1 = [
    { id: 1, link:"https://chat.openai.com/", image: "/img/aaaa.png", title: "Sự kiện 1" , video:"https://ik.imagekit.io/hp1dcwmpu/AQPm_nd7UDY0MGGKIerRBlNYmJ9PdySQFeiPSZ_GZ32jKRhFxj8cbZmAp5K-j5djOjtpUq8o7RKgAU96lLhVrsPy.mp4?updatedAt=1749233089993" },
    { id: 2, image: "/img/aaaa.png", title: "Sự kiện 2" , video:"../../../public/img/Administrator_ TimeRift - Scene1 - Windows, Mac, Linux - Unity 6 (6000.0.32f1) _DX11_ 2025-02-03 21-06-47.mp4" },
    { id: 3, image: "/img/aaaa.png", title: "Sự kiện 3" , video:"../../../public/img/Administrator_ TimeRift - Scene1 - Windows, Mac, Linux - Unity 6 (6000.0.32f1) _DX11_ 2025-02-03 21-06-47.mp4" } ,
    { id: 4, image: "/img/aaaa.png", title: "Sự kiện 4" , video:"../../../public/img/Administrator_ TimeRift - Scene1 - Windows, Mac, Linux - Unity 6 (6000.0.32f1) _DX11_ 2025-02-03 21-06-47.mp4" },
    { id: 5, image: "/img/aaaa.png", title: "Sự kiện 5" , video:"../../../public/img/Administrator_ TimeRift - Scene1 - Windows, Mac, Linux - Unity 6 (6000.0.32f1) _DX11_ 2025-02-03 21-06-47.mp4" },
    // ...
  ];
  return (
    <div className="view">
      <div className="block">
        {" "}
        <MainCarosel data={suKienData1} />
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
