import React from "react";
import styled from "styled-components";

const AccountDelete = ({ deleteAccount }) => {
  return (
    <StyledWrapper className="self-start">
      <button type="button" onClick={deleteAccount} className="button">
        <span className="button__text">Delete Account</span>
        <span className="button__icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={512}
            viewBox="0 0 512 512"
            height={512}
            className="svg"
          >
            <title />
            <path
              style={{
                fill: "none",
                stroke: "#323232",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 32,
              }}
              d="M112,112l20,320c.95,18.49,14.4,32,32,32H348c17.67,0,30.87-13.51,32-32l20-320"
            />
            <line
              y2={112}
              y1={112}
              x2={432}
              x1={80}
              style={{
                stroke: "#323232",
                strokeLinecap: "round",
                strokeMiterlimit: 10,
                strokeWidth: 32,
              }}
            />
            <path
              style={{
                fill: "none",
                stroke: "#323232",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 32,
              }}
              d="M192,112V72h0a23.93,23.93,0,0,1,24-24h80a23.93,23.93,0,0,1,24,24h0v40"
            />
            <line
              y2={400}
              y1={176}
              x2={256}
              x1={256}
              style={{
                fill: "none",
                stroke: "#323232",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 32,
              }}
            />
            <line
              y2={400}
              y1={176}
              x2={192}
              x1={184}
              style={{
                fill: "none",
                stroke: "#323232",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 32,
              }}
            />
            <line
              y2={400}
              y1={176}
              x2={320}
              x1={328}
              style={{
                fill: "none",
                stroke: "#323232",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 32,
              }}
            />
          </svg>
        </span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .button {
    --main-focus: #2d8cf0;
    --font-color: white;
    --bg-color-sub: red;
    --bg-color: #dedede;
    --main-color: black;
    position: relative;
    width: 150px;
    height: 40px;
    cursor: pointer;
    display: flex;
    align-items: center;
    border: 2px solid var(--main-color);
    box-shadow: 4px 4px var(--main-color);
    background-color: var(--bg-color);
    border-radius: 10px;
    overflow: hidden;
  }

  .button,
  .button__icon,
  .button__text {
    transition: all 0.3s;
  }

  .button .button__text {
    transform: translateX(5px);
    color: var(--font-color);
    font-weight: 500;
    font-size: 14px;
  }

  .button .button__icon {
    position: absolute;
    transform: translateX(109px);
    height: 100%;
    width: 39px;
    background-color: var(--bg-color-sub);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .button .svg {
    width: 20px;
    fill: var(--main-color);
  }

  .button:hover {
    background: var(--bg-color);
  }

  .button:hover .button__text {
    color: transparent;
  }

  .button:hover .button__icon {
    width: 148px;
    transform: translateX(0);
  }

  .button:active {
    transform: translate(3px, 3px);
    box-shadow: 0px 0px var(--main-color);
  }
`;

export default AccountDelete;
