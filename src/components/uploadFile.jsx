import React from "react";
import styled from "styled-components";

export const UploadFile = (props) => {
  const { handleErrorValue, updateJsonData, handleErrMsg } = props;

  const onSelectFile = async (e) => {
    const file = e.target.files[0];
    if (file.name.endsWith(".json")) {
      e.preventDefault();
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target.result;
        updateJsonData(JSON.parse(text));
      };

      reader.readAsText(e.target.files[0]);
    } else {
      handleErrMsg(true);
      handleErrorValue(
        "File not supported",
        "Invalid file type , please upload file with (.json) extention"
      );
    }
  };
  return (
    <styledComp.UploadComp>
      Upload
      <input
        id="myInput"
        type="file"
        accept=".json"
        className="hideFileInput"
        name="curriculam"
        onChange={onSelectFile}
      />
    </styledComp.UploadComp>
  );
};

const styledComp = {
  UploadComp: styled("label")`
    color: white;
    width: 47%;
    border-radius: 6px;
    background: #33b7ac;
    padding: 0.6rem;
    transition: 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    :hover {
      background: #227971;
    }
    input {
      display: none;
    }
  `,
};
