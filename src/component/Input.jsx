import React from "react";
import styled from "styled-components";

const Input = () => {
  return (
    <StyledWrapper>
      <div className="container">
        <input
          required
          type="text border rounded-lg"
          name="text"
          className="input"
        />
        <label className="label w-full font-light text-black">
          Search for vehicles
        </label>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .container {
    display: flex;
    flex-direction: column;
    gap: 7px;
    position: relative;
    color: white;
  }

  .container .label {
    font-size: 14px;
    padding-left: 10px;
    position: absolute;
    top: 13px;
    transition: 0.3s;
    pointer-events: none;
  }

  .input {
    width: 150px;
    height: 45px;
    /* border: 2px solid black; */
    outline: none;
    padding: 0px 17px;
    border-radius: 6px;
    color: #ffffff;
    font-size: 15px;
    background-color: transparent;
    box-shadow:
      2px 2px 10px #000000,
      -1px -1px 100px white;
  }

  .input:focus {
    /* border: 2px solid transparent; */
    color: #000000;
    box-shadow:
      3px 3px 10px rgba(0, 0, 0, 1),
      -1px -1px 6px rgba(255, 255, 255, 0.1),
      inset 3px 3px 10px rgba(0, 0, 0, 1),
      inset -1px -1px 6px white;
  }

  .container .input:valid ~ .label,
  .container .input:focus ~ .label {
    transition: 0.3s;
    /* width: 130px; */
    padding-left: 2px;
    opacity: 0;
    transform: translateX(100px);
  }

  .container .input:valid,
  .container .input:focus {
    box-shadow:
      0px 5px 5px #ffffff,
      5px 5px 5px #a19b9b,
      inset 3px 3px 50px #ffffff,
      inset -1px -1px 6px #ffffff;
  }
`;

export default Input;
5;
