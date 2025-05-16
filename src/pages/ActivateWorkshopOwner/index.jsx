import React from "react";
import { Input, Button, Form } from "antd";
import "./index.scss";

const ActivateWorkshopOwner = () => {
  return (
    <div className="activate-bg">
      <div className="activate-card">
        <div className="activate-left">
          <h2>Kích hoạt tài khoản để tiếp tục sử dụng</h2>
          <Form layout="vertical" className="activate-form">
            <Form.Item name="shopName">
              <Input placeholder="Tên Cửa Hàng*" />
            </Form.Item>
            <Form.Item name="bankAccount">
              <Input placeholder="Tài Khoản Ngân Hàng*" />
            </Form.Item>
            <Form.Item name="address">
              <Input placeholder="Địa Chỉ*" />
            </Form.Item>
            <Form.Item name="idCard">
              <Input placeholder="CMND/CCCD*" />
            </Form.Item>
            <div className="activate-actions">
              <Button className="brown-btn">Quay Về</Button>
              <Button className="brown-btn" type="primary">Đăng Kí</Button>
            </div>
          </Form>
        </div>
        <div className="activate-divider"></div>
        <div className="activate-right">
          <div className="img-wrapper">
            <img src="/img/youknowwho.png" alt="workshop" />
            <div className="img-overlay">
              <div className="overlay-title">HAND-MADE POTTERY EXPERIENCE</div>
              <div className="overlay-sub">Evenings</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivateWorkshopOwner;