import React, { useState, useEffect } from "react";
import "./index.scss";
import { Button, Upload, Image, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { uploadImageToCloudinary } from "../../utils/upload";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";

const InstructorInfo = () => {
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [instructor, setInstructor] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (typeof token === "string" && token) {
      const decoded = jwtDecode(token);
      setInstructor(decoded);
      console.log(decoded);
      console.log("Thông tin người dùng:", decoded);
    } else {
      console.log("Không tìm thấy token hợp lệ");
      // có thể redirect về trang login tại đây
    }
  }, []);

  // Hàm đọc file thành base64 để preview
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  // Xử lý preview khi click vào ảnh
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  // Xử lý upload ảnh lên Cloudinary
  const handleFileUpload = async ({ file }) => {
    const imageUrl = await uploadImageToCloudinary(file);
    if (imageUrl) {
      message.success("Upload ảnh thành công!");
      setFileList([{ uid: "-1", name: file.name, url: imageUrl }]);
    } else {
      message.error("Upload ảnh thất bại, vui lòng thử lại!");
    }
  };

  // Xử lý khi thay đổi fileList (AntD)
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  return (
    <div className="dashboard-header">
      <div className="dashboard-header__left">
        <Upload
          className="custom-upload"
          customRequest={handleFileUpload}
          listType="picture-circle"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          maxCount={1}
        >
          {fileList.length >= 1 ? null : (
            <button style={{ border: 0, background: "none" }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          )}
        </Upload>
        {/* Preview khi click vào ảnh */}
        {previewImage && (
          <Image
            style={{ width: "200% ", height: "200%" }}
            className="custom-image"
            wrapperStyle={{ display: "none" }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(""),
            }}
            src={previewImage}
          />
        )}
        <div>
          <div className="dashboard-header__name">{instructor.firstName}</div>
          <div className="dashboard-header__role">Instructor</div>
          <div className="dashboard-header__welcome">
            Welcome to your Workshop Dashboard
          </div>
        </div>
      </div>
      <div className="dashboard-header__right">
        <div className="dashboard-header__row">
          <button className="profile-btn">Xem hồ sơ</button>
          <button className="history-btn">Lịch sử giao dịch</button>
        </div>
        <div className="dashboard-header__row">
          <button
            className="dashboard-btn"
            onClick={() => navigate("/dashboardInstructor")}
          >
            Xem Dashboard
          </button>
          <button
            className="marketing-btn"
            onClick={() => navigate("/marketing")}
          >
            Đề Xuất Marketing
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructorInfo;
