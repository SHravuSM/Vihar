import React from 'react';
import styled from 'styled-components';

const Logoff = ({logout}) => {
  return (
    <StyledWrapper>
      <button onClick={logout}>Logout</button>
    </StyledWrapper>
  );
}

// className="w-full bg-green-500 text-white py-2 mb-2 rounded px-4"

const StyledWrapper = styled.div`
  button {
    color: #090909;
    padding: 0.7em 1.7em;
    font-size: 18px;
    border-radius: 0.5em;
    background: #e8e8e8;
    cursor: pointer;
    border: 1px solid #e8e8e8;
    transition: all 0.3s;
    box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;
  }

  button:hover {
    border: 1px solid white;
  }

  button:active {
    box-shadow: 4px 4px 12px #c5c5c5, -4px -4px 12px #ffffff;
  }`;

export default Logoff;
