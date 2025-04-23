import React, { useState, useEffect } from "react";
import styled from "styled-components";


export default function ScrollToTop() {
  const [scrollState, setScrollState] = useState(false);

  const toTop = () => {
    window.scrollTo({ top: 0 });
  };

  useEffect(() => {
    const handleScroll = () => {
      window.pageYOffset > 200 ? setScrollState(true) : setScrollState(false);
    };

    window.addEventListener("scroll", handleScroll);


    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


}

const ToTop = styled.div`
  display: ${({ scrollState }) => (scrollState ? "block" : "none")};
  position: fixed;
  cursor: pointer;
  z-index: 10;
  bottom: 1rem;
  right: 0rem;
  img {
    height: 1.5rem;
  }
  border-radius: 0rem;
  background-color: #1900ff39;
  padding: 2rem;
`;
