import React from "react";
import styled from "styled-components";
import { FaUserAlt } from "react-icons/fa"; 

export default function Testimonials() {
  const testimonialsData = [
    {
      text: "This website has been a game changer for planning our spiritual journeys! 🙏✨ The insights and resources have helped us explore sacred sites like never before. Highly recommended! 🌍",
      name: "Priya Desai",
      role: "Traveler",
    },
    {
      text: "I absolutely love how easy it is to discover new places of worship and spiritual significance. This site is a true blessing for anyone looking to deepen their faith through travel. 🙌💖",
      name: "Ravi Kumar",
      role: "Spiritual Explorer",
    },
    {
      text: "An incredible platform for discovering holy sites across different religions. The information is both educational and enriching, helping me understand diverse spiritual practices. ",
      name: "Amina Fatima",
      role: "Cultural Enthusiast",
    },
  ];

  return (
    <Section id="testimonials">
      <div className="title">
        <h2>Satisfied Pilgrims</h2>
      </div>
      <div className="testimonials">
        {testimonialsData.map((testimonial, index) => (
          <div className="testimonial" key={index}>
            <p>{testimonial.text}</p>
            <div className="info">
              <FaUserAlt size={40} /> {/* Human icon instead of photo */}
              <div className="details">
                <h4>{testimonial.name}</h4>
                <span>{testimonial.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

const Section = styled.section`
  margin: 5rem 0;
  .title {
    text-align: center;
    margin-bottom: 2rem;
  }
  .testimonials {
    display: flex;
    justify-content: center;
    margin: 0 2rem;
    gap: 2rem;
    .testimonial {
      background-color: aliceblue;
      padding: 2rem;
      border-radius: 0.5rem;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      transition: 0.3s ease-in-out;
      &:hover {
        transform: translateX(0.4rem) translateY(-1rem);
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      }
      .info {
        display: flex;
        justify-content: center;
        gap: 1rem;
        align-items: center;
        margin-top: 1rem;
        svg {
          border-radius: 50%;
          background-color: lightgray;
          padding: 0.5rem;
        }
        .details {
          span {
            font-size: 0.9rem;
          }
        }
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 768px) {
    .testimonials {
      flex-direction: column;
      margin: 0;
      .testimonial {
        justify-content: center;
        .info {
          flex-direction: column;
          justify-content: center;
        }
      }
    }
  }
`;
