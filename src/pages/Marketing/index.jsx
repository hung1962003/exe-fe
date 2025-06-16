import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Upload,
  message,
  Tabs,
  Card,
  Modal,
  Space,
  Tag,
  Row,
  Col,
  Statistic,
  Progress,
  Tooltip,
} from "antd";
import {
  UploadOutlined,
  YoutubeOutlined,
  PictureOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  BarChartOutlined,
  CalendarOutlined,
  TeamOutlined,
  FireOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import "./index.scss";
import InstructorInfo from "../../components/InstructorInfo";
import { jwtDecode } from "jwt-decode";
import api from "../../config/api";

const { Option } = Select;
const { TabPane } = Tabs;

// Simulate upload and return a fake URL
const fakeUpload = (file) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ url: URL.createObjectURL(file), name: file.name });
    }, 800);
  });
};

const MarketingPage = () => {
  const [form] = Form.useForm();
  const [campaignType, setCampaignType] = useState("banner");
  const [fileList, setFileList] = useState([]);
  const [bannerImage, setBannerImage] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [workshops, setWorkshops] = useState([]);

  // Temporary mock data for testing
  useEffect(() => {
    // Mock workshops data
    // setWorkshops([
    //   { id: 1, title: "Workshop 1: Digital Marketing Basics" },
    //   { id: 2, title: "Workshop 2: Social Media Marketing" },
    //   { id: 3, title: "Workshop 3: Content Creation" },
    // ]);

    // Mock campaigns data
    setCampaigns([
      {
        id: 1,
        type: "banner",
        title: "Summer Workshop Promotion",
        description:
          "Join our summer workshop series and learn digital marketing",
        bannerImage: "https://picsum.photos/800/400",
        status: "active",
        views: 1200,
        engagement: 75,
        createdAt: new Date().toISOString(),
        workshopId: 1,
      },
      {
        id: 2,
        type: "video",
        title: "Workshop Preview",
        description:
          "Watch this video to see what you'll learn in our workshop",
        videoFile: "https://www.w3schools.com/html/mov_bbb.mp4",
        status: "active",
        views: 2500,
        engagement: 82,
        createdAt: new Date().toISOString(),
        workshopId: 2,
      },
      {
        id: 3,
        type: "carousel",
        title: "Student Success Stories",
        description:
          "See how our workshops have helped students achieve their goals",
        carouselImages: [
          "https://picsum.photos/800/400?random=1",
          "https://picsum.photos/800/400?random=2",
          "https://picsum.photos/800/400?random=3",
        ],
        status: "active",
        views: 1800,
        engagement: 68,
        createdAt: new Date().toISOString(),
        workshopId: 3,
      },
    ]);
  }, []);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/marketing/campaigns");
      const data = await response.json();
      setCampaigns(data);
    } catch (err) {
      console.log(err);
      message.error("Failed to fetch campaigns");
    } finally {
      setLoading(false);
    }
  };
  const token = localStorage.getItem("token");
  let decodedToken;
  if (typeof token === "string" && token) {
    decodedToken = jwtDecode(token);
    console.log("Thông tin người dùng:", decodedToken);
  } else {
    console.log("Không tìm thấy token hợp lệ");
    // có thể redirect về trang login tại đây
  }

  const fetchWorkshops = async () => {
    if (!decodedToken?.id) {
      message.error(
        "Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại!"
      );
      return;
    }
    try {
      const instructorId = decodedToken?.id;
      console.log(instructorId + "123");
      const response = await api.get(`/workshops/instructor/${instructorId}`);
      console.log(response);
      setWorkshops(response.data.content);
    } catch {
      message.error("Failed to fetch workshops");
    }
  };

  const handleCampaignTypeChange = (value) => {
    setCampaignType(value);
    form.resetFields([
      "videoFile",
      "bannerImage",
      "carouselImages",
      "videoUrl",
      "bannerUrl",
    ]);
    setBannerImage(null);
    setVideoFile(null);
    setFileList([]);
  };

  const handleBannerImageChange = async ({ file }) => {
    if (file.status === "removed") {
      setBannerImage(null);
      form.setFieldsValue({ bannerImage: undefined });
      return;
    }
    const res = await fakeUpload(file.originFileObj);
    setBannerImage(res.url);
    form.setFieldsValue({ bannerImage: res.url });
  };

  const handleVideoFileChange = async ({ file }) => {
    if (file.status === "removed") {
      setVideoFile(null);
      form.setFieldsValue({ videoFile: undefined });
      return;
    }
    const res = await fakeUpload(file.originFileObj);
    setVideoFile(res.url);
    form.setFieldsValue({ videoFile: res.url });
  };

  const handleCarouselChange = async ({ fileList }) => {
    // Simulate upload for each file
    const uploads = await Promise.all(
      fileList.map(async (f) => {
        if (f.url) return f.url;
        const res = await fakeUpload(f.originFileObj);
        return res.url;
      })
    );
    setFileList(fileList);
    form.setFieldsValue({ carouselImages: uploads });
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await fetch("/api/marketing/campaigns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: campaignType,
          ...values,
          status: "active",
          createdAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        message.success("Campaign created successfully!");
        form.resetFields();
        setIsCreateModalVisible(false);
        setBannerImage(null);
        setVideoFile(null);
        setFileList([]);
        fetchCampaigns();
      } else {
        message.error("Failed to create campaign");
      }
    } catch (err) {
      console.log(err);
      message.error("An error occurred while creating the campaign");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (campaignId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this campaign?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          setLoading(true);
          const response = await fetch(
            `/api/marketing/campaigns/${campaignId}`,
            {
              method: "DELETE",
            }
          );

          if (response.ok) {
            message.success("Campaign deleted successfully!");
            fetchCampaigns();
          } else {
            message.error("Failed to delete campaign");
          }
        } catch (err) {
          console.log(err);
          message.error("An error occurred while deleting the campaign");
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const showCampaignDetails = (campaign) => {
    setSelectedCampaign(campaign);
    setIsModalVisible(true);
  };

  const renderFormFields = () => {
    switch (campaignType) {
      case "banner":
        return (
          <Form.Item
            name="bannerImage"
            label="Upload Banner Image"
            valuePropName="fileList"
            getValueFromEvent={() =>
              bannerImage ? [{ url: bannerImage }] : []
            }
            rules={[
              { required: true, message: "Please upload a banner image" },
            ]}
          >
            <Upload
              accept="image/*"
              maxCount={1}
              showUploadList={{ showRemoveIcon: true, showPreviewIcon: true }}
              beforeUpload={() => false}
              onChange={handleBannerImageChange}
              fileList={
                bannerImage
                  ? [{ uid: "-1", name: "banner", url: bannerImage }]
                  : []
              }
              listType="picture-card"
            >
              {!bannerImage && (
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>
        );
      case "video":
        return (
          <Form.Item
            name="videoFile"
            label="Upload Video File"
            valuePropName="fileList"
            getValueFromEvent={() => (videoFile ? [{ url: videoFile }] : [])}
            rules={[{ required: true, message: "Please upload a video file" }]}
          >
            <Upload
              accept="video/*"
              maxCount={1}
              showUploadList={{ showRemoveIcon: true, showPreviewIcon: true }}
              beforeUpload={() => false}
              onChange={handleVideoFileChange}
              fileList={
                videoFile ? [{ uid: "-1", name: "video", url: videoFile }] : []
              }
              listType="picture-card"
            >
              {!videoFile && (
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>
        );
      case "carousel":
        return null;
      default:
        return null;
    }
  };

  const renderCampaignCard = (campaign) => {
    const getTypeIcon = (type) => {
      switch (type) {
        case "banner":
          return "📌";
        case "video":
          return "🎥";
        case "carousel":
          return "🖼️";
        default:
          return "";
      }
    };

    let preview = <div className="card-preview empty">No Preview</div>;
    if (campaign.type === "banner" && campaign.bannerImage) {
      preview = (
        <img src={campaign.bannerImage} alt="Banner" className="card-preview" />
      );
    } else if (campaign.type === "video" && campaign.videoFile) {
      preview = (
        <video
          className="card-preview"
          src={campaign.videoFile}
          controls
          style={{ background: "#222" }}
        />
      );
    } else if (
      campaign.type === "carousel" &&
      campaign.carouselImages &&
      campaign.carouselImages.length
    ) {
      preview = (
        <img
          src={campaign.carouselImages[0]}
          alt="Carousel"
          className="card-preview"
        />
      );
    }

    return (
      <Card
        key={campaign.id}
        className="campaign-card"
        hoverable
        cover={preview}
        actions={[
          <Tooltip title="View Details" key="view">
            <EyeOutlined onClick={() => showCampaignDetails(campaign)} />
          </Tooltip>,
          <Tooltip title="Delete Campaign" key="delete">
            <DeleteOutlined onClick={() => handleDelete(campaign.id)} />
          </Tooltip>,
        ]}
      >
        <Card.Meta
          title={
            <Space>
              <span>{getTypeIcon(campaign.type)}</span>
              <span>{campaign.title}</span>
            </Space>
          }
          description={
            <>
              <p>{campaign.description}</p>
              <Space>
                <Tag
                  color={
                    campaign.type === "banner"
                      ? "blue"
                      : campaign.type === "video"
                      ? "red"
                      : "green"
                  }
                >
                  {campaign.type.toUpperCase()}
                </Tag>
                <Tag
                  color={campaign.status === "active" ? "success" : "default"}
                >
                  {campaign.status.toUpperCase()}
                </Tag>
              </Space>
              <div className="campaign-stats">
                <Progress percent={campaign.engagement || 0} size="small" />
                <div className="stat-row">
                  <span>
                    <TeamOutlined /> {campaign.views || 0} views
                  </span>
                  <span>
                    <FireOutlined /> {campaign.engagement || 0}% engagement
                  </span>
                </div>
              </div>
            </>
          }
        />
      </Card>
    );
  };

  const filteredCampaigns =
    activeTab === "all"
      ? campaigns
      : campaigns.filter((campaign) => campaign.type === activeTab);

  const stats = {
    totalCampaigns: campaigns.length,
    activeCampaigns: campaigns.filter((c) => c.status === "active").length,
    totalViews: campaigns.reduce((sum, c) => sum + (c.views || 0), 0),
    avgEngagement:
      campaigns.reduce((sum, c) => sum + (c.engagement || 0), 0) /
        campaigns.length || 0,
  };

  const openCreateModal = () => {
    setIsCreateModalVisible(true);
    fetchWorkshops();
  };

  return (
    <div className="marketing-page">
      <InstructorInfo />
      <div className="marketing-container">
        <div className="stats-section">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="Total Campaigns"
                  value={stats.totalCampaigns}
                  prefix={<BarChartOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="Active Campaigns"
                  value={stats.activeCampaigns}
                  prefix={<FireOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="Total Views"
                  value={stats.totalViews}
                  prefix={<TeamOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="Avg. Engagement"
                  value={stats.avgEngagement.toFixed(1)}
                  suffix="%"
                  prefix={<FireOutlined />}
                />
              </Card>
            </Col>
          </Row>
        </div>

        <div className="campaigns-header">
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            className="campaign-tabs"
          >
            <TabPane tab="All Campaigns" key="all" />
            <TabPane tab="📌 Banners" key="banner" />
            <TabPane tab="🎥 Videos" key="video" />
            <TabPane tab="🖼️ Carousels" key="carousel" />
          </Tabs>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="create-campaign-btn"
            onClick={openCreateModal}
            size="large"
          >
            Create Campaign
          </Button>
        </div>

        <div className="campaigns-grid">
          {filteredCampaigns.length ? (
            filteredCampaigns.map(renderCampaignCard)
          ) : (
            <div className="empty-list">No campaigns found.</div>
          )}
        </div>
      </div>

      <Modal
        title="Create New Campaign"
        open={isCreateModalVisible}
        onCancel={() => setIsCreateModalVisible(false)}
        footer={null}
        className="create-campaign-modal"
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="campaign-form"
        >
          <Form.Item
            name="workshopId"
            label="Workshop"
            rules={[{ required: true, message: "Please select a workshop" }]}
          >
            <Select placeholder="Select a workshop">
              {workshops.map((ws) => (
                <Option key={ws.workshopId} value={ws.workshopId}>
                  {ws.workshopTitle}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="campaignType"
            label="Campaign Type"
            rules={[{ required: true, message: "Please select campaign type" }]}
          >
            <Select
              onChange={handleCampaignTypeChange}
              placeholder="Select campaign type"
            >
              <Option value="banner">📌 Banner</Option>
              <Option value="video">🎥 Video</Option>
              <Option value="carousel">🖼️ Carousel</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="title"
            label="Campaign Title"
            rules={[{ required: true, message: "Please enter campaign title" }]}
          >
            <Input placeholder="Enter campaign title" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: "Please enter campaign description",
              },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Enter campaign description" />
          </Form.Item>

          {renderFormFields()}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              block
            >
              Create Campaign
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Campaign Details"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
        className="campaign-details-modal"
      >
        {selectedCampaign && (
          <div className="campaign-details">
            <h3>{selectedCampaign.title}</h3>
            <p>{selectedCampaign.description}</p>
            <Space className="campaign-tags">
              <Tag
                color={
                  selectedCampaign.type === "banner"
                    ? "blue"
                    : selectedCampaign.type === "video"
                    ? "red"
                    : "green"
                }
              >
                {selectedCampaign.type.toUpperCase()}
              </Tag>
              <Tag
                color={
                  selectedCampaign.status === "active" ? "success" : "default"
                }
              >
                {selectedCampaign.status.toUpperCase()}
              </Tag>
              <Tag icon={<CalendarOutlined />}>
                {new Date(selectedCampaign.createdAt).toLocaleDateString()}
              </Tag>
            </Space>
            <div className="campaign-content">
              {selectedCampaign.type === "banner" &&
                selectedCampaign.bannerImage && (
                  <img src={selectedCampaign.bannerImage} alt="Banner" />
                )}
              {selectedCampaign.type === "video" &&
                selectedCampaign.videoFile && (
                  <video
                    src={selectedCampaign.videoFile}
                    controls
                    style={{
                      width: "100%",
                      borderRadius: 8,
                      background: "#222",
                    }}
                  />
                )}
              {selectedCampaign.type === "carousel" &&
                selectedCampaign.carouselImages && (
                  <div className="carousel-preview">
                    {selectedCampaign.carouselImages.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Carousel ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
            </div>
            <div className="campaign-analytics">
              <h4>Campaign Analytics</h4>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Statistic
                    title="Total Views"
                    value={selectedCampaign.views || 0}
                    prefix={<TeamOutlined />}
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title="Engagement Rate"
                    value={selectedCampaign.engagement || 0}
                    suffix="%"
                    prefix={<FireOutlined />}
                  />
                </Col>
              </Row>
              <Progress percent={selectedCampaign.engagement || 0} />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MarketingPage;
