import React from "react";
import styled from "styled-components";

export const Header = () => {
  return (
    <styledComp.Wrapper>
      <h2>METHAMATICS</h2>
      <div className="nav">
        <div className="actions">
          <h3>Actions</h3>
          <p>
            move, indent, <br />
            outdent,delete
          </p>
        </div>
        <div className="standard">
          <h3>Standard</h3>
          <p>the text of the standard</p>
        </div>
      </div>
    </styledComp.Wrapper>
  );
};

const styledComp = {
  Wrapper: styled.div`
    h2 {
      color: #b3b3b3;
      width: 100%;
      border-bottom: 1px solid #c5c5c5;
      margin-bottom: 1rem;
    }

    .nav {
      display: flex;
      border-bottom: 1px solid #c5c5c5;
      h3 {
        margin: 0;
      }
      p {
        margin: 0rem 0rem 1rem 0rem;
        color: #a7a7a7;
      }
      .actions {
        margin-right: 2rem;
        flex: 1 1;
      }
      .standard {
        flex: 4 1;
      }
    }
  `,
};
