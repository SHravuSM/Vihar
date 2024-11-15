import React from 'react';
import styled from 'styled-components';

const Radio = ({ setType }) => {
    return (
        <StyledWrapper className='flex w-full items-center justify-center rounded-md'>
            <div className="container flex h-16 items-center w-full justify-center ">
                <div className="tabs relative p-2 flex items-center justify-evenly gap-10 h-11 text-lg">
                    <input type="radio" onClick={() => setType('Bike')} id="radio-1" name="tabs" defaultChecked />
                    {/* <label className="tab" htmlFor="radio-1">Bike<span className="notification">2</span></label> */}
                    <label className="tab" htmlFor="radio-1">Bike</label>
                    <input type="radio" onClick={() => setType('Scooter')} id="radio-2" name="tabs" />
                    <label className="tab" htmlFor="radio-2">Scooty</label>
                    <input type="radio" onClick={() => setType('Cars')} id="radio-3" name="tabs" />
                    <label className="tab" htmlFor="radio-3">Cars</label>
                    <span className="absolute glider flex h-10 duration-300 ease-linear bg-red-200 w-16" />
                </div>
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .tabs {
    // display: flex;
    // position: relative;
    // background-color: #fff;
    box-shadow: 0 0 1px 0 rgba(24, 94, 224, 0.15), 0 6px 12px 0 rgba(24, 94, 224, 0.15);
    // padding: 0.75rem;
    border-radius: 99px;
  }

  .tabs * {
    z-index: 2;
  }

  .container input[type="radio"] {
    display: none;
  }

  .tab {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    // border: 2px solid black;
    width: 50px;
    // font-size: 20px;
    color: red;
    font-weight: 500;
    border-radius: 99px;
    cursor: pointer;
    transition: color 0.15s ease-in;
  }

//   .notification {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     width: .8rem;
//     height: .8rem;
//     position: absolute;
//     top: 10px;
//     left: 30%;
//     font-size: 10px;
//     margin-left: 0.75rem;
//     border-radius: 50%;
//     margin: 0px;
//     background-color: #e6eef9;
//     transition: 0.15s ease-in;
//   }

  .container input[type="radio"]:checked + label {
    color: white;
  }

  .container input[type="radio"]:checked + label > .notification {
    background-color: #185ee0;
    color: #fff;
    margin: 0px;
  }

  .container input[id="radio-1"]:checked ~ .glider {
    transform: translateX(-140%);
  }

  .container input[id="radio-2"]:checked ~ .glider {
    transform: translateX(0%);
  }

  .container input[id="radio-3"]:checked ~ .glider {
    transform: translateX(140%);
  }

  .glider {
    // position: absolute;
    // display: flex;
    // height: 30px;
    // width: 50px;
    background-color: #e6eef9;
    z-index: 1;
    border-radius: 99px;
    // transition: 0.500s ease-in;
  }

//   @media (max-width: 700px) {

//     .tabs {
//       transform: scale(0.6);
//     }
  }`;

export default Radio;
