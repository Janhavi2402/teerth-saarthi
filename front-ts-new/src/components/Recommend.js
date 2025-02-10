import React, { useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom"; // For navigation
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import hinduism from "../assets/hinduism.jpg";
import christian from "../assets/christian.jpg";
import islam from "../assets/islam.jpg";
import jainism from "../assets/jainism.jpg";
import buddhism from "../assets/buddhism.jpg";
import sikhism from "../assets/sikhism.jpg";

export default function Recommend() {
  const navigate = useNavigate(); // Hook for navigation

  const data = [
    { image: hinduism, title: "Hinduism", route: "/religion_list/hinduism" },
    { image: christian, title: "Christianity", route: "/religion_list/christianity" },
    { image: islam, title: "Islam", route: "/religion_list/islam" },
    { image: buddhism, title: "Buddhism", route: "/religion_list/buddhism" },
    { image: jainism, title: "Jainism", route: "/religion_list/jainism" },
    { image: sikhism, title: "Sikhism", route: "/religion_list/sikhism" },
  ];

  const packages = ["Choose Religion", "Famous places"];
  const [active, setActive] = useState(1);

  const handleCardClick = (route) => {
    navigate(route); // Navigate to the selected religion's page
  };

  return (
    <Section id="recommend">
      <div className="title">
        <h2>PLACES</h2>
      </div>
      <div className="packages">
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
      </div>
      <div className="destinations">
        <Swiper
          spaceBetween={10}
          slidesPerView={3}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Pagination, Navigation]}
          breakpoints={{
            280: { slidesPerView: 1, spaceBetween: 5 },
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
                <img src={destination.image} alt={destination.title} />
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
 

  .title {
    text-align: center;
    
  }

  .packages {
    display: flex;
    justify-content: center;
    margin: 2rem 0;

    ul {
      display: flex;
      list-style-type: none;
      width: max-content;

      li {
        padding: 1rem 2rem;
        border-bottom: 0.1rem solid black;
        cursor: pointer;

        &:hover {
          color: #8338ec;
        }
      }

      .active {
        border-bottom: 0.5rem solid #8338ec;
      }
    }
  }

  .destinations {
    padding: 0 3rem;

    .destination {
      position: relative; /* Set relative positioning for the container */
      background-color: #8338ec14;
      width: 300px;
      height: 400px;
      text-align: center;
      transition: 0.3s ease-in-out;
      overflow: hidden;

      &:hover {
        transform: translateY(-1rem);
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      }

      img {
        
        width: 100%;
        height: 100%;
        object-fit: fit; /* Ensure the image covers the container */
      }

      h3 {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color:white;
        font-size: 1.5rem;
        font-weight: bold;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
        z-index: 1; /* Ensure it appears above the image */
        pointer-events: none; /* Prevent hover effects on the text */
      }
    }
  }

  @media screen and (min-width: 280px) and (max-width: 768px) {
    .destinations {
      padding: 0;
    }
  }
`;