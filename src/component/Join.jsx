import styled from "styled-components";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Join() {
  const [number, setNumber] = useState("");

  const handleNum = (e) => setNumber(e.target.value);

  const { handleRegister } = useAuth();

  return (
    <div className="flex h-screen w-full items-center justify-center p-2">
      <StyledWrapper>
        <div className="form">
          <p>
            Welcome to Vihar<span>Register to continue</span>
          </p>
          <div className="h-44"></div>
          <div className="separator">
            <div />
            <pre className="flex text-center">Thank❤You</pre>
            <div />
          </div>
          <input
            type="number"
            placeholder="Mobile number"
            value={number}
            onChange={handleNum}
          />
          {number.length == 10 && (
            <button
              onClick={() => handleRegister(number)}
              className="oauthButton"
            >
              Register with Google
            </button>
          )}
        </div>
      </StyledWrapper>
    </div>
  );
}

const StyledWrapper = styled.div`
  .form {
    --background: #d3d3d3;
    --input-focus: #2d8cf0;
    --font-color: #323232;
    --font-color-sub: #666;
    --bg-color: #fff;
    --main-color: #323232;
    padding: 20px;
    background: var(--background);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 20px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    box-shadow: 4px 4px var(--main-color);
  }

  .form > p {
    font-family: var(--font-DelaGothicOne);
    color: var(--font-color);
    font-weight: 700;
    font-size: 20px;
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
  }

  .form > p > span {
    font-family: var(--font-SpaceMono);
    color: var(--font-color-sub);
    font-weight: 600;
    font-size: 17px;
  }

  .separator {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }

  .separator > div {
    width: 70%;
    height: 3px;
    border-radius: 5px;
    background-color: var(--font-color-sub);
  }

  .separator > span {
    color: var(--font-color);
    font-family: var(--font-SpaceMono);
    font-weight: 600;
  }

  .oauthButton {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    /* margin: 50px auto 0 auto; */
    padding: auto 15px 15px auto;
    width: 250px;
    height: 40px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    box-shadow: 4px 4px var(--main-color);
    font-size: 16px;
    font-weight: 600;
    color: var(--font-color);
    cursor: pointer;
    transition: all 250ms;
    position: relative;
    overflow: hidden;
    z-index: 1;
  }

  .oauthButton::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 0;
    background-color: #212121;
    z-index: -1;
    -webkit-box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
    box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
    transition: all 250ms;
  }

  .oauthButton:hover {
    color: #e8e8e8;
  }

  .oauthButton:hover::before {
    width: 100%;
  }

  .form > input {
    width: 250px;
    height: 40px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    box-shadow: 4px 4px var(--main-color);
    font-size: 15px;
    font-weight: 600;
    color: var(--font-color);
    padding: 5px 10px;
    outline: none;
  }

  .icon {
    width: 1.5rem;
    height: 1.5rem;
  }
`;
