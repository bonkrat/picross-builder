import React, { useContext } from "react";
import { store } from "../store";
import styled, { css } from "styled-components";

const Tool = styled.div`
  margin: 10px;
  cursor: pointer;
  border-radius: 10px;
  padding: 10px;
  ${props =>
    props.selected &&
    css`
      background-color: black;
    `}
`;

const Tools = ({ className }) => {
  const { state, dispatch } = useContext(store);
  const { tool } = state;

  const setTool = tool => () =>
    dispatch({
      type: "SET_TOOL",
      payload: tool
    });

  return (
    <div className={className}>
      <Tool selected={tool === "pencil"} onClick={setTool("pencil")}>
        ✏️
      </Tool>
      <Tool selected={tool === "brush"} onClick={setTool("brush")}>
        🖌
      </Tool>
      <Tool selected={tool === "eraser"} onClick={setTool("eraser")}>
        🥊
      </Tool>
    </div>
  );
};

const StyledTools = styled(Tools)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default StyledTools;
