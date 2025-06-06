import React, { useState, useEffect } from "react";
import styled from "styled-components";
import video1 from "../assets/vid1_hinduism_new.mp4";
import video2 from "../assets/vid2_christian_new.mp4";
import video3 from "../assets/vid3_sikhism_new.mp4";
import video4 from "../assets/vid4_jainism_new.mp4";
import video5 from "../assets/vid5_islam_new.mp4";
import video6 from "../assets/vid6_buddhism_new.mp4";

export default function Hero() {
  const videos = [video1, video2, video3, video4, video5, video6];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
        setFade(true); 
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Section id="hero">
      <div className="background">
        <video
          src={videos[currentIndex]}
          autoPlay
          muted
          loop
          playsInline
          className={fade ? "fade-in" : "fade-out"}
        />
      </div>
      <div className="content">
        <div className="title">
          {/* <h1>TRAVEL TO EXPLORE</h1>
          <p>
            Embark on a journey of faith and discovery. Explore sacred sites
            across the country, experience their spiritual essence, and uncover
            stories that transcend time.
          </p> */}
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
  height: 60rem;

  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 75%;
    z-index: 1;
    margin-bottom: 5rem;

    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: brightness(60%);
      transition: opacity 0.8s ease-in-out;
    }

    .fade-in {
      opacity: 1;
    }
    
    .fade-out {
      opacity: 0;
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
    height: 20rem;
    .background {
      height: 60%;
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


