import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Importing images
import hinduism from "../assets/Images_final2_teerth_saarthi/hinduism_final.jpg";
import christian from "../assets/Images_final2_teerth_saarthi/christianity_final.jpg";
import islam from "../assets/Images_final2_teerth_saarthi/islam_final.jpg";
import jainism from "../assets/Images_final2_teerth_saarthi/jainism_final.jpg";
import buddhism from "../assets/Images_final2_teerth_saarthi/buddhism_final.jpg";
import sikhism from "../assets/Images_final2_teerth_saarthi/sikhism_final.jpg";

export default function Recommend() {
  const navigate = useNavigate();

  const religions = [
    { image: hinduism, title: "Hinduism" },
    { image: christian, title: "Christianity" },
    { image: jainism, title: "Jainism" },
    { image: islam, title: "Islam" },
    { image: sikhism, title: "Sikhism" },
    { image: buddhism, title: "Buddhism" },
  ];


  
  return (
    <Section>
      <div className="title">
        <h2>Select Religion</h2>
      </div>
      <div className="destinations">
        <Swiper spaceBetween={10} slidesPerView={3} pagination={{ clickable: true }} navigation={true} modules={[Pagination, Navigation]}>
          {religions.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="destination" onClick={() => navigate(`/search?religion=${item.title}`)}>
                <img src={item.image} alt={item.title} />
                <h3>{item.title}</h3>
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
  text-align: center;

  .title {
    margin-bottom: 1rem;
  }

  .destinations {
    padding: 0 3rem;

    .destination {
      margin-left: 75px;
      position: relative;
      background-color: rgba(120, 157, 181, 0.57);
      width: 300px;
      height: 400px;
      text-align: center;
      transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
      overflow: hidden;
      cursor: pointer;

      &:hover {
        transform: translateY(-10px);
        box-shadow: rgba(0, 0, 0, 0.35) 0px 10px 20px;
      }

      img {
        width: 100%;
        height: 85%;
        object-fit: cover;
      }

      h3 {
        margin-top: 10px;
        font-size: 1.5rem;
        font-weight: bold;
        color: black;
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

  @media screen and (max-width: 768px) {
    .packages ul {
      flex-direction: column;
      align-items: center;
    }
  }
`;
