import React from 'react';
import styled from 'styled-components';

const LOP = () => {
  return (
    <StyledWrapper>
      <div className="container">
        <div className="loader" />
        <div className="loader" />
        <div className="loader" />
        <div className="loader" />
        <div className="loader" />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .container {
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
  }

  .loader {
    width: 10px;
    height: 20px;
    border-radius: 10px 50px;
    box-shadow: 0px 0px 5px black;
    animation: dominos 1s ease infinite;
  }

  .loader:nth-child(1) {
    --left: 80px;
    animation-delay: 0.325s;
    background-color: #5d9960;
  }

  .loader:nth-child(2) {
    --left: 70px;
    animation-delay: 0.5s;
    background-color: #82a587;
  }

  .loader:nth-child(3) {
    left: 60px;
    animation-delay: 0.625s;
    background-color: #8bac74;
  }

  .loader:nth-child(4) {
    animation-delay: 0.74s;
    left: 50px;
    background-color: #b9bf90;
  }

  .loader:nth-child(5) {
    animation-delay: 0.865s;
    left: 40px;
    background-color: #e7d2ab;
  }

  @keyframes dominos {
    50% {
      opacity: 0.7;
    }

    75% {
      -webkit-transform: rotate(90deg);
      transform: rotate(90deg);
    }

    80% {
      opacity: 1;
    }
  }`;

export default LOP;
