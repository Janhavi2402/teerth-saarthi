import React, { useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import hinduism from "../assets/Images_final2_teerth_saarthi/hinduism_final.jpg";
import christian from "../assets/Images_final2_teerth_saarthi/christianity_final.jpg";
import islam from "../assets/Images_final2_teerth_saarthi/islam_final.jpg";
import jainism from "../assets/Images_final2_teerth_saarthi/jainism_final.jpg";
import buddhism from "../assets/Images_final2_teerth_saarthi/buddhism_final.jpg";
import sikhism from "../assets/Images_final2_teerth_saarthi/sikhism_final.jpg";

export default function Recommend() {
  const navigate = useNavigate();

  const data = [
    { image: hinduism, title: "Hinduism", route: "/religion_list/hinduism" },
    { image: christian, title: "Christianity", route: "/religion_list/christianity" },
    { image: jainism, title: "Jainism", route: "/religion_list/jainism" },
    { image: islam, title: "Islam", route: "/religion_list/islam" },
    { image: sikhism, title: "Sikhism", route: "/religion_list/sikhism" },
    { image: buddhism, title: "Buddhism", route: "/religion_list/buddhism" },
  ];

  // Commented out the packages array and active state
  // const packages = ["Choose Religion", "Famous places"];
  // const [active, setActive] = useState(1);

  const handleCardClick = (route) => {
    navigate(route); 
  };

  return (
    <Section id="recommend">
      {/* Commented out the title section */}
      {/* <div className="title">
        <h2>PLACES</h2>
      </div> */}

      {/* Commented out the packages section */}
      {/* <div className="packages">
        <ul>
          {packages.map((pkg, index) => (
            <li
              key={index}
              className={active === index + 1 ? "active" : ""}
              onClick={() => setActive(index + 1)}
            >
              {pkg}
            </li>
          ))}
        </ul>
      </div> */}

      <div className="destinations">
        <Swiper
          spaceBetween={10}
          slidesPerView={3}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Pagination, Navigation]}
          breakpoints={{
            280: { slidesPerView: 1, spaceBetween: 10 },
            768: { slidesPerView: 2, spaceBetween: 10 },
            1024: { slidesPerView: 3, spaceBetween: 10 },
          }}
        >
          {data.map((destination, index) => (
            <SwiperSlide key={index}>
              <div
                className="destination"
                onClick={() => handleCardClick(destination.route)}
              >
                <div className="image-container">
                  <img src={destination.image} alt={destination.title} />
                </div>
                <h3>{destination.title}</h3>  
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Section>
  );
}


const Section = styled.section`
  padding: 2rem 0;

  .destinations {
    padding: 0 3rem;

    .destination {
    margin-left:75px;
      position: relative;
      background-color: rgba(120, 157, 181, 0.57);
      width: 300px;
      height: 400px;
      text-align: center;
      transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
      overflow: hidden;

      &:hover {
        transform: translateY(-10px);
        box-shadow: rgba(0, 0, 0, 0.35) 0px 10px 20px;
      }

      .image-container {
        width: 100%;
        height: 85%;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: transform 0.3s ease-in-out;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease-in-out;
      }

      h3 {
        margin-top: 10px;
        font-size: 1.5rem;
        font-weight: bold;
        color: black;
        text-align: center;
        transition: transform 0.3s ease-in-out;
      }

      &:hover .image-container, 
      &:hover h3 {
        transform: translateY(-10px);
      }
    }
  }

  .swiper-pagination {
    position: relative;
    margin-top: 35px;
  }

  .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    background-color: #333;
    opacity: 0.7;
    transition: opacity 0.3s;
  }

  .swiper-pagination-bullet-active {
    background-color: #8338ec;
    opacity: 1;
  }

  @media screen and (min-width: 280px) and (max-width: 768px) {
    .destinations {
      padding: 0;
    }
  }
`;
