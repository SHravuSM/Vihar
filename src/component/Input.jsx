import React from 'react';
import styled from 'styled-components';

const Input = () => {
  return (
    <StyledWrapper>
      <div className="container">
        <input required type="text border rounded-lg" name="text" className="input" />
        <label className="label w-full text-black font-semibold">Search for vehicles</label>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .container {
    display: flex;
    flex-direction: column;
    gap: 7px;
    position: relative;
    color: white;
  }

  .container .label {
    font-size: 15px;
    padding-left: 10px;
    position: absolute;
    top: 13px;
    transition: 0.3s;
    pointer-events: none;
  }

  .input {
    width: 150px;
    height: 45px;
    border: none;
    outline: none;
    padding: 0px 7px;
    border-radius: 6px;
    color: #ffffff;
    font-size: 15px;
    background-color: transparent;
    box-shadow: 3px 3px 10px rgba(0,0,0,1),
    -1px -1px 6px white;
  }

  .input:focus {
    border: 2px solid transparent;
    color: #000000;
    box-shadow: 3px 3px 10px rgba(0,0,0,1),
    -1px -1px 6px rgba(255, 255, 255, 0.4),
    inset 3px 3px 10px rgba(0,0,0,1),
    inset -1px -1px 6px white;
  }

  .container .input:valid ~ .label,
  .container .input:focus ~ .label {
    transition: 0.3s;
    padding-left: 2px;
    opacity : 0;
    transform: translateX(100px);
  }

  .container .input:valid,
  .container .input:focus {
    box-shadow: 3px 3px 10px rgba(0,0,0,1),
    -1px -1px 6px rgba(255, 255, 255, 0.4),
    inset 3px 3px 10px rgba(0,0,0,1),
    inset -1px -1px 6px rgba(255, 255, 255, 0.4);
  }`;

export default Input;
