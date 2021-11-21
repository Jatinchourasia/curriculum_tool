import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import { DndComponent } from "./dndComponent";
import { ErrorPopup } from "./errorPopup";
import { UploadFile } from "./uploadFile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { faTimesCircle as farTimesCircle } from "@fortawesome/free-regular-svg-icons";

export const StandardList = () => {
  const [data, setData] = useState([{ id: uuid(), value: "", position: 0 }]);
  const [error, setError] = useState(false);
  const [errorValue, setErrorValue] = useState({
    title: "",
    message: "",
  });

  const handleErrMsg = (value) => {
    setError(value);
  };
  const handleErrorValue = (title, message) => {
    setErrorValue({ title: title, message: message });
  };

  useEffect(() => {
    if (localStorage.getItem("curriculam")) {
      const curriculam = JSON.parse(localStorage.getItem("curriculam"));
      setData(curriculam);
    }
  }, []);

  const updateJsonData = (jsonData) => {
    setData([...jsonData]);
  };

  useEffect(() => {
    localStorage.setItem("curriculam", JSON.stringify(data));
  }, [data]);

  const indentStandard = (index) => {
    const dummyData = [...data];
    if (index === 0) {
      return;
    }

    if (
      dummyData[index - 1].position - dummyData[index].position >= 0 &&
      dummyData[index].position < 2
    ) {
      dummyData[index].position++;
    }

    setData(dummyData);
  };

  // function for handling outdent operation
  const outdentStandard = (index) => {
    const dummyData = [...data];
    let len = dummyData.length - 1;

    if (index === len) {
      if (dummyData[index].position > 0) {
        dummyData[index].position--;
      }
    } else {
      if (
        dummyData[index + 1].position - dummyData[index].position <= 1 &&
        dummyData[index].position > 0
      ) {
        dummyData[index].position--;
      }
    }

    setData(dummyData);
  };

  // handling text field change save
  const onchange = (e, index) => {
    const dummyData = [...data];
    dummyData[index].value = e.target.value;
    setData(dummyData);
  };

  // adding new standard
  const addnew = () => {
    setData([...data, { id: uuid(), value: "", position: 0 }]);
  };

  // deleting a standard
  const deleteStandard = (id) => {
    let val = -1;

    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        val = i;
        break;
      }
    }

    let newCurriculam = [...data];

    if (val !== -1) {
      let count = 1;
      if (data[val].position === 0) {
        for (let i = val + 1; i < data.length; i++) {
          if (data[i].position === 0) {
            break;
          }
          count++;
        }
      } else if (data[val].position === 1) {
        for (let i = val + 1; i < data.length; i++) {
          if (data[i].position === 1 || data[i].position === 0) {
            break;
          }
          count++;
        }
      }

      newCurriculam.splice(val, count);
      setData(newCurriculam);
    }
  };

  // handling drag and drop
  const handlednd = (destinationIndex, sourceIndex) => {
    let newCurriculam = [...data];
    newCurriculam.splice(
      destinationIndex,
      0,
      newCurriculam.splice(sourceIndex, 1)[0]
    );
    let flag = true;
    if (newCurriculam[0].position !== 0) {
      flag = false;
      setErrorValue({
        title: "Invalid Drag",
        message:
          "indentend value cannot be assigned as chapter, make it a chapter to continue",
      });
    }
    for (let i = 0; i < newCurriculam.length - 1; i++) {
      if (newCurriculam[i].position === 0) {
        if (newCurriculam[i + 1].position === 2) {
          flag = false;
          setErrorValue({
            title: "Invalid Drag",
            message:
              "cannot indent sub topic directly to chapter, first indentent it as a child",
          });
          break;
        }
      }
    }
    if (flag) {
      setData(newCurriculam);
    } else {
      setError(true);

      return;
    }
  };

  return (
    <styledComp.StdList>
      <DndComponent
        data={data}
        handlednd={handlednd}
        deleteStandard={deleteStandard}
        indentStandard={indentStandard}
        outdentStandard={outdentStandard}
        onchange={onchange}
      />
      <div className="button" onClick={addnew}>
        <FontAwesomeIcon className="add" icon={farTimesCircle} /> Add a standard
      </div>
      <div className="jsonControl">
        <a
          className="download"
          href={`data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(data)
          )}`}
          download="Curriculam.json"
        >
          Download
        </a>

        <UploadFile
          handleErrMsg={handleErrMsg}
          updateJsonData={updateJsonData}
          handleErrorValue={handleErrorValue}
        />
        {error && (
          <ErrorPopup
            title={errorValue.title}
            message={errorValue.message}
            handleErrMsg={handleErrMsg}
          />
        )}
      </div>
    </styledComp.StdList>
  );
};

const styledComp = {
  StdList: styled.div`
    margin-bottom: 2rem;
    .button {
      background: #337ab7;
      color: white;
      padding: 0.5rem;
      margin-top: 1.5rem;
      border-radius: 6px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: 0.3s ease-in-out;
      .add {
        margin-right: 0.5rem;
        font-size: 1.2rem;
        transform: rotate(45deg);
      }

      :hover {
        background: #285f8f;
      }
    }

    .jsonControl {
      margin-top: 1rem;
      display: flex;
      justify-content: space-between;
      a {
        text-decoration: none;
        width: 47%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        border-radius: 6px;
        background: #334bb7;
        padding: 0.6rem;
        transition: 0.3s ease;
        :hover {
          background: #1f3b70;
        }
      }

      .upload {
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
      }
    }
  `,
  Upload: styled.div`
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

    .uploadPanel {
      height: 50vh;
      width: 30vw;
      background: white;
      padding: 1rem 1.2rem;
      border-radius: 8px;
      z-index: 10;
      display: flex;
      flex-direction: column;
      align-items: center;
      .panel {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        border: 2px dashed #999999;

        span {
          margin: 0.5rem 0;
        }
      }
    }
  `,
};
