import React from 'react';
import styled from 'styled-components';

const GetStarted = () => {
    return (
        <StyledWrapper>
            <pre className="sm:text-sm btn-shine"><p>Join to Get Started &</p> List your<span className='sm:text-xl text-black'>🚲</span>Today.</pre>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .btn-shine {
    /* position: absolute;
    top: 50%;
    left: 50%; */
    /* transform: translate(-50%, -50%); */
    /* padding: 12px 48px; */
    color: #000000;
    background: linear-gradient(to right, #ffffff 0, #ca5e05 10%, #ffffff 20%);
    background-position: 0;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shine 5s infinite linear;
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
      background-position: -10px;
    }
    60% {
      background-position: 100px;
    }
    100% {
      background-position: 100px;
    }
  }
  @-webkit-keyframes shine {
    0% {
      background-position: -30px;
    }
    60% {
      background-position: 120px;
    }
    100% {
      background-position: 120px;
    }
  }
  @-o-keyframes shine {
    0% {
      background-position: -30px;
    }
    60% {
      background-position: 120px;
    }
    100% {
      background-position: 120px;
    }
  }
  @keyframes shine {
    0% {
      background-position: -30px;
    }
    60% {
      background-position: 120px;
    }
    100% {
      background-position: 120px;
    }
  }`;

export default GetStarted;
