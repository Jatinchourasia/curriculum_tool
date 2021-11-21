import React from "react";
import styled from "styled-components";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ErrorPopup = (props) => {
  const { handleErrMsg, title, message } = props;
  return (
    <styledComp.Popup>
      <div className="popup" onClick={() => handleErrMsg(false)}></div>
      <div className="errorPanel">
        <h1>{title}</h1>
        <p>{message}</p>
        <FontAwesomeIcon
          onClick={() => handleErrMsg(false)}
          className="cancle"
          icon={faTimes}
        />
      </div>
    </styledComp.Popup>
  );
};

const styledComp = {
  Popup: styled.div`
    .popup {
      min-height: 100vh;
      width: 100vw;
      top: 0;
      left: 0;
      background: #00000075;
      position: fixed;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1;
    }
    .errorPanel {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 25vh;
      width: 40vw;
      background: white;
      padding: 1rem 1.2rem;
      border-radius: 8px;
      z-index: 10;
      display: flex;
      flex-direction: column;
      align-items: center;
      z-index: 10;
      p {
        color: gray;
      }
      .cancle {
        font-size: 1.5rem;
        color: gray;
        cursor: pointer;
        position: absolute;
        top: 10px;
        right: 10px;
        :hover {
          color: black;
        }
      }
    }
  `,
};
