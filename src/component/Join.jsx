// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// export default function Join() {
//   const [number, setNumber] = useState("");
//   const { signInWithGoogle, role } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (role === "admin") {
//       navigate("/admin");
//     } else if (role === "vehicle provider") {
//       navigate("/provider");
//     }
//   }, [role, navigate]);

//   const handleGoogleLogin = async () => {
//     await signInWithGoogle({ number });
//   };
//   function handleNum(e) {
//     if (number.length <= 9) {
//       setNumber((pre) => e.target.value);
//     }
//   }
//   return (
//     <div className="flex h-screen w-full items-center justify-center p-2">
//       <StyledWrapper>
//         <form action className="form">
//           <p>
//             Welcome to Vihar<span>sign in to continue</span>
//           </p>
//           <div className="h-44"></div>
//           <div className="separator">
//             <div />
//             <pre className="flex text-center">Thank❤You</pre>
//             <div />
//           </div>
//           <input
//             type="number"
//             placeholder="Mobile number"
//             value={number}
//             onChange={handleNum}
//           />
//           {number.length == 10 && (
//             <button onClick={handleRegister} className="oauthButton">
//               <svg className="icon" viewBox="0 0 24 24">
//                 <path
//                   d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//                   fill="#4285F4"
//                 />
//                 <path
//                   d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                   fill="#34A853"
//                 />
//                 <path
//                   d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//                   fill="#FBBC05"
//                 />
//                 <path
//                   d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//                   fill="#EA4335"
//                 />
//                 <path d="M1 1h22v22H1z" fill="none" />
//               </svg>
//               Continue with Google
//             </button>
//           )}
//         </form>
//       </StyledWrapper>
//     </div>
//   );
// }

// const StyledWrapper = styled.div`
//   /* DEOXY Was Here */
// .form {
//   --background: #d3d3d3;
//   --input-focus: #2d8cf0;
//   --font-color: #323232;
//   --font-color-sub: #666;
//   --bg-color: #fff;
//   --main-color: #323232;
//   padding: 20px;
//   background: var(--background);
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   justify-content: center;
//   gap: 20px;
//   border-radius: 5px;
//   border: 2px solid var(--main-color);
//   box-shadow: 4px 4px var(--main-color);
// }

// .form > p {
//   font-family: var(--font-DelaGothicOne);
//   color: var(--font-color);
//   font-weight: 700;
//   font-size: 20px;
//   margin-bottom: 15px;
//   display: flex;
//   flex-direction: column;
// }

// .form > p > span {
//   font-family: var(--font-SpaceMono);
//   color: var(--font-color-sub);
//   font-weight: 600;
//   font-size: 17px;
// }

// .separator {
//   width: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 5px;
// }

// .separator > div {
//   width: 70%;
//   height: 3px;
//   border-radius: 5px;
//   background-color: var(--font-color-sub);
// }

// .separator > span {
//   color: var(--font-color);
//   font-family: var(--font-SpaceMono);
//   font-weight: 600;
// }

// .oauthButton {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   gap: 5px;
//   /* margin: 50px auto 0 auto; */
//   padding: auto 15px 15px auto;
//   width: 250px;
//   height: 40px;
//   border-radius: 5px;
//   border: 2px solid var(--main-color);
//   background-color: var(--bg-color);
//   box-shadow: 4px 4px var(--main-color);
//   font-size: 16px;
//   font-weight: 600;
//   color: var(--font-color);
//   cursor: pointer;
//   transition: all 250ms;
//   position: relative;
//   overflow: hidden;
//   z-index: 1;
// }

// .oauthButton::before {
//   content: "";
//   position: absolute;
//   top: 0;
//   left: 0;
//   height: 100%;
//   width: 0;
//   background-color: #212121;
//   z-index: -1;
//   -webkit-box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
//   box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
//   transition: all 250ms;
// }

// .oauthButton:hover {
//   color: #e8e8e8;
// }

// .oauthButton:hover::before {
//   width: 100%;
// }

// .form > input {
//   width: 250px;
//   height: 40px;
//   border-radius: 5px;
//   border: 2px solid var(--main-color);
//   background-color: var(--bg-color);
//   box-shadow: 4px 4px var(--main-color);
//   font-size: 15px;
//   font-weight: 600;
//   color: var(--font-color);
//   padding: 5px 10px;
//   outline: none;
// }

// .icon {
//   width: 1.5rem;
//   height: 1.5rem;
// }
// `;

import React, { useState } from "react";
import styled from "styled-components";
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
          <button
            onClick={() => handleRegister(number)}
            className="oauthButton"
          >
            Register with Google
          </button>
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
