import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import ServiceBox from "../Elements/ServiceBox";

export default function Services() {
  const serviceBoxRef = useRef([]);

  useEffect(() => {
    const options = {
      rootMargin: "0px",
      threshold: 0.5, // When the element is 50% in view
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
        } else {
          entry.target.classList.remove("animated");
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    serviceBoxRef.current.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <Wrapper id="services">
      <div className="whiteBg" style={{ padding: "60px 0" }}>
        <div className="container">
          <ServiceBoxRow className="flex w-full justify-around">
            <ServiceBoxWrapper ref={(el) => (serviceBoxRef.current[0] = el)}>
              <ServiceBox
                icon=""
                title="Find Your Doctor"
                subtitle="Best Way to Find Doctor"
              />
            </ServiceBoxWrapper>
            <ServiceBoxWrapper ref={(el) => (serviceBoxRef.current[1] = el)}>
              <ServiceBox
                icon="monitor"
                title="Don't Apply to Jobs"
                subtitle="No need to apply for jobs our AI will do it for you"
              />
            </ServiceBoxWrapper>
            <ServiceBoxWrapper ref={(el) => (serviceBoxRef.current[2] = el)}>
              <ServiceBox
                title="Get Hired"
                subtitle="Recruiters will contact you if they like your profile"
              />
            </ServiceBoxWrapper>
          </ServiceBoxRow>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
`;

const ServiceBoxRow = styled.div`
  @media (max-width: 860px) {
    flex-direction: column;
  }
`;

const ServiceBoxWrapper = styled.div`
  width: 20%;
  margin-right: 5%;
  padding: 80px 0;
  opacity: 0;
  transform: translateX(-100%);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;

  &.animated {
    opacity: 1;
    transform: translateX(0%);
  }

  &:nth-child(even) {
    transform: translateX(100%);
  }

  &.animated:nth-child(even) {
    transform: translateX(0%);
  }

  @media (max-width: 860px) {
    width: 100%;
    text-align: center;
    padding: 40px 0;
  }
`;
