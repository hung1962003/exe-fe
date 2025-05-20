//import { CiSearch } from "react-icons/ci";
import { Button } from "antd";
import "./index.scss";
import { TiUser } from "react-icons/ti";
import { BiSolidCart } from "react-icons/bi";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/userSlice";
import { LogoutOutlined } from "@ant-design/icons";
import api from './../../config/api';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //const [balance, setBalance] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   setIsLoggedIn(!!token);
  // }, []);

  // const fetchWallet = async () => {
  //   try {
  //     const response = await api.get("Wallet");
  //     console.log(response.data);
  //     setBalance(response.data.amountofMoney);
  //   } catch (error) {
  //     //toast.error("Error while fetching");
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   if (isLoggedIn) fetchWallet();
  // }, [isLoggedIn]);

  const handleNavigateLoginPage = () => {
    navigate("/loginAndRegister");
  };

  const handleNavigateHomePage = () => {
    navigate("/");
  };

  const handleNavigateCartPage = () => {
    navigate("/cart");
  };

  const handleNavigateProfilePage = () => {
    navigate("/my-account/profile");
  };
  const navbarItems = [
    { name : "Home" , path : "/" },
    { name : "About Us" , path : "#" },
    { name : "Services" , path : "/services" },
    { name : "Page" , path : "#" },
    { name : "Blog" , path : "#" },
    { name : "Contact Us" , path : "#" },
   
  ]
  return (
    <>
      <div className="header">
        <div className="header__left" onClick={handleNavigateHomePage}>
          <img src="/img/header.png" alt="Logo" className="header__logo" />
        </div>
        <nav className="header__navbar">
          <ul className="navbar__list">
            {navbarItems.map((item, index) => (
              <li className="navbar__item" key={index} onClick={() => navigate(item.path)}>
                {item.name}
              </li>
            ))}
          </ul>
        </nav>
        
        

        <div className="header__right">
          {isLoggedIn ? (
            <>
              <div className="profile-user" onClick={handleNavigateProfilePage}>
                <TiUser className="user_icon" size={28} />
              </div>

              <div
                className="logout"
                onClick={() => {
                  dispatch(logout());
                  localStorage.removeItem("token");
                  setIsLoggedIn(false);
                  navigate("/login");
                }}
              >
                <LogoutOutlined className="logout-icon" />
              </div>
            </>
          ) : (
            <div className="profile-user" onClick={handleNavigateLoginPage}>
              <TiUser className="user_icon" size={28} />
            </div>
          )}

          <div className="cart" onClick={handleNavigateCartPage}>
            <BiSolidCart className="cart_icon" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
