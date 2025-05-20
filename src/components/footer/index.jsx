import React from "react";
import "./index.scss";
//import logo from "/img/logo.png";

function Footer() {
  const footerLinks = [
    {
      title: "Quick Links",
      items: [
        { label: "Home", href: "#" },
        { label: "About Us", href: "#" }, 
        { label: "Services", href: "/services" },
        { label: "Membership", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Contact Us", href: "#" },
      ],
    },
    {
      title: "Services",
      items: [
        { label: "Leather Craft", href: "#" },
        { label: "Pottery", href: "#" },
        { label: "Ethnic Fashion", href: "#" },
        { label: "Wood Craft", href: "#" },
        { label: "Sculpturing", href: "#" },
        { label: "Jewelry", href: "#" },
      ],
    },
  ];

  const infoItems = [
    {
      name: "Phone",
      logo: "/img/phone.png",
      iconClass: "fa fa-phone",
      text: "+123-234-1234",
    },
    {
      name: "Email",
      logo: "/img/email.png",
      iconClass: "fa fa-envelope",
      text: "hello@awesomesite.com",
    },
    {
      name: "Address",
      logo: "/img/address.png",
      iconClass: "fa fa-map-marker",
      text: "99 Roving St., Big City, PKU 23456",
    },
  ];

  const socialIcons = [
    { src: "/img/facebook.png", alt: "Facebook" },
    { src: "/img/instagram.png", alt: "Instagram" },
    { src: "/img/youtube.png", alt: "YouTube" },
  ];

  return (
    <footer className="footer">
      <div className="footer__left">
        <img src="/img/footer.png" alt="Logo" className="footer__logo" />
        <p className="footer__desc">
        Nulla sit amet fermentum augue. In ullamcorper<br /> orci vitae lectus laoreet luctus maecenas pharetra<br /> cras auctor dui augue. </p>
        <div className="footer__socials">
          {socialIcons.map((icon, idx) => (
            <img key={idx} src={icon.src} alt={icon.alt} />
          ))}
        </div>
      </div>

      <div className="footer__center">
        {footerLinks.map((section, index) => (
          <div className="footer__column" key={index}>
            <h3>{section.title}</h3>
            <ul>
              {section.items.map((item, i) => (
                <li key={i}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="footer__column">
          <h3>Information</h3>
          {infoItems.map((info, i) => (
            <div className="footer__info" key={i}>
              <img src={info.logo} alt={info.name} />
              <div className="footer__infoname">
                <span>{info.name}</span>
                <i className={info.iconClass}>{info.text}</i> 
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
