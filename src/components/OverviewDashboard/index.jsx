import React from "react";
import "./index.scss";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Line } from "react-chartjs-2";
import {
  Chart,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip,
} from "chart.js";

Chart.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip
);

const percentRevenue = 0;
const percentTicket = 0;

const data = {
  labels: [
    "10 tháng 5 '25",
    "12 tháng 5 '25",
    "14 tháng 5 '25",
    "16 tháng 5 '25",
    "18 tháng 5 '25",
    "20 tháng 5 '25",
    "22 tháng 5 '25",
    "24 tháng 5 '25",
    "26 tháng 5 '25",
    "28 tháng 5 '25",
    "30 tháng 5 '25",
    "1 tháng 6 '25",
    "3 tháng 6 '25",
    "5 tháng 6 '25",
    "7 tháng 6 '25",
  ],
  datasets: [
    {
      label: "Doanh thu",
      data: Array(15).fill(0),
      borderColor: "#a259ff",
      backgroundColor: "#a259ff",
      yAxisID: "y1",
      tension: 0.4,
      pointRadius: 2,
    },
    {
      label: "Số vé bán",
      data: Array(15).fill(0),
      borderColor: "#1abc60",
      backgroundColor: "#1abc60",
      yAxisID: "y2",
      tension: 0.4,
      pointRadius: 2,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      labels: {
        color: "#fff",
        font: { size: 14 },
      },
    },
    tooltip: {
      enabled: true,
      backgroundColor: "#23272a",
      titleColor: "#fff",
      bodyColor: "#fff",
    },
  },
  scales: {
    x: {
      ticks: { color: "#fff" },
      grid: { color: "#333" },
    },
    y1: {
      type: "linear",
      position: "left",
      title: { display: true, text: "Doanh thu", color: "#fff" },
      ticks: { color: "#fff" },
      grid: { color: "#333" },
    },
    y2: {
      type: "linear",
      position: "right",
      title: { display: true, text: "Số vé bán", color: "#fff" },
      ticks: { color: "#fff" },
      grid: { drawOnChartArea: false },
    },
  },
};

export default function OverviewDashboard() {
  return (
    <div className="overview-dashboard">
      <div className="overview-dashboard__header">
        <div className="overview-dashboard__date">
          <span role="img" aria-label="calendar" style={{ marginRight: 8 }}>
            📅
          </span>
          04 Tháng 06, 2025 - 00:00
        </div>
        <button className="overview-dashboard__switch-btn">
          Đổi suất diễn
        </button>
      </div>
      <h2 className="overview-dashboard__title">Doanh thu</h2>
      <div className="overview-dashboard__overview">
        <div className="overview-dashboard__card">
          <div className="overview-dashboard__card-title">Doanh thu</div>
          <div className="overview-dashboard__card-value">0đ</div>
          <div className="overview-dashboard__card-desc">Tổng: 0đ</div>
          <div className="overview-dashboard__progress">
            <CircularProgressbar
              value={percentRevenue}
              text={`${percentRevenue} %`}
              styles={buildStyles({
                pathColor: "#ffb800",
                textColor: "#ffb800",
                trailColor: "#23272a",
                textSize: "22px",
                strokeLinecap: "round",
              })}
            />
          </div>
        </div>
        <div className="overview-dashboard__card">
          <div className="overview-dashboard__card-title">Số vé đã bán</div>
          <div className="overview-dashboard__card-value">0 vé</div>
          <div className="overview-dashboard__card-desc">Tổng: 10 vé</div>
          <div className="overview-dashboard__progress">
            <CircularProgressbar
              value={percentTicket}
              text={`${percentTicket} %`}
              styles={buildStyles({
                pathColor: "#ffb800",
                textColor: "#ffb800",
                trailColor: "#23272a",
                textSize: "22px",
                strokeLinecap: "round",
              })}
            />
          </div>
        </div>
      </div>
      <div className="overview-dashboard__chart-section">
        <div className="overview-dashboard__chart-header">
          <span className="dot purple"></span> Doanh thu
          <span className="dot green" style={{ marginLeft: 24 }}></span> Số vé
          bán
          <div className="overview-dashboard__chart-range">
            <button className="range-btn">24 giờ</button>
            <button className="range-btn active">30 ngày</button>
          </div>
        </div>
        <div className="overview-dashboard__chart">
          <Line data={data} options={options} height={300} />
        </div>
      </div>
      <div className="overview-dashboard__detail">
        <div className="overview-dashboard__detail-title">Chi tiết</div>
        <div className="overview-dashboard__table-title">Vé đã bán</div>
        <div className="overview-dashboard__table">
          <div className="overview-dashboard__table-row header">
            <div>Loại vé</div>
            <div>Giá bán</div>
            <div>Đã bán</div>
            <div>Bị khoá</div>
            <div>Tỉ lệ bán</div>
          </div>
          {/* Dữ liệu mẫu, bạn có thể map từ props/data */}
          {/* <div className="overview-dashboard__table-row">
            <div>Vé thường</div>
            <div>100.000đ</div>
            <div>0</div>
            <div>0</div>
            <div>0%</div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
