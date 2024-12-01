import React from "react";
import Slider from "react-slick";
import "./CompanyCarousel.css";  // Optional, for additional styling

const CompanyCarousel = () => {
  const logos = [
    "https://magnasys.tv/wp-content/uploads/2024/04/synamedia-logo-black-rgb.png", // Replace with actual logo URLs
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Maersk_Group_Logo.svg/640px-Maersk_Group_Logo.svg.png",
    "https://asia-risk-directory.eb8.infopro-insight.com/sites/default/files/styles/free_crop/public/2022-01/Surya.png.webp?itok=iEH-Hwx-",
    "https://upload.wikimedia.org/wikipedia/commons/1/1c/Accenture_logo.svg",
    "https://companieslogo.com/img/orig/MPHASIS.NS_BIG-96e12b36.png?t=1720244492",
    "https://www.connectwise.com/globalassets/media/logos/company-logos/mdtm/connectwise-horiz-master.png",
    "https://www.zuora.com/wp-content/uploads/2024/03/tcs-p-c.png",
    "https://www.ltimindtree.com/wp-content/uploads/2022/10/LTIMindtree_Linear_2-1-LT-Blue-1-1.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Cognizant_logo_2022.svg/2560px-Cognizant_logo_2022.svg.png"
    // Add more logos as needed
  ];

  // Define the settings for the carousel
  const settings = {
    infinite: true,
    slidesToShow: 5,  // Adjust this number to change how many logos appear at once
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1200,
    speed: 500,
    arrows: false,
    dots: false,
    pauseOnHover: true,
    centerMode: true, // Enable centering of slides
    centerPadding: '40px', // Adjust the amount of space around the center logo
  };

  return (
    <div className="company-carousel">
      <Slider {...settings}>
        {logos.map((logo, index) => (
          <div key={index} className="carousel-item">
            <img src={logo} alt={`Company Logo ${index + 1}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CompanyCarousel;
