import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import "./index.scss";

const LoginAndRegister = () => {
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();

  const onFinishLogin = (values) => {
    console.log("Login values:", values);
  };

  const onFinishRegister = (values) => {
    console.log("Register values:", values);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-content">
          {/* Login Form */}
          <div className="auth-section login">
            <h2>Đăng nhập</h2>
            <Form
              form={loginForm}
              name="login-form"
              onFinish={onFinishLogin}
              layout="vertical"
              className="auth-form"
            >
              <Form.Item
                name="email"
                label="Tên người dùng hoặc email"
                rules={[{ required: true, message: "Vui lòng nhập email!" }]}
              >
                <Input placeholder="Tên người dùng hoặc email" />
              </Form.Item>

              <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              >
                <Input.Password placeholder="Mật khẩu" />
              </Form.Item>

              <div className="login-options">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Ghi nhớ đăng nhập</Checkbox>
                </Form.Item>
                <a href="#" className="forgot-password">
                  Quên mật khẩu?
                </a>
              </div>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="submit-button"
                >
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
          </div>

          {/* Register Form */}
          <div className="auth-section register">
            <h2>Đăng kí</h2>
            <Form
              form={registerForm}
              name="register-form"
              onFinish={onFinishRegister}
              layout="vertical"
              className="auth-form"
            >
              <div className="name-group">
                <Form.Item
                  name="ho"
                  label="Họ"
                  rules={[{ required: true, message: "Vui lòng nhập họ!" }]}
                >
                  <Input placeholder="Họ" />
                </Form.Item>

                <Form.Item
                  name="ten"
                  label="Tên"
                  rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
                >
                  <Input placeholder="Tên" />
                </Form.Item>
              </div>

              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: "Vui lòng nhập email!" }]}
              >
                <Input placeholder="Email" />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại!" },
                ]}
              >
                <Input placeholder="Số điện thoại" />
              </Form.Item>

              <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              >
                <Input.Password placeholder="Mật khẩu" />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                label="Nhập lại mật khẩu"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Vui lòng nhập lại mật khẩu!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Mật khẩu không khớp!"));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Nhập lại mật khẩu" />
              </Form.Item>

              <Form.Item
                name="terms"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error("Vui lòng đồng ý với điều khoản!")
                          ),
                  },
                ]}
              >
                <Checkbox>
                  Tôi chấp nhận với <a href="#">điều khoản</a>
                </Checkbox>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="submit-button"
                >
                  Đăng kí
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAndRegister;
