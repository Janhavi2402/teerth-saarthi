import React from "react";
import styled from "styled-components";
import service1 from "../assets/service1.png"; // Replace with your own icons
import service2 from "../assets/service2.png";
import service3 from "../assets/service3.png";
import service4 from "../assets/service4.png";

export default function Services() {
  const data = [
    {
      icon: service1,
      title: "Best Prices for Religious Travel",
      subTitle:
        "Book through our platform for affordable prices on religious sites and pilgrimage tours.",
    },
    {
      icon: service2,
      title: "24/7 Support for Pilgrims",
      subTitle:
        "Our dedicated team is available around the clock to assist you with all your religious travel needs, ensuring a seamless experience.",
    },
    {
      icon: service3,
      title: "Flexible Payment Options",
      subTitle:
        "Pay for your religious travel packages in easy installments with our flexible payment plans, making it easier for you to plan your pilgrimage.",
    },
    {
      icon: service4,
      title: "Tailored Religious Journeys",
      subTitle:
        "Find customized religious tours based on your faith, preferences, and desired destinations, with a personal guide to lead the way.",
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
    background-color: #f0f8ff;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    transition: 0.3s ease-in-out;

    &:hover {
      transform: translateX(0.4rem) translateY(-1rem);
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }

    .icon {
      img {
        height: 3rem;
        width: 3rem;
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
