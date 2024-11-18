import React from "react";
import styled from "styled-components";

const Logoff = ({ logout }) => {
  return (
    <StyledWrapper>
      <button onClick={logout}>Logout</button>
    </StyledWrapper>
  );
};

// className="w-full bg-green-500 text-white py-2 mb-2 rounded px-4"

const StyledWrapper = styled.div`
  button {
    color: white;
    padding: 0.5em 1.5em;
    font-size: 18px;
    font-weight: 100;
    border-radius: 0.5em;
    background: #c1bfbfaa;
    cursor: pointer;
    margin-bottom: 10px;
    border: 1px solid #e8e8e8;
    transition: all 0.5s;
    box-shadow:
      6px 6px 12px #c5c5c5,
      -6px -6px 12px #ffffff;
  }

  button:hover {
    border: 1px solid white;
  }

  button:active {
    box-shadow:
      4px 4px 12px #f56d6d,
      -4px -4px 12px #000000;
  }
`;

export default Logoff;
