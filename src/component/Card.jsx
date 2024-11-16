import React from "react";
import styled from "styled-components";

const Card = ({ vehicles }) => {
  return (
    // {vehicles.map((e, i) => {
    <StyledWrapper>
      <div className="card">
        <div className="imge">
          <div className="Usericon" />
          <p className="UserName" />
          <p className="Id" />
        </div>
        <div className="Description" />
      </div>
    </StyledWrapper>
    // })}
  );
};

const StyledWrapper = styled.div`
  .card {
    width: 50%;
    height: 200px;
    background: rgb(38, 38, 38);
    box-shadow: 7px 5px 10px rgba(0, 0, 0, 0.333);
  }

  .imge {
    height: 60px;
    background-color: #ff5858;
  }

  .imge .Usericon {
    background-color: #414141;
    transform: translateX(10px) translateY(10px);
    width: 40px;
    height: 40px;
    border-radius: 10px;
  }

  .imge .UserName {
    background-color: #414141;
    width: 80px;
    height: 15px;
    border-width: 10px;
    border-radius: 5px;
    border-color: #262626;
    color: #262626;
    font-size: 15px;
    font-weight: bold;
    transform: translateX(70px) translateY(-35px);
  }

  .imge .Id {
    background-color: #414141;
    width: 100px;
    height: 15px;
    border-width: 10px;
    border-radius: 5px;
    border-color: #262626;
    color: #262626;
    font-size: 15px;
    font-weight: bold;
    transform: translateX(70px) translateY(-25px);
  }

  .Description {
    border-color: #141414;
    background-color: #414141;
    transform: translate(5px, 6px);
    width: 180px;
    height: 130px;
    border-radius: 5px;
  }
`;

export default Card;
