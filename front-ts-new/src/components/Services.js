import React from "react";
import styled from "styled-components";
import service1 from "../assets/service1.png"; 
import service2 from "../assets/service2.png";
import service3 from "../assets/service3.png";
import service4 from "../assets/service4.png";

export default function Services() {
  const data = [
    {
      icon: service1,
      title: "All-in-One Pilgrimage Guide",
      subTitle:
        "A comprehensive platform providing transport, accommodation, and nearby attractions in one place for hassle-free pilgrimage planning.",
    },
    {
      icon: service2,
      title: "Verified & Affordable Stays",
      subTitle:
        "Curated listings of dharamshalas, hotels, and guest houses with user reviews and budget-friendly options.",
    },
    {
      icon: service3,
      title: "Spiritual & Cultural Insights",
      subTitle:
        "Detailed guides on temple timings, rituals, dos & don'ts, and local traditions.",
    },
    {
      icon: service4,
      title: "Nearby Spiritual & Cultural Attractions",
      subTitle:
        "Recommends nearby temples, historical sites, and cultural landmarks to enrich the pilgrimage experience.",
    },
  ];

  return (
    <Section id="services">
      {data.map((service, index) => {
        return (
          <div className="service" key={index}>
            <div className="icon">
              <img src={service.icon} alt={service.title} />
            </div>
            <h3>{service.title}</h3>
            <p>{service.subTitle}</p>
          </div>
        );
      })}
    </Section>
  );
}

const Section = styled.section`
  padding: 0rem 0rem;
  margin-top: -9rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;

  .service {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem;
    background-color:rgba(130, 162, 183, 0.57);//here
    box-shadow: rgba(110, 110, 207, 0.2) 0px 7px 29px 0px;
    transition: 0.3s ease-in-out;

    &:hover {
      transform: translateX(0.4rem) translateY(-1rem);
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }

    .icon {
      img {
        height: 3rem;
        width: 3rem;
        object-fit: contain;
      }
    }
  }

  @media screen and (min-width: 280px) and (max-width: 720px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
