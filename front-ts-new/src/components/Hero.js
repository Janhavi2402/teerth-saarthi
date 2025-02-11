import React, { useState, useEffect } from "react";
import styled from "styled-components";
import video1 from "../assets/vid1_hinduism.mp4";
import video2 from "../assets/vid2_christian.mp4";
import video3 from "../assets/vid3_sikhism.mp4";
import video4 from "../assets/vid4_jainism.mp4";
import video5 from "../assets/vid5_islam.mp4";
import video6 from "../assets/vid6_buddhism.mp4";
export default function Hero() {
  const videos = [video1, video2, video3,video4,video5,video6];
  const [currentIndex, setCurrentIndex] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 5000); // Change video every 5 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [videos.length]);

  return (
    <Section id="hero">
      <div className="background">
        <video
          src={videos[currentIndex]}
          autoPlay
          muted
          loop
          playsInline
          key={currentIndex}
        />
      </div>
      <div className="content">
        <div className="title">
          <h1>TRAVEL TO EXPLORE</h1>
          <p>
            Embark on a journey of faith and discovery. Explore sacred sites
            across the country, experience their spiritual essence, and uncover
            stories that transcend time.
          </p>
        </div>
        </div>
       
    </Section>
  );
}

const Section = styled.section`
  position: relative;
  margin-top: 0.5rem;
  padding-bottom: 1rem;
  width: 100%;
  height: 60rem; /* Reduced height of the section */

  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 70%; /* Adjusted to make the video height smaller */
    z-index: 1;

    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: brightness(60%);
      transition: opacity 1s ease-in-out; /* Smooth fade effect */
    }
  }

  .content {
    position: absolute;
    z-index: 2;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    text-align: center;
    gap: 1rem;

    .title {
      h1 {
        font-size: 3rem;
        letter-spacing: 0.2rem;
      }
      p {
        text-align: center;
        padding: 0 30vw;
        margin-top: 0.5rem;
        font-size: 1.2rem;
      }
    }
  }

  @media screen and (min-width: 280px) and (max-width: 980px) {
    height: 20rem; /* Adjusted height for smaller screens */
    .background {
      height: 60%; /* Adjusted video height for mobile */
    }
    .content {
      .title {
        h1 {
          font-size: 1.5rem;
        }
        p {
          font-size: 0.8rem;
          padding: 1vw;
        }
      }
    }
  }
`;
