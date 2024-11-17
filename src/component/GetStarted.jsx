import React from "react";
import styled from "styled-components";

const GetStarted = () => {
  return (
    <StyledWrapper>
      <p className="btn-shine sm:text-md">
        Join to Get Started & List your
        <span className="text-black sm:text-xl">🚲</span>Today.
      </p>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .btn-shine {
    /* position: absolute;
    top: 50%;
    left: 50%; */
    /* transform: translate(-50%, -50%); */
    /* padding: 12px 48px; */
    color: #000000;
    background: linear-gradient(to right, #ffffff 0, #b17c19 10%, #ffffff 100%);
    background-position: 0;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shine 3s infinite linear;
    animation-fill-mode: forwards;
    -webkit-text-size-adjust: none;
    font-weight: lighter;
    /* width: 10px; */
    /* font-size: 16px; */
    text-decoration: none;
    white-space: nowrap;
    font-family: "Poppins", sans-serif;
  }
  @-moz-keyframes shine {
    0% {
      background-position: -20px;
    }
    60% {
      background-position: 100px;
    }
    100% {
      background-position: 240px;
    }
  }
  @-webkit-keyframes shine {
    0% {
      background-position: -20px;
    }
    60% {
      background-position: 100px;
    }
    100% {
      background-position: 240px;
    }
  }
  @-o-keyframes shine {
    0% {
      background-position: -20px;
    }
    60% {
      background-position: 100px;
    }
    100% {
      background-position: 240px;
    }
  }
  @keyframes shine {
    0% {
      background-position: -20px;
    }
    60% {
      background-position: 100px;
    }
    100% {
      background-position: 240px;
    }
  }
`;

export default GetStarted;
