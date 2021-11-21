import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faArrowRight,
  faArrowLeft,
  faArrowsAlt,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
export const DndComponent = ({
  data,
  handlednd,
  deleteStandard,
  indentStandard,
  outdentStandard,
  onchange,
}) => {
  let stdLenght = data.length;

  return (
    <div>
      <DragDropContext
        onDragEnd={(element) => {
          const sourceIndex = element.source.index;
          if (!element.destination) {
            return;
          } else {
            const destinationIndex = element.destination.index;
            handlednd(sourceIndex, destinationIndex);
          }
        }}
      >
        <Droppable droppableId="droppable-1">
          {(provided) => (
            <div
              className="task-list"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {data.map((standard, index) => (
                <Draggable
                  key={standard.id}
                  draggableId={"draggable-" + standard.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      className="standard-indivisual"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <styledComp.Row
                        leng={stdLenght}
                        position={standard.position}
                      >
                        <div className="controls">
                          <div
                            {...provided.dragHandleProps}
                            className="tooltip"
                          >
                            <FontAwesomeIcon
                              icon={faArrowsAlt}
                              className="icon"
                            />
                            <span className="tooltiptext">Move</span>
                          </div>
                          <div
                            onClick={() => {
                              outdentStandard(index);
                            }}
                            className="tooltip"
                          >
                            <FontAwesomeIcon
                              icon={faArrowLeft}
                              className="icon"
                            />

                            <span className="tooltiptext">Outdent</span>
                          </div>
                          <div
                            onClick={() => {
                              indentStandard(index);
                            }}
                            className="tooltip"
                          >
                            <FontAwesomeIcon
                              icon={faArrowRight}
                              className="icon"
                            />
                            <span className="tooltiptext">Indent</span>
                          </div>

                          <div
                            onClick={() => {
                              deleteStandard(standard.id);
                            }}
                            className="tooltip"
                          >
                            <FontAwesomeIcon icon={faTrash} className="icon" />
                            <span className="tooltiptext">Delete</span>
                          </div>
                        </div>
                        <div className="block"></div>
                        <input
                          value={standard.value}
                          type="text"
                          placeholder="Enter Text"
                          onChange={(e) => {
                            onchange(e, index);
                          }}
                        />
                      </styledComp.Row>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

const styledComp = {
  Row: styled.div`
    border-bottom: 1px solid #d3d3d3;
    display: flex;
    align-items: center;
    .controls {
      margin-right: 4rem;
      display: flex;
      align-items: center;
      transition: 0.3s ease;

      .icon {
        z-index: 2;
        cursor: pointer;
        opacity: 0.4;
        transition: 0.3s ease;
        color: #9e9e9e;
        :hover {
          color: #01c6cc;
        }
      }

      .tooltip {
        position: relative;
        display: inline-block;
        margin-right: 8px;
      }

      .tooltip .tooltiptext {
        visibility: hidden;
        width: 70px;
        font-size: 0.7rem;
        background-color: black;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 5px 0;
        position: absolute;
        z-index: 1;
        bottom: 150%;
        left: 50%;
        margin-left: -35px;
      }

      .tooltip .tooltiptext::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: black transparent transparent transparent;
      }

      .tooltip:hover .tooltiptext {
        visibility: visible;
      }
    }
    :hover {
      .icon {
        opacity: 1;
      }
      .block {
        background: #dbdbdb85;
      }
    }

    .block {
      height: 45px;
      width: 40px;
      background: #eeeeee85;
      margin-left: ${(props) => props.position * 30 + "px"};
      border: 1px solid #e6e6e668;
      transition: 0.3s ease;
    }
    input {
      margin-left: 4rem;
      border: none;
      width: 70%;
      font-size: ${(props) => (props.position === 2 ? 0.9 + "rem" : 1 + "rem")};
      padding: 0.5rem;
      font-weight: ${(props) => (props.position === 0 ? "bold" : "regular")};
      text-transform: capitalize;
      color: ${(props) => (props.position === 0 ? "#01c6cc" : "black")};
      opacity: ${(props) => (props.position === 2 ? 0.7 : 1)};
      ::placeholder {
        color: #7c7c7c;
      }
      :focus {
        outline: none;
      }
    }
  `,
};
