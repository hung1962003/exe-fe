import React, { useState } from "react";
import "./index.scss";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

function Cart() {
  // Demo state cho số lượng
  const [cart, setCart] = useState([
    {
      type: "product",
      items: [
        {
          id: 1,
          name: "Hộp 100 găng tay bột án siêu dai Victoria Bay làm bếp siêu dai chất liệu TPE không mùi chống nhăn",
          price: 132000,
          qty: 1,
        },
        {
          id: 2,
          name: "Hộp 100 găng tay bột án siêu dai Victoria Bay làm bếp siêu dai chất liệu TPE không mùi chống nhăn",
          price: 232000,
          qty: 2,
        },
      ],
    },
    {
      type: "workshop",
      items: [
        {
          id: 3,
          name: "[FLOWER 1995] WORKSHOP CANDLE - HỌC LÀM NẾN THƠM",
          price: 132000,
          qty: 1,
        },
      ],
    },
  ]);

  // Tính tổng tiền
  const total = cart
    .flatMap((group) => group.items)
    .reduce((sum, item) => sum + item.price * item.qty, 0);

  // Xử lý tăng/giảm số lượng
  const handleQty = (groupIdx, itemIdx, delta) => {
    setCart((prev) =>
      prev.map((group, gIdx) =>
        gIdx === groupIdx
          ? {
              ...group,
              items: group.items.map((item, iIdx) =>
                iIdx === itemIdx
                  ? {
                      ...item,
                      qty: Math.max(1, item.qty + delta),
                    }
                  : item
              ),
            }
          : group
      )
    );
  };

  // Xử lý xóa sản phẩm
  const handleDelete = (groupIdx, itemIdx) => {
    setCart((prev) =>
      prev.map((group, gIdx) =>
        gIdx === groupIdx
          ? {
              ...group,
              items: group.items.filter((_, iIdx) => iIdx !== itemIdx),
            }
          : group
      )
    );
  };

  return (
    <div className="cart-container">
      <div className="cart-left">
        <div className="cart-back">{"< Tiếp tục mua sắm"}</div>
        {cart.map((group, groupIdx) => (
          <div className="cart-group" key={group.type}>
            <div className="cart-group-title">
              {group.type === "product" ? "Tên Sản Phẩm" : "Tên Workshop"}
              <span>Giá thành</span>
              <span>Số lượng</span>
            </div>
            {group.items.map((item, itemIdx) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-info">
                  <div className="cart-item-img" />
                  <div className="cart-item-name">{item.name}</div>
                </div>
                <div className="cart-item-price">
                  {item.price.toLocaleString()}đ
                </div>
                <div className="cart-item-qty">
                  <button
                    onClick={() => handleQty(groupIdx, itemIdx, -1)}
                    className="qty-btn"
                  >
                    -
                  </button>
                  <span>{item.qty}</span>
                  <button
                    onClick={() => handleQty(groupIdx, itemIdx, 1)}
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>
                <Button
                  type="text"
                  icon={<DeleteOutlined />}
                  className="cart-item-delete"
                  onClick={() => handleDelete(groupIdx, itemIdx)}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <div className="summary-row">
          <span>Tổng tiền</span>
          <span>{total.toLocaleString()}đ</span>
        </div>
        <div className="summary-row">
          <span>Giảm giá voucher</span>
          <span>0đ</span>
        </div>
        <hr />
        <div className="summary-row summary-voucher">
          <Button className="voucher-btn">Chọn voucher</Button>
        </div>
        <div className="summary-row summary-total">
          <span>Thành tiền</span>
          <span>{total.toLocaleString()}đ</span>
        </div>
        <Button className="checkout-btn">Mua hàng</Button>
        <div className="summary-note">
          Bằng việc tiến hành đặt mua hàng, bạn đồng ý với Điều khoản dịch vụ và
          Chính sách xử lý dữ liệu cá nhân của Website chúng tôi
        </div>
      </div>
    </div>
  );
}

export default Cart;
